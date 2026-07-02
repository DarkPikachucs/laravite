import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function FormAccessManagement() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [accessRequests, setAccessRequests] = useState([]);
  const [usersWithAccess, setUsersWithAccess] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // pending, approved, all, audit
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [grantData, setGrantData] = useState({
    user_id: '',
    permission_level: 'view',
    expires_at: '',
    notes: '',
  });

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    if (selectedForm) {
      fetchAccessData();
    }
  }, [selectedForm, activeTab]);

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem('currentToken');
      const response = await axios.get('/forms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForms(response.data.data.data || []);
      if (response.data.data.data?.length > 0) {
        setSelectedForm(response.data.data.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forms:', error);
      toast.error('ไม่สามารถโหลดข้อมูลแบบฟอร์มได้');
      setLoading(false);
    }
  };

  const fetchAccessData = async () => {
    try {
      const token = localStorage.getItem('currentToken');
      const uuid = selectedForm.uuid;

      if (activeTab === 'pending') {
        const response = await axios.get(`/forms/${uuid}/access/requests/pending`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAccessRequests(response.data.data || []);
      } else if (activeTab === 'approved') {
        const response = await axios.get(`/forms/${uuid}/access/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsersWithAccess(response.data.data || []);
      } else if (activeTab === 'all') {
        const response = await axios.get(`/forms/${uuid}/access/requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAccessRequests(response.data.data || []);
      } else if (activeTab === 'audit') {
        const response = await axios.get(`/forms/${uuid}/access/audit-log`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAuditLog(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching access data:', error);
      toast.error('ไม่สามารถโหลดข้อมูลสิทธิ์ได้');
    }
  };

  const handleApprove = async (requestId, permissionLevel = 'view') => {
    try {
      const token = localStorage.getItem('currentToken');
      await axios.post(
        `/forms/${selectedForm.uuid}/access/requests/${requestId}/approve`,
        { permission_level: permissionLevel },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('อนุมัติสิทธิ์เรียบร้อยแล้ว');
      fetchAccessData();
    } catch (error) {
      console.error('Error approving:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถอนุมัติได้');
    }
  };

  const handleReject = async (requestId) => {
    const reason = prompt('กรุณาระบุเหตุผลที่ปฏิเสธ:');
    if (!reason) return;

    try {
      const token = localStorage.getItem('currentToken');
      await axios.post(
        `/forms/${selectedForm.uuid}/access/requests/${requestId}/reject`,
        { rejection_reason: reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('ปฏิเสธคำขอแล้ว');
      fetchAccessData();
    } catch (error) {
      console.error('Error rejecting:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถปฏิเสธได้');
    }
  };

  const handleRevoke = async (userId) => {
    if (!confirm('คุณต้องการเพิกถอนสิทธิ์ผู้ใช้นี้ใช่หรือไม่?')) return;

    try {
      const token = localStorage.getItem('currentToken');
      await axios.delete(
        `/forms/${selectedForm.uuid}/access/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('เพิกถอนสิทธิ์แล้ว');
      fetchAccessData();
    } catch (error) {
      console.error('Error revoking:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถเพิกถอนสิทธิ์ได้');
    }
  };

  const handleGrantAccess = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('currentToken');
      await axios.post(
        `/forms/${selectedForm.uuid}/access/grant`,
        grantData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('มอบสิทธิ์เรียบร้อยแล้ว');
      setShowGrantModal(false);
      setGrantData({ user_id: '', permission_level: 'view', expires_at: '', notes: '' });
      fetchAccessData();
    } catch (error) {
      console.error('Error granting:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถมอบสิทธิ์ได้');
    }
  };

  const handleBatchApprove = async () => {
    const requestIds = accessRequests.filter(r => r.status === 'pending').map(r => r.id);
    if (requestIds.length === 0) {
      toast.error('ไม่มีคำขอที่รออนุมัติ');
      return;
    }

    if (!confirm(`คุณต้องการอนุมัติ ${requestIds.length} คำขอใช่หรือไม่?`)) return;

    try {
      const token = localStorage.getItem('currentToken');
      await axios.post(
        `/forms/${selectedForm.uuid}/access/requests/batch`,
        {
          action: 'approve',
          request_ids: requestIds,
          permission_level: 'view'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`อนุมัติ ${requestIds.length} คำขอแล้ว`);
      fetchAccessData();
    } catch (error) {
      console.error('Error batch approving:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถอนุมัติแบบชุดได้');
    }
  };

  const getPermissionLabel = (level) => {
    const labels = {
      view: 'ดูผลลัพธ์',
      export: 'ดูและส่งออกข้อมูล',
      manage: 'จัดการทั้งหมด'
    };
    return labels[level] || level;
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-lg text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          <i className="mr-2 fas fa-key"></i>
          จัดการสิทธิ์เข้าถึงข้อมูลการตอบ
        </h1>
        <p className="mt-1 text-gray-600">จัดการคำขอสิทธิ์และมอบสิทธิ์เข้าถึงข้อมูลการตอบแบบฟอร์ม</p>
      </div>

      {/* Form Selector */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          เลือกแบบฟอร์ม
        </label>
        <select
          value={selectedForm?.id || ''}
          onChange={(e) => {
            const form = forms.find(f => f.id === parseInt(e.target.value));
            setSelectedForm(form);
          }}
          className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {console.log('forms:', forms)}
          {forms && forms.map(form => (
            <option key={form.id} value={form.id}>
              {form.title} ({form.submission_count || 0} คำตอบ)
            </option>
          ))}
        </select>
      </div>

      {selectedForm && (
        <>
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setShowGrantModal(true)}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <i className="mr-2 fas fa-plus"></i>
              มอบสิทธิ์โดยตรง
            </button>
            {activeTab === 'pending' && accessRequests.length > 0 && (
              <button
                onClick={handleBatchApprove}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                <i className="mr-2 fas fa-check-double"></i>
                อนุมัติทั้งหมด ({accessRequests.length})
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex -mb-px space-x-8">
              {[
                { id: 'pending', label: 'รออนุมัติ', count: null },
                { id: 'approved', label: 'อนุมัติแล้ว', count: null },
                { id: 'all', label: 'ทั้งหมด', count: null },
                { id: 'audit', label: 'ประวัติ', count: null }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow">
            {/* Pending Requests */}
            {activeTab === 'pending' && (
              <div className="p-6">
                {accessRequests.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">ไม่มีคำขอที่รออนุมัติ</p>
                ) : (
                  <div className="space-y-4">
                    {accessRequests.map(request => (
                      <div
                        key={request.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {request.user.name}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {request.user.email}
                              </span>
                              {request.user.department && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                                  {request.user.department}
                                </span>
                              )}
                            </div>
                            <p className="mb-2 text-sm text-gray-600">
                              <strong>ขอสิทธิ์:</strong>{' '}
                              <span className="font-medium text-blue-600">
                                {request.permission_label}
                              </span>
                            </p>
                            {request.reason && (
                              <p className="text-sm italic text-gray-600">
                                <strong>เหตุผล:</strong> {request.reason}
                              </p>
                            )}
                            <p className="mt-2 text-xs text-gray-500">
                              เมื่อ: {request.created_at_human}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(request.id, 'view')}
                              className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                            >
                              อนุมัติ (ดู)
                            </button>
                            <button
                              onClick={() => handleApprove(request.id, 'export')}
                              className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                              อนุมัติ (ส่งออก)
                            </button>
                            <button
                              onClick={() => handleApprove(request.id, 'manage')}
                              className="px-3 py-1 text-sm text-white bg-purple-500 rounded hover:bg-purple-600"
                            >
                              อนุมัติ (จัดการ)
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                            >
                              ปฏิเสธ
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Approved Users */}
            {activeTab === 'approved' && (
              <div className="p-6">
                {usersWithAccess.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">ยังไม่มีผู้ใช้ที่มีสิทธิ์</p>
                ) : (
                  <div className="space-y-4">
                    {usersWithAccess.map(user => (
                      <div
                        key={user.id}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">
                                {user.name}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {user.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <span>
                                <strong>สิทธิ์:</strong>{' '}
                                <span className="font-medium text-blue-600">
                                  {user.permission_label}
                                </span>
                              </span>
                              <span>
                                <strong>ได้รับเมื่อ:</strong> {user.granted_at}
                              </span>
                              {user.expires_at && (
                                <span className={user.is_expired ? 'text-red-600' : 'text-green-600'}>
                                  <strong>หมดอายุ:</strong> {user.expires_at_human}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRevoke(user.id)}
                            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                          >
                            เพิกถอนสิทธิ์
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* All Requests */}
            {activeTab === 'all' && (
              <div className="p-6">
                {accessRequests.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">ไม่มีคำขอสิทธิ์</p>
                ) : (
                  <div className="space-y-4">
                    {accessRequests.map(request => (
                      <div
                        key={request.id}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {request.user.name}
                              </h3>
                              <span className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(request.status)}`}>
                                {request.status === 'pending' && 'รออนุมัติ'}
                                {request.status === 'approved' && 'อนุมัติ'}
                                {request.status === 'rejected' && 'ปฏิเสธ'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              <strong>สิทธิ์:</strong> {request.permission_label}
                            </p>
                            {request.reason && (
                              <p className="text-sm text-gray-600">
                                <strong>เหตุผล:</strong> {request.reason}
                              </p>
                            )}
                            {request.rejection_reason && (
                              <p className="text-sm text-red-600">
                                <strong>เหตุผลที่ปฏิเสธ:</strong> {request.rejection_reason}
                              </p>
                            )}
                            <p className="mt-2 text-xs text-gray-500">
                              เมื่อ: {request.created_at_human}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Audit Log */}
            {activeTab === 'audit' && (
              <div className="p-6">
                {auditLog.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">ไม่มีประวัติ</p>
                ) : (
                  <div className="space-y-3">
                    {auditLog.map(log => (
                      <div
                        key={log.id}
                        className="p-3 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {log.action_label}
                            </span>
                            <span className="text-sm text-gray-500">
                              โดย: {log.user.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {log.created_at_human}
                          </span>
                        </div>
                        {log.reason && (
                          <p className="text-sm italic text-gray-600">
                            เหตุผล: {log.reason}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Grant Access Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">มอบสิทธิ์โดยตรง</h2>
            <form onSubmit={handleGrantAccess}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    ผู้ใช้ (User ID)
                  </label>
                  <input
                    type="number"
                    value={grantData.user_id}
                    onChange={(e) => setGrantData({ ...grantData, user_id: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="ระบุ ID ของผู้ใช้"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    ระดับสิทธิ์
                  </label>
                  <select
                    value={grantData.permission_level}
                    onChange={(e) => setGrantData({ ...grantData, permission_level: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="view">ดูผลลัพธ์</option>
                    <option value="export">ดูและส่งออกข้อมูล</option>
                    <option value="manage">จัดการทั้งหมด</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    วันหมดอายุ (ถ้ามี)
                  </label>
                  <input
                    type="datetime-local"
                    value={grantData.expires_at}
                    onChange={(e) => setGrantData({ ...grantData, expires_at: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    หมายเหตุ
                  </label>
                  <textarea
                    value={grantData.notes}
                    onChange={(e) => setGrantData({ ...grantData, notes: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="3"
                    placeholder="หมายเหตุ (ถ้ามี)"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  มอบสิทธิ์
                </button>
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
