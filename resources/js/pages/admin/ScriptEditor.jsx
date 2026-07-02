import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

const ScriptEditor = () => {
  const navigate = useNavigate()
  const { uuid } = useParams()

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(null)
  const [scriptContent, setScriptContent] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [publishedAt, setPublishedAt] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [authReady, setAuthReady] = useState(false)

  // Setup CSRF token and authentication
  useEffect(() => {
    const setupAuth = async () => {
      try {
        // Get CSRF token from meta tag
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
        if (csrfToken) {
          axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        }

        // Set credentials for cookie-based auth
        axios.defaults.withCredentials = true
        axios.defaults.withXSRFToken = true

        setAuthReady(true)
      } catch (error) {
        console.error('[ScriptEditor] Auth setup error:', error)
        toast.error("ไม่สามารถตั้งค่าการตรวจสอบได้")
      }
    }

    setupAuth()
  }, [])

  // Load form data after auth is ready
  useEffect(() => {
    if (authReady) {
      loadForm()
    }
  }, [uuid, authReady])

  // Template scripts for quick start
  const templates = {
    simple: `// แบบฟอร์มอย่างง่าย
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const SimpleForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post('/api/forms/\${uuid}/submit', {
        responses: formData,
        respondent_name: formData.name,
        respondent_email: formData.email,
        respondent_phone: formData.phone
      })
      toast.success("ส่งแบบฟอร์มสำเร็จ")
      setFormData({ name: "", email: "", phone: "" })
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">แบบฟอร์มลงทะเบียน</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "กำลังบันทึก..." : "ส่งแบบฟอร์ม"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SimpleForm
`,
    multiSection: `// แบบฟอร์มหลายหน้า
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const MultiSectionForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    message: ""
  })

  const steps = [
    { title: "ข้อมูลส่วนตัว", icon: "👤" },
    { title: "ข้อมูลการทำงาน", icon: "💼" },
    { title: "ข้อความ", icon: "💡" }
  ]

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post('/api/forms/\${uuid}/submit', {
        responses: formData,
        respondent_name: formData.name,
        respondent_email: formData.email
      })
      toast.success("ส่งแบบฟอร์มสำเร็จ")
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={\`w-12 h-12 rounded-full flex items-center justify-center text-xl \${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }\`}>
                  {step.icon}
                </div>
                <span className={\`ml-2 text-sm font-medium \${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }\`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={\`w-16 h-1 mx-2 \${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }\`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">👤 ข้อมูลส่วนตัว</h2>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">💼 ข้อมูลการทำงาน</h2>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  หน่วยงาน
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">เลือกหน่วยงาน</option>
                  <option value="คณะครุศาสตร์">คณะครุศาสตร์</option>
                  <option value="คณะมนุษยศาสตร์">คณะมนุษยศาสตร์</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">💡 ข้อความ</h2>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  ข้อความเพิ่มเติม
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              ← ย้อนกลับ
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                ต่อไป →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {loading ? "กำลังบันทึก..." : "ส่งแบบฟอร์ม"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default MultiSectionForm
`,
    withValidation: `// แบบฟอร์มพร้อม Validation
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const FormWithValidation = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    department: ""
  })

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = "กรุณากรอกชื่อ"
    
    if (!formData.email.trim()) {
      newErrors.email = "กรุณากรอกอีเมล"
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "กรุณากรอกเบอร์โทร"
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "เบอร์โทรต้องมี 10 หลัก"
    }
    
    if (formData.age && (formData.age < 18 || formData.age > 100)) {
      newErrors.age = "อายุต้องอยู่ระหว่าง 18-100"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) {
      toast.error("กรุณากรอกข้อมูลให้ถูกต้อง")
      return
    }
    
    setLoading(true)
    
    try {
      await axios.post('/api/forms/\${uuid}/submit', {
        responses: formData,
        respondent_name: formData.name,
        respondent_email: formData.email,
        respondent_phone: formData.phone
      })
      toast.success("ส่งแบบฟอร์มสำเร็จ")
      setFormData({ name: "", email: "", phone: "", age: "", department: "" })
      setErrors({})
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" })
    }
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">แบบฟอร์มพร้อม Validation</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                ชื่อ-นามสกุล *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={\`w-full px-4 py-2 border rounded-lg \${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }\`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                อีเมล *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={\`w-full px-4 py-2 border rounded-lg \${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }\`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                เบอร์โทรศัพท์ *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={\`w-full px-4 py-2 border rounded-lg \${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }\`}
                placeholder="0812345678"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "กำลังบันทึก..." : "ส่งแบบฟอร์ม"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormWithValidation
`
  }

  const loadForm = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/forms/${uuid}`)
      const formData = response.data.data

      setForm(formData)
      setTitle(formData.title || "")
      setDescription(formData.description || "")
      setPublishedAt(formData.published_at ? formData.published_at.slice(0, 16) : "")
      setExpiresAt(formData.expires_at ? formData.expires_at.slice(0, 16) : "")
      setIsActive(formData.is_active || false)

      // ตรวจสอบว่าเป็น script-based form หรือไม่
      if (formData.form_type !== 'script') {
        // ถ้าไม่ใช่ script-based form ให้แสดง warning และเสนอให้เปลี่ยน
        console.warn('[ScriptEditor] This is not a script-based form. Current type:', formData.form_type)

        // โหลด script ว่างเพื่อให้ผู้ใช้เริ่มเขียนใหม่ได้
        setScriptContent("")

        // แสดง notification
        toast.error("นี่ไม่ใช่ Script-based form\nกรุณาเปลี่ยนเป็น Script Editor หรือสร้าง form ใหม่", {
          duration: 5000
        })
      } else {
        // เป็น script-based form โหลด script content
        setScriptContent(formData.script_content || "")
      }
    } catch (error) {
      console.error("[ScriptEditor] Error loading form:", error)
      if (error.response?.status === 403 || error.response?.status === 401) {
        toast.error("ไม่ได้รับอนุญาต - กรุณาล็อกอินใหม่")
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else if (error.response?.status === 404) {
        toast.error("ไม่พบแบบฟอร์ม")
        navigate("/admin/forms")
      } else {
        toast.error("เกิดข้อผิดพลาดในการโหลดแบบฟอร์ม")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSaveFormInfo = async () => {
    if (!title.trim()) {
      toast.error("กรุณากรอกชื่อแบบฟอร์ม")
      return
    }

    setSaving(true)
    try {
      console.log('[ScriptEditor] Saving form info:', {
        title,
        description,
        published_at: publishedAt,
        expires_at: expiresAt,
        is_active: isActive
      })

      // ใช้ POST แทน PUT เพื่อหลีกเลี่ยงปัญหา CSRF
      const response = await axios.post(`/forms/${uuid}`, {
        _method: 'PUT',  // Laravel method spoofing
        title: title,
        description: description,
        published_at: publishedAt || null,
        expires_at: expiresAt || null,
        is_active: isActive,
      })

      console.log('[ScriptEditor] Form info saved:', response.data)
      toast.success("บันทึกข้อมูลแบบฟอร์มสำเร็จ")

      // Reload form data
      const formData = await axios.get(`/forms/${uuid}`)
      setForm(formData.data.data)
    } catch (error) {
      console.error("[ScriptEditor] Error saving form info:", error)
      console.error("[ScriptEditor] Error response:", error.response)

      let errorMessage = "ไม่สามารถบันทึกข้อมูลได้"

      if (error.response?.status === 403 || error.response?.status === 401) {
        errorMessage = "ไม่ได้รับอนุญาต - กรุณาล็อกอินใหม่"
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }

      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    if (!scriptContent.trim()) {
      toast.error("Script content cannot be empty")
      return
    }

    if (!title.trim()) {
      toast.error("กรุณากรอกชื่อแบบฟอร์ม")
      return
    }

    setSaving(true)
    try {
      // ถ้ายังไม่มี form หรือเป็น form ใหม่ ให้สร้างก่อน
      if (!form || !form.uuid) {
        const createResponse = await axios.post('/forms', {
          title: title,
          description: description,
          form_type: 'script',
          script_content: scriptContent,
          is_active: isActive,
          published_at: publishedAt || null,
          expires_at: expiresAt || null,
        })

        toast.success("สร้างแบบฟอร์มสำเร็จ")
        setForm(createResponse.data.data)

        // Redirect to edit page
        setTimeout(() => {
          navigate(`/admin/forms/${createResponse.data.data.uuid}/script`)
        }, 1000)
      } else {
        // Update existing form
        await axios.post(`/forms/${uuid}/script`, {
          script_content: scriptContent
        })

        toast.success("บันทึก script สำเร็จ")
      }
    } catch (error) {
      console.error("Error saving script:", error)
      const errorMessage = error.response?.data?.message || error.response?.data?.errors
        ? Object.values(error.response.data.errors)[0]?.[0]
        : "ไม่สามารถบันทึก script ได้"
      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleLoadTemplate = (templateKey) => {
    setScriptContent(templates[templateKey])
    toast.success("โหลด template สำเร็จ")
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  const handleSharePublicLink = () => {
    if (!uuid) {
      toast.error("กรุณาบันทึกแบบฟอร์มก่อนแชร์")
      return
    }
    const publicUrl = `${window.location.origin}/forms/${uuid}`
    navigator.clipboard.writeText(publicUrl).then(() => {
      toast.success("คัดลอกลิงก์สาธารณะแล้ว")
    }).catch(() => {
      toast.error("ไม่สามารถคัดลอกลิงก์ได้")
    })
  }

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error("กรุณากรอกชื่อแบบฟอร์ม")
      return
    }

    setSaving(true)
    try {
      await axios.post(`/forms/${uuid}/publish`, {
        published_at: new Date().toISOString(),
      })

      setIsActive(true)
      toast.success("เผยแพร่แบบฟอร์มสำเร็จ")

      // Reload form data
      const response = await axios.get(`/forms/${uuid}`)
      setForm(response.data.data)
    } catch (error) {
      console.error("Error publishing form:", error)
      toast.error(error.response?.data?.message || "ไม่สามารถเผยแพร่แบบฟอร์มได้")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Warning Banner - Show when form is not script-based */}
        {form && form.form_type !== 'script' && (
          <div className="p-4 mb-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">
                  ⚠️ นี่ไม่ใช่ Script-based Form
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  แบบฟอร์มนี้ใช้ <strong>Schema Builder</strong> ไม่ใช่ Script Editor
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/admin/forms/${uuid}/edit`)}
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    ✏️ ไปหน้า Schema Editor
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm('ต้องการเปลี่ยนเป็น Script-based form หรือไม่?\n\nคุณจะต้องเขียน React component เอง')) {
                        setSaving(true)
                        try {
                          await axios.post(`/forms/${uuid}/script`, {
                            script_content: templates.simple
                          })
                          toast.success("เปลี่ยนเป็น Script-based form แล้ว")
                          const response = await axios.get(`/forms/${uuid}`)
                          setForm(response.data.data)
                        } catch (error) {
                          toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด")
                        } finally {
                          setSaving(false)
                        }
                      }
                    }}
                    disabled={saving}
                    className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                  >
                    🔄 เปลี่ยนเป็น Script-based Form
                  </button>
                </div>
              </div>
              <button
                onClick={() => navigate("/admin/forms")}
                className="text-yellow-600 hover:text-yellow-800"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {form ? 'แก้ไข Script' : 'สร้างแบบฟอร์มใหม่ (Script)'}
              </h1>

              {/* Form Title Input */}
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ชื่อแบบฟอร์ม"
                  className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {form && (
                  <>
                    <span className={`px-3 py-1 text-xs rounded-full ${form.form_type === 'script'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                      }`}>
                      {form.form_type === 'script' ? '📝 Script' : '📋 Schema'}
                    </span>
                    <span className={`px-3 py-1 text-xs rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {isActive ? '✓ เผยแพร่' : '✗ ยังไม่เผยแพร่'}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {form && (
                <>
                  <button
                    onClick={handleSharePublicLink}
                    className="px-4 py-2 text-sm text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
                  >
                    🔗 แชร์ลิงก์
                  </button>
                  {!isActive && (
                    <button
                      onClick={handlePublish}
                      disabled={saving}
                      className="px-4 py-2 text-sm text-white transition bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                    >
                      📢 เผยแพร่
                    </button>
                  )}
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="px-4 py-2 text-sm text-white transition bg-gray-600 rounded-lg hover:bg-gray-700"
                  >
                    ⚙️ ตั้งค่า
                  </button>
                </>
              )}
              <button
                onClick={handlePreview}
                className="px-4 py-2 text-sm text-white transition bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                👁️ Preview
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !scriptContent.trim() || !title.trim()}
                className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {saving ? "กำลังบันทึก..." : form ? '💾 บันทึก Script' : '➕ สร้าง'}
              </button>
              <button
                onClick={() => navigate("/admin/forms")}
                className="px-4 py-2 text-sm text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                ← กลับ
              </button>
            </div>
          </div>

          {/* Form Settings Panel */}
          {showSettings && form && (
            <div className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">📋 ตั้งค่าแบบฟอร์ม</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    คำอธิบาย
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="คำอธิบายแบบฟอร์ม"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    วันที่เริ่มเผยแพร่
                  </label>
                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    วันที่สิ้นสุด
                  </label>
                  <input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">เผยแพร่ (Active)</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSaveFormInfo}
                  disabled={saving}
                  className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {saving ? "กำลังบันทึก..." : "💾 บันทึกการตั้งค่า"}
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  ปิด
                </button>
              </div>
            </div>
          )}

          {/* Template Buttons */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm text-gray-600 self-center">Templates:</span>
            <button
              onClick={() => handleLoadTemplate('simple')}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
            >
              📝 แบบฟอร์มอย่างง่าย
            </button>
            <button
              onClick={() => handleLoadTemplate('multiSection')}
              className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
            >
              📑 แบบฟอร์มหลายหน้า
            </button>
            <button
              onClick={() => handleLoadTemplate('withValidation')}
              className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
            >
              ✅ แบบฟอร์มพร้อม Validation
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700">Script Editor</h3>
              <span className="text-xs text-gray-500">React JSX Component</span>
            </div>
            <div className="relative">
              <textarea
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                className="w-full h-[600px] p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
                spellCheck="false"
                placeholder="// Write your React component here..."
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">📖 วิธีใช้</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong className="text-gray-900">1.</strong> เลือก Template ด้านบน หรือ เขียน script เอง
            </p>
            <p>
              <strong className="text-gray-900">2.</strong> แก้ไข React component ตามต้องการ
            </p>
            <p>
              <strong className="text-gray-900">3.</strong> กด <strong className="text-blue-600">Preview</strong> เพื่อดูตัวอย่าง
            </p>
            <p>
              <strong className="text-gray-900">4.</strong> กด <strong className="text-blue-600">บันทึก</strong> เพื่อบันทึก script
            </p>
            <div className="p-4 mt-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800">
                <strong>⚠️ หมายเหตุ:</strong> Script ต้อง export default React component และใช้ axios.post('/api/forms/{uuid}/submit') สำหรับการส่งแบบฟอร์ม
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-4 bg-gray-100 rounded">
                <p className="text-sm text-gray-600 mb-2">
                  ⚠️ Preview แสดงเฉพาะโครงสร้าง ไม่สามารถทดสอบการส่งข้อมูลได้
                </p>
                <pre className="text-xs text-gray-800 overflow-auto whitespace-pre-wrap">
                  {scriptContent}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScriptEditor
