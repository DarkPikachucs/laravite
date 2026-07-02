import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

const CollaboratorModal = ({ form, onClose, onUpdate }) => {
  const [collaborators, setCollaborators] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (form?.collaborators) {
      setCollaborators(form.collaborators)
    }
  }, [form])

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([])
      return
    }
    const timer = setTimeout(async () => {
      setSearching(true)
      try {
        const token = localStorage.getItem('currentToken')
        const res = await axios.get('/users/search', {
          params: { q: searchQuery },
          headers: { Authorization: `Bearer ${token}` }
        })
        const users = res.data.data || []
        const existingIds = new Set([
          form.created_by,
          ...collaborators.map(c => c.id)
        ])
        setSearchResults(users.filter(u => !existingIds.has(u.id)))
      } catch { /* ignore */ } finally {
        setSearching(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, collaborators, form.created_by])

  const addCollaborator = async (user, level = 'manage') => {
    setSaving(true)
    try {
      const token = localStorage.getItem('currentToken')
      await axios.post(`/forms/${form.uuid}/access/grant`,
        { user_id: user.id, permission_level: level },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCollaborators(prev => [...prev, { id: user.id, name: user.name, email: user.email, permission_level: level }])
      setSearchResults(prev => prev.filter(u => u.id !== user.id))
      toast.success(`เพิ่ม ${user.name} เป็นผู้ร่วมแก้ไขแล้ว`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'ไม่สามารถเพิ่มผู้ร่วมแก้ไขได้')
    } finally {
      setSaving(false)
    }
  }

  const removeCollaborator = async (user) => {
    if (!confirm(`ต้องการลบ ${user.name} ออกจากผู้ร่วมแก้ไข?`)) return
    setSaving(true)
    try {
      const token = localStorage.getItem('currentToken')
      await axios.delete(`/forms/${form.uuid}/access/users/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCollaborators(prev => prev.filter(c => c.id !== user.id))
      toast.success(`ลบ ${user.name} ออกจากผู้ร่วมแก้ไขแล้ว`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'ไม่สามารถลบผู้ร่วมแก้ไขได้')
    } finally {
      setSaving(false)
    }
  }

  const updatePermission = async (user, level) => {
    setSaving(true)
    try {
      const token = localStorage.getItem('currentToken')
      await axios.put(`/forms/${form.uuid}/access/users/${user.id}/permission`,
        { permission_level: level },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCollaborators(prev => prev.map(c => c.id === user.id ? { ...c, permission_level: level } : c))
      toast.success(`อัปเดตสิทธิ์ของ ${user.name} แล้ว`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'ไม่สามารถอัปเดตสิทธิ์ได้')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="w-full max-w-lg p-6 mx-4 bg-white rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">จัดการผู้ร่วมแก้ไข</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          แบบฟอร์ม: <span className="font-semibold">{form?.title}</span>
        </p>

        {/* Current collaborators */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            เจ้าของ: <span className="font-normal">{form?.creator?.name || '-'}</span>
          </h3>
        </div>

        {collaborators.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-gray-700">ผู้ร่วมแก้ไขปัจจุบัน ({collaborators.length})</h3>
            <div className="space-y-2">
              {collaborators.map(c => (
                <div key={c.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={c.permission_level}
                      onChange={e => updatePermission(c, e.target.value)}
                      disabled={saving}
                      className="px-2 py-1 text-xs border border-gray-300 rounded"
                    >
                      <option value="manage">แก้ไขได้</option>
                      <option value="view">ดูได้</option>
                    </select>
                    <button
                      onClick={() => removeCollaborator(c)}
                      disabled={saving}
                      className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add new collaborator */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-700">เพิ่มผู้ร่วมแก้ไข</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อหรืออีเมล..."
            className="w-full px-3 py-2 mb-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {searching && <p className="text-xs text-gray-500">กำลังค้นหา...</p>}
          {searchResults.length > 0 && (
            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
              {searchResults.map(user => (
                <div key={user.id} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => addCollaborator(user)}
                    disabled={saving}
                    className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    เพิ่ม
                  </button>
                </div>
              ))}
            </div>
          )}
          {searchQuery.length >= 2 && searchResults.length === 0 && !searching && (
            <p className="text-xs text-gray-500">ไม่พบผู้ใช้</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  )
}

const FormsList = () => {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [scope, setScope] = useState('all')
  const [collaboratorModalForm, setCollaboratorModalForm] = useState(null)
  const [filter, setFilter] = useState({
    status: "",
    search: "",
  })
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem('currentToken')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [])

  useEffect(() => {
    loadForms()
  }, [filter, scope, pagination.current_page])

  const loadForms = async () => {
    setLoading(true)
    try {
      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        scope: scope === 'all' ? undefined : scope,
        ...filter,
      }

      const response = await axios.get("/forms", { params })
      const paginator = response.data.data

      setForms(paginator.data || [])
      setPagination({
        current_page: paginator.current_page || 1,
        last_page: paginator.last_page || 1,
        per_page: paginator.per_page || 15,
        total: paginator.total || 0,
      })
    } catch (error) {
      console.error("Error loading forms:", error)
      toast.error("ไม่สามารถโหลดแบบฟอร์มได้")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (uuid, title) => {
    if (!confirm(`คุณแน่ใจว่าต้องการลบแบบฟอร์ม "${title}"?`)) return
    try {
      await axios.delete(`/forms/${uuid}`)
      toast.success("ลบแบบฟอร์มสำเร็จ")
      loadForms()
    } catch (error) {
      console.error("Error deleting form:", error)
      toast.error("ไม่สามารถลบแบบฟอร์มได้")
    }
  }

  const handleDuplicate = async (uuid) => {
    try {
      await axios.post(`/forms/${uuid}/duplicate`)
      toast.success("คัดลอกแบบฟอร์มสำเร็จ")
      loadForms()
    } catch (error) {
      console.error("Error duplicating form:", error)
      toast.error("ไม่สามารถคัดลอกแบบฟอร์มได้")
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      expired: "bg-red-100 text-red-800",
      scheduled: "bg-blue-100 text-blue-800",
    }
    const labels = {
      active: "ใช้งาน",
      inactive: "ปิดใช้งาน",
      expired: "หมดอายุ",
      scheduled: "กำหนดการ",
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${badges[status]}`}>
        {labels[status] || status}
      </span>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const userId = parseInt(localStorage.getItem('userId'))

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">จัดการแบบฟอร์ม</h1>
            <div className="flex gap-2">
              <Link
                to="/admin/forms/new"
                className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Schema Builder
              </Link>
              <Link
                to="/admin/forms/new-script"
                className="px-4 py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Script Editor
              </Link>
            </div>
          </div>

          {/* Scope Tabs */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'all', label: 'ทั้งหมด' },
              { key: 'mine', label: 'ของฉัน' },
              { key: 'collaborated', label: 'ที่ร่วมแก้ไข' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => { setScope(tab.key); setPagination(p => ({ ...p, current_page: 1 })) }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  scope === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">ค้นหา</label>
              <input
                type="text"
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                placeholder="ค้นหาแบบฟอร์ม..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">สถานะ</label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">ทั้งหมด</option>
                <option value="active">ใช้งาน</option>
                <option value="inactive">ปิดใช้งาน</option>
                <option value="expired">หมดอายุ</option>
                <option value="scheduled">กำหนดการ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="flex items-center justify-center py-12 col-span-full">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                <span className="text-gray-600">กำลังโหลด...</span>
              </div>
            </div>
          ) : forms.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-lg shadow-md col-span-full">
              <p className="text-lg text-gray-500">ยังไม่มีแบบฟอร์ม</p>
              <Link
                to="/admin/forms/new"
                className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                สร้างแบบฟอร์มแรกของคุณ
              </Link>
            </div>
          ) : (
            forms.map((form) => {
              const isOwner = form.created_by === userId
              const collaborators = form.collaborators || []

              return (
                <div
                  key={form.id}
                  className="overflow-hidden transition bg-white rounded-lg shadow-md hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {form.title}
                          </h3>
                          {form.form_type === 'script' && (
                            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                              Script
                            </span>
                          )}
                          {form.form_type === 'schema' && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                              Schema
                            </span>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(form.status)}
                    </div>

                    {form.description && (
                      <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                        {form.description}
                      </p>
                    )}

                    {/* Owner */}
                    <div className="mb-3 text-sm text-gray-600">
                      <span>เจ้าของ: </span>
                      <span className="font-medium text-gray-800">
                        {form.creator?.name || '-'}
                      </span>
                    </div>

                    {/* Collaborators */}
                    {collaborators.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-gray-500">ผู้ร่วมแก้ไข:</span>
                          {collaborators.map(c => (
                            <span key={c.id} className="inline-flex items-center px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-4 space-y-2 text-sm text-gray-500">
                      <div className="flex justify-between">
                        <span>สร้างเมื่อ:</span>
                        <span>{formatDate(form.created_at)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>เริ่ม:</span>
                        <span>{formatDate(form.published_at)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>สิ้นสุด:</span>
                        <span>{formatDate(form.expires_at)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {form.submission_count || 0} คำตอบ
                      </span>
                      <span className={`w-3 h-3 rounded-full ${form.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    </div>
                  </div>

                  <div className="flex justify-between px-6 py-3 border-t border-gray-200 bg-gray-50">
                    {form.form_type === 'script' ? (
                      <Link
                        to={`/admin/forms/${form.uuid}/script`}
                        className="text-sm font-medium text-purple-600 hover:text-purple-800"
                      >
                        แก้ไข Script
                      </Link>
                    ) : (
                      <Link
                        to={`/admin/forms/${form.uuid}/edit`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        แก้ไข
                      </Link>
                    )}
                    <Link
                      to={`/admin/forms/${form.uuid}/submissions`}
                      className="text-sm font-medium text-green-600 hover:text-green-800"
                    >
                      ดูคำตอบ
                    </Link>
                    <button
                      onClick={() => handleDuplicate(form.uuid)}
                      className="text-sm font-medium text-purple-600 hover:text-purple-800"
                    >
                      คัดลอก
                    </button>
                    {isOwner && (
                      <button
                        onClick={() => setCollaboratorModalForm(form)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        ผู้ร่วมแก้ไข
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(form.uuid, form.title)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Pagination */}
        {pagination.last_page > 1 && (
          <div className="flex items-center justify-between px-6 py-4 mt-6 bg-white rounded-lg shadow-md">
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

        {/* Collaborator Modal */}
        {collaboratorModalForm && (
          <CollaboratorModal
            form={collaboratorModalForm}
            onClose={() => setCollaboratorModalForm(null)}
            onUpdate={() => loadForms()}
          />
        )}
      </div>
    </div>
  )
}

export default FormsList