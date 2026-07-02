import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import SurveyFormRenderer from "../../pages/forms/SurveyFormRenderer"

const DynamicFormRenderer = ({ form: propForm }) => {
  const { uuid } = useParams()
  const [form, setForm] = useState(propForm || null)
  const [loading, setLoading] = useState(!propForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({})
  const [respondentData, setRespondentData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    if (propForm) {
      initForm(propForm)
      return
    }
    if (uuid) {
      loadForm()
    }
  }, [uuid, propForm])

  const initForm = (formData) => {
    setForm(formData)
    document.title = formData.title + " — Survey"
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', formData.description || '')

    if (formData.template === 'survey') {
      setLoading(false)
      return
    }

    const initialData = {}
    const fields = formData.schema.fields || []
    fields.forEach(field => {
      initialData[field.id] = field.type === "checkbox" ? [] : field.type === "grid" ? {} : ""
      if (field.hasOther) {
        initialData[field.id + "_other"] = ""
      }
    })
    setFormData(initialData)
    setLoading(false)
  }

  const loadForm = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/forms/${uuid}/fill`)
      initForm(response.data.data)
    } catch (error) {
      console.error("Error loading form:", error)
      toast.error(error.response?.data?.message || "ไม่สามารถโหลดแบบฟอร์มได้")
    } finally {
      setLoading(false)
    }
  }

  const handleFieldChange = (fieldId, value) => {
    setFormData({
      ...formData,
      [fieldId]: value,
    })

    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors({
        ...errors,
        [fieldId]: null,
      })
    }
  }

  const handleCheckboxChange = (fieldId, option, checked) => {
    const currentValues = formData[fieldId] || []
    let newValues

    if (checked) {
      newValues = [...currentValues, option]
    } else {
      newValues = currentValues.filter(v => v !== option)
    }

    setFormData({
      ...formData,
      [fieldId]: newValues,
    })
  }

  const handleGridChange = (fieldId, rowIdx, colIdx) => {
    setFormData({
      ...formData,
      [fieldId]: {
        ...formData[fieldId],
        [rowIdx]: colIdx,
      },
    })
  }

  const validateForm = () => {
    const newErrors = {}
    const fields = form.schema.fields || []

    fields.forEach(field => {
      const value = formData[field.id]

      // Required validation
      if (field.required) {
        if (field.type === "checkbox") {
          if (!value || value.length === 0) {
            newErrors[field.id] = "กรุณาเลือกอย่างน้อย 1 ตัวเลือก"
          }
          if (field.hasOther && (value || []).includes("__other__") && !formData[field.id + "_other"]) {
            newErrors[field.id] = "กรุณากรอกข้อมูลในช่องอื่นๆ"
          }
        } else if (field.type === "radio" && field.hasOther && value === "__other__" && !formData[field.id + "_other"]) {
          newErrors[field.id] = "กรุณากรอกข้อมูลในช่องอื่นๆ"
        } else if (field.type === "grid" && field.required) {
          const gridVal = formData[field.id] || {}
          const nonTitleIndices = (field.rows || []).reduce((acc, r, idx) => {
            const t = typeof r === 'string' ? 'row' : (r?.type || 'row')
            if (t !== 'title') acc.push(idx)
            return acc
          }, [])
          const allFilled = nonTitleIndices.every(idx => gridVal[idx] !== undefined && gridVal[idx] !== null)
          if (!allFilled) {
            newErrors[field.id] = "กรุณาเลือกคำตอบในทุกแถว"
          }
        } else if (!value || (typeof value === "string" && !value.trim())) {
          newErrors[field.id] = "กรุณากรอกข้อมูลนี้"
        }
      }

      // Email validation
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          newErrors[field.id] = "รูปแบบอีเมลไม่ถูกต้อง"
        }
      }

      // Number validation
      if (field.type === "number" && value) {
        const num = parseFloat(value)
        if (isNaN(num)) {
          newErrors[field.id] = "กรุณากรอกตัวเลขที่ถูกต้อง"
        }
        if (field.min !== null && field.min !== undefined && num < field.min) {
          newErrors[field.id] = `ค่าต้องมากกว่าหรือเท่ากับ ${field.min}`
        }
        if (field.max !== null && field.max !== undefined && num > field.max) {
          newErrors[field.id] = `ค่าต้องน้อยกว่าหรือเท่ากับ ${field.max}`
        }
      }

      // Text length validation
      if ((field.type === "text" || field.type === "textarea") && value) {
        if (field.min !== null && field.min !== undefined && value.length < field.min) {
          newErrors[field.id] = `ความยาวอย่างน้อย ${field.min} ตัวอักษร`
        }
        if (field.max !== null && field.max !== undefined && value.length > field.max) {
          newErrors[field.id] = `ความยาวไม่เกิน ${field.max} ตัวอักษร`
        }
      }

      // URL validation
      if (field.type === "url" && value) {
        try {
          new URL(value)
        } catch {
          newErrors[field.id] = "รูปแบบ URL ไม่ถูกต้อง"
        }
      }
    })

    // Validate respondent info if enabled
    const settings = form.schema.settings || {}
    if (settings.collect_email && respondentData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(respondentData.email)) {
        newErrors["respondent_email"] = "รูปแบบอีเมลไม่ถูกต้อง"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("กรุณากรอกข้อมูลให้ถูกต้อง")
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField) {
        document.getElementById(`field-${firstErrorField}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setSubmitting(true)
    try {
      await axios.post(`/forms/${uuid}/submit`, {
        responses: formData,
        respondent_name: respondentData.name,
        respondent_email: respondentData.email,
        respondent_phone: respondentData.phone,
      })

      setSubmitted(true)
      toast.success(form.schema.settings?.confirmation_message || "ขอบคุณที่ส่งแบบฟอร์ม")

      // Redirect if configured
      if (form.schema.settings?.redirect_url) {
        setTimeout(() => {
          window.location.href = form.schema.settings.redirect_url
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      const errorMsg = error.response?.data?.message || "เกิดข้อผิดพลาดในการส่งแบบฟอร์ม"
      toast.error(errorMsg)

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const renderField = (field) => {
    const error = errors[field.id]
    const value = formData[field.id]

    const baseInputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${error ? "border-red-500" : "border-gray-300"
      }`

    return (
      <div key={field.id} id={`field-${field.id}`} className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="ml-1 text-red-500">*</span>}
        </label>

        {/* Text Input */}
        {field.type === "text" && (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClasses}
          />
        )}

        {/* Textarea */}
        {field.type === "textarea" && (
          <textarea
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={baseInputClasses}
          />
        )}

        {/* Number Input */}
        {field.type === "number" && (
          <input
            type="number"
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className={baseInputClasses}
          />
        )}

        {/* Email Input */}
        {field.type === "email" && (
          <input
            type="email"
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClasses}
          />
        )}

        {/* Tel Input */}
        {field.type === "tel" && (
          <input
            type="tel"
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClasses}
          />
        )}

        {/* Date Input */}
        {field.type === "date" && (
          <input
            type="date"
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={baseInputClasses}
          />
        )}

        {/* DateTime Input */}
        {field.type === "datetime-local" && (
          <input
            type="datetime-local"
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={baseInputClasses}
          />
        )}

        {/* URL Input */}
        {field.type === "url" && (
          <input
            type="url"
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClasses}
          />
        )}

        {/* Select */}
        {field.type === "select" && (
          <select
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={baseInputClasses}
          >
            <option value="">-- เลือก --</option>
            {(field.options || []).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {/* Radio */}
        {field.type === "radio" && (
          <div className="space-y-2">
            {(field.options || []).map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
            {field.hasOther && (
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={field.id}
                    value="__other__"
                    checked={value === "__other__"}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{field.otherLabel || "อื่นๆ"}</span>
                </label>
                {value === "__other__" && (
                  <input
                    type="text"
                    value={formData[field.id + "_other"] || ""}
                    onChange={(e) => handleFieldChange(field.id + "_other", e.target.value)}
                    placeholder="โปรดระบุ"
                    className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Checkbox */}
        {field.type === "checkbox" && (
          <div className="space-y-2">
            {(field.options || []).map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={(value || []).includes(option)}
                  onChange={(e) => handleCheckboxChange(field.id, option, e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
            {field.hasOther && (
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value="__other__"
                    checked={(value || []).includes("__other__")}
                    onChange={(e) => handleCheckboxChange(field.id, "__other__", e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{field.otherLabel || "อื่นๆ"}</span>
                </label>
                {(value || []).includes("__other__") && (
                  <input
                    type="text"
                    value={formData[field.id + "_other"] || ""}
                    onChange={(e) => handleFieldChange(field.id + "_other", e.target.value)}
                    placeholder="โปรดระบุ"
                    className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* File */}
        {field.type === "file" && (
          <input
            type="file"
            onChange={(e) => handleFieldChange(field.id, e.target.files[0])}
            className={baseInputClasses}
          />
        )}

        {/* Grid (Multiple Choice Grid) */}
        {field.type === "grid" && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-2 text-left text-sm font-medium text-gray-700"></th>
                  {(field.columns || []).map((col, i) => (
                    <th key={i} className="p-2 text-center text-sm font-medium text-gray-700">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(field.rows || []).map((row, rowIdx) => {
                  const getRowType = (r) => typeof r === 'string' ? 'row' : (r?.type || 'row')
                  const getRowLabel = (r) => typeof r === 'string' ? r : (r?.label || '')
                  const isTitle = getRowType(row) === 'title'
                  if (isTitle) {
                    return (
                      <tr key={rowIdx} className="bg-purple-50 border-b border-purple-200">
                        <td colSpan={(field.columns || []).length + 1} className="p-3 text-sm font-bold text-purple-800">
                          🏷️ {getRowLabel(row)}
                        </td>
                      </tr>
                    )
                  }
                  const selected = (formData[field.id] || {})[rowIdx]
                  return (
                    <tr key={rowIdx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-2 pr-4 text-sm text-gray-700 font-medium">{getRowLabel(row)}</td>
                      {(field.columns || []).map((col, colIdx) => (
                        <td key={colIdx} className="p-2 text-center">
                          <input
                            type="radio"
                            name={`${field.id}_${rowIdx}`}
                            checked={selected === colIdx}
                            onChange={() => handleGridChange(field.id, rowIdx, colIdx)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Help Text */}
        {field.help_text && (
          <p className="mt-1 text-xs text-gray-500">{field.help_text}</p>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">กำลังโหลดแบบฟอร์ม...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">ไม่พบแบบฟอร์ม</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
          <div className="mb-4 text-6xl">✅</div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">ส่งแบบฟอร์มสำเร็จ!</h2>
          <p className="mb-6 text-gray-600">
            {form.schema.settings?.confirmation_message || "ขอบคุณที่ส่งแบบฟอร์ม"}
          </p>
          {form.schema.settings?.redirect_url && (
            <p className="text-sm text-gray-500">
              กำลังเปลี่ยนหน้า...
            </p>
          )}
        </div>
      </div>
    )
  }

  const settings = form.schema.settings || {}

  // Render Survey template
  if (form.template === 'survey') {
    return <SurveyFormRenderer form={form} uuid={uuid || form.uuid} />
  }

  const fonts = [
    { name: "Sarabun", url: "https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700;800&display=swap" },
    { name: "Noto Sans Thai", url: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;700;800&display=swap" },
    { name: "Prompt", url: "https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700;800&display=swap" },
    { name: "Kanit", url: "https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;700;800&display=swap" },
    { name: "Anuphan", url: "https://fonts.googleapis.com/css2?family=Anuphan:wght@400;600;700;800&display=swap" },
    { name: "Mali", url: "https://fonts.googleapis.com/css2?family=Mali:wght@400;600;700&display=swap" },
    { name: "Sriracha", url: "https://fonts.googleapis.com/css2?family=Sriracha&display=swap" },
    { name: "Chakra Petch", url: "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&display=swap" },
    { name: "Bai Jamjuree", url: "https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600;700;800&display=swap" },
  ]
  const selectedFont = fonts.find(f => f.name === settings.font_family) || fonts[0]

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 to-indigo-100" style={{ fontFamily: `'${settings.font_family || "Sarabun"}','Noto Sans Thai',sans-serif` }}>
      {settings.font_family && <link href={selectedFont.url} rel="stylesheet" />}
      <div className="px-4 mx-auto max-w-7xl">
        {/* Form Header */}
        <div
          className="p-8 bg-white border-t-8 rounded-t-lg shadow-md"
          style={{ borderColor: settings.theme_color || "#3B82F6" }}
        >
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            {form.title}
          </h1>
          {form.description && (
            <p className="text-gray-600">{form.description}</p>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-b-lg shadow-md">
          {/* Respondent Info */}
          {(settings.collect_name || settings.collect_email || settings.collect_phone) && (
            <div className="pb-8 mb-8 border-b border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">ข้อมูลผู้ตอบแบบสอบถาม</h3>

              {settings.collect_name && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    value={respondentData.name}
                    onChange={(e) => setRespondentData({ ...respondentData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="กรอกชื่อ-นามสกุล"
                  />
                </div>
              )}

              {settings.collect_email && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    อีเมล {settings.collect_email === "required" && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="email"
                    value={respondentData.email}
                    onChange={(e) => setRespondentData({ ...respondentData, email: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.respondent_email ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="example@email.com"
                    required={settings.collect_email === "required"}
                  />
                  {errors.respondent_email && (
                    <p className="mt-1 text-sm text-red-600">{errors.respondent_email}</p>
                  )}
                </div>
              )}

              {settings.collect_phone && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    value={respondentData.phone}
                    onChange={(e) => setRespondentData({ ...respondentData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0812345678"
                  />
                </div>
              )}
            </div>
          )}

          {/* Form Fields */}
          <div>
            {form.schema.sections && form.schema.sections.length > 0 ? (
              // Render with sections
              form.schema.sections.map((section, sectionIndex) => (
                <div key={section.id} className="mb-8">
                  {/* Section Header */}
                  {(section.title || section.description) && (
                    <div className="p-4 mb-6 border-l-4 rounded bg-gradient-to-r from-green-50 to-emerald-50" style={{ borderLeftColor: settings.theme_color || "#3B82F6" }}>
                      {section.title && (
                        <h3 className="mb-1 text-xl font-bold text-gray-800">
                          {section.title}
                        </h3>
                      )}
                      {section.description && (
                        <p className="text-sm text-gray-600">
                          {section.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Section Fields */}
                  <div className="space-y-6">
                    {(section.fields || []).map((fieldId) => {
                      const field = form.schema.fields.find(f => f.id === fieldId)
                      if (!field) return null
                      return renderField(field)
                    })}
                  </div>

                  {/* Section Divider (except last section) */}
                  {sectionIndex < form.schema.sections.length - 1 && (
                    <hr className="my-8 border-gray-200" />
                  )}
                </div>
              ))
            ) : (
              // Legacy view without sections (backward compatibility)
              form.schema.fields.map((field) => renderField(field))
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 mt-8 border-t border-gray-200">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 font-semibold text-white transition rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: settings.theme_color || "#3B82F6" }}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                  กำลังส่ง...
                </span>
              ) : (
                "ส่งแบบฟอร์ม"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 text-xs text-center text-gray-500">
          <p>Powered by Dynamic Form Builder</p>
        </div>
      </div>
    </div>
  )
}

export default DynamicFormRenderer
