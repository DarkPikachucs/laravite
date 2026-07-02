# คู่มือการปรับโครงสร้าง UI แบบสอบถาม

## สรุปการเปลี่ยนแปลง

ปรับปรุงส่วนติดต่อผู้ใช้ (UI) ของหน้าแบบสอบถาม โดยเปลี่ยนโครงสร้างปุ่มนำทางให้มีความเป็นระเบียบและมีการควบคุมสิทธิ์การเข้าถึงที่ดีขึ้น

## การเปลี่ยนแปลงหลัก

### 1. โครงสร้างปุ่มนำทางใหม่

**ก่อนเปลี่ยนแปลง:**
- มี 3 ปุ่มแยกกัน: `ตอบแบบสอบถาม`, `Dashboard`, `ข้อมูลทั้งหมด`

**หลังเปลี่ยนแปลง:**
- ปุ่ม `ตอบแบบสอบถาม` แยกอิสระ
- ปุ่ม `ผลการตอบแบบสอบถาม` เป็นปุ่มหลักที่มี dropdown menu
  - `📈 Dashboard` - ดูสถิติภาพรวม
  - `📋 ข้อมูลทั้งหมด` - ดูข้อมูลดิบทั้งหมด

### 2. การควบคุมสิทธิ์การเข้าถึง

เมื่อผู้ใช้กดปุ่ม `ผลการตอบแบบสอบถาม` จะมีการตรวจสอบสิทธิ์:

#### กรณีไม่มีสิทธิ์
- แสดง Dialog ขอสิทธิ์เข้าถึงข้อมูล
- สถานะต่างๆ ที่แสดง:
  - **ยังไม่เคยขอสิทธิ์**: แสดงปุ่ม "ขอสิทธิ์ดูผลลัพธ์"
  - **กำลังรออนุมัติ**: แสดงสถานะ "คำขอสิทธิ์ของคุณกำลังรออนุมัติ"
  - **ถูกปฏิเสธ**: แสดงเหตุผลและปุ่ม "ขอสิทธิ์อีกครั้ง"
  - **ยังไม่ล็อกอิน**: แสดงปุ่ม "เข้าสู่ระบบด้วย Google"

#### กรณีมีสิทธิ์
- แสดง dropdown menu ให้เลือกดู Dashboard หรือ ข้อมูลทั้งหมด

### 3. UI/UX Improvements

#### Dropdown Menu
- เปิด/ปิด ด้วยการคลิกปุ่ม `ผลการตอบแบบสอบถาม`
- ปิดอัตโนมัติเมื่อคลิกนอกพื้นที่ dropdown
- แสดง icon ลูกศรชี้ลง/ขึ้น ตามสถานะ
- Highlight tab ที่กำลังใช้งานอยู่

#### การเข้าถึงแบบลัด
- ผู้ใช้สามารถกดปุ่ม `ผลการตอบแบบสอบถาม` เพื่อขอสิทธิ์ได้ทันที
- ไม่ต้องสลับ tab ก่อนขอสิทธิ์

## โครงสร้างโค้ด

### State Variables ที่เพิ่มใหม่

```javascript
// Survey results dropdown state
const [showSurveyResultsDropdown, setShowSurveyResultsDropdown] = useState(false);
const dropdownRef = useRef(null);
```

### Click Outside Handler

```javascript
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSurveyResultsDropdown(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
```

### Button Logic

```javascript
<button onClick={() => {
  if (!accessCheck?.has_access && !accessCheck?.is_owner) {
    setShowAccessDialog(true);
  } else {
    setShowSurveyResultsDropdown(!showSurveyResultsDropdown);
  }
}}>
  📊 ผลการตอบแบบสอบถาม
  <svg>...</svg>
</button>
```

## Flow Diagram

```
กดปุ่ม "ผลการตอบแบบสอบถาม"
         │
         ▼
  ┌──────────────┐
  │ ตรวจสอบสิทธิ์ │
  └──────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
ไม่มีสิทธิ์   มีสิทธิ์
    │         │
    ▼         ▼
แสดง Dialog  แสดง Dropdown
ขอสิทธิ์     │
         ┌───┴───┐
         │       │
         ▼       ▼
    Dashboard  ข้อมูลทั้งหมด
```

## การทดสอบ

### Test Cases

1. **ผู้ใช้ทั่วไป (ไม่มีสิทธิ์)**
   - [ ] กดปุ่ม "ผลการตอบแบบสอบถาม" → แสดง Dialog ขอสิทธิ์
   - [ ] กรอกเหตุผล → ส่งคำขอ → แสดงสถานะรออนุมัติ

2. **เจ้าของแบบฟอร์ม**
   - [ ] กดปุ่ม "ผลการตอบแบบสอบถาม" → แสดง Dropdown
   - [ ] เลือก Dashboard → แสดงหน้า Dashboard
   - [ ] เลือก ข้อมูลทั้งหมด → แสดงหน้า Records

3. **ผู้ได้รับสิทธิ์**
   - [ ] เหมือนเจ้าของแบบฟอร์ม

4. **Dropdown Behavior**
   - [ ] คลิกปุ่ม → เปิด dropdown
   - [ ] คลิกปุ่มอีกครั้ง → ปิด dropdown
   - [ ] คลิกนอก dropdown → ปิด dropdown
   - [ ] เลือก tab → ปิด dropdown และแสดง tab ที่เลือก

## ไฟล์ที่เกี่ยวข้อง

- `resources/js/pages/forms/SurveyFormRenderer.jsx` - ไฟล์หลักที่แก้ไข

## API Endpoints ที่ใช้

```
GET  /forms/{uuid}/access/check      - ตรวจสอบสิทธิ์
POST /forms/{uuid}/access/request    - ขอสิทธิ์
GET  /forms/{uuid}/submissions       - ดึงข้อมูล submissions
```

## ประโยชน์ที่ได้รับ

1. **UI สะอาดขึ้น** - ลดจำนวนปุ่มที่แสดงพร้อมกัน
2. **การจัดกลุ่มที่ดีขึ้น** - แยกชัดเจนระหว่าง "ตอบแบบสอบถาม" และ "ดูผลลัพธ์"
3. **การควบคุมสิทธิ์** - ตรวจสอบสิทธิ์ก่อนเข้าถึงข้อมูล
4. **UX ที่ดีขึ้น** - Dialog ขอสิทธิ์ที่ชัดเจน เป็นมิตรกับผู้ใช้

## หมายเหตุ

- การควบคุมสิทธิ์ยังคงใช้ระบบเดิม (access_check, access_request)
- ไม่มีการเปลี่ยนแปลง logic การคำนวณสถิติหรือการแสดงผล
- การเปลี่ยนแปลงเป็นส่วนของ UI เท่านั้น

## ผู้ดูแลระบบ

ในการอนุมัติคำขอสิทธิ์:
1. เข้าหน้า Admin Dashboard
2. ไปที่ Form Access Requests
3. ตรวจสอบเหตุผลและอนุมัติ/ปฏิเสธ

## การ rollback

หากต้องการย้อนกลับ:
1. เปิดไฟล์ `SurveyFormRenderer.jsx`
2. ค้นหา commit ก่อนหน้านี้
3. Restore โค้ดเดิม

---

**เวอร์ชัน:** 1.0  
**วันที่:** 25 มีนาคม 2569  
**ผู้เขียน:** AI Assistant
