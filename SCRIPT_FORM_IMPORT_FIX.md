# Script Form Import Fix

## Problem
Scripts that include import statements like:
```javascript
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
```

Were causing the error: `Identifier 'useState' has already been declared`

## Root Cause
The `ScriptFormRunner` component:
1. Passes React hooks (`useState`, `useEffect`, etc.) as **parameters** to the `Function` constructor
2. Also transformed import statements to `const { useState } = require("react")`
3. This resulted in `useState` being declared twice, causing the error

## Solution
Modified the `evaluateScript` function in `ScriptFormRunner.jsx` to:
1. **Remove all import statements** entirely (instead of transforming them to require)
2. Rely on the hooks and utilities passed as function parameters

### What Changed
**Before:**
```javascript
// Transform import statements to require
.replace(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]react['"]/g, 'const {$1} = require("react")')
// ... other transforms

// Then prepend if missing
if (transformedScript.includes('useState') && !/const\s*{\s*useState/.test(transformedScript)) {
  finalScript = 'const { useState } = require("react");\n' + finalScript
}
```

**After:**
```javascript
// Remove import statements entirely - hooks are provided as parameters
.replace(/import\s+{\s*[^}]+\s*}\s+from\s+['"]react['"]/g, '// React import removed - hooks provided as parameters')
.replace(/import\s+toast\s+from\s+['"]react-hot-toast['"]/g, '// toast provided as parameter')
.replace(/import\s+axios\s+from\s+['"]axios['"]/g, '// axios provided as parameter')
// ... no more prepending logic
```

## Available Globals in Scripts
Scripts now have access to these without needing imports:

### React Hooks (passed as parameters)
- `useState`
- `useEffect`
- `useCallback`
- `useMemo`
- `useRef`
- `useContext`
- `createContext`
- `Suspense`
- `lazy`
- `memo`

### Utilities (passed as parameters)
- `toast` (from react-hot-toast)
- `axios`

### Module System
- `module`
- `exports`
- `require` (for any additional modules if needed)

## Script Example
Scripts can now be written like this:

```javascript
// Import statements are optional - they will be removed during transformation
// But you can still write them for clarity in your editor

const FormWithValidation = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "" })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post(`/api/forms/${__formUuid}/submit`, {
        responses: formData
      })
      toast.success("ส่งแบบฟอร์มสำเร็จ")
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "กำลังบันทึก..." : "ส่งแบบฟอร์ม"}
        </button>
      </form>
    </div>
  )
}

export default FormWithValidation
```

## Special Variables
- `__formUuid` - The UUID of the current form (automatically injected)

## Testing
After this fix:
1. Scripts with import statements should work without errors
2. Scripts without import statements should continue to work
3. The console will show what imports were removed for debugging

## Files Modified
- `resources/js/components/Forms/ScriptFormRunner.jsx`
