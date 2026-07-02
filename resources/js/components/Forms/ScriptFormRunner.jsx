import { useState, useEffect, Suspense, useCallback, useMemo, useRef, useContext, createContext, lazy, memo } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"  // ใช้ axios โดยตรง ไม่ผ่าน api.js
import toast from "react-hot-toast"

/**
 * ScriptFormRunner - Dynamic script executor for script-based forms
 * This component fetches the script from database and executes it
 */
const ScriptFormRunner = () => {
  const { uuid } = useParams()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [DynamicComponent, setDynamicComponent] = useState(null)

  useEffect(() => {
    loadForm()
  }, [uuid])

  const loadForm = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log('===== [ScriptFormRunner] Starting loadForm =====')
      console.log('[ScriptFormRunner] UUID:', uuid)

      // Setup axios for cookie-based auth
      axios.defaults.withCredentials = true
      axios.defaults.withXSRFToken = true

      // Get CSRF token from meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      console.log('[ScriptFormRunner] CSRF Token from meta:', csrfToken)

      if (csrfToken) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      }

      console.log('[ScriptFormRunner] Making API request to:', `/forms/${uuid}/fill`)
      console.log('[ScriptFormRunner] Axios defaults:', axios.defaults)

      const response = await axios.get(`/forms/${uuid}/fill`)

      console.log('[ScriptFormRunner] API Response Status:', response.status)
      console.log('[ScriptFormRunner] API Response Data:', response.data)

      const formData = response.data.data

      console.log('[ScriptFormRunner] Loaded form:', formData)
      console.log('[ScriptFormRunner] form_type:', formData.form_type)
      console.log('[ScriptFormRunner] script_content exists:', !!formData.script_content)
      console.log('[ScriptFormRunner] script_content length:', formData.script_content?.length)

      setForm(formData)

      // ตรวจสอบว่าเป็น script-based form หรือไม่
      if (formData.form_type === 'script') {
        console.log('[ScriptFormRunner] This is a script-based form, loading script...')
        await loadScriptForm(formData)
      } else {
        console.log('[ScriptFormRunner] This is a schema-based form, redirecting...')
        console.log('[ScriptFormRunner] Redirect to:', `/forms-schema/${uuid}`)
        window.location.href = `/forms-schema/${uuid}`
        return
      }
    } catch (err) {
      console.error('===== [ScriptFormRunner] ERROR =====')
      console.error('[ScriptFormRunner] Error type:', typeof err)
      console.error('[ScriptFormRunner] Error:', err)
      console.error('[ScriptFormRunner] Error response:', err.response)
      console.error('[ScriptFormRunner] Error status:', err.response?.status)
      console.error('[ScriptFormRunner] Error data:', err.response?.data)
      console.error('[ScriptFormRunner] Error headers:', err.response?.headers)
      console.error('[ScriptFormRunner] Error message:', err.message)
      console.error('[ScriptFormRunner] Error stack:', err.stack)

      // หากเป็น error 403/404 แสดงข้อความที่เหมาะสม
      let errorMsg = "ไม่สามารถโหลดแบบฟอร์มได้"

      if (err.response?.status === 404) {
        errorMsg = "ไม่พบแบบฟอร์มนี้"
        console.log('[ScriptFormRunner] Set error: Form not found (404)')
      } else if (err.response?.status === 403) {
        errorMsg = "แบบฟอร์มนี้ไม่พร้อมใช้งาน"
        console.log('[ScriptFormRunner] Set error: Form not available (403)')
      } else if (err.response?.status === 401) {
        errorMsg = "กรุณาล็อกอินเพื่อเข้าถึงแบบฟอร์ม"
        console.log('[ScriptFormRunner] Set error: Unauthorized (401)')
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message
        console.log('[ScriptFormRunner] Set error:', errorMsg)
      }

      console.log('[ScriptFormRunner] Final error message:', errorMsg)
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      console.log('===== [ScriptFormRunner] loadForm Complete =====')
      setLoading(false)
    }
  }

  const loadScriptForm = async (formData) => {
    try {
      const scriptContent = formData.script_content

      console.log('[ScriptFormRunner] Loading script form...')
      console.log('[ScriptFormRunner] Script content length:', scriptContent?.length)
      console.log('[ScriptFormRunner] Script content preview:', scriptContent?.substring(0, 100))

      if (!scriptContent || scriptContent.trim() === '') {
        throw new Error('Script content is empty')
      }

      // ตรวจสอบว่า script content เป็น HTML หรือไม่ (ควรเป็น JavaScript)
      if (scriptContent.trim().startsWith('<!DOCTYPE') || scriptContent.trim().startsWith('<html')) {
        throw new Error('Invalid script content: Received HTML instead of JavaScript')
      }

      // ตรวจสอบว่ามี export default หรือไม่
      if (!scriptContent.includes('export default')) {
        console.warn('[ScriptFormRunner] Script missing "export default", attempting to fix...')
      }

      // Create component from script string
      const component = await evaluateScript(scriptContent, uuid)
      setDynamicComponent(() => component)

    } catch (err) {
      console.error("[ScriptFormRunner] Error loading script form:", err)
      console.error("[ScriptFormRunner] Error stack:", err.stack)
      throw err
    }
  }

  // Evaluate script and return component
  const evaluateScript = async (scriptContent, formUuid) => {
    let transformedScript = '' // Declare outside try block for error logging

    try {
      console.log('[ScriptFormRunner] Evaluating script...')
      console.log('[ScriptFormRunner] Script content preview:', scriptContent?.substring(0, 200))

      // Create a function from the script
      const moduleExports = {}

      const require = (name) => {
        if (name === 'react') {
          return {
            useState,
            useEffect,
            useCallback,
            useMemo,
            useRef,
            useContext,
            createContext,
            Suspense,
            lazy,
            memo,
          }
        }
        if (name === 'react-hot-toast') {
          return { default: toast }
        }
        if (name === 'axios') {
          return axios
        }
        throw new Error(`Module ${name} not available`)
      }

      // Create module scope (without React hooks - they come from require)
      const moduleScope = {
        module: { exports: moduleExports },
        exports: moduleExports,
        require,
        console,
        toast,
        axios,
      }

      // Transform import statements - remove them entirely since hooks are provided as parameters
      transformedScript = scriptContent
        // Remove React imports completely (hooks are passed as parameters)
        .replace(/import\s+{\s*[^}]+\s*}\s+from\s+['"]react['"]/g, '// React import removed - hooks provided as parameters')
        .replace(/import\s+.*\s+from\s+['"]react['"]/g, '// React import removed')
        // Transform react-hot-toast imports to use the provided toast variable
        .replace(/import\s+toast\s+from\s+['"]react-hot-toast['"]/g, '// toast provided as parameter')
        .replace(/import\s+{\s*toast\s*}\s+from\s+['"]react-hot-toast['"]/g, '// toast provided as parameter')
        // Transform axios import to use the provided axios variable
        .replace(/import\s+axios\s+from\s+['"]axios['"]/g, '// axios provided as parameter')
        // Remove react-router-dom imports completely (not needed in this context)
        .replace(/import\s+{\s*[^}]+\s*}\s+from\s+['"]react-router-dom['"]/g, '// react-router-dom imports removed')
        .replace(/import\s+.*\s+from\s+['"]react-router-dom['"]/g, '// react-router-dom import removed')
        // Remove any remaining import statements
        .replace(/^import\s+.*;?$/gm, '// import removed')
        // Transform export default
        .replace(/export\s+default\s+/g, 'module.exports.default = ')

      // Add formUuid to scope for API calls
      transformedScript = `
        const __formUuid = '${formUuid}';
        ${transformedScript}
      `

      console.log('[ScriptFormRunner] Transformed script length:', transformedScript.length)
      console.log('[ScriptFormRunner] Transformed script preview:', transformedScript.substring(0, 300))

      // Create and execute the function (pass hooks as parameters)
      const scriptFunction = new Function(
        'module',
        'exports',
        'require',
        'console',
        'useState',
        'useEffect',
        'useCallback',
        'useMemo',
        'useRef',
        'useContext',
        'createContext',
        'Suspense',
        'lazy',
        'memo',
        'toast',
        'axios',
        transformedScript + '; return module.exports.default;'
      )

      console.log('[ScriptFormRunner] Script function created successfully')

      const component = scriptFunction(
        moduleScope.module,
        moduleScope.exports,
        moduleScope.require,
        console,
        useState,
        useEffect,
        useCallback,
        useMemo,
        useRef,
        useContext,
        createContext,
        Suspense,
        lazy,
        memo,
        toast,
        axios
      )

      if (!component) {
        throw new Error('Script did not export a valid component')
      }

      console.log('[ScriptFormRunner] Script evaluated successfully')
      return component

    } catch (err) {
      console.error("[ScriptFormRunner] Script evaluation error:", err)
      console.error("[ScriptFormRunner] Error message:", err.message)
      console.error("[ScriptFormRunner] Error stack:", err.stack)

      // แสดง script content ที่มีปัญหาเพื่อ debug
      console.error("[ScriptFormRunner] Original script content:")
      console.error(scriptContent)
      console.error("[ScriptFormRunner] Transformed script:")
      console.error(transformedScript)

      // Check for specific error patterns
      let helpfulMessage = err.message
      if (err.message.includes('already been declared')) {
        helpfulMessage = 'Script มี import statements ที่ซ้ำซ้อน กรุณาลบ import statements ที่ไม่จำเป็นออก'
      } else if (err.message.includes('JSX')) {
        helpfulMessage = 'Script มี JSX syntax error กรุณาตรวจสอบความถูกต้องของ syntax'
      }

      throw new Error(`Script error: ${helpfulMessage}. ตรวจสอบว่า script มี syntax ที่ถูกต้องและไม่มี import statements ที่ซ้ำซ้อน`)
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
        <div className="text-center">
          <div className="p-6 border border-red-200 rounded-lg bg-red-50">
            <p className="mb-2 text-xl text-red-600">⚠️ เกิดข้อผิดพลาด</p>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              โหลดใหม่
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!DynamicComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">ไม่พบแบบฟอร์ม</p>
        </div>
      </div>
    )
  }

  // Render the dynamic component
  return <DynamicComponent />
}

export default ScriptFormRunner
