import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

const FormSubmissionsViewer = () => {
  const { uuid } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submissions, setSubmissions] = useState([])
  const [form, setForm] = useState(null)
  const [stats, setStats] = useState(null)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAccessRequestModal, setShowAccessRequestModal] = useState(false)
  const [accessError, setAccessError] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [filter, setFilter] = useState({
    read: null,
    search: "",
    from_date: "",
    to_date: "",
  })
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  })
  const [requestReason, setRequestReason] = useState("")
  const [showAccessRequestsModal, setShowAccessRequestsModal] = useState(false)
  const [accessRequests, setAccessRequests] = useState([])
  const [loadingRequests, setLoadingRequests] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    checkAccessAndLoadData()
  }, [uuid])

  // Load pending requests count when form and currentUser are available
  useEffect(() => {
    if (form && currentUser && form.created_by === currentUser.id) {
      loadPendingRequestsCount()
    }
  }, [form, currentUser])

  const checkAccessAndLoadData = async () => {
    try {
      const token = localStorage.getItem("currentToken");
      if (!token) {
        navigate("/login");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Get current user
      const userResponse = await axios.get("/user");
      const user = userResponse.data;
      setCurrentUser(user);

      // Check if user has access to this form
      const accessResponse = await axios.get(`/forms/${uuid}/access/check`);

      const { has_access, is_owner, existing_request } = accessResponse.data.data || {};

      // Owner always has access - don't show request modal
      if (is_owner || has_access) {
        // User has access, load data normally
        loadSubmissions();
        loadStats();
      } else {
        // User doesn't have access
        setAccessError({
          hasAccess: false,
          message: accessResponse.data.message || "คุณไม่มีสิทธิ์ดูคำตอบแบบฟอร์มนี้",
          canRequest: true,
        });
        setShowAccessRequestModal(true);
      }
    } catch (error) {
      console.error("Access check failed:", error);

      // If 403 Forbidden, show access request modal
      if (error.response?.status === 403) {
        setAccessError({
          hasAccess: false,
          message: error.response?.data?.message || "คุณไม่มีสิทธิ์ดูคำตอบแบบฟอร์มนี้",
          canRequest: true,
        });
        setShowAccessRequestModal(true);
      } else if (error.response?.status === 401) {
        // Unauthorized, redirect to login
        localStorage.removeItem("currentToken");
        navigate("/login");
      } else {
        toast.error("เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์");
      }
    }
  };

  const handleRequestAccess = async () => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      await axios.post(`/forms/${uuid}/access/request`, {
        reason: requestReason || null,
      });

      toast.success("ส่งคำขอสิทธิ์เรียบร้อยแล้ว กรุณารอการอนุมัติ");
      setShowAccessRequestModal(false);
      setRequestReason("");
    } catch (error) {
      console.error("Error requesting access:", error);
      const errorMessage = error.response?.data?.message || "ไม่สามารถส่งคำขอได้";
      toast.error(errorMessage);
    }
  };

  const loadSubmissions = async () => {
    setLoading(true)
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
      }

      // Only add filter params if they have values
      if (filter.read !== null && filter.read !== undefined) {
        params.read = filter.read
      }
      if (filter.search) {
        params.search = filter.search
      }
      if (filter.from_date) {
        params.from_date = filter.from_date
      }
      if (filter.to_date) {
        params.to_date = filter.to_date
      }

      const response = await axios.get(`/forms/${uuid}/submissions`, { params })
      console.log('[Submissions] API Response:', response.data)
      // response.data = { success: true, data: paginator, form: {...} }
      const paginator = response.data.data

      console.log('[Submissions] Paginator:', paginator)
      console.log('[Submissions] Submissions array:', paginator.data)

      setSubmissions(paginator.data || [])
      setForm(response.data.form)

      // Load pending access requests count for form owner (after form is loaded)
      // This will be done in checkAccessAndLoadData after currentUser is set

      setPagination({
        current_page: paginator.current_page || 1,
        last_page: paginator.last_page || 1,
        per_page: paginator.per_page || 15,
        total: paginator.total || 0,
      })
    } catch (error) {
      console.error("Error loading submissions:", error)
      toast.error("ไม่สามารถโหลดข้อมูลได้")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await axios.get(`/forms/${uuid}/submissions/stats`)
      setStats(response.data.data)
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  const handleViewDetail = async (submissionId) => {
    try {
      const response = await axios.get(`/forms/${uuid}/submissions/${submissionId}`)
      // response.data.data = { submission: {...}, form: {...} }
      const submissionData = response.data.data

      // Ensure we have the submission object with an ID
      if (!submissionData || !submissionData.submission) {
        toast.error("ไม่พบข้อมูลคำตอบ")
        return
      }

      setSelectedSubmission(submissionData.submission)
      // Merge form fields from the response
      setForm(submissionData.form)
      setShowDetailModal(true)
      loadSubmissions() // Refresh to update read status
    } catch (error) {
      console.error("Error loading submission detail:", error)
      toast.error("ไม่สามารถโหลดข้อมูลได้")
    }
  }

  const handleAddNote = async (note) => {
    try {
      await axios.post(`/forms/${uuid}/submissions/${selectedSubmission.id}/notes`, {
        note,
      })
      toast.success("เพิ่มบันทึกสำเร็จ")
      // Refresh submission detail
      const response = await axios.get(`/forms/${uuid}/submissions/${selectedSubmission.id}`)
      const submissionData = response.data.data
      setSelectedSubmission(submissionData.submission)
      setForm(submissionData.form)
    } catch (error) {
      console.error("Error adding note:", error)
      toast.error("ไม่สามารถเพิ่มบันทึกได้")
    }
  }

  const handleDeleteSubmission = async (submissionId) => {
    if (!confirm("คุณแน่ใจว่าต้องการลบข้อมูลนี้?")) return

    try {
      await axios.delete(`/forms/${uuid}/submissions/${submissionId}`)
      toast.success("ลบข้อมูลสำเร็จ")
      loadSubmissions()
      loadStats()
      if (showDetailModal) {
        setShowDetailModal(false)
      }
    } catch (error) {
      console.error("Error deleting submission:", error)
      toast.error("ไม่สามารถลบข้อมูลได้")
    }
  }

  const handleExport = async () => {
    try {
      const response = await axios.get(`/forms/${uuid}/submissions/export`, {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${form?.title || 'submissions'}_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success("ส่งออกข้อมูลสำเร็จ")
    } catch (error) {
      console.error("Error exporting:", error)
      toast.error("ไม่สามารถส่งออกข้อมูลได้")
    }
  }

  const loadAccessRequests = async () => {
    setLoadingRequests(true)
    try {
      const token = localStorage.getItem("currentToken")
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }

      const response = await axios.get(`/forms/${uuid}/access/requests`)
      const requests = response.data.data || []
      setAccessRequests(requests)
      setPendingCount(requests.filter(r => r.status === 'pending').length)
      setShowAccessRequestsModal(true)
    } catch (error) {
      console.error("Error loading access requests:", error)
      toast.error("ไม่สามารถโหลดรายการคำขอได้")
    } finally {
      setLoadingRequests(false)
    }
  }

  const loadPendingRequestsCount = async () => {
    try {
      const token = localStorage.getItem("currentToken")
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }

      const response = await axios.get(`/forms/${uuid}/access/requests/pending`)
      const requests = response.data.data || []
      setPendingCount(requests.length)
    } catch (error) {
      console.error("Error loading pending requests count:", error)
      // Silently fail - not critical
    }
  }

  const handleApproveRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("currentToken")
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }

      await axios.post(`/forms/${uuid}/access/requests/${requestId}/approve`)
      toast.success("อนุมัติคำขอแล้ว")
      loadAccessRequests() // Reload requests
    } catch (error) {
      console.error("Error approving request:", error)
      toast.error("ไม่สามารถอนุมัติคำขอได้")
    }
  }

  const handleRejectRequest = async (requestId, reason = "") => {
    if (!reason && !confirm("คุณแน่ใจว่าต้องการปฏิเสธคำขอนี้?")) return

    try {
      const token = localStorage.getItem("currentToken")
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }

      await axios.post(`/forms/${uuid}/access/requests/${requestId}/reject`, {
        rejection_reason: reason
      })
      toast.success("ปฏิเสธคำขอแล้ว")
      loadAccessRequests() // Reload requests
    } catch (error) {
      console.error("Error rejecting request:", error)
      toast.error("ไม่สามารถปฏิเสธคำขอได้")
    }
  }

  const getFieldValue = (responses, fieldId, field) => {
    const value = responses[fieldId]
    if (Array.isArray(value)) {
      return value.join(", ")
    }
    if (field?.type === "grid" && typeof value === "object" && value !== null) {
      const getRowType = (r) => typeof r === 'string' ? 'row' : (r?.type || 'row')
      const getRowLabel = (r) => typeof r === 'string' ? r : (r?.label || '')
      const cols = field.columns || []
      return (field.rows || []).map((row, idx) => {
        if (getRowType(row) === 'title') return null
        const colIdx = value[idx]
        return `${getRowLabel(row)}: ${colIdx !== undefined && colIdx !== null ? cols[colIdx] || "-" : "-"}`
      }).filter(Boolean).join(" | ")
    }
    return value || "-"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ข้อมูลการตอบแบบฟอร์ม</h1>
              <p className="mt-1 text-gray-600">{form?.title}</p>
            </div>
            <div className="flex gap-2">
              {form?.created_by === currentUser?.id && (
                <button
                  onClick={loadAccessRequests}
                  className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  🔔 จัดการคำขอสิทธิ์
                  {pendingCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>
              )}
              <button
                onClick={handleExport}
                className="px-4 py-2 text-sm text-white transition bg-green-600 rounded-lg hover:bg-green-700"
              >
                📥 ส่งออก CSV
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-4">
              <div className="p-4 rounded-lg bg-blue-50">
                <p className="text-sm text-blue-600">ส่งทั้งหมด</p>
                <p className="text-2xl font-bold text-blue-800">{stats.total_submissions}</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50">
                <p className="text-sm text-yellow-600">ยังไม่อ่าน</p>
                <p className="text-2xl font-bold text-yellow-800">{stats.unread_count}</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50">
                <p className="text-sm text-green-600">อ่านแล้ว</p>
                <p className="text-2xl font-bold text-green-800">
                  {stats.total_submissions - stats.unread_count}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50">
                <p className="text-sm text-purple-600">อัตราการตอบ</p>
                <p className="text-2xl font-bold text-purple-800">
                  {stats.total_submissions > 0 ? "100%" : "0%"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                ค้นหา
              </label>
              <input
                type="text"
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                placeholder="ชื่อ, อีเมล, เบอร์โทร"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                สถานะ
              </label>
              <select
                value={filter.read ?? ""}
                onChange={(e) => setFilter({ ...filter, read: e.target.value === "" ? null : e.target.value === "true" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">ทั้งหมด</option>
                <option value="false">ยังไม่อ่าน</option>
                <option value="true">อ่านแล้ว</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                ตั้งแต่
              </label>
              <input
                type="date"
                value={filter.from_date}
                onChange={(e) => setFilter({ ...filter, from_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                ถึง
              </label>
              <input
                type="date"
                value={filter.to_date}
                onChange={(e) => setFilter({ ...filter, to_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    วันที่ส่ง
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    ชื่อ
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    อีเมล
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    เบอร์โทร
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    สถานะ
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                    การกระทำ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-6 h-6 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                        <span className="text-gray-600">กำลังโหลด...</span>
                      </div>
                    </td>
                  </tr>
                ) : submissions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      ยังไม่มีข้อมูลการตอบแบบฟอร์ม
                    </td>
                  </tr>
                ) : (
                  submissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className={`hover:bg-gray-50 cursor-pointer ${!submission.is_read ? "bg-blue-50" : ""
                        }`}
                      onClick={() => handleViewDetail(submission.id)}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        #{submission.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(submission.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {submission.respondent_name || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {submission.respondent_email || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {submission.respondent_phone || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${submission.is_read
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {submission.is_read ? "อ่านแล้ว" : "ยังไม่อ่าน"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewDetail(submission.id)
                          }}
                          className="mr-3 text-blue-600 hover:text-blue-900"
                        >
                          👁️ ดู
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteSubmission(submission.id)
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                แสดง {((pagination.current_page - 1) * pagination.per_page) + 1} -{" "}
                {Math.min(pagination.current_page * pagination.per_page, pagination.total)} จาก{" "}
                {pagination.total} รายการ
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagination({ ...pagination, current_page: pagination.current_page - 1 })}
                  disabled={pagination.current_page === 1}
                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  ← ก่อนหน้า
                </button>
                <span className="px-3 py-1 text-gray-600">
                  หน้า {pagination.current_page} / {pagination.last_page}
                </span>
                <button
                  onClick={() => setPagination({ ...pagination, current_page: pagination.current_page + 1 })}
                  disabled={pagination.current_page === pagination.last_page}
                  className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  ถัดไป →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedSubmission && selectedSubmission.id && (
        <DetailModal
          submission={selectedSubmission}
          form={form}
          onClose={() => setShowDetailModal(false)}
          onAddNote={handleAddNote}
          onDelete={() => handleDeleteSubmission(selectedSubmission.id)}
        />
      )}

      {/* Access Request Modal */}
      <AccessRequestModal
        isOpen={showAccessRequestModal}
        onClose={() => {
          setShowAccessRequestModal(false);
          setRequestReason("");
        }}
        onSubmit={handleRequestAccess}
        reason={requestReason}
        setReason={setRequestReason}
        form={form}
      />

      {/* Access Requests Management Modal (for form owner) */}
      {showAccessRequestsModal && (
        <AccessRequestsManagementModal
          isOpen={showAccessRequestsModal}
          onClose={() => {
            setShowAccessRequestsModal(false);
            setAccessRequests([]);
          }}
          requests={accessRequests}
          loading={loadingRequests}
          onApprove={handleApproveRequest}
          onReject={handleRejectRequest}
          form={form}
        />
      )}
    </div>
  )
}

// Detail Modal Component
const DetailModal = ({ submission, form, onClose, onAddNote, onDelete }) => {
  const [note, setNote] = useState("")

  const handleAddNote = () => {
    if (!note.trim()) return
    onAddNote(note)
    setNote("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black bg-opacity-50">
      <div className="w-full max-w-4xl my-8 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">รายละเอียดการตอบแบบฟอร์ม</h3>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Respondent Info */}
          {(submission.respondent_name || submission.respondent_email || submission.respondent_phone) && (
            <div className="pb-6 mb-6 border-b border-gray-200">
              <h4 className="mb-3 text-sm font-semibold text-gray-700">ข้อมูลผู้ตอบ</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs text-gray-500">ชื่อ-นามสกุล</p>
                  <p className="text-gray-800">{submission.respondent_name || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">อีเมล</p>
                  <p className="text-gray-800">{submission.respondent_email || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">เบอร์โทร</p>
                  <p className="text-gray-800">{submission.respondent_phone || "-"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Responses */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">คำตอบ</h4>
            <div className="space-y-4">
              {(form?.fields || []).map((field) => (
                <div key={field.id} className="p-4 rounded-lg bg-gray-50">
                  <p className="mb-1 text-sm font-medium text-gray-700">
                    {field.label}
                  </p>
                  <p className="text-gray-900">
                    {field.type === "grid" && typeof submission.responses?.[field.id] === "object" && submission.responses[field.id] !== null
                      ? (field.rows || []).map((row, idx) => {
                          const getRowType = (r) => typeof r === 'string' ? 'row' : (r?.type || 'row')
                          const getRowLabel = (r) => typeof r === 'string' ? r : (r?.label || '')
                          if (getRowType(row) === 'title') return null
                          const colIdx = submission.responses[field.id][idx]
                          return `${getRowLabel(row)}: ${colIdx !== undefined ? (field.columns || [])[colIdx] || "-" : "-"}`
                        }).filter(Boolean).join(" | ")
                      : Array.isArray(submission.responses?.[field.id])
                        ? submission.responses[field.id].join(", ")
                        : submission.responses?.[field.id] || "-"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="pb-6 mb-6 border-b border-gray-200">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">ข้อมูลเพิ่มเติม</h4>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <p className="text-gray-500">วันที่ส่ง</p>
                <p className="text-gray-800">
                  {new Date(submission.created_at).toLocaleString("th-TH")}
                </p>
              </div>
              <div>
                <p className="text-gray-500">IP Address</p>
                <p className="text-gray-800">{submission.ip_address || "-"}</p>
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-700">บันทึก</h4>
            {submission.admin_notes && (
              <div className="p-4 mb-4 rounded-lg bg-yellow-50">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {submission.admin_notes}
                </pre>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="เพิ่มบันทึก..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && handleAddNote()}
              />
              <button
                onClick={handleAddNote}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                เพิ่มบันทึก
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onDelete}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            🗑️ ลบข้อมูล
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  )
}

// Access Request Modal Component
const AccessRequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  reason,
  setReason,
  form
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">ขอสิทธิ์ดูคำตอบแบบฟอร์ม</h3>
          <p className="mt-2 text-sm text-gray-600">
            แบบฟอร์ม: {form?.title || "กำลังโหลด..."}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            คุณไม่มีสิทธิ์ดูคำตอบแบบฟอร์มนี้ กรุณาส่งคำขอเพื่อขออนุมัติ
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            เหตุผลที่ต้องการดูคำตอบ (ไม่บังคับ)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="กรุณาบอกรายละเอียดเหตุผล..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSubmit}
            className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            ส่งคำขอ
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

// Access Requests Management Modal Component (for form owner)
const AccessRequestsManagementModal = ({
  isOpen,
  onClose,
  requests,
  loading,
  onApprove,
  onReject,
  form
}) => {
  if (!isOpen) return null;

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="w-full max-w-4xl p-6 my-8 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">จัดการคำขอสิทธิ์</h3>
            <p className="mt-1 text-sm text-gray-600">
              แบบฟอร์ม: {form?.title || "กำลังโหลด..."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li className="mr-2">
              <button className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active">
                ทั้งหมด ({requests.length})
              </button>
            </li>
            <li className="mr-2">
              <button className="inline-block p-4 text-yellow-600 border-b-2 border-yellow-600 rounded-t-lg">
                รอพิจารณา ({pendingRequests.length})
              </button>
            </li>
            <li className="mr-2">
              <button className="inline-block p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg">
                อนุมัติแล้ว ({approvedRequests.length})
              </button>
            </li>
            <li>
              <button className="inline-block p-4 text-red-600 border-b-2 border-red-600 rounded-t-lg">
                ถูกปฏิเสธ ({rejectedRequests.length})
              </button>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-96">
          {loading ? (
            <div className="py-8 text-center">
              <div className="w-8 h-8 mx-auto mb-2 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              <p className="text-gray-600">กำลังโหลด...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>ยังไม่มีคำขอสิทธิ์</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right">ผู้ขอ</th>
                  <th className="px-4 py-3 text-right">เหตุผล</th>
                  <th className="px-4 py-3 text-right">สถานะ</th>
                  <th className="px-4 py-3 text-right">วันที่ขอ</th>
                  <th className="px-4 py-3 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{request.requester?.name || "N/A"}</p>
                        <p className="text-xs text-gray-500">{request.requester?.email || ""}</p>
                      </div>
                    </td>
                    <td className="max-w-xs px-4 py-3">
                      <p className="text-gray-600 truncate">{request.reason || "-"}</p>
                      {request.rejection_reason && (
                        <p className="mt-1 text-xs text-red-500">
                          เหตุผลปฏิเสธ: {request.rejection_reason}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {request.status === 'pending' && (
                        <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
                          รอพิจารณา
                        </span>
                      )}
                      {request.status === 'approved' && (
                        <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
                          อนุมัติแล้ว
                        </span>
                      )}
                      {request.status === 'rejected' && (
                        <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded">
                          ถูกปฏิเสธ
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(request.created_at).toLocaleString("th-TH")}
                    </td>
                    <td className="px-4 py-3">
                      {request.status === 'pending' ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onApprove(request.id)}
                            className="px-3 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700"
                          >
                            อนุมัติ
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt("เหตุผลที่ปฏิเสธ (ไม่บังคับ):");
                              if (reason !== null) {
                                onReject(request.id, reason || "");
                              }
                            }}
                            className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                          >
                            ปฏิเสธ
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionsViewer;
