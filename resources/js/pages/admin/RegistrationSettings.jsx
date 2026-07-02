import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const RegistrationSettings = () => {
  const [settings, setSettings] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [localSettings, setLocalSettings] = useState({})

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/registration/settings')
      setSettings(response.data.data)

      // Initialize local state
      const initial = {}
      response.data.data.forEach(setting => {
        initial[setting.key] = setting.value
      })
      setLocalSettings(initial)
    } catch (error) {
      console.error('Error loading settings:', error)
      toast.error('ไม่สามารถโหลดการตั้งค่าได้')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (key) => {
    setSaving(true)
    try {
      await axios.put(`/registration/settings/${key}`, {
        value: localSettings[key]
      })
      toast.success('บันทึกการตั้งค่าสำเร็จ')
    } catch (error) {
      console.error('Error saving setting:', error)
      toast.error(error.response?.data?.message || 'ไม่สามารถบันทึกการตั้งค่าได้')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      const settingsArray = settings.map(setting => ({
        key: setting.key,
        value: localSettings[setting.key]
      }))

      await axios.post('/registration/settings/bulk-update', {
        settings: settingsArray
      })
      toast.success('บันทึกการตั้งค่าทั้งหมดสำเร็จ')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('ไม่สามารถบันทึกการตั้งค่าได้')
    } finally {
      setSaving(false)
    }
  }

  const handleRefreshCache = async () => {
    try {
      await axios.post('/registration/settings/refresh-cache')
      toast.success('ล้างแคชสำเร็จ')
      loadSettings()
    } catch (error) {
      console.error('Error refreshing cache:', error)
      toast.error('ไม่สามารถล้างแคชได้')
    }
  }

  const formatDateTimeLocal = (dateTimeString) => {
    if (!dateTimeString) return ''
    const date = new Date(dateTimeString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const getStatusColor = (key) => {
    if (key === 'registration_enabled') {
      return localSettings[key] === 'true' || localSettings[key] === true
        ? 'bg-green-500'
        : 'bg-red-500'
    }
    return 'bg-blue-500'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">กำลังโหลดการตั้งค่า...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="max-w-4xl px-4 mx-auto">
        {/* Header */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                จัดการการลงทะเบียน
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                กำหนดค่าการเปิด/ปิด และช่วงเวลาการลงทะเบียน
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRefreshCache}
                className="px-4 py-2 text-sm text-white transition bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                ล้างแคช
              </button>
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {saving ? 'กำลังบันทึก...' : 'บันทึกทั้งหมด'}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="space-y-4">
          {settings.map((setting) => (
            <div key={setting.key} className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(setting.key)}`}></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {setting.label || setting.key}
                    </h3>
                    {setting.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {setting.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleSave(setting.key)}
                  disabled={saving}
                  className="px-3 py-1 text-sm text-white transition bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                  {saving ? 'กำลังบันทึก...' : 'บันทึก'}
                </button>
              </div>

              <div className="mt-4">
                {setting.type === 'boolean' && (
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings[setting.key] === 'true' || localSettings[setting.key] === true}
                      onChange={(e) => setLocalSettings({
                        ...localSettings,
                        [setting.key]: e.target.checked ? 'true' : 'false'
                      })}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      {localSettings[setting.key] === 'true' || localSettings[setting.key] === true ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                    </span>
                  </label>
                )}

                {setting.type === 'datetime' && (
                  <input
                    type="datetime-local"
                    value={formatDateTimeLocal(localSettings[setting.key])}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      [setting.key]: e.target.value
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}

                {setting.type === 'text' && (
                  <textarea
                    value={localSettings[setting.key] || ''}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      [setting.key]: e.target.value
                    })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}

                {setting.type === 'number' && (
                  <input
                    type="number"
                    value={localSettings[setting.key] || ''}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      [setting.key]: e.target.value
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Status Preview */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            ตัวอย่างสถานะ
          </h3>
          <div className="p-4 rounded-lg bg-gray-50">
            <p className="mb-2 text-sm text-gray-600">
              สถานะปัจจุบัน:
            </p>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${localSettings['registration_enabled'] === 'true' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              <span className="font-medium">
                {localSettings['registration_enabled'] === 'true' ? 'เปิดการลงทะเบียน' : 'ปิดการลงทะเบียน'}
              </span>
            </div>
            {localSettings['registration_start_date'] && (
              <p className="mt-2 text-sm text-gray-600">
                เริ่มต้น: {new Date(localSettings['registration_start_date']).toLocaleString('th-TH')}
              </p>
            )}
            {localSettings['registration_end_date'] && (
              <p className="text-sm text-gray-600">
                สิ้นสุด: {new Date(localSettings['registration_end_date']).toLocaleString('th-TH')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationSettings
