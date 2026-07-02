import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import DynamicFormRenderer from "./DynamicFormRenderer"

const FormBySlug = () => {
  const { slug } = useParams()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadFormBySlug()
  }, [slug])

  const loadFormBySlug = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/forms/${slug}/fill`)
      const formData = response.data.data
      document.title = formData.title + " — Survey"
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', formData.description || '')

      if (formData.form_type === 'script') {
        window.location.href = `/forms/${formData.uuid}`
        return
      }

      setForm(formData)
    } catch (err) {
      let msg = "ไม่สามารถโหลดแบบฟอร์มได้"
      if (err.response?.status === 404) msg = "ไม่พบแบบฟอร์มนี้"
      else if (err.response?.status === 403) msg = "แบบฟอร์มนี้ไม่พร้อมใช้งาน"
      else if (err.response?.data?.message) msg = err.response.data.message
      setError(msg)
    } finally {
      setLoading(false)
    }
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <p className="mb-2 text-xl text-red-600">⚠️ เกิดข้อผิดพลาด</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!form) return null

  return <DynamicFormRenderer form={form} />
}

export default FormBySlug
