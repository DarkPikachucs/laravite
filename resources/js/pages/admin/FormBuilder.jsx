import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"

const FormBuilder = () => {
  const navigate = useNavigate()
  const { uuid } = useParams()
  const isEditMode = !!uuid

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\p{L}\p{N}\-]/gu, '')
      .replace(/\-{2,}/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formType, setFormType] = useState('schema') // 'schema' or 'script'
  const [template, setTemplate] = useState('default') // 'default' or 'survey'
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    is_active: false,
    published_at: "",
    expires_at: "",
  })
  const [schema, setSchema] = useState({
    sections: [], // Array of sections, each section has { id, title, description, fields: [] }
    fields: [], // Keep flat structure for backward compatibility, but also organize by section
    settings: {
      show_progress_bar: true,
      require_login: false,
      allow_multiple_submissions: true,
      show_confirmation: true,
      confirmation_message: "ขอบคุณที่ส่งแบบฟอร์ม",
      collect_email: false,
      collect_phone: false,
      collect_name: false,
      theme_color: "#3B82F6",
      font_family: "Sarabun",
    }
  })
  const [selectedField, setSelectedField] = useState(null)
  const [showFieldSettings, setShowFieldSettings] = useState(false)
  const [selectedSection, setSelectedSection] = useState(null)
  const [showSectionSettings, setShowSectionSettings] = useState(false)
  const [showFormSettings, setShowFormSettings] = useState(false)

  const fieldTypes = [
    { type: "text", label: "ข้อความสั้น", icon: "📝" },
    { type: "textarea", label: "ข้อความยาว", icon: "📄" },
    { type: "number", label: "ตัวเลข", icon: "🔢" },
    { type: "email", label: "อีเมล", icon: "📧" },
    { type: "tel", label: "เบอร์โทร", icon: "📞" },
    { type: "date", label: "วันที่", icon: "📅" },
    { type: "datetime-local", label: "วันที่และเวลา", icon: "🕐" },
    { type: "select", label: "ตัวเลือกเดียว (Dropdown)", icon: "🔽" },
    { type: "radio", label: "ตัวเลือกเดียว (Radio)", icon: "⚪" },
    { type: "checkbox", label: "หลายตัวเลือก (Checkbox)", icon: "☑️" },
    { type: "url", label: "URL", icon: "🔗" },
    { type: "file", label: "ไฟล์", icon: "📎" },
    { type: "grid", label: "ตารางตัวเลือกหลายข้อ (Grid)", icon: "📊" },
  ]

  useEffect(() => {
    // Ensure token is set in axios headers
    const token = localStorage.getItem('currentToken')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      console.log('[FormBuilder] Token set in axios headers')
    } else {
      console.warn('[FormBuilder] No token found in localStorage')
    }

    if (isEditMode) {
      loadForm()
    }
  }, [uuid])

  const loadForm = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('currentToken')
      console.log('[FormBuilder] Loading form:', uuid)
      console.log('[FormBuilder] Token exists:', !!token)
      console.log('[FormBuilder] Auth header:', axios.defaults.headers.common['Authorization'])

      const response = await axios.get(`/forms/${uuid}`)
      console.log('[FormBuilder] Response:', response.data)
      const form = response.data.data

      setFormType(form.form_type || 'schema')
      setTemplate(form.template || 'default') // Load template
      setFormData({
        title: form.title,
        slug: form.slug || slugify(form.title),
        slug_manually_set: !!form.slug,
        description: form.description,
        is_active: form.is_active,
        published_at: form.published_at ? form.published_at.slice(0, 16) : "",
        expires_at: form.expires_at ? form.expires_at.slice(0, 16) : "",
      })

      // If script-based form, redirect to script editor
      if (form.form_type === 'script') {
        toast.info("เปลี่ยนเป็นแก้ไข Script Editor")
        navigate(`/admin/forms/${uuid}/script`)
        return
      }

      // Load schema with sections support
      // Handle both JSON string and object
      let loadedSchema
      if (typeof form.schema === 'string') {
        try {
          loadedSchema = JSON.parse(form.schema)
        } catch (e) {
          console.error('[FormBuilder] Failed to parse schema JSON:', e)
          loadedSchema = { fields: [], sections: [], settings: {} }
        }
      } else {
        loadedSchema = form.schema || { fields: [], settings: {} }
      }

      // Ensure sections exist
      if (!loadedSchema.sections || !Array.isArray(loadedSchema.sections)) {
        // Backward compatibility: if no sections, create a default section
        loadedSchema.sections = (loadedSchema.fields && loadedSchema.fields.length > 0)
          ? [{ id: 'default-section', title: '', description: '', fields: loadedSchema.fields.map(f => f.id) }]
          : []
      }

      // Ensure settings exist
      if (!loadedSchema.settings) {
        loadedSchema.settings = {}
      }

      console.log('[FormBuilder] Loaded schema:', loadedSchema)
      setSchema(loadedSchema)
    } catch (error) {
      console.error("Error loading form:", error)
      console.error("Error status:", error.response?.status)
      console.error("Error data:", error.response?.data)
      toast.error(error.response?.data?.message || "ไม่สามารถโหลดแบบฟอร์มได้")
      navigate("/admin/forms")
    } finally {
      setLoading(false)
    }
  }

  const addField = (type, sectionId = null) => {
    const newField = {
      id: uuidv4(),
      type,
      label: `ฟิลด์ใหม่`,
      placeholder: "",
      required: false,
      options: type === "select" || type === "radio" || type === "checkbox" ? ["ตัวเลือกที่ 1"] : [],
      rows: type === "grid" ? ["แถวที่ 1"] : [],
      columns: type === "grid" ? ["ตัวเลือกที่ 1"] : [],
      hasOther: false,
      otherLabel: "อื่นๆ",
      min: null,
      max: null,
      validation_message: "",
      help_text: "",
    }

    setSchema({
      ...schema,
      fields: [...schema.fields, newField],
      sections: sectionId
        ? schema.sections.map(s =>
          s.id === sectionId
            ? { ...s, fields: [...(s.fields || []), newField.id] }
            : s
        )
        : schema.sections.length > 0
          ? schema.sections.map((s, idx) => idx === 0 ? { ...s, fields: [...(s.fields || []), newField.id] } : s)
          : schema.sections
    })
    setSelectedField(newField)
    setShowFieldSettings(true)
  }

  const updateField = (fieldId, updates) => {
    setSchema({
      ...schema,
      fields: schema.fields.map(f =>
        f.id === fieldId ? { ...f, ...updates } : f
      ),
    })
    if (selectedField?.id === fieldId) {
      setSelectedField({ ...selectedField, ...updates })
    }
  }

  const updateSetting = (key, value) => {
    setSchema({
      ...schema,
      settings: {
        ...schema.settings,
        [key]: value,
      },
    })
  }

  const deleteField = (fieldId) => {
    setSchema({
      ...schema,
      fields: schema.fields.filter(f => f.id !== fieldId),
    })
    if (selectedField?.id === fieldId) {
      setSelectedField(null)
      setShowFieldSettings(false)
    }
    toast.success("ลบฟิลด์แล้ว")
  }

  const duplicateField = (fieldId) => {
    const fieldToDuplicate = schema.fields.find(f => f.id === fieldId)
    if (!fieldToDuplicate) return

    const newField = {
      ...fieldToDuplicate,
      id: uuidv4(),
      label: `${fieldToDuplicate.label} (copy)`,
    }

    const index = schema.fields.findIndex(f => f.id === fieldId)
    const newFields = [...schema.fields]
    newFields.splice(index + 1, 0, newField)

    setSchema({
      ...schema,
      fields: newFields,
    })
    toast.success("คัดลอกฟิลด์แล้ว")
  }

  const moveField = (index, direction) => {
    const newFields = [...schema.fields]
    if (direction === "up" && index > 0) {
      [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]]
    } else if (direction === "down" && index < newFields.length - 1) {
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]]
    }
    setSchema({ ...schema, fields: newFields })
  }

  // Section Management Functions
  const addSection = () => {
    const newSection = {
      id: uuidv4(),
      title: `ส่วนที่ ${schema.sections.length + 1}`,
      description: "",
      fields: [],
    }
    setSchema({
      ...schema,
      sections: [...schema.sections, newSection],
    })
    setSelectedSection(newSection)
    setShowSectionSettings(true)
    toast.success("เพิ่มส่วนใหม่แล้ว")
  }

  const updateSection = (sectionId, updates) => {
    setSchema({
      ...schema,
      sections: schema.sections.map(s =>
        s.id === sectionId ? { ...s, ...updates } : s
      ),
    })
    if (selectedSection?.id === sectionId) {
      setSelectedSection({ ...selectedSection, ...updates })
    }
  }

  const deleteSection = (sectionId) => {
    const section = schema.sections.find(s => s.id === sectionId)
    if (!section) return

    // Remove fields in this section
    const fieldsToRemove = section.fields || []
    setSchema({
      ...schema,
      sections: schema.sections.filter(s => s.id !== sectionId),
      fields: schema.fields.filter(f => !fieldsToRemove.includes(f.id)),
    })

    if (selectedSection?.id === sectionId) {
      setSelectedSection(null)
      setShowSectionSettings(false)
    }
    toast.success("ลบส่วนแล้ว")
  }

  const duplicateSection = (sectionId) => {
    const sectionToDuplicate = schema.sections.find(s => s.id === sectionId)
    if (!sectionToDuplicate) return

    // Duplicate all fields in the section
    const fieldIdMap = {}
    const newFields = []
      ; (sectionToDuplicate.fields || []).forEach(fieldId => {
        const field = schema.fields.find(f => f.id === fieldId)
        if (field) {
          const newFieldId = uuidv4()
          fieldIdMap[fieldId] = newFieldId
          newFields.push({
            ...field,
            id: newFieldId,
            label: `${field.label} (copy)`,
          })
        }
      })

    const newSection = {
      ...sectionToDuplicate,
      id: uuidv4(),
      title: `${sectionToDuplicate.title} (copy)`,
      fields: newFields.map(f => f.id),
    }

    const index = schema.sections.findIndex(s => s.id === sectionId)
    const newSections = [...schema.sections]
    newSections.splice(index + 1, 0, newSection)

    setSchema({
      ...schema,
      sections: newSections,
      fields: [...schema.fields, ...newFields],
    })
    toast.success("คัดลอกส่วนแล้ว")
  }

  const moveSection = (index, direction) => {
    const newSections = [...schema.sections]
    if (direction === "up" && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]]
    } else if (direction === "down" && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]
    }
    setSchema({ ...schema, sections: newSections })
  }

  const moveFieldToSection = (fieldId, fromSectionId, toSectionId) => {
    if (fromSectionId === toSectionId) return

    setSchema({
      ...schema,
      sections: schema.sections.map(s => {
        if (s.id === fromSectionId) {
          return { ...s, fields: (s.fields || []).filter(fid => fid !== fieldId) }
        }
        if (s.id === toSectionId) {
          return { ...s, fields: [...(s.fields || []), fieldId] }
        }
        return s
      }),
    })
  }

  const addOption = (fieldId) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return

    const newOptions = [...(field.options || []), `ตัวเลือกที่ ${field.options.length + 1}`]
    updateField(fieldId, { options: newOptions })
  }

  const updateOption = (fieldId, optionIndex, value) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return

    const newOptions = [...field.options]
    newOptions[optionIndex] = value
    updateField(fieldId, { options: newOptions })
  }

  const deleteOption = (fieldId, optionIndex) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return

    const newOptions = field.options.filter((_, i) => i !== optionIndex)
    updateField(fieldId, { options: newOptions })
  }

  // Grid row/column helpers
  const getRowType = (row) => typeof row === 'string' ? 'row' : (row?.type || 'row')
  const getRowLabel = (row) => typeof row === 'string' ? row : (row?.label || '')
  const isTitleRow = (row) => getRowType(row) === 'title'

  const addGridRow = (fieldId) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return
    const count = (field.rows || []).filter(r => getRowType(r) === 'row').length + 1
    updateField(fieldId, { rows: [...(field.rows || []), { type: 'row', label: `แถวที่ ${count}` }] })
  }

  const addGridTitle = (fieldId, afterIndex) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return
    const newRows = [...(field.rows || [])]
    newRows.splice(afterIndex + 1, 0, { type: 'title', label: 'หัวข้อ' })
    updateField(fieldId, { rows: newRows })
  }

  const toggleGridRowType = (fieldId, index) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return
    const newRows = [...(field.rows || [])]
    const row = newRows[index]
    if (isTitleRow(row)) {
      newRows[index] = { type: 'row', label: getRowLabel(row) }
    } else {
      newRows[index] = { type: 'title', label: getRowLabel(row) }
    }
    updateField(fieldId, { rows: newRows })
  }

  const updateGridRow = (fieldId, index, value) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return
    const newRows = [...(field.rows || [])]
    const row = newRows[index]
    newRows[index] = typeof row === 'string' ? value : { ...row, label: value }
    updateField(fieldId, { rows: newRows })
  }

  const deleteGridRow = (fieldId, index) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return
    updateField(fieldId, { rows: (field.rows || []).filter((_, i) => i !== index) })
  }

  const addGridColumn = (fieldId) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return
    updateField(fieldId, { columns: [...(field.columns || []), `ตัวเลือกที่ ${(field.columns || []).length + 1}`] })
  }

  const updateGridColumn = (fieldId, index, value) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return
    const newColumns = [...(field.columns || [])]
    newColumns[index] = value
    updateField(fieldId, { columns: newColumns })
  }

  const deleteGridColumn = (fieldId, index) => {
    const field = schema.fields.find(f => f.id === fieldId)
    if (!field) return
    updateField(fieldId, { columns: (field.columns || []).filter((_, i) => i !== index) })
  }

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("กรุณากรอกชื่อแบบฟอร์ม")
      return
    }

    if (schema.fields.length === 0) {
      toast.error("กรุณาเพิ่มฟิลด์อย่างน้อย 1 ฟิลด์")
      return
    }

    setSaving(true)
    try {
      // Setup CSRF token
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      if (csrfToken) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      }

      // Enable credentials for cookie-based auth
      axios.defaults.withCredentials = true
      axios.defaults.withXSRFToken = true

      const payload = {
        title: formData.title,
        slug: formData.slug || null,
        description: formData.description,
        form_type: formType,
        template: template,
        schema: JSON.stringify(schema),
        settings: JSON.stringify(schema.settings),
        is_active: formData.is_active,
        published_at: formData.published_at || null,
        expires_at: formData.expires_at || null,
      }

      console.log('[FormBuilder Save] formType:', formType)
      console.log('[FormBuilder Save] Sending payload:', payload)

      if (isEditMode) {
        console.log('[FormBuilder Save] POST (PUT spoofing) request to:', `/forms/${uuid}`)

        // ใช้ POST แทน PUT เพื่อหลีกเลี่ยงปัญหา CSRF
        const response = await axios.post(`/forms/${uuid}`, {
          _method: 'PUT',
          ...payload
        })

        console.log('[FormBuilder Save] Response:', response)

        // ถ้าเปลี่ยนเป็น script type ให้ redirect ไป script editor
        if (formType === 'script' && response.data.data) {
          toast.success("เปลี่ยนเป็น Script Editor แล้ว")
          setTimeout(() => {
            navigate(`/admin/forms/${uuid}/script`)
          }, 1000)
          return
        }

        toast.success("อัปเดตแบบฟอร์มสำเร็จ")
      } else {
        const response = await axios.post("/forms", payload)
        toast.success("สร้างแบบฟอร์มสำเร็จ")
        navigate(`/admin/forms/${response.data.data.uuid}/edit`)
      }
    } catch (error) {
      console.error("[FormBuilder] Error saving form:", error)
      console.error("[FormBuilder] Error status:", error.response?.status)
      console.error("[FormBuilder] Error data:", error.response?.data)

      let errorMessage = "ไม่สามารถบันทึกแบบฟอร์มได้"

      if (error.response?.status === 401 || error.response?.status === 403) {
        errorMessage = "ไม่ได้รับอนุญาต - กรุณาล็อกอินใหม่"
        // Clear session
        localStorage.removeItem('currentToken')
        localStorage.removeItem('user')
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

  const handlePublish = async () => {
    if (!formData.title.trim() || schema.fields.length === 0) {
      toast.error("กรุณากรอกข้อมูลแบบฟอร์มให้ครบถ้วน")
      return
    }

    setSaving(true)
    try {
      await axios.post(`/forms/${uuid}/publish`, {
        published_at: new Date().toISOString(),
      })
      toast.success("เผยแพร่แบบฟอร์มสำเร็จ")
      setFormData({ ...formData, is_active: true })
    } catch (error) {
      console.error("Error publishing form:", error)
      toast.error("ไม่สามารถเผยแพร่แบบฟอร์มได้")
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    window.open(`/forms/${uuid || "preview"}`, "_blank")
  }

  const handleSharePublicLink = () => {
    if (!uuid) {
      toast.error("กรุณาบันทึกแบบฟอร์มก่อนแชร์")
      return
    }
    const publicUrl = `${window.location.origin}/forms/${uuid}`

    // Use Clipboard API with fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(publicUrl).then(() => {
        toast.success("คัดลอกลิงก์สาธารณะแล้ว")
      }).catch(() => {
        // Fallback: use execCommand
        fallbackCopyToClipboard(publicUrl)
      })
    } else {
      // Fallback for browsers without Clipboard API
      fallbackCopyToClipboard(publicUrl)
    }
  }

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      toast.success("คัดลอกลิงก์สาธารณะแล้ว")
    } catch (err) {
      // Final fallback: show URL in prompt
      window.prompt("กด Ctrl+C เพื่อคัดลอกลิงก์:", text)
      toast.error("ไม่สามารถคัดลอกลิงก์ได้อัตโนมัติ")
    }
    document.body.removeChild(textArea)
  }

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">กำลังโหลดแบบฟอร์ม...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isEditMode ? "แก้ไขแบบฟอร์ม" : "สร้างแบบฟอร์มใหม่"}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">โหมด:</span>
                <button
                  onClick={() => {
                    if (formType === 'schema') {
                      if (confirm('ต้องการเปลี่ยนเป็น Script Editor หรือไม่?\n\nคุณจะต้องเขียน React component เอง')) {
                        setFormType('script')
                        navigate(`/admin/forms/${uuid}/script`)
                      }
                    }
                  }}
                  className={`px-3 py-1 text-xs rounded-full transition ${formType === 'schema'
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                    }`}
                >
                  📋 Schema Builder
                </button>
                <button
                  onClick={() => {
                    if (formType === 'script') {
                      if (confirm('ต้องการเปลี่ยนเป็น Schema Builder หรือไม่?\n\nScript จะถูกเก็บไว้ แต่คุณจะไม่แก้ไขในที่นี้')) {
                        setFormType('schema')
                      }
                    } else {
                      if (confirm('ต้องการเปลี่ยนเป็น Script Editor หรือไม่?\n\nคุณจะต้องเขียน React component เอง')) {
                        setFormType('script')
                        navigate(`/admin/forms/${uuid}/script`)
                      }
                    }
                  }}
                  disabled={!isEditMode}
                  className={`px-3 py-1 text-xs rounded-full transition disabled:opacity-50 ${formType === 'script'
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                    }`}
                >
                  📝 Script Editor
                </button>
              </div>
              {formType === 'schema' && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">Template:</span>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="px-3 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="default">Default (ทั่วไป)</option>
                    <option value="survey">Survey (แบบสอบถาม)</option>
                  </select>
                  {template === 'survey' && (
                    <span className="text-xs text-green-600">
                      ✓ ใช้ SurveyFormRenderer
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSharePublicLink}
                disabled={!isEditMode}
                className="px-4 py-2 text-sm text-white transition bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
              >
                🔗 แชร์ลิงก์
              </button>
              <button
                onClick={handlePreview}
                className="px-4 py-2 text-sm text-white transition bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                👁️ พรีวิว
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {saving ? "กำลังบันทึก..." : isEditMode ? "บันทึก" : "สร้าง"}
              </button>
              <button
                onClick={() => setShowFormSettings(true)}
                className="px-4 py-2 text-sm text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
              >
                ⚙️ ตั้งค่าฟอร์ม
              </button>
              {isEditMode && !formData.is_active && (
                <button
                  onClick={handlePublish}
                  disabled={saving}
                  className="px-4 py-2 text-sm text-white transition bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  📢 เผยแพร่
                </button>
              )}
            </div>
          </div>

          {/* Form Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                ชื่อแบบฟอร์ม *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value
                  const updates = { title }
                  if (!isEditMode || !formData.slug_manually_set) {
                    updates.slug = slugify(title)
                  }
                  setFormData({ ...formData, ...updates })
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="เช่น แบบฟอร์มลงทะเบียน"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                คำอธิบาย
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="คำอธิบายแบบฟอร์ม"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                ลิงก์แบบฟอร์ม
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">/f/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value, slug_manually_set: true })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="my-form-slug"
                />
              </div>
              {formData.slug && (
                <p className="mt-1 text-xs text-blue-600">
                  🔗 {window.location.origin}/f/{formData.slug}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                วันที่เริ่ม
              </label>
              <input
                type="datetime-local"
                value={formData.published_at}
                onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                วันที่สิ้นสุด
              </label>
              <input
                type="datetime-local"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Field Types */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-white rounded-lg shadow-md top-4">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                เพิ่มฟิลด์
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {fieldTypes.map((fieldType) => (
                  <button
                    key={fieldType.type}
                    onClick={() => addField(fieldType.type)}
                    className="p-3 text-left transition border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50"
                  >
                    <span className="text-xl">{fieldType.icon}</span>
                    <p className="mt-1 text-xs text-gray-600">{fieldType.label}</p>
                  </button>
                ))}
              </div>

              {/* Section Management */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                  จัดการส่วน
                </h4>
                <button
                  onClick={addSection}
                  className="w-full py-3 text-left transition border-2 border-gray-300 border-dashed rounded-lg hover:border-green-500 hover:bg-green-50"
                >
                  <span className="text-lg">📁</span>
                  <span className="ml-2 text-sm text-gray-600">+ เพิ่มส่วนใหม่</span>
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column - Form Fields */}
          <div className="space-y-4 lg:col-span-2">
            {schema.sections.length === 0 && schema.fields.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg shadow-md">
                <p className="text-lg text-gray-500">ยังไม่มีฟิลด์</p>
                <p className="mt-2 text-sm text-gray-400">เลือกประเภทฟิลด์จากด้านซ้ายเพื่อเพิ่มฟิลด์แรกของคุณ</p>
              </div>
            ) : (
              <>
                {schema.sections.length > 0 ? (
                  // Render with sections
                  schema.sections.map((section, sectionIndex) => (
                    <div
                      key={section.id}
                      className={`bg-white rounded-lg shadow-md overflow-hidden transition border-2 ${selectedSection?.id === section.id ? "border-green-500" : "border-transparent hover:border-gray-300"}`}
                    >
                      {/* Section Header */}
                      <div
                        onClick={() => {
                          setSelectedSection(section)
                          setShowSectionSettings(true)
                        }}
                        className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer bg-gradient-to-r from-green-50 to-emerald-50"
                      >
                        <div className="flex items-center flex-1 gap-3">
                          <span className="text-2xl">📁</span>
                          <div>
                            <h4 className="font-semibold text-gray-800">{section.title || `ส่วนที่ ${sectionIndex + 1}`}</h4>
                            {section.description && (
                              <p className="text-xs text-gray-500">{section.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => moveSection(sectionIndex, "up")}
                            disabled={sectionIndex === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                            title="ย้ายขึ้น"
                          >
                            ⬆️
                          </button>
                          <button
                            onClick={() => moveSection(sectionIndex, "down")}
                            disabled={sectionIndex === schema.sections.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                            title="ย้ายลง"
                          >
                            ⬇️
                          </button>
                          <button
                            onClick={() => duplicateSection(section.id)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="คัดลอก"
                          >
                            📋
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSection(section)
                              setShowSectionSettings(true)
                            }}
                            className="p-1 text-gray-400 hover:text-green-600"
                            title="แก้ไข"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteSection(section.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="ลบ"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      {/* Section Fields */}
                      <div className="p-4 space-y-3 bg-white">
                        {(section.fields || []).length === 0 ? (
                          <div className="p-8 text-center border-2 border-gray-200 border-dashed rounded-lg">
                            <p className="text-sm text-gray-500">ยังไม่มีฟิลด์ในส่วนนี้</p>
                            <button
                              onClick={() => addField('text', section.id)}
                              className="px-3 py-1 mt-2 text-xs text-blue-600 transition border border-blue-300 rounded hover:bg-blue-50"
                            >
                              + เพิ่มฟิลด์แรก
                            </button>
                          </div>
                        ) : (
                          (section.fields || []).map((fieldId) => {
                            const field = schema?.fields?.find(f => f.id === fieldId)
                            if (!field) return null
                            const fieldIndex = schema?.fields?.findIndex(f => f.id === fieldId)
                            return (
                              <div
                                key={field.id}
                                onClick={() => {
                                  setSelectedField(field)
                                  setShowFieldSettings(true)
                                }}
                                className={`bg-gray-50 rounded-lg p-4 cursor-pointer transition border-2 ${selectedField?.id === field.id ? "border-blue-500" : "border-transparent hover:border-gray-300"}`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xl">
                                      {fieldTypes.find(t => t.type === field.type)?.icon || "📝"}
                                    </span>
                                    <div>
                                      <h5 className="font-medium text-gray-800">{field.label}</h5>
                                      <p className="text-xs text-gray-500">
                                        {fieldTypes.find(t => t.type === field.type)?.label}
                                        {field.required && <span className="ml-1 text-red-500">• จำเป็น</span>}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                    <button
                                      onClick={() => moveField(fieldIndex, "up")}
                                      disabled={fieldIndex === 0}
                                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                      ⬆️
                                    </button>
                                    <button
                                      onClick={() => moveField(fieldIndex, "down")}
                                      disabled={fieldIndex === schema.fields.length - 1}
                                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                      ⬇️
                                    </button>
                                    <button
                                      onClick={() => duplicateField(field.id)}
                                      className="p-1 text-gray-400 hover:text-blue-600"
                                    >
                                      📋
                                    </button>
                                    {/* Move to section dropdown */}
                                    <select
                                      value={section.id}
                                      onChange={(e) => moveFieldToSection(field.id, section.id, e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    >
                                      {schema.sections.map((s, idx) => (
                                        <option key={s.id} value={s.id}>
                                          ย้ายไป {s.title || `ส่วนที่ ${idx + 1}`}
                                        </option>
                                      ))}
                                    </select>
                                    <button
                                      onClick={() => deleteField(field.id)}
                                      className="p-1 text-gray-400 hover:text-red-600"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>

                                {/* Field Preview */}
                                <div className="p-2 mt-2 bg-white rounded">
                                  {field.type === "grid" ? (
                                    <div className="text-sm text-gray-500">
                                      📊 ตาราง {(field.rows || []).filter(r => getRowType(r) === 'row').length} แถว × {(field.columns || []).length} คอลัมน์{(field.rows || []).some(r => isTitleRow(r)) ? " (มีหัวข้อ)" : ""}
                                    </div>
                                  ) : field.type === "select" || field.type === "radio" || field.type === "checkbox" ? (
                                    <div className="space-y-1">
                                      {(field.options || []).slice(0, 3).map((opt, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                          {field.type === "checkbox" ? "☐" : field.type === "radio" ? "○" : "•"} {opt}
                                        </div>
                                      ))}
                                      {(field.options || []).length > 3 && (
                                        <p className="text-xs text-gray-400">+{field.options.length - 3} ตัวเลือกเพิ่มเติม</p>
                                      )}
                                      {field.hasOther && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                          {field.type === "checkbox" ? "☐" : "○"} {field.otherLabel || "อื่นๆ"} <span className="text-xs text-gray-400">(กรอกข้อความ)</span>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <input
                                      type={field.type}
                                      placeholder={field.placeholder || "ตัวอย่าง"}
                                      className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded"
                                      disabled
                                    />
                                  )}
                                </div>
                              </div>
                            )
                          })
                        )}

                        {/* Add Field Button */}
                        <div className="pt-2 mt-2 border-t border-gray-200">
                          <p className="mb-2 text-xs font-medium text-gray-500">เพิ่มฟิลด์ในส่วนนี้:</p>
                          <div className="grid grid-cols-4 gap-1">
                            {fieldTypes.slice(0, 8).map((ft) => (
                              <button
                                key={ft.type}
                                onClick={() => addField(ft.type, section.id)}
                                className="p-2 text-xs transition border border-gray-200 rounded hover:bg-blue-50 hover:border-blue-300"
                                title={ft.label}
                              >
                                {ft.icon}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Legacy view without sections (backward compatibility)
                  schema.fields.map((field, index) => (
                    <div
                      key={field.id}
                      onClick={() => {
                        setSelectedField(field)
                        setShowFieldSettings(true)
                      }}
                      className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition border-2 ${selectedField?.id === field.id ? "border-blue-500" : "border-transparent hover:border-gray-300"
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {fieldTypes.find(t => t.type === field.type)?.icon || "📝"}
                          </span>
                          <div>
                            <h4 className="font-semibold text-gray-800">{field.label}</h4>
                            <p className="text-xs text-gray-500">
                              {fieldTypes.find(t => t.type === field.type)?.label}
                              {field.required && <span className="ml-2 text-red-500">• จำเป็น</span>}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => moveField(index, "up")}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            ⬆️
                          </button>
                          <button
                            onClick={() => moveField(index, "down")}
                            disabled={index === schema.fields.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            ⬇️
                          </button>
                          <button
                            onClick={() => duplicateField(field.id)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            📋
                          </button>
                          <button
                            onClick={() => deleteField(field.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      {/* Preview of field */}
                      <div className="p-3 mt-4 rounded-lg bg-gray-50">
                        {field.type === "grid" ? (
                          <div className="text-sm text-gray-500">
                            📊 ตาราง {(field.rows || []).filter(r => getRowType(r) === 'row').length} แถว × {(field.columns || []).length} คอลัมน์{(field.rows || []).some(r => isTitleRow(r)) ? " (มีหัวข้อ)" : ""}
                          </div>
                        ) : field.type === "select" || field.type === "radio" || field.type === "checkbox" ? (
                          <div className="space-y-1">
                            {(field.options || []).slice(0, 3).map((opt, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                {field.type === "checkbox" ? "☐" : field.type === "radio" ? "○" : "•"} {opt}
                              </div>
                            ))}
                            {(field.options || []).length > 3 && (
                              <p className="text-xs text-gray-400">+{field.options.length - 3} ตัวเลือกเพิ่มเติม</p>
                            )}
                            {field.hasOther && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                {field.type === "checkbox" ? "☐" : "○"} {field.otherLabel || "อื่นๆ"} <span className="text-xs text-gray-400">(กรอกข้อความ)</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            placeholder={field.placeholder || "ตัวอย่าง"}
                            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded"
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* Field Settings Modal */}
        {showFieldSettings && selectedField && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">ตั้งค่าฟิลด์</h3>
                  <button
                    onClick={() => setShowFieldSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Label */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    ชื่อฟิลด์ *
                  </label>
                  <input
                    type="text"
                    value={selectedField.label}
                    onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Placeholder */}
                {selectedField.type !== "radio" && selectedField.type !== "checkbox" && (
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      ข้อความตัวอย่าง
                    </label>
                    <input
                      type="text"
                      value={selectedField.placeholder || ""}
                      onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="เช่น กรุณากรอก..."
                    />
                  </div>
                )}

                {/* Help Text */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    คำแนะนำ
                  </label>
                  <input
                    type="text"
                    value={selectedField.help_text || ""}
                    onChange={(e) => updateField(selectedField.id, { help_text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="คำแนะนำเพิ่มเติม"
                  />
                </div>

                {/* Required */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="required"
                    checked={selectedField.required}
                    onChange={(e) => updateField(selectedField.id, { required: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="required" className="text-sm font-medium text-gray-700">
                    จำเป็นต้องกรอก
                  </label>
                </div>

                {/* Min/Max */}
                {(selectedField.type === "number" || selectedField.type === "text" || selectedField.type === "textarea") && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        ค่าต่ำสุด
                      </label>
                      <input
                        type="number"
                        value={selectedField.min || ""}
                        onChange={(e) => updateField(selectedField.id, { min: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        ค่าสูงสุด
                      </label>
                      <input
                        type="number"
                        value={selectedField.max || ""}
                        onChange={(e) => updateField(selectedField.id, { max: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Options for select/radio/checkbox */}
                {(selectedField.type === "select" || selectedField.type === "radio" || selectedField.type === "checkbox") && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      ตัวเลือก
                    </label>
                    <div className="space-y-2">
                      {(selectedField.options || []).map((option, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(selectedField.id, index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => deleteOption(selectedField.id, index)}
                            className="px-3 py-2 text-red-600 rounded-lg hover:bg-red-50"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addOption(selectedField.id)}
                        className="w-full py-2 text-gray-500 transition border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 hover:text-blue-600"
                      >
                        + เพิ่มตัวเลือก
                      </button>
                    </div>

                    {/* Other option toggle for radio/checkbox */}
                    {(selectedField.type === "radio" || selectedField.type === "checkbox") && (
                      <div className="pt-4 mt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <input
                            type="checkbox"
                            id="hasOther"
                            checked={selectedField.hasOther || false}
                            onChange={(e) => updateField(selectedField.id, { hasOther: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="hasOther" className="text-sm font-medium text-gray-700 cursor-pointer">
                            เพิ่มตัวเลือก "อื่นๆ" และช่องกรอกข้อความ
                          </label>
                        </div>
                        {selectedField.hasOther && (
                          <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              ข้อความตัวเลือกอื่นๆ
                            </label>
                            <input
                              type="text"
                              value={selectedField.otherLabel || "อื่นๆ"}
                              onChange={(e) => updateField(selectedField.id, { otherLabel: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder="เช่น อื่นๆ (โปรดระบุ)"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Grid rows/columns for grid type */}
                {selectedField.type === "grid" && (
                  <div>
                    {/* Rows */}
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        แถว (คำถาม / หัวข้อ)
                      </label>
                      <div className="space-y-2">
                        {(selectedField.rows || []).map((row, index) => {
                          const isTitle = isTitleRow(row)
                          return (
                            <div key={index}>
                              <div className={`flex gap-2 p-2 rounded-lg ${isTitle ? 'bg-purple-50 border border-purple-200' : ''}`}>
                                <span className="flex items-center text-sm text-gray-400 w-5 shrink-0">{index + 1}.</span>
                                <input
                                  type="text"
                                  value={getRowLabel(row)}
                                  onChange={(e) => updateGridRow(selectedField.id, index, e.target.value)}
                                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isTitle ? 'border-purple-300 font-bold text-purple-800 bg-purple-50' : 'border-gray-300'}`}
                                  placeholder={isTitle ? 'ข้อความหัวข้อ' : 'ข้อความแถว'}
                                />
                                <button
                                  onClick={() => toggleGridRowType(selectedField.id, index)}
                                  className={`px-2 py-2 text-sm rounded-lg ${isTitle ? 'text-purple-600 hover:bg-purple-100' : 'text-gray-500 hover:bg-gray-100'}`}
                                  title={isTitle ? 'เปลี่ยนเป็นแถวคำถาม' : 'เปลี่ยนเป็นหัวข้อ'}
                                >
                                  {isTitle ? '📝' : '🏷️'}
                                </button>
                                <button
                                  onClick={() => addGridTitle(selectedField.id, index)}
                                  className="px-2 py-2 text-green-600 rounded-lg hover:bg-green-50"
                                  title="เพิ่มหัวข้อด้านล่าง"
                                >
                                  ➕
                                </button>
                                <button
                                  onClick={() => deleteGridRow(selectedField.id, index)}
                                  className="px-3 py-2 text-red-600 rounded-lg hover:bg-red-50"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          )
                        })}
                        <div className="flex gap-2">
                          <button
                            onClick={() => addGridRow(selectedField.id)}
                            className="flex-1 py-2 text-gray-500 transition border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 hover:text-blue-600"
                          >
                            + เพิ่มแถว
                          </button>
                          <button
                            onClick={() => addGridTitle(selectedField.id, (selectedField.rows || []).length - 1)}
                            className="flex-1 py-2 text-purple-600 transition border-2 border-purple-300 border-dashed rounded-lg hover:border-purple-500 hover:text-purple-800"
                          >
                            + เพิ่มหัวข้อ
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Columns */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        คอลัมน์ (ตัวเลือก)
                      </label>
                      <div className="space-y-2">
                        {(selectedField.columns || []).map((col, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={col}
                              onChange={(e) => updateGridColumn(selectedField.id, index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => deleteGridColumn(selectedField.id, index)}
                              className="px-3 py-2 text-red-600 rounded-lg hover:bg-red-50"
                            >
                              🗑️
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addGridColumn(selectedField.id)}
                          className="w-full py-2 text-gray-500 transition border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 hover:text-blue-600"
                        >
                          + เพิ่มคอลัมน์
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowFieldSettings(false)}
                  className="w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Settings Modal */}
        {showFormSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">⚙️ ตั้งค่าฟอร์ม</h3>
                  <button
                    onClick={() => setShowFormSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Theme Color */}
                <div>
                  <label className="block mb-3 text-sm font-medium text-gray-700">สีธีม</label>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {[
                      { value: "#3B82F6", label: "ฟ้า" },
                      { value: "#1e3a8a", label: "น้ำเงินเข้ม" },
                      { value: "#10B981", label: "เขียว" },
                      { value: "#EF4444", label: "แดง" },
                      { value: "#8B5CF6", label: "ม่วง" },
                      { value: "#EC4899", label: "ชมพู" },
                      { value: "#F97316", label: "ส้ม" },
                      { value: "#14B8A6", label: "เขียวน้ำทะเล" },
                      { value: "#6366F1", label: "อินดิโก" },
                    ].map((c) => (
                      <button
                        key={c.value}
                        onClick={() => updateSetting("theme_color", c.value)}
                        className={`w-10 h-10 rounded-full border-2 transition ${schema.settings.theme_color === c.value ? "border-gray-800 scale-110" : "border-gray-300 hover:scale-110"}`}
                        style={{ backgroundColor: c.value }}
                        title={c.label}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">หรือป้อนรหัสสี:</label>
                    <input
                      type="color"
                      value={schema.settings.theme_color || "#3B82F6"}
                      onChange={(e) => updateSetting("theme_color", e.target.value)}
                      className="w-10 h-10 p-0.5 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={schema.settings.theme_color || "#3B82F6"}
                      onChange={(e) => updateSetting("theme_color", e.target.value)}
                      className="w-28 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>

                {/* Font Family */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="block mb-3 text-sm font-medium text-gray-700">แบบอักษร</label>
                  <select
                    value={schema.settings.font_family || "Sarabun"}
                    onChange={(e) => updateSetting("font_family", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    style={{ fontFamily: schema.settings.font_family || "Sarabun" }}
                  >
                    {[
                      { value: "Sarabun", label: "Sarabun" },
                      { value: "Noto Sans Thai", label: "Noto Sans Thai" },
                      { value: "Prompt", label: "Prompt" },
                      { value: "Kanit", label: "Kanit" },
                      { value: "Anuphan", label: "Anuphan" },
                      { value: "Mali", label: "Mali" },
                      { value: "Sriracha", label: "Sriracha" },
                      { value: "Chakra Petch", label: "Chakra Petch" },
                      { value: "Bai Jamjuree", label: "Bai Jamjuree" },
                    ].map((f) => (
                      <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-400">ฟอนต์จะแสดงผลเมื่อผู้ตอบมีฟอนต์นี้ในเครื่อง หรือเชื่อมต่ออินเทอร์เน็ต (Google Fonts)</p>
                </div>

                {/* Respondent Info Settings */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="mb-3 text-sm font-semibold text-gray-700">ข้อมูลผู้ตอบแบบสอบถาม</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="collect_name"
                        checked={schema.settings.collect_name || false}
                        onChange={(e) => updateSetting("collect_name", e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="collect_name" className="text-sm text-gray-700 cursor-pointer">เก็บชื่อ-นามสกุล</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={schema.settings.collect_email || "false"}
                        onChange={(e) => updateSetting("collect_email", e.target.value === "false" ? false : e.target.value)}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="false">ไม่เก็บอีเมล</option>
                        <option value="optional">เก็บอีเมล (ไม่บังคับ)</option>
                        <option value="required">เก็บอีเมล (บังคับ)</option>
                      </select>
                      <span className="text-sm text-gray-600">อีเมล</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="collect_phone"
                        checked={schema.settings.collect_phone || false}
                        onChange={(e) => updateSetting("collect_phone", e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="collect_phone" className="text-sm text-gray-700 cursor-pointer">เก็บเบอร์โทรศัพท์</label>
                    </div>
                  </div>
                </div>

                {/* Confirmation Settings */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="mb-3 text-sm font-semibold text-gray-700">ข้อความหลังส่งแบบฟอร์ม</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      id="show_confirmation"
                      checked={schema.settings.show_confirmation !== false}
                      onChange={(e) => updateSetting("show_confirmation", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="show_confirmation" className="text-sm text-gray-700 cursor-pointer">แสดงข้อความยืนยัน</label>
                  </div>
                  <textarea
                    value={schema.settings.confirmation_message || "ขอบคุณที่ส่งแบบฟอร์ม"}
                    onChange={(e) => updateSetting("confirmation_message", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="ขอบคุณที่ส่งแบบฟอร์ม"
                  />
                  <div className="mt-3">
                    <label className="block mb-1 text-sm font-medium text-gray-700">ลิงก์เปลี่ยนเส้นทาง (ไม่บังคับ)</label>
                    <input
                      type="text"
                      value={schema.settings.redirect_url || ""}
                      onChange={(e) => updateSetting("redirect_url", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/thank-you"
                    />
                  </div>
                </div>

                {/* Other Settings */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="mb-3 text-sm font-semibold text-gray-700">อื่นๆ</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="show_progress_bar"
                        checked={schema.settings.show_progress_bar !== false}
                        onChange={(e) => updateSetting("show_progress_bar", e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="show_progress_bar" className="text-sm text-gray-700 cursor-pointer">แสดงแถบความคืบหน้า</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="allow_multiple"
                        checked={schema.settings.allow_multiple_submissions !== false}
                        onChange={(e) => updateSetting("allow_multiple_submissions", e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="allow_multiple" className="text-sm text-gray-700 cursor-pointer">ให้ส่งได้มากกว่า 1 ครั้ง</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowFormSettings(false)}
                  className="w-full py-2 text-white transition bg-orange-500 rounded-lg hover:bg-orange-600"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section Settings Modal */}
        {showSectionSettings && selectedSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">ตั้งค่าส่วน</h3>
                  <button
                    onClick={() => setShowSectionSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Section Title */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    ชื่อส่วน *
                  </label>
                  <input
                    type="text"
                    value={selectedSection.title || ""}
                    onChange={(e) => updateSection(selectedSection.id, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="เช่น ข้อมูลทั่วไป"
                  />
                </div>

                {/* Section Description */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    คำอธิบายส่วน
                  </label>
                  <textarea
                    value={selectedSection.description || ""}
                    onChange={(e) => updateSection(selectedSection.id, { description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="คำอธิบายเพิ่มเติมสำหรับส่วนนี้"
                    rows={3}
                  />
                </div>

                {/* Section Stats */}
                <div className="p-4 rounded-lg bg-gray-50">
                  <h4 className="mb-2 text-sm font-semibold text-gray-700">ข้อมูลส่วน</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📊 จำนวนฟิลด์: <span className="font-medium">{(selectedSection.fields || []).length}</span></p>
                    <p>🔢 ลำดับที่: <span className="font-medium">{schema.sections.findIndex(s => s.id === selectedSection.id) + 1}</span></p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowSectionSettings(false)}
                  className="w-full py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormBuilder
