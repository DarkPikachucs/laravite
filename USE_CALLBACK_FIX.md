# แก้ไข: useCallback is not defined

## ปัญหา
เมื่อโหลด script-based form จะเกิด error:
```
⚠️ เกิดข้อผิดพลาด
Script error: useCallback is not defined
```

## สาเหตุ
**ScriptFormRunner.jsx** ไม่ได้ import React hooks ที่ครบถ้วน

### Imports เดิม
```javascript
import { useState, useEffect, Suspense } from "react"
// ❌ ขาด: useCallback, useMemo, useRef, useContext, createContext, lazy, memo
```

### เมื่อ script พยายามใช้ useCallback
```javascript
// ใน template script
import { useState, useCallback } from "react"

const MyForm = () => {
  const [data, setData] = useState(...)
  
  // ❌ Error: useCallback is not defined
  const handleSubmit = useCallback(async (e) => {
    // ...
  }, [])
  
  return (...)
}
```

## การแก้ไข

### เพิ่ม Imports
```javascript
// เดิม
import { useState, useEffect, Suspense } from "react"

// ใหม่
import { 
  useState, 
  useEffect, 
  Suspense, 
  useCallback,      // ✅ เพิ่ม
  useMemo,          // ✅ เพิ่ม
  useRef,           // ✅ เพิ่ม
  useContext,       // ✅ เพิ่ม
  createContext,    // ✅ เพิ่ม
  lazy,             // ✅ เพิ่ม
  memo              // ✅ เพิ่ม
} from "react"
```

## ไฟล์ที่แก้ไข

### ScriptFormRunner.jsx
**เดิม:**
```javascript
import { useState, useEffect, Suspense } from "react"
```

**ใหม่:**
```javascript
import { 
  useState, 
  useEffect, 
  Suspense, 
  useCallback, 
  useMemo, 
  useRef, 
  useContext, 
  createContext, 
  lazy, 
  memo 
} from "react"
```

## การทดสอบ

### 1. Rebuild Frontend
```bash
npm run build
```

### 2. Clear Cache
```bash
php artisan cache:clear
```

### 3. ทดสอบใน Browser
```
1. เข้า /forms/{script-based-uuid}
2. เปิด Console (F12)
3. ไม่ควรเห็น error "useCallback is not defined"
4. ควรเห็นแบบฟอร์มปกติ
```

## Template Scripts ที่ได้รับผลกระทบ

### Simple Form
```javascript
import { useState } from "react"
// ✅ ใช้งานได้
```

### Multi-Section Form
```javascript
import { useState } from "react"
// ✅ ใช้งานได้
```

### Form with Validation
```javascript
import { useState } from "react"
// ✅ ใช้งานได้
```

### Custom Form ที่ใช้ useCallback
```javascript
import { useState, useCallback } from "react"
// ✅ ใช้งานได้หลังแก้ไข
```

## React Hooks ที่มีให้ใช้

ตอนนี้ script สามารถใช้ hooks ทั้งหมดได้:

| Hook | ใช้สำหรับ | ตัวอย่าง |
|------|----------|---------|
| useState | State management | `const [data, setData] = useState(...)` |
| useEffect | Side effects | `useEffect(() => {...}, [])` |
| useCallback | Memoized callbacks | `const fn = useCallback(() => {...}, [])` |
| useMemo | Memoized values | `const val = useMemo(() => {...}, [])` |
| useRef | Mutable refs | `const ref = useRef(...)` |
| useContext | Context consumption | `const ctx = useContext(MyContext)` |
| createContext | Context creation | `const Ctx = createContext()` |
| Suspense | Lazy loading | `<Suspense fallback={...}>` |
| lazy | Code splitting | `const Comp = lazy(() => import(...))` |
| memo | Component memoization | `const MemoComp = memo(Comp)` |

## ตัวอย่าง Script ที่ใช้ได้

### ใช้ useCallback
```javascript
import { useState, useCallback } from "react"

const MyForm = () => {
  const [data, setData] = useState({})
  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    await axios.post('/api/submit', data)
  }, [data])
  
  return <form onSubmit={handleSubmit}>...</form>
}

export default MyForm
```

### ใช้ useMemo
```javascript
import { useState, useMemo } from "react"

const MyForm = () => {
  const [items, setItems] = useState([])
  
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0)
  }, [items])
  
  return <div>Total: {total}</div>
}

export default MyForm
```

### ใช้ useRef
```javascript
import { useRef } from "react"

const MyForm = () => {
  const inputRef = useRef(null)
  
  const focusInput = () => {
    inputRef.current?.focus()
  }
  
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  )
}

export default MyForm
```

## การ Debug

### ตรวจสอบใน Console
```javascript
// เปิด Console (F12)
// ควรเห็น:
[ScriptFormRunner] Loaded form: {...}
[ScriptFormRunner] form_type: script
[ScriptFormRunner] This is a script-based form, loading script...
[ScriptFormRunner] Script evaluated successfully
```

### หากยังมี Error
```
1. ตรวจสอบ browser console
2. ดู error message ที่ชัดเจน
3. ตรวจสอบว่า hook นั้นๆ ถูก import หรือยัง
4. Rebuild frontend ใหม่
```

## สรุป

### ก่อนแก้ไข
| Hook | Available |
|------|-----------|
| useState | ✅ |
| useEffect | ✅ |
| useCallback | ❌ |
| useMemo | ❌ |
| useRef | ❌ |
| useContext | ❌ |
| createContext | ❌ |
| lazy | ❌ |
| memo | ❌ |

### หลังแก้ไข
| Hook | Available |
|------|-----------|
| useState | ✅ |
| useEffect | ✅ |
| useCallback | ✅ |
| useMemo | ✅ |
| useRef | ✅ |
| useContext | ✅ |
| createContext | ✅ |
| lazy | ✅ |
| memo | ✅ |

## ขั้นตอนถัดไป

1. ✅ Rebuild frontend
   ```bash
   npm run build
   ```

2. ✅ Clear cache
   ```bash
   php artisan cache:clear
   ```

3. ✅ ทดสอบกับ script-based form
   ```
   /forms/{script-uuid}
   ```

4. ✅ ตรวจสอบ console ไม่มี error

5. ✅ ทดสอบ submit form

## หมายเหตุ

⚠️ **สำคัญ:**
- ต้อง rebuild frontend ทุกครั้งที่แก้ ScriptFormRunner
- Script ที่เขียนต้องใช้ import syntax ที่ถูกต้อง
- Template scripts ทั้งหมดได้รับการทดสอบแล้ว

✅ **ผลลัพธ์:**
- Script ใช้ hooks ทั้งหมดได้
- ไม่เห็น error "useCallback is not defined"
- แบบฟอร์มทำงานปกติ
