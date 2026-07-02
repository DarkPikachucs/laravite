import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CreateInput } from "thai-address-autocomplete-react";

const InputThaiAddress = CreateInput();

// ─────────────────────────────────────────────────────────────
// SURVEY SCHEMA  (paste survey.schema.js content here, or import)
// ─────────────────────────────────────────────────────────────
const SURVEY_SCHEMA = {
  id: "fgd_community_survey",
  title: "แบบฟอร์มการสนทนากลุ่ม (Focus Group Discussion : FGD)",
  subtitle: "เพื่อใช้ในการรับฟังความคิดเห็นของผู้มีส่วนได้ส่วนเสียสำหรับประกอบการจัดทำแผนพัฒนาจังหวัด",
  storagePrefix: "fgd:",
  sections: [
    {
      id: "part1", num: 1, title: "ส่วนที่ 1: ข้อมูลทั่วไปของพื้นที่และกลุ่มเป้าหมาย", subtitle: null,
      fields: [
        {
          id: "gender", label: "1. เพศ", type: "radio+text", required: true, otherValue: "อื่นๆ", otherPlaceholder: "โปรดระบุ...", otherField: "genderOther",
          options: [{ value: "ชาย", label: "ชาย" }, { value: "หญิง", label: "หญิง" }, { value: "อื่นๆ", label: "อื่น ๆ" }]
        },
        {
          id: "age", label: "2. อายุ", type: "radio", required: true,
          options: [{ value: "18-25", label: "18-25 ปี" }, { value: "26-35", label: "26-35 ปี" }, { value: "36-45", label: "36-45 ปี" }, { value: "46-59", label: "46-59 ปี" }, { value: "60+", label: "60 ปีขึ้นไป" }]
        },
        {
          id: "location", label: "3. พื้นที่/ที่อยู่", type: "selectLocation", required: true,
        },
        {
          id: "fragile", label: "4. สภาพเปราะบาง", type: "checkbox+text", required: true,
          toggle: { field: "fragileMode", positiveValue: "fragile", negativeValue: "none", positiveLabel: "มีสภาพเปราะบาง", negativeLabel: "ไม่มีสภาพเปราะบาง" },
          showWhen: { field: "fragileMode", value: "fragile" },
          otherField: "fragileOther", otherPlaceholder: "โปรดระบุ...",
          note: "โปรดระบุ (เลือกได้มากกว่า 1 ข้อ)",
          options: [
            { value: "ภาวะที่เจ็บป่วยทางกาย", label: "ภาวะที่เจ็บป่วยทางกาย เช่น ผู้ป่วยที่รักษาไม่หาย ผู้ป่วยฉุกเฉิน" },
            { value: "คนพิการทางจิตสังคม", label: "คนพิการทางจิตสังคม (Psycho Social Disability)" },
            { value: "ผู้สูงอายุ", label: "ผู้สูงอายุ" }, { value: "คนพิการ", label: "คนพิการ" },
            { value: "ชาติพันธุ์ ชนกลุ่มน้อย แรงงานต่างด้าว", label: "ชาติพันธุ์ ชนกลุ่มน้อย แรงงานต่างด้าว" },
            { value: "คนไร้บ้าน คนเร่ร่อน คนยากจน", label: "คนไร้บ้าน คนเร่ร่อน คนยากจนลูกจ้างชั่วคราว/รายวัน" },
            { value: "เยาวชน นักเรียน นักศึกษา คนตกงาน", label: "เยาวชน นักเรียน นักศึกษา คนตกงาน" },
            { value: "คนไร้สัญชาติ", label: "คนไร้สัญชาติ" }, { value: "ผู้มีความหลากหลายทางเพศ", label: "ผู้มีความหลากหลายทางเพศ (LBGTI)" },
            { value: "ไม่รู้หนังสือ", label: "ไม่รู้หนังสือ" }, { value: "คนไม่พูดภาษาไทย", label: "คนไม่พูดภาษาไทย" }, { value: "แม่เลี้ยงเดี่ยว", label: "แม่เลี้ยงเดี่ยว" },
          ]
        },
        {
          id: "religion", label: "5. ศาสนา", type: "radio+text", required: true, otherValue: "อื่นๆ", otherPlaceholder: "โปรดระบุ...", otherField: "religionOther",
          options: [{ value: "พุทธ", label: "พุทธ" }, { value: "อิสลาม", label: "อิสลาม" }, { value: "คริสต์", label: "คริสต์" }, { value: "อื่นๆ", label: "อื่น ๆ" }]
        },
        {
          id: "marital", label: "6. สถานภาพสมรส", type: "radio", required: true,
          options: [{ value: "โสด", label: "โสด" }, { value: "สมรส", label: "สมรส" }, { value: "หม้าย", label: "หม้าย" }, { value: "หย่าร้าง", label: "หย่าร้าง" }, { value: "แยกกันอยู่", label: "แยกกันอยู่" }]
        },
        {
          id: "education", label: "7. การศึกษา", type: "radio", required: true,
          options: [{ value: "ประถมหรือต่ำกว่า", label: "ประถมศึกษาหรือต่ำกว่า" }, { value: "มัธยมหรือเทียบเท่า", label: "มัธยมศึกษาหรือเทียบเท่า" }, { value: "อนุปริญญา", label: "อนุปริญญาตรีหรือเทียบเท่า" }, { value: "ปริญญาตรี", label: "ปริญญาตรีหรือเทียบเท่า" }, { value: "สูงกว่าปริญญาตรี", label: "สูงกว่าปริญญาตรีหรือเทียบเท่า" }]
        },
        {
          id: "occupation", label: "8. อาชีพ", type: "radio+text", required: true, otherValue: "อื่นๆ", otherPlaceholder: "โปรดระบุ...", otherField: "occupationOther",
          options: [{ value: "ข้าราชการ/ลูกจ้าง/พนักงานรัฐ", label: "ข้าราชการ/ลูกจ้าง/พนักงานรัฐวิสาหกิจ" }, { value: "พนักงานเอกชน", label: "พนักงานเอกชน" }, { value: "เจ้าของธุรกิจ/อาชีพอิสระ", label: "เจ้าของธุรกิจส่วนตัว/อาชีพอิสระ" }, { value: "เกษตรกร/ประมง", label: "เกษตรกร/ประมง" }, { value: "รับจ้างทั่วไป/ผู้ใช้แรงงาน", label: "รับจ้างทั่วไป/ผู้ใช้แรงงาน" }, { value: "พ่อบ้าน/แม่บ้าน/เกษียณ/ว่างงาน", label: "พ่อบ้าน/แม่บ้าน/เกษียณอายุ/ว่างงาน" }, { value: "นักเรียน/นักศึกษา", label: "นักเรียน/นักศึกษา" }, { value: "อื่นๆ", label: "อื่น ๆ" }]
        },
        {
          id: "income", label: "9. รายได้", type: "radio", required: true,
          options: [{ value: "ไม่มีรายได้", label: "ไม่มีรายได้" }, { value: "ไม่เกิน 10,000", label: "ไม่เกิน 10,000 บาท" }, { value: "10,001-20,000", label: "10,001-20,000 บาท" }, { value: "20,001-30,000", label: "20,001-30,000 บาท" }, { value: "30,001-40,000", label: "30,001-40,000 บาท" }, { value: "40,001+", label: "40,001 บาทขึ้นไป" }, { value: "ไม่ระบุ", label: "ไม่ระบุ" }]
        },
      ],
    },
    {
      id: "part2", num: 2, title: "ประเมิน 21 ประเด็นการพัฒนา", subtitle: "ให้คะแนน 0-10 | 10 = มากที่สุด, 0 = น้อยที่สุด",
      fields: [{
        id: "sdg_matrix", type: "score_matrix", required: true, scale: { min: 0, max: 10 },
        columns: [
          { id: "urgency", label: "ความจำเป็นเร่งด่วน", subLabel: "จำเป็นมากที่สุด", color: "#3b82f6" },
          { id: "action", label: "มีการดำเนินการแก้ไข/จัดการ", subLabel: "ดำเนินการเป็นอย่างดี", color: "#10b981" },
          { id: "result", label: "ผลลัพธ์การดำเนินการ", subLabel: "มีประสิทธิภาพมากที่สุด", color: "#f59e0b" },
        ],
        rows: [
          { id: "r01", label: "1. การแก้ไขความยากจน" },
          { id: "r02", label: "2. การพัฒนาเกษตรกรรายย่อยเพื่อส่งเสริมระบบอาหารที่ยั่งยืน" },
          { id: "r03", label: "3. การมีสุขภาพและโภชนาการที่ดี" },
          { id: "r04", label: "4. การมีสุขภาพจิตที่ดี (Mental Health)" },
          { id: "r05", label: "5. ความปลอดภัยบนท้องถนน" },
          { id: "r06", label: "6. การศึกษาที่มีคุณภาพ" },
          { id: "r07", label: "7. การมีทักษะที่จำเป็นต่อการประกอบอาชีพ" },
          { id: "r08", label: "8. การขจัดความรุนแรงทางเพศในพื้นที่ส่วนตัวและสาธารณะ" },
          { id: "r09", label: "9. การมีส่วนร่วมและเข้าถึงโอกาสอย่างเท่าเทียมของผู้หญิงและผู้มีความหลากหลายทางเพศ" },
          { id: "r10", label: "10. การมีและเข้าถึงน้ำสะอาดสำหรับดื่มและใช้" },
          { id: "r11", label: "11. การมีและเข้าถึงพลังงานสะอาดได้อย่างถ้วนหน้า" },
          { id: "r12", label: "12. การจ้างงานและเข้าถึงโอกาสการทำงานที่ดี" },
          { id: "r13", label: "13. การปรับตัวสู่การเป็นเศรษฐกิจสีเขียว (ออกแบบโครงสร้างพื้นฐาน ถนน น้ำ ไฟ อาคารบ้านเรือน)" },
          { id: "r14", label: "14. การมีส่วนร่วมในการเสนอนโยบายเพื่อคุณภาพชีวิตที่ดีขึ้น" },
          { id: "r15", label: "15. การแก้ไขปัญหามลพิษทางอากาศ" },
          { id: "r16", label: "16. การรับมือและลดผลกระทบจากภัยพิบัติทางธรรมชาติ" },
          { id: "r17", label: "17. การแก้ไขปัญหามลพิษทางน้ำ" },
          { id: "r18", label: "18. การจัดการขยะ (Reduce Reuse Recycle)" },
          { id: "r19", label: "19. การสร้างความตระหนักรู้เรื่องผลกระทบของการเปลี่ยนแปลงสภาพภูมิอากาศหรือภาวะโลกรวนและภาวะโลกร้อน (Climate Change)" },
          { id: "r20", label: "20. การจัดการพื้นที่ป่าและพื้นที่สีเขียวอย่างมีส่วนร่วม" },
          { id: "r21", label: "21. การจัดการบริการสาธารณะที่มีคุณภาพและเผยแพร่ข้อมูลสาธารณะอย่างโปร่งใส" },
        ],
      }],
    },
    {
      id: "part3", num: 3, title: "แนวทางพัฒนาคุณภาพชีวิต", subtitle: "เลือก 3 ข้อที่สำคัญที่สุดสำหรับท่าน",
      fields: [{
        id: "guidelines", type: "pick_n", required: true, max: 3,
        hint: "เลือกแนวทางที่จะทำให้คุณภาพชีวิตของท่านดีขึ้น (เลือก 3 ข้อที่สำคัญที่สุด)",
        options: [
          { value: "3.1", label: "3.1 มีการพัฒนาและปรับปรุงนโยบายของท้องถิ่นที่เหมาะสม" },
          { value: "3.2", label: "3.2 มีการจัดทำโครงการด้านสังคมและเศรษฐกิจเพื่อการพัฒนาในท้องถิ่นอย่างทั่วถึง" },
          { value: "3.3", label: "3.3 มีการส่งเสริมบทบาทการมีส่วนร่วมในชุมชนอย่างเท่าเทียมในทุกเพศสภาพ" },
          { value: "3.4", label: "3.4 มีการสร้างความร่วมมือต่อการกำหนดนโยบายพัฒนาในชุมชนอย่างมีประสิทธิภาพ" },
          { value: "3.5", label: "3.5 มีการกระจายทรัพยากรทุน และ อำนาจ ในการบริหารจัดการท้องถิ่น" },
          { value: "3.6", label: "3.6 มีพื้นที่แลกเปลี่ยนองค์ความรู้ท้องถิ่นระหว่างสมาชิกในชุมชน และนำมาปรับใช้กับการพัฒนา" },
          { value: "3.7", label: "3.7 มีการให้ความรู้ด้านการอนุรักษ์สิ่งแวดล้อมและการจัดการขยะ" },
          { value: "3.8", label: "3.8 ไม่มีการทุจริตคอรัปชั่นและเพิ่มประสิทธิภาพการเปิดเผยข้อมูลเพื่อการบริหารงานที่โปร่งใส" },
        ],
      }],
    },
    {
      id: "part4", num: 4, title: "ความสอดคล้องกับแผนยุทธศาสตร์", subtitle: "เลือกแผนที่เกี่ยวข้องและระบุประเด็น (เลือกอย่างน้อย 1 รายการในหัวข้อที่เลือก)",
      fields: [{
        id: "strategic_alignment", type: "multi_toggle_checkbox", required: true,
        label: "โปรดเลือกแผนที่สอดคล้องกับโครงการ/กิจกรรมของท่าน",
        items: [
          {
            id: "national_strategy",
            label: "ยุทธศาสตร์ชาติ",
            options: [
              "ด้านความมั่นคง",
              "ด้านการสร้างความสามารถในการแข่งขัน",
              "ด้านการสร้างเติบโตบนคุณภาพชีวิตที่เป็นมิตรต่อสิ่งแวดล้อม",
              "ด้านการพัฒนา และเสริมสร้างศักยภาพ ทรัพยากรมนุษย์",
              "ด้านการสร้างโอกาสและความเสมอภาคทางสังคม"
            ]
          },
          {
            id: "master_plan",
            label: "แผนแม่บทภายใต้ยุทธศาสตร์ชาติ",
            options: [
              "ประเด็นการเกษตร",
              "ประเด็นการท่องเที่ยว",
              "ประเด็นการพัฒนาศักยภาพคนตลอดช่วงชีวิต",
              "ประเด็นเศรษฐกิจฐานราก",
              "ประเด็นพลังทางสังคม",
              "ประเด็นการเติบโตอย่างยั่งยืน"
            ]
          },
          {
            id: "northern_plan",
            label: "(ร่าง) แผนพัฒนาภาคเหนือ พ.ศ. 2571-2575",
            options: [
              "เกษตรมูลค่าสูงบนฐานนวัตกรรมสีเขียวที่ตรวจสอบได้",
              "ท่องเที่ยวคุณภาพมูลค่าสูงและบริการสุขภาพระดับโลก",
              "อุตสาหกรรมนวัตกรรมฐานชีวภาพและดิจิทัลสีเขียว",
              "การค้า การค้าชายแดน และระบบโลจิสติกส์ที่เชื่อมโยงห่วงโซ่เศรษฐกิจภูมิภาค",
              "การเพิ่มผลิตภาพแรงงานและยกระดับคุณภาพชีวิต",
              "การจัดการทรัพยากรธรรมชาติและมลพิษเชิงรุก"
            ]
          }
        ]
      }]
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// STATE HELPERS  — derive initial state from schema
// ─────────────────────────────────────────────────────────────
function buildInitialAnswers(schema) {
  const ans = {};
  for (const section of schema.sections) {
    for (const field of section.fields) {
      switch (field.type) {
        case "radio": ans[field.id] = ""; break;
        case "radio+text": ans[field.id] = ""; if (field.otherField) ans[field.otherField] = ""; break;
        case "checkbox+text":
          ans[field.id] = [];
          if (field.otherField) ans[field.otherField] = "";
          if (field.toggle) ans[field.toggle.field] = field.toggle.negativeValue;
          break;
        case "score_matrix":
          ans[field.id] = {};
          for (const row of field.rows) {
            ans[field.id][row.id] = {};
            for (const col of field.columns) ans[field.id][row.id][col.id] = null;
          }
          break;
        case "pick_n": ans[field.id] = []; break;
        case "selectLocation":
          ans[field.id] = { moo: "", district: "", amphoe: "", province: "", zipcode: "" };
          break;
        case "multi_toggle_checkbox":
          ans[field.id] = {};
          break;
      }
    }
  }
  return ans;
}

function isSectionComplete(section, answers) {
  for (const field of section.fields) {
    if (!field.required) continue;
    const v = answers[field.id];
    switch (field.type) {
      case "radio": if (!v) return false; break;
      case "radio+text": if (!v) return false; break;
      case "checkbox+text":
        if (!answers[field.toggle?.field]) return false;
        break;
      case "score_matrix":
        for (const row of field.rows)
          for (const col of field.columns)
            if (answers[field.id]?.[row.id]?.[col.id] === null) return false;
        break;
      case "pick_n":
        if (!v || v.length < field.max) return false; break;
      case "selectLocation":
        if (!v) return false;
        const defaultRequired = ["district", "amphoe", "province"];
        const shownFields = !field.fields || field.fields === "all"
          ? ["moo", "district", "amphoe", "province"]
          : field.fields;
        for (const f of defaultRequired) {
          if (shownFields.includes(f) && !v[f]) return false;
        }
        break;
      case "multi_toggle_checkbox":
        if (!v || Object.keys(v).length === 0) return false;
        for (const parentId in v) {
          if (v[parentId].length === 0) return false;
        }
        break;
    }
  }
  return true;
}

// ─────────────────────────────────────────────────────────────
// PRIMITIVE UI COMPONENTS
// ─────────────────────────────────────────────────────────────
const S = {
  card: { background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" },
  cardPad: { padding: "28px 28px 20px" },
  badge: (bg, tc) => ({ background: bg, color: tc, padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }),
  btn: (bg, tc, extra = {}) => ({ padding: "11px 28px", background: bg, color: tc, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", ...extra }),
};

const SectionHeader = ({ section }) => (
  <div style={{ background: "linear-gradient(90deg,#1e3a8a,#1d4ed8)", color: "#fff", borderRadius: 12, padding: "16px 24px", marginBottom: 20 }}>
    <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 2, textTransform: "uppercase" }}>ตอนที่ {section.num}</div>
    <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{section.title}</div>
    {section.subtitle && <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{section.subtitle}</div>}
  </div>
);

const FieldWrapper = ({ label, required, children }) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 9 }}>
      {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
    </div>
    {children}
  </div>
);

const TextInput = ({ value, onChange, placeholder, width = 220 }) => (
  <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", width, marginTop: 8, outline: "none" }} />
);

// ─────────────────────────────────────────────────────────────
// FIELD RENDERERS  (one per field type)
// ─────────────────────────────────────────────────────────────

/** text */
const TextField = ({ field, answers, setAnswer }) => (
  <FieldWrapper label={field.label} required={field.required}>
    <input
      type="text"
      value={answers[field.id] || ""}
      onChange={(e) => setAnswer(field.id, e.target.value)}
      placeholder={field.placeholder}
      style={{
        width: "100%",
        padding: "10px 14px",
        borderRadius: 10,
        border: "1.5px solid #cbd5e1",
        fontSize: 14,
        fontFamily: "inherit",
        outline: "none",
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#1e40af")}
      onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
    />
  </FieldWrapper>
);

/** textarea */
const TextareaField = ({ field, answers, setAnswer }) => (
  <FieldWrapper label={field.label} required={field.required}>
    <textarea
      value={answers[field.id] || ""}
      onChange={(e) => setAnswer(field.id, e.target.value)}
      placeholder={field.placeholder}
      style={{
        width: "100%",
        minHeight: 120,
        padding: "10px 14px",
        borderRadius: 10,
        border: "1.5px solid #cbd5e1",
        fontSize: 14,
        fontFamily: "inherit",
        outline: "none",
        resize: "vertical",
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#1e40af")}
      onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
    />
  </FieldWrapper>
);

/** selectLocation */
const LocationField = ({ field, answers, setAnswer }) => {
  const address = answers[field.id] || { moo: "", district: "", amphoe: "", province: "", zipcode: "" };

  const handleAddressChange = (scope) => (value) => {
    const newAddress = { ...address, [scope]: value };
    setAnswer(field.id, newAddress);
  };

  const onSelect = (fullAddress) => {
    const { district, amphoe, province, zipcode } = fullAddress;
    setAnswer(field.id, { ...address, district, amphoe, province, zipcode });
  };

  const locationFilter = (item) => {
    if (!field.filters || field.filters === "all" || (typeof field.filters === "object" && Object.keys(field.filters).length === 0)) return true;
    for (const key in field.filters) {
      const allowedValues = field.filters[key];
      if (Array.isArray(allowedValues) && allowedValues.length > 0) {
        if (!allowedValues.includes(item[key])) return false;
      }
    }
    return true;
  };

  const shownFields = !field.fields || field.fields === "all"
    ? ["moo", "district", "amphoe", "province"]
    : field.fields;

  return (
    <FieldWrapper label={field.label} required={field.required}>
      <style>{`
        .thai-address-autocomplete { position: relative; width: 100%; }
        .thai-address-autocomplete-suggestions {
          position: absolute; top: 100%; left: 0; right: 0; z-index: 100;
          background: #fff; border: 1px solid #cbd5e1; border-radius: 8px;
          max-height: 200px; overflow-y: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .thai-address-autocomplete-suggestion {
          padding: 8px 12px; cursor: pointer; font-size: 14px;
        }
        .thai-address-autocomplete-suggestion:hover { background: #f1f5f9; }
        .location-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
        @media (max-width: 600px) { .location-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="location-grid">
        {shownFields.includes("moo") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>หมู่ที่</label>
            <input
              value={address.moo}
              onChange={(e) => handleAddressChange("moo")(e.target.value)}
              placeholder="หมู่ที่"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
        {shownFields.includes("district") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>ตำบล</label>
            <InputThaiAddress.District
              value={address.district}
              onChange={handleAddressChange("district")}
              onSelect={onSelect}
              filter={locationFilter}
              placeholder="ตำบล"
              style={{ borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
        {shownFields.includes("amphoe") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>อำเภอ</label>
            <InputThaiAddress.Amphoe
              value={address.amphoe}
              onChange={handleAddressChange("amphoe")}
              onSelect={onSelect}
              filter={locationFilter}
              placeholder="อำเภอ"
              style={{ borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
        {shownFields.includes("province") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>จังหวัด</label>
            <InputThaiAddress.Province
              value={address.province}
              onChange={handleAddressChange("province")}
              onSelect={onSelect}
              filter={locationFilter}
              placeholder="จังหวัด"
              style={{ borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
        {shownFields.includes("zipcode") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>รหัสไปรษณีย์</label>
            <InputThaiAddress.Zipcode
              value={address.zipcode}
              onChange={handleAddressChange("zipcode")}
              onSelect={onSelect}
              filter={locationFilter}
              placeholder="รหัสไปรษณีย์"
              style={{ borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
      </div>
    </FieldWrapper>
  );
};

/** radio */
const RadioField = ({ field, answers, setAnswer }) => (
  <FieldWrapper label={field.label} required={field.required}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
      {field.options.map(o => (
        <label key={o.value} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14, color: "#374151" }}>
          <input type="radio" name={field.id} value={o.value} checked={answers[field.id] === o.value}
            onChange={() => setAnswer(field.id, o.value)}
            style={{ accentColor: "#1e40af", width: 16, height: 16 }} />
          {o.label}
        </label>
      ))}
    </div>
  </FieldWrapper>
);

/** radio+text */
const RadioTextField = ({ field, answers, setAnswer }) => (
  <FieldWrapper label={field.label} required={field.required}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
      {field.options.map(o => (
        <label key={o.value} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14, color: "#374151" }}>
          <input type="radio" name={field.id} value={o.value} checked={answers[field.id] === o.value}
            onChange={() => setAnswer(field.id, o.value)}
            style={{ accentColor: "#1e40af", width: 16, height: 16 }} />
          {o.label}
        </label>
      ))}
    </div>
    {answers[field.id] === field.otherValue && field.otherField && (
      <TextInput value={answers[field.otherField] || ""} onChange={v => setAnswer(field.otherField, v)} placeholder={field.otherPlaceholder} />
    )}
  </FieldWrapper>
);

/** checkbox+text (with optional toggle) */
const CheckboxTextField = ({ field, answers, setAnswer }) => {
  const tog = field.toggle;
  const active = !tog || answers[tog.field] === tog.positiveValue;

  const toggleItem = (val) => {
    const cur = answers[field.id] || [];
    setAnswer(field.id, cur.includes(val) ? cur.filter(x => x !== val) : [...cur, val]);
  };

  return (
    <FieldWrapper label={field.label} required={field.required}>
      {/* top-level yes/no toggle */}
      {tog && (
        <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
          {[{ v: tog.positiveValue, l: tog.positiveLabel }, { v: tog.negativeValue, l: tog.negativeLabel }].map(o => (
            <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#374151" }}>
              <input type="radio" name={tog.field} value={o.v} checked={answers[tog.field] === o.v}
                onChange={() => { setAnswer(tog.field, o.v); if (o.v === tog.negativeValue) setAnswer(field.id, []); }}
                style={{ accentColor: "#1e40af", width: 16, height: 16 }} />
              {o.l}
            </label>
          ))}
        </div>
      )}

      {/* checkbox list */}
      {active && (
        <div style={{ background: "#f0f9ff", borderRadius: 10, padding: "14px 16px", border: "1px solid #bae6fd" }}>
          {field.note && <div style={{ fontSize: 12, color: "#0369a1", marginBottom: 10 }}>{field.note}</div>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px" }}>
            {field.options.map(o => (
              <label key={o.value} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: "#374151" }}>
                <input type="checkbox" checked={(answers[field.id] || []).includes(o.value)}
                  onChange={() => toggleItem(o.value)}
                  style={{ accentColor: "#1e40af" }} />
                {o.label}
              </label>
            ))}
          </div>
          {field.otherField && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <span style={{ fontSize: 13 }}>อื่น ๆ:</span>
              <TextInput value={answers[field.otherField] || ""} onChange={v => setAnswer(field.otherField, v)}
                placeholder={field.otherPlaceholder} width={200} />
            </div>
          )}
        </div>
      )}
    </FieldWrapper>
  );
};

/** score_matrix */
const ScoreMatrixField = ({ field, answers, setAnswer }) => {
  const matrix = answers[field.id] || {};
  const setScore = (rowId, colId, val) => {
    setAnswer(field.id, { ...matrix, [rowId]: { ...(matrix[rowId] || {}), [colId]: val } });
  };
  const totalCells = field.rows.length * field.columns.length;
  const filledCells = field.rows.reduce((acc, row) =>
    acc + field.columns.filter(col => matrix[row.id]?.[col.id] !== null && matrix[row.id]?.[col.id] !== undefined).length, 0);

  return (
    <div>
      <style>{`
        @media (max-width: 400px) {
          .score-matrix-grid {
            grid-template-columns: 250px repeat(var(--num-cols, 3), 1fr) !important;
          }
          .score-matrix-header-cell,
          .score-matrix-cell {
            padding: 12px 0 !important;
          }
        }
      `}</style>
      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
        ตอบแล้ว <strong style={{ color: "#1e3a8a" }}>{field.rows.filter(row => field.columns.every(col => matrix[row.id]?.[col.id] !== null && matrix[row.id]?.[col.id] !== undefined)).length}</strong>/{field.rows.length} ข้อ
        <span style={{ fontSize: 11, marginLeft: 8, color: "#94a3b8" }}>({filledCells}/{totalCells} ช่อง)</span>
      </div>

      {/* header */}
      <div style={{ display: "grid", gridTemplateColumns: `264px repeat(${field.columns.length}, 1fr)`, background: "#1e3a8a", color: "#fff", borderRadius: "10px 10px 0 0", overflow: "hidden" }} className="score-matrix-grid">
        <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700 }}>ประเด็นการพัฒนา</div>
        {field.columns.map(col => (
          <div key={col.id} style={{ padding: "12px 6px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.15)" }} className="score-matrix-header-cell">
            <div style={{ fontSize: 11, fontWeight: 700 }}>{col.label}</div>
            <div style={{ fontSize: 9, opacity: 0.7, marginTop: 2 }}>{col.subLabel}</div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px 0", opacity: 0.4 }}>
              <span style={{ fontSize: 8 }}>{field.scale.min}</span>
              <span style={{ fontSize: 8 }}>{Math.floor((field.scale.max + field.scale.min) / 2)}</span>
              <span style={{ fontSize: 8 }}>{field.scale.max}</span>
            </div>
          </div>
        ))}
      </div>

      {/* rows */}
      {field.rows.map((row, idx) => {
        const rowDone = field.columns.every(col => matrix[row.id]?.[col.id] !== null && matrix[row.id]?.[col.id] !== undefined);
        return (
          <div key={row.id} style={{ display: "grid", gridTemplateColumns: `264px repeat(${field.columns.length}, 1fr)`, borderBottom: "1px solid #f1f5f9", background: rowDone ? "#f0fdf4" : idx % 2 === 0 ? "#fff" : "#fafafa" }} className="score-matrix-grid">
            <div style={{ padding: "12px 16px", fontSize: 12.5, color: "#1e293b", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              {rowDone && <span style={{ color: "#16a34a", fontSize: 10, flexShrink: 0 }}>✓</span>}
              <span>{row.label}</span>
            </div>
            {field.columns.map(col => {
              const val = matrix[row.id]?.[col.id] ?? null;
              return (
                <div key={col.id} style={{ padding: "10px 4px", borderLeft: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }} className="score-matrix-cell">
                  <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                    {[...Array(field.scale.max - field.scale.min + 1)].map((_, i) => {
                      const n = field.scale.min + i;
                      return (
                        <button key={n} onClick={() => setScore(row.id, col.id, n)} style={{
                          width: 24, height: 24, borderRadius: 4,
                          border: val === n ? `2px solid ${col.color}` : "1.5px solid #cbd5e1",
                          background: val === n ? col.color : "#f8fafc",
                          color: val === n ? "#fff" : "#64748b",
                          fontWeight: val === n ? 700 : 400,
                          fontSize: 10, cursor: "pointer",
                          transform: val === n ? "scale(1.18)" : "scale(1)",
                          transition: "all 0.1s",
                        }}>{n}</button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

/** multi_toggle_checkbox */
const MultiToggleCheckboxField = ({ field, answers, setAnswer }) => {
  const currentVal = answers[field.id] || {}; // { parentId: [childValues] }

  const toggleParent = (parentId) => {
    const newVal = { ...currentVal };
    if (newVal[parentId]) {
      delete newVal[parentId];
    } else {
      newVal[parentId] = [];
    }
    setAnswer(field.id, newVal);
  };

  const toggleChild = (parentId, childVal) => {
    const children = currentVal[parentId] || [];
    const newChildren = children.includes(childVal)
      ? children.filter((c) => c !== childVal)
      : [...children, childVal];

    setAnswer(field.id, {
      ...currentVal,
      [parentId]: newChildren,
    });
  };

  return (
    <FieldWrapper label={field.label} required={field.required}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {field.items.map((item) => {
          const isParentChecked = !!currentVal[item.id];
          const hasChildrenSelected = (currentVal[item.id] || []).length > 0;
          return (
            <div key={item.id} style={{ border: isParentChecked ? "1.5px solid #1e40af" : "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden", transition: "all 0.2s" }}>
              <label style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                background: isParentChecked ? "#eff6ff" : "#fff", cursor: "pointer",
                fontWeight: 700, fontSize: 14, color: isParentChecked ? "#1e40af" : "#374151"
              }}>
                <input type="checkbox" checked={isParentChecked} onChange={() => toggleParent(item.id)}
                  style={{ accentColor: "#1e40af", width: 18, height: 18 }} />
                <div style={{ display: "flex", justifyContent: "space-between", flex: 1, alignItems: "center" }}>
                  <span>{item.label}</span>
                  {isParentChecked && !hasChildrenSelected && (
                    <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 400 }}>* โปรดเลือกประเด็น</span>
                  )}
                </div>
              </label>

              {isParentChecked && (
                <div style={{ padding: "12px 16px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8, fontWeight: 600 }}>โปรดเลือกอย่างน้อย 1 รายการ:</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {item.options.map((opt) => {
                      const isChildChecked = (currentVal[item.id] || []).includes(opt);
                      return (
                        <label key={opt} style={{
                          display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: isChildChecked ? "#1e3a8a" : "#475569",
                          padding: "6px 8px", borderRadius: 6, background: isChildChecked ? "#fff" : "transparent",
                          border: isChildChecked ? "1px solid #bfdbfe" : "1px solid transparent", transition: "all 0.1s"
                        }}>
                          <input type="checkbox" checked={isChildChecked} onChange={() => toggleChild(item.id, opt)}
                            style={{ accentColor: "#1e40af", marginTop: 3 }} />
                          <span style={{ lineHeight: 1.5, fontWeight: isChildChecked ? 600 : 400 }}>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FieldWrapper>
  );
};

/** pick_n */
const PickNField = ({ field, answers, setAnswer }) => {
  const selected = answers[field.id] || [];
  const toggle = (val) => {
    if (selected.includes(val)) setAnswer(field.id, selected.filter(x => x !== val));
    else if (selected.length < field.max) setAnswer(field.id, [...selected, val]);
  };

  return (
    <FieldWrapper label={field.hint || "เลือก"} required={field.required}>
      <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#92400e" }}>
        📌 เลือกแล้ว <strong>{selected.length}</strong>/{field.max} ข้อ
        {selected.length === field.max ? " ✅ ครบแล้ว" : ` (เลือกอีก ${field.max - selected.length} ข้อ)`}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {field.options.map(opt => {
          const checked = selected.includes(opt.value);
          const disabled = !checked && selected.length >= field.max;
          return (
            <label key={opt.value} style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px", borderRadius: 10,
              cursor: disabled ? "not-allowed" : "pointer",
              border: checked ? "2px solid #1e3a8a" : "1.5px solid #e2e8f0",
              background: checked ? "#eff6ff" : disabled ? "#f8fafc" : "#fff",
              opacity: disabled ? 0.5 : 1, transition: "all 0.15s",
            }}>
              <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(opt.value)}
                style={{ accentColor: "#1e40af", width: 16, height: 16, marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: checked ? "#1e3a8a" : "#374151", fontWeight: checked ? 700 : 400, lineHeight: 1.6 }}>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </FieldWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// GENERIC FIELD DISPATCHER
// ─────────────────────────────────────────────────────────────
    {
      id: "part6", num: 6, title: "ประเด็นท้าทายอื่นๆ (ระบุเพิ่มเอง)", subtitle: "ระบุประเด็นที่ท่านต้องการเสนอแนะเพิ่มเติมและประเมินระดับความสำคัญ",
      fields: [{
        id: "dynamic_issues", type: "dynamic_score_matrix", required: false,
        label: "เพิ่มประเด็นการพัฒนาที่ท่านสนใจ",
        scale: { min: 0, max: 10 },
        columns: [
          { id: "urgency", label: "ความจำเป็นเร่งด่วน", subLabel: "จำเป็นมากที่สุด", color: "#3b82f6" },
          { id: "action", label: "มีการดำเนินการแก้ไข/จัดการ", subLabel: "ดำเนินการเป็นอย่างดี", color: "#10b981" },
          { id: "result", label: "ผลลัพธ์การดำเนินการ", subLabel: "มีประสิทธิภาพมากที่สุด", color: "#f59e0b" },
        ],
      }]
    }
  ],
};

// ─────────────────────────────────────────────────────────────
// STATE HELPERS  — derive initial state from schema
// ─────────────────────────────────────────────────────────────
function buildInitialAnswers(schema) {
  const ans = {};
  for (const section of schema.sections) {
    for (const field of section.fields) {
      switch (field.type) {
        case "text":
        case "textarea":
        case "radio": ans[field.id] = ""; break;
        case "radio+text": ans[field.id] = ""; if (field.otherField) ans[field.otherField] = ""; break;
        case "checkbox+text":
          ans[field.id] = [];
          if (field.otherField) ans[field.otherField] = "";
          if (field.toggle) ans[field.toggle.field] = field.toggle.negativeValue;
          break;
        case "score_matrix":
          ans[field.id] = {};
          for (const row of field.rows) {
            ans[field.id][row.id] = {};
            for (const col of field.columns) ans[field.id][row.id][col.id] = null;
          }
          break;
        case "pick_n": ans[field.id] = []; break;
        case "selectLocation":
          ans[field.id] = { moo: "", district: "", amphoe: "", province: "", zipcode: "" };
          break;
        case "multi_toggle_checkbox":
          ans[field.id] = {};
          break;
        case "dynamic_score_matrix":
          ans[field.id] = []; // Array of { id, issue, reason, scores: { colId: val } }
          break;
      }
    }
  }
  return ans;
}

function isSectionComplete(section, answers) {
  for (const field of section.fields) {
    if (!field.required) continue;
    const v = answers[field.id];
    switch (field.type) {
      case "text":
      case "textarea":
      case "radio": if (!v) return false; break;
      case "radio+text": if (!v) return false; break;
      case "checkbox+text":
        if (!answers[field.toggle?.field]) return false;
        break;
      case "score_matrix":
        for (const row of field.rows)
          for (const col of field.columns)
            if (answers[field.id]?.[row.id]?.[col.id] === null) return false;
        break;
      case "pick_n":
        if (!v || v.length < field.max) return false; break;
      case "selectLocation":
        if (!v) return false;
        const defaultRequired = ["district", "amphoe", "province"];
        const shownFields = !field.fields || field.fields === "all"
          ? ["moo", "district", "amphoe", "province"]
          : field.fields;
        for (const f of defaultRequired) {
          if (shownFields.includes(f) && !v[f]) return false;
        }
        break;
      case "multi_toggle_checkbox":
        if (!v || Object.keys(v).length === 0) return false;
        for (const parentId in v) {
          if (v[parentId].length === 0) return false;
        }
        break;
      case "dynamic_score_matrix":
        if (!v || v.length === 0) return false;
        for (const row of v) {
          if (!row.issue?.trim() || !row.reason?.trim()) return false;
          for (const col of field.columns) {
            if (row.scores[col.id] === null || row.scores[col.id] === undefined) return false;
          }
        }
        break;
    }
  }
  return true;
}

// ─────────────────────────────────────────────────────────────
// PRIMITIVE UI COMPONENTS
// ─────────────────────────────────────────────────────────────
const S = {
  card: { background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", overflow: "hidden" },
  cardPad: { padding: "28px 28px 20px" },
  badge: (bg, tc) => ({ background: bg, color: tc, padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }),
  btn: (bg, tc, extra = {}) => ({ padding: "11px 28px", background: bg, color: tc, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", ...extra }),
};

const SectionHeader = ({ section }) => (
  <div style={{ background: "linear-gradient(90deg,#1e3a8a,#1d4ed8)", color: "#fff", borderRadius: 12, padding: "16px 24px", marginBottom: 20 }}>
    <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 2, textTransform: "uppercase" }}>ตอนที่ {section.num}</div>
    <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{section.title}</div>
    {section.subtitle && <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{section.subtitle}</div>}
  </div>
);

const FieldWrapper = ({ label, required, children }) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 9 }}>
      {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
    </div>
    {children}
  </div>
);

const TextInput = ({ value, onChange, placeholder, width = 220 }) => (
  <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", width, marginTop: 8, outline: "none" }} />
);

// ─────────────────────────────────────────────────────────────
// FIELD RENDERERS  (one per field type)
// ─────────────────────────────────────────────────────────────

/** text */
const TextField = ({ field, answers, setAnswer }) => (
  <FieldWrapper label={field.label} required={field.required}>
    <input
      type="text"
      value={answers[field.id] || ""}
      onChange={(e) => setAnswer(field.id, e.target.value)}
      placeholder={field.placeholder}
      style={{
        width: "100%",
        padding: "10px 14px",
        borderRadius: 10,
        border: "1.5px solid #cbd5e1",
        fontSize: 14,
        fontFamily: "inherit",
        outline: "none",
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#1e40af")}
      onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
    />
  </FieldWrapper>
);

/** textarea */
const TextareaField = ({ field, answers, setAnswer }) => (
  <FieldWrapper label={field.label} required={field.required}>
    <textarea
      value={answers[field.id] || ""}
      onChange={(e) => setAnswer(field.id, e.target.value)}
      placeholder={field.placeholder}
      style={{
        width: "100%",
        minHeight: 120,
        padding: "10px 14px",
        borderRadius: 10,
        border: "1.5px solid #cbd5e1",
        fontSize: 14,
        fontFamily: "inherit",
        outline: "none",
        resize: "vertical",
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#1e40af")}
      onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
    />
  </FieldWrapper>
);

/** selectLocation */
const LocationField = ({ field, answers, setAnswer }) => {
  const address = answers[field.id] || { moo: "", district: "", amphoe: "", province: "", zipcode: "" };

  const handleAddressChange = (scope) => (value) => {
    const newAddress = { ...address, [scope]: value };
    setAnswer(field.id, newAddress);
  };

  const onSelect = (fullAddress) => {
    const { district, amphoe, province, zipcode } = fullAddress;
    setAnswer(field.id, { ...address, district, amphoe, province, zipcode });
  };

  const locationFilter = (item) => {
    if (!field.filters || field.filters === "all" || (typeof field.filters === "object" && Object.keys(field.filters).length === 0)) return true;
    for (const key in field.filters) {
      const allowedValues = field.filters[key];
      if (Array.isArray(allowedValues) && allowedValues.length > 0) {
        if (!allowedValues.includes(item[key])) return false;
      }
    }
    return true;
  };

  const shownFields = !field.fields || field.fields === "all"
    ? ["moo", "district", "amphoe", "province"]
    : field.fields;

  return (
    <FieldWrapper label={field.label} required={field.required}>
      <style>{`
        .thai-address-autocomplete { position: relative; width: 100%; }
        .thai-address-autocomplete-suggestions {
          position: absolute; top: 100%; left: 0; right: 0; z-index: 100;
          background: #fff; border: 1px solid #cbd5e1; border-radius: 8px;
          max-height: 200px; overflow-y: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .thai-address-autocomplete-suggestion {
          padding: 8px 12px; cursor: pointer; font-size: 14px;
        }
        .thai-address-autocomplete-suggestion:hover { background: #f1f5f9; }
        .location-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
        @media (max-width: 600px) { .location-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="location-grid">
        {shownFields.includes("moo") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>หมู่ที่</label>
            <input
              value={address.moo}
              onChange={(e) => handleAddressChange("moo")(e.target.value)}
              placeholder="หมู่ที่"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
        {shownFields.includes("district") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>ตำบล</label>
            <InputThaiAddress.District
              value={address.district}
              onChange={handleAddressChange("district")}
              onSelect={onSelect}
              filter={locationFilter}
              placeholder="ตำบล"
              style={{ borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
        {shownFields.includes("amphoe") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>อำเภอ</label>
            <InputThaiAddress.Amphoe
              value={address.amphoe}
              onChange={handleAddressChange("amphoe")}
              onSelect={onSelect}
              filter={locationFilter}
              placeholder="อำเภอ"
              style={{ borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
        {shownFields.includes("province") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>จังหวัด</label>
            <InputThaiAddress.Province
              value={address.province}
              onChange={handleAddressChange("province")}
              onSelect={onSelect}
              filter={locationFilter}
              placeholder="จังหวัด"
              style={{ borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
        {shownFields.includes("zipcode") && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>รหัสไปรษณีย์</label>
            <InputThaiAddress.Zipcode
              value={address.zipcode}
              onChange={handleAddressChange("zipcode")}
              onSelect={onSelect}
              filter={locationFilter}
              placeholder="รหัสไปรษณีย์"
              style={{ borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
          </div>
        )}
      </div>
    </FieldWrapper>
  );
};

/** radio */
const RadioField = ({ field, answers, setAnswer }) => (
  <FieldWrapper label={field.label} required={field.required}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
      {field.options.map(o => (
        <label key={o.value} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14, color: "#374151" }}>
          <input type="radio" name={field.id} value={o.value} checked={answers[field.id] === o.value}
            onChange={() => setAnswer(field.id, o.value)}
            style={{ accentColor: "#1e40af", width: 16, height: 16 }} />
          {o.label}
        </label>
      ))}
    </div>
  </FieldWrapper>
);

/** radio+text */
const RadioTextField = ({ field, answers, setAnswer }) => (
  <FieldWrapper label={field.label} required={field.required}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
      {field.options.map(o => (
        <label key={o.value} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14, color: "#374151" }}>
          <input type="radio" name={field.id} value={o.value} checked={answers[field.id] === o.value}
            onChange={() => setAnswer(field.id, o.value)}
            style={{ accentColor: "#1e40af", width: 16, height: 16 }} />
          {o.label}
        </label>
      ))}
    </div>
    {answers[field.id] === field.otherValue && field.otherField && (
      <TextInput value={answers[field.otherField] || ""} onChange={v => setAnswer(field.otherField, v)} placeholder={field.otherPlaceholder} />
    )}
  </FieldWrapper>
);

/** checkbox+text (with optional toggle) */
const CheckboxTextField = ({ field, answers, setAnswer }) => {
  const tog = field.toggle;
  const active = !tog || answers[tog.field] === tog.positiveValue;

  const toggleItem = (val) => {
    const cur = answers[field.id] || [];
    setAnswer(field.id, cur.includes(val) ? cur.filter(x => x !== val) : [...cur, val]);
  };

  return (
    <FieldWrapper label={field.label} required={field.required}>
      {/* top-level yes/no toggle */}
      {tog && (
        <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
          {[{ v: tog.positiveValue, l: tog.positiveLabel }, { v: tog.negativeValue, l: tog.negativeLabel }].map(o => (
            <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#374151" }}>
              <input type="radio" name={tog.field} value={o.v} checked={answers[tog.field] === o.v}
                onChange={() => { setAnswer(tog.field, o.v); if (o.v === tog.negativeValue) setAnswer(field.id, []); }}
                style={{ accentColor: "#1e40af", width: 16, height: 16 }} />
              {o.l}
            </label>
          ))}
        </div>
      )}

      {/* checkbox list */}
      {active && (
        <div style={{ background: "#f0f9ff", borderRadius: 10, padding: "14px 16px", border: "1px solid #bae6fd" }}>
          {field.note && <div style={{ fontSize: 12, color: "#0369a1", marginBottom: 10 }}>{field.note}</div>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px" }}>
            {field.options.map(o => (
              <label key={o.value} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: "#374151" }}>
                <input type="checkbox" checked={(answers[field.id] || []).includes(o.value)}
                  onChange={() => toggleItem(o.value)}
                  style={{ accentColor: "#1e40af" }} />
                {o.label}
              </label>
            ))}
          </div>
          {field.otherField && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <span style={{ fontSize: 13 }}>อื่น ๆ:</span>
              <TextInput value={answers[field.otherField] || ""} onChange={v => setAnswer(field.otherField, v)}
                placeholder={field.otherPlaceholder} width={200} />
            </div>
          )}
        </div>
      )}
    </FieldWrapper>
  );
};

/** score_matrix */
const ScoreMatrixField = ({ field, answers, setAnswer }) => {
  const matrix = answers[field.id] || {};
  const setScore = (rowId, colId, val) => {
    setAnswer(field.id, { ...matrix, [rowId]: { ...(matrix[rowId] || {}), [colId]: val } });
  };
  const totalCells = field.rows.length * field.columns.length;
  const filledCells = field.rows.reduce((acc, row) =>
    acc + field.columns.filter(col => matrix[row.id]?.[col.id] !== null && matrix[row.id]?.[col.id] !== undefined).length, 0);

  return (
    <div>
      <style>{`
        @media (max-width: 400px) {
          .score-matrix-grid {
            grid-template-columns: 250px repeat(var(--num-cols, 3), 1fr) !important;
          }
          .score-matrix-header-cell,
          .score-matrix-cell {
            padding: 12px 0 !important;
          }
        }
      `}</style>
      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
        ตอบแล้ว <strong style={{ color: "#1e3a8a" }}>{field.rows.filter(row => field.columns.every(col => matrix[row.id]?.[col.id] !== null && matrix[row.id]?.[col.id] !== undefined)).length}</strong>/{field.rows.length} ข้อ
        <span style={{ fontSize: 11, marginLeft: 8, color: "#94a3b8" }}>({filledCells}/{totalCells} ช่อง)</span>
      </div>

      {/* header */}
      <div style={{ display: "grid", gridTemplateColumns: `264px repeat(${field.columns.length}, 1fr)`, background: "#1e3a8a", color: "#fff", borderRadius: "10px 10px 0 0", overflow: "hidden" }} className="score-matrix-grid">
        <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700 }}>ประเด็นการพัฒนา</div>
        {field.columns.map(col => (
          <div key={col.id} style={{ padding: "12px 6px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.15)" }} className="score-matrix-header-cell">
            <div style={{ fontSize: 11, fontWeight: 700 }}>{col.label}</div>
            <div style={{ fontSize: 9, opacity: 0.7, marginTop: 2 }}>{col.subLabel}</div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 8px 0", opacity: 0.4 }}>
              <span style={{ fontSize: 8 }}>{field.scale.min}</span>
              <span style={{ fontSize: 8 }}>{Math.floor((field.scale.max + field.scale.min) / 2)}</span>
              <span style={{ fontSize: 8 }}>{field.scale.max}</span>
            </div>
          </div>
        ))}
      </div>

      {/* rows */}
      {field.rows.map((row, idx) => {
        const rowDone = field.columns.every(col => matrix[row.id]?.[col.id] !== null && matrix[row.id]?.[col.id] !== undefined);
        return (
          <div key={row.id} style={{ display: "grid", gridTemplateColumns: `264px repeat(${field.columns.length}, 1fr)`, borderBottom: "1px solid #f1f5f9", background: rowDone ? "#f0fdf4" : idx % 2 === 0 ? "#fff" : "#fafafa" }} className="score-matrix-grid">
            <div style={{ padding: "12px 16px", fontSize: 12.5, color: "#1e293b", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              {rowDone && <span style={{ color: "#16a34a", fontSize: 10, flexShrink: 0 }}>✓</span>}
              <span>{row.label}</span>
            </div>
            {field.columns.map(col => {
              const val = matrix[row.id]?.[col.id] ?? null;
              return (
                <div key={col.id} style={{ padding: "10px 4px", borderLeft: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }} className="score-matrix-cell">
                  <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                    {[...Array(field.scale.max - field.scale.min + 1)].map((_, i) => {
                      const n = field.scale.min + i;
                      return (
                        <button key={n} onClick={() => setScore(row.id, col.id, n)} style={{
                          width: 24, height: 24, borderRadius: 4,
                          border: val === n ? `2px solid ${col.color}` : "1.5px solid #cbd5e1",
                          background: val === n ? col.color : "#f8fafc",
                          color: val === n ? "#fff" : "#64748b",
                          fontWeight: val === n ? 700 : 400,
                          fontSize: 10, cursor: "pointer",
                          transform: val === n ? "scale(1.18)" : "scale(1)",
                          transition: "all 0.1s",
                        }}>{n}</button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

/** multi_toggle_checkbox */
const MultiToggleCheckboxField = ({ field, answers, setAnswer }) => {
  const currentVal = answers[field.id] || {}; // { parentId: [childValues] }

  const toggleParent = (parentId) => {
    const newVal = { ...currentVal };
    if (newVal[parentId]) {
      delete newVal[parentId];
    } else {
      newVal[parentId] = [];
    }
    setAnswer(field.id, newVal);
  };

  const toggleChild = (parentId, childVal) => {
    const children = currentVal[parentId] || [];
    const newChildren = children.includes(childVal)
      ? children.filter((c) => c !== childVal)
      : [...children, childVal];

    setAnswer(field.id, {
      ...currentVal,
      [parentId]: newChildren,
    });
  };

  return (
    <FieldWrapper label={field.label} required={field.required}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {field.items.map((item) => {
          const isParentChecked = !!currentVal[item.id];
          const hasChildrenSelected = (currentVal[item.id] || []).length > 0;
          return (
            <div key={item.id} style={{ border: isParentChecked ? "1.5px solid #1e40af" : "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden", transition: "all 0.2s" }}>
              <label style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                background: isParentChecked ? "#eff6ff" : "#fff", cursor: "pointer",
                fontWeight: 700, fontSize: 14, color: isParentChecked ? "#1e40af" : "#374151"
              }}>
                <input type="checkbox" checked={isParentChecked} onChange={() => toggleParent(item.id)}
                  style={{ accentColor: "#1e40af", width: 18, height: 18 }} />
                <div style={{ display: "flex", justifyContent: "space-between", flex: 1, alignItems: "center" }}>
                  <span>{item.label}</span>
                  {isParentChecked && !hasChildrenSelected && (
                    <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 400 }}>* โปรดเลือกประเด็น</span>
                  )}
                </div>
              </label>

              {isParentChecked && (
                <div style={{ padding: "12px 16px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8, fontWeight: 600 }}>โปรดเลือกอย่างน้อย 1 รายการ:</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {item.options.map((opt) => {
                      const isChildChecked = (currentVal[item.id] || []).includes(opt);
                      return (
                        <label key={opt} style={{
                          display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: isChildChecked ? "#1e3a8a" : "#475569",
                          padding: "6px 8px", borderRadius: 6, background: isChildChecked ? "#fff" : "transparent",
                          border: isChildChecked ? "1px solid #bfdbfe" : "1px solid transparent", transition: "all 0.1s"
                        }}>
                          <input type="checkbox" checked={isChildChecked} onChange={() => toggleChild(item.id, opt)}
                            style={{ accentColor: "#1e40af", marginTop: 3 }} />
                          <span style={{ lineHeight: 1.5, fontWeight: isChildChecked ? 600 : 400 }}>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FieldWrapper>
  );
};

/** pick_n */
const PickNField = ({ field, answers, setAnswer }) => {
  const selected = answers[field.id] || [];
  const toggle = (val) => {
    if (selected.includes(val)) setAnswer(field.id, selected.filter(x => x !== val));
    else if (selected.length < field.max) setAnswer(field.id, [...selected, val]);
  };

  return (
    <FieldWrapper label={field.hint || "เลือก"} required={field.required}>
      <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#92400e" }}>
        📌 เลือกแล้ว <strong>{selected.length}</strong>/{field.max} ข้อ
        {selected.length === field.max ? " ✅ ครบแล้ว" : ` (เลือกอีก ${field.max - selected.length} ข้อ)`}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {field.options.map(opt => {
          const checked = selected.includes(opt.value);
          const disabled = !checked && selected.length >= field.max;
          return (
            <label key={opt.value} style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px", borderRadius: 10,
              cursor: disabled ? "not-allowed" : "pointer",
              border: checked ? "2px solid #1e3a8a" : "1.5px solid #e2e8f0",
              background: checked ? "#eff6ff" : disabled ? "#f8fafc" : "#fff",
              opacity: disabled ? 0.5 : 1, transition: "all 0.15s",
            }}>
              <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(opt.value)}
                style={{ accentColor: "#1e40af", width: 16, height: 16, marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: checked ? "#1e3a8a" : "#374151", fontWeight: checked ? 700 : 400, lineHeight: 1.6 }}>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </FieldWrapper>
  );
};

/** dynamic_score_matrix */
const DynamicScoreMatrixField = ({ field, answers, setAnswer }) => {
  const rows = answers[field.id] || [];

  const addRow = () => {
    const newRow = {
      id: Date.now().toString(),
      issue: "",
      reason: "",
      scores: field.columns.reduce((acc, col) => ({ ...acc, [col.id]: null }), {}),
    };
    setAnswer(field.id, [...rows, newRow]);
  };

  const removeRow = (id) => {
    setAnswer(field.id, rows.filter((r) => r.id !== id));
  };

  const updateRow = (id, key, val) => {
    setAnswer(
      field.id,
      rows.map((r) => (r.id === id ? { ...r, [key]: val } : r))
    );
  };

  const setScore = (rowId, colId, val) => {
    setAnswer(
      field.id,
      rows.map((r) =>
        r.id === rowId ? { ...r, scores: { ...r.scores, [colId]: val } } : r
      )
    );
  };

  return (
    <FieldWrapper label={field.label} required={field.required}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {rows.map((row, idx) => (
          <div key={row.id} style={{ border: "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
            <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#1e3a8a" }}>รายการที่ {idx + 1}</span>
              <button onClick={() => removeRow(row.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🗑️ ลบรายการนี้</button>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>ประเด็นการพัฒนา</label>
                <input
                  type="text"
                  value={row.issue}
                  onChange={(e) => updateRow(row.id, "issue", e.target.value)}
                  placeholder="เช่น การแก้ปัญหาน้ำเสียในคลอง..."
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>เหตุผลความจำเป็น</label>
                <textarea
                  value={row.reason}
                  onChange={(e) => updateRow(row.id, "reason", e.target.value)}
                  placeholder="ระบุเหตุผลความจำเป็น..."
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #cbd5e1", fontSize: 14, outline: "none", minHeight: 60 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {field.columns.map((col) => (
                  <div key={col.id} style={{ background: "#f0f9ff", padding: 10, borderRadius: 8, border: "1px solid #bae6fd" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#0369a1", marginBottom: 2 }}>{col.label}</div>
                    <div style={{ fontSize: 9, color: "#0ea5e9", marginBottom: 6 }}>{col.subLabel}</div>
                    <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                      {[...Array(field.scale.max - field.scale.min + 1)].map((_, i) => {
                        const n = field.scale.min + i;
                        const val = row.scores[col.id];
                        return (
                          <button key={n} onClick={() => setScore(row.id, col.id, n)} style={{
                            width: 22, height: 22, borderRadius: 4,
                            border: val === n ? `2px solid ${col.color}` : "1.5px solid #cbd5e1",
                            background: val === n ? col.color : "#fff",
                            color: val === n ? "#fff" : "#64748b",
                            fontSize: 10, fontWeight: val === n ? 700 : 400, cursor: "pointer",
                            transition: "all 0.1s"
                          }}>{n}</button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button onClick={addRow} style={{
          padding: "12px", background: "#fff", color: "#1e40af", border: "2px dashed #1e40af",
          borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s"
        }}>
          ➕ เพิ่มรายการใหม่
        </button>
      </div>
    </FieldWrapper>
  );
};

// ─────────────────────────────────────────────────────────────
// GENERIC FIELD DISPATCHER
// ─────────────────────────────────────────────────────────────
const FieldRenderer = ({ field, answers, setAnswer }) => {
  switch (field.type) {
    case "text": return <TextField field={field} answers={answers} setAnswer={setAnswer} />;
    case "textarea": return <TextareaField field={field} answers={answers} setAnswer={setAnswer} />;
    case "selectLocation": return <LocationField field={field} answers={answers} setAnswer={setAnswer} />;
    case "radio": return <RadioField field={field} answers={answers} setAnswer={setAnswer} />;
    case "radio+text": return <RadioTextField field={field} answers={answers} setAnswer={setAnswer} />;
    case "checkbox+text": return <CheckboxTextField field={field} answers={answers} setAnswer={setAnswer} />;
    case "score_matrix": return <ScoreMatrixField field={field} answers={answers} setAnswer={setAnswer} />;
    case "pick_n": return <PickNField field={field} answers={answers} setAnswer={setAnswer} />;
    case "multi_toggle_checkbox": return <MultiToggleCheckboxField field={field} answers={answers} setAnswer={setAnswer} />;
    case "dynamic_score_matrix": return <DynamicScoreMatrixField field={field} answers={answers} setAnswer={setAnswer} />;
    default: return <div style={{ color: "red" }}>Unknown field type: {field.type}</div>;
  }
};

// ─────────────────────────────────────────────────────────────
// DASHBOARD VIEW - แสดงสถิติภาพรวม
// ─────────────────────────────────────────────────────────────
const DashboardView = ({ schema, records, loading, onRefresh }) => {
  const submissions = Array.isArray(records) ? records : [];

  // Calculate statistics
  const stats = {
    total: submissions.length,
    gender: {},
    age: {},
    education: {},
    occupation: {},
    income: {},
    matrixAvg: {},
    guidelines: {},
  };

  submissions.forEach(sub => {
    const responses = sub.responses || sub.answers || {};

    // Gender
    if (responses.gender) {
      stats.gender[responses.gender] = (stats.gender[responses.gender] || 0) + 1;
    }

    // Age
    if (responses.age) {
      stats.age[responses.age] = (stats.age[responses.age] || 0) + 1;
    }

    // Education
    if (responses.education) {
      stats.education[responses.education] = (stats.education[responses.education] || 0) + 1;
    }

    // Occupation
    if (responses.occupation) {
      stats.occupation[responses.occupation] = (stats.occupation[responses.occupation] || 0) + 1;
    }

    // Income
    if (responses.income) {
      stats.income[responses.income] = (stats.income[responses.income] || 0) + 1;
    }

    // Guidelines
    if (responses.guidelines && Array.isArray(responses.guidelines)) {
      responses.guidelines.forEach(g => {
        stats.guidelines[g] = (stats.guidelines[g] || 0) + 1;
      });
    }

    // Matrix Average
    const matrixField = schema.sections[1]?.fields?.[0];
    if (matrixField) {
      const matrix = responses[matrixField.id] || {};
      matrixField.rows.forEach(row => {
        if (!stats.matrixAvg[row.id]) {
          stats.matrixAvg[row.id] = { urgency: [], action: [], result: [] };
        }
        if (matrix[row.id]?.urgency !== null && matrix[row.id]?.urgency !== undefined) {
          stats.matrixAvg[row.id].urgency.push(matrix[row.id].urgency);
        }
        if (matrix[row.id]?.action !== null && matrix[row.id]?.action !== undefined) {
          stats.matrixAvg[row.id].action.push(matrix[row.id].action);
        }
        if (matrix[row.id]?.result !== null && matrix[row.id]?.result !== undefined) {
          stats.matrixAvg[row.id].result.push(matrix[row.id].result);
        }
      });
    }
  });

  // Calculate averages
  const matrixAvgCalculated = {};
  Object.keys(stats.matrixAvg).forEach(rowId => {
    const row = stats.matrixAvg[rowId];
    matrixAvgCalculated[rowId] = {
      urgency: row.urgency.length > 0 ? (row.urgency.reduce((a, b) => a + b, 0) / row.urgency.length).toFixed(2) : 0,
      action: row.action.length > 0 ? (row.action.reduce((a, b) => a + b, 0) / row.action.length).toFixed(2) : 0,
      result: row.result.length > 0 ? (row.result.reduce((a, b) => a + b, 0) / row.result.length).toFixed(2) : 0,
    };
  });

  const StatCard = ({ title, value, color = "#1e3a8a", icon = "📊" }) => (
    <div style={{ ...S.card, ...S.cardPad, background: `linear-gradient(135deg, ${color}15, ${color}05)`, border: `1px solid ${color}30` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 32 }}>{icon}</span>
        <div>
          <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color }}>{value}</div>
        </div>
      </div>
    </div>
  );

  const BarChart = ({ data, color = "#3b82f6", label }) => {
    const maxValue = Math.max(...Object.values(data), 1);
    return (
      <div style={{ ...S.card, ...S.cardPad }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>{label}</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Object.entries(data).map(([key, value]) => {
            const percentage = (value / maxValue) * 100;
            return (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#64748b", width: 150, flexShrink: 0 }}>{key}</span>
                <div style={{ flex: 1, height: 24, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${percentage}%`, height: "100%", background: color, transition: "width 0.3s", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8, color: "#fff", fontSize: 11, fontWeight: 600 }}>
                    {value} ({((value / submissions.length) * 100).toFixed(1)}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ ...S.card, ...S.cardPad, background: "linear-gradient(135deg, #1e3a8a, #3b82f6)", color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>📊 Dashboard - ภาพรวมการตอบแบบสอบถาม</h2>
            <p style={{ fontSize: 13, opacity: 0.9 }}>สถิติและข้อมูลเชิงลึกจากผู้ตอบแบบสอบถามทั้งหมด</p>
          </div>
          <button onClick={onRefresh} style={{ ...S.btn("#fff", "#1e3a8a"), display: "flex", alignItems: "center", gap: 6 }}>
            🔄 รีเฟรชข้อมูล
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ ...S.card, ...S.cardPad, textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>⏳</div>
          <div style={{ color: "#64748b" }}>กำลังโหลดข้อมูล...</div>
        </div>
      ) : submissions.length === 0 ? (
        <div style={{ ...S.card, ...S.cardPad, textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>ยังไม่มีข้อมูล</h3>
          <p style={{ color: "#64748b" }}>กรุณาตอบแบบสอบถามเพื่อดูปฏิทินสถิติ</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            <StatCard title="ผู้ตอบแบบสอบถามทั้งหมด" value={stats.total} color="#3b82f6" icon="👥" />
            <StatCard title="เพศชาย" value={stats.gender['ชาย'] || 0} color="#3b82f6" icon="👨" />
            <StatCard title="เพศหญิง" value={stats.gender['หญิง'] || 0} color="#ec4899" icon="👩" />
            <StatCard title="อายุ 18-25 ปี" value={stats.age['18-25'] || 0} color="#10b981" icon="🎓" />
          </div>

          {/* Demographics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 16 }}>
            {Object.keys(stats.gender).length > 0 && (
              <BarChart data={stats.gender} color="#3b82f6" label="👥 จำแนกตามเพศ" />
            )}
            {Object.keys(stats.age).length > 0 && (
              <BarChart data={stats.age} color="#10b981" label="🎂 จำแนกตามอายุ" />
            )}
            {Object.keys(stats.education).length > 0 && (
              <BarChart data={stats.education} color="#f59e0b" label="🎓 จำแนกตามการศึกษา" />
            )}
            {Object.keys(stats.occupation).length > 0 && (
              <BarChart data={stats.occupation} color="#8b5cf6" label="💼 จำแนกตามอาชีพ" />
            )}
            {Object.keys(stats.income).length > 0 && (
              <BarChart data={stats.income} color="#ec4899" label="💰 จำแนกตามรายได้" />
            )}
          </div>

          {/* Matrix Averages */}
          {Object.keys(matrixAvgCalculated).length > 0 && (
            <div style={{ ...S.card, ...S.cardPad }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>
                📈 ค่าเฉลี่ยคะแนนประเมิน 21 ประเด็น (ตอนที่ 2)
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                {schema.sections[1]?.fields?.[0]?.rows?.map((row, idx) => {
                  const avg = matrixAvgCalculated[row.id] || { urgency: 0, action: 0, result: 0 };
                  const urgencyColor = avg.urgency >= 8 ? "#ef4444" : avg.urgency >= 5 ? "#f59e0b" : "#22c55e";
                  const actionColor = avg.action >= 8 ? "#22c55e" : avg.action >= 5 ? "#f59e0b" : "#ef4444";
                  const resultColor = avg.result >= 8 ? "#22c55e" : avg.result >= 5 ? "#f59e0b" : "#ef4444";

                  return (
                    <div key={row.id} style={{
                      padding: 12,
                      borderRadius: 8,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0"
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>
                        {row.label?.replace(/^\d+\.\s*/, '') || row.label}
                      </div>
                      <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
                        <div style={{ textAlign: "center", flex: 1 }}>
                          <div style={{ fontSize: 10, color: "#64748b" }}>จำเป็น</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: urgencyColor }}>{avg.urgency}</div>
                        </div>
                        <div style={{ textAlign: "center", flex: 1 }}>
                          <div style={{ fontSize: 10, color: "#64748b" }}>แก้ไข</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: actionColor }}>{avg.action}</div>
                        </div>
                        <div style={{ textAlign: "center", flex: 1 }}>
                          <div style={{ fontSize: 10, color: "#64748b" }}>ผลลัพธ์</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: resultColor }}>{avg.result}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Guidelines Popularity */}
          {Object.keys(stats.guidelines).length > 0 && (
            <div style={{ ...S.card, ...S.cardPad }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>
                🎯 แนวทางพัฒนาที่ได้รับความนิยม (ตอนที่ 3)
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
                {Object.entries(stats.guidelines)
                  .sort((a, b) => b[1] - a[1])
                  .map(([key, value], idx) => {
                    const percentage = ((value / submissions.length) * 100).toFixed(1);
                    const guideline = schema.sections[2]?.fields?.[0]?.options?.find(o => o.value === key);
                    return (
                      <div key={key} style={{
                        padding: 12,
                        borderRadius: 8,
                        background: idx < 3 ? "linear-gradient(135deg, #fef3c7, #fde68a)" : "#f8fafc",
                        border: idx < 3 ? "2px solid #f59e0b" : "1px solid #e2e8f0"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#78350f" }}>{key}</span>
                          <span style={{ fontSize: 18, fontWeight: 800, color: "#92400e" }}>{value}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#78350f", marginBottom: 4 }}>{percentage}% ของผู้ตอบ</div>
                        <div style={{ fontSize: 12, color: "#92400e", lineHeight: 1.4 }}>{guideline?.label || key}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// RECORDS VIEW
// ─────────────────────────────────────────────────────────────
const RecordsView = ({ schema, records, loading, onRefresh }) => {
  // Handle both API response format and legacy format
  const submissions = Array.isArray(records) ? records : [];
  console.log(records);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ ...S.card }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#1e293b" }}>
            ข้อมูลที่บันทึกทั้งหมด <span style={{ color: "#1e3a8a" }}>({submissions.length} รายการ)</span>
          </div>
          <button onClick={onRefresh} style={{ ...S.btn("#f8fafc", "#374151", { border: "1.5px solid #e2e8f0", padding: "7px 16px", fontSize: 13, fontWeight: 600 }) }}>🔄 รีเฟรช</button>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>กำลังโหลด...</div>
        ) : submissions.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: "#94a3b8", fontSize: 15 }}>ยังไม่มีข้อมูล<br /><span style={{ fontSize: 12 }}>กรุณาตอบแบบสอบถามและบันทึก</span></div>
        ) : submissions?.map((rec, ri) => {
          // Handle both API format ({ id, responses, ... }) and legacy format ({ id, answers, timestamp, ... })
          const answers = rec.responses || rec.answers || {};
          const timestamp = rec.created_at ? new Date(rec.created_at) : (rec.timestamp ? new Date(rec.timestamp) : new Date());

          const p1 = answers;
          const matrixField = schema.sections[1]?.fields?.[0];
          const matrix = answers[matrixField?.id] || {};
          const pickField = schema.sections[2]?.fields?.[0];
          const picked = answers[pickField?.id] || [];

          return (
            <div key={rec.id} style={{ borderBottom: ri < submissions.length - 1 ? "1px solid #f1f5f9" : "none", padding: "18px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={S.badge("#eff6ff", "#1e40af")}>#{ri + 1}</span>
                  {p1.gender && <span style={S.badge("#f0fdf4", "#166534")}>{p1.gender} | อายุ {p1.age} ปี</span>}
                  {p1.location && (
                    <span style={S.badge("#e0f2fe", "#0369a1")}>
                      {p1.location.moo && `ม.${p1.location.moo} `}
                      {p1.location.district} {p1.location.amphoe} {p1.location.province}
                    </span>
                  )}
                  {p1.education && <span style={S.badge("#fef9c3", "#854d0e")}>{p1.education}</span>}
                  {p1.income && <span style={S.badge("#fff1f2", "#9f1239")}>{p1.income}</span>}
                  {p1.religion && <span style={S.badge("#fdf4ff", "#7e22ce")}>{p1.religion}</span>}
                </div>
                <span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap", marginLeft: 8 }}>
                  {timestamp.toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              {matrixField && matrixField.rows && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {matrixField.rows.map((row, i) => {
                    const urgency = matrix[row.id]?.urgency ?? null;
                    return (
                      <span key={row.id} style={{
                        padding: "2px 8px", borderRadius: 5, fontSize: 11,
                        background: urgency >= 8 ? "#fee2e2" : urgency >= 5 ? "#fef9c3" : "#f1f5f9",
                        color: urgency >= 8 ? "#991b1b" : urgency >= 5 ? "#854d0e" : "#64748b",
                      }}>ข้อ{i + 1}: {urgency}/{matrix[row.id]?.action ?? "-"}/{matrix[row.id]?.result ?? "-"}</span>
                    );
                  })}
                </div>
              )}

              {pickField && picked.length > 0 && (
                <div style={{ marginBottom: 8, fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: "#374151" }}>ตอนที่ 3: </span>
                  <span style={{ color: "#1e3a8a", fontWeight: 600 }}>{picked.join(" | ")}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: "12px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>ระดับความเร่งด่วน:</span>
        {[{ c: "#fee2e2", tc: "#991b1b", l: "8-10 สูงมาก" }, { c: "#fef9c3", tc: "#854d0e", l: "5-7 ปานกลาง" }, { c: "#f1f5f9", tc: "#64748b", l: "0-4 ต่ำ" }].map(x => (
          <span key={x.l} style={{ background: x.c, color: x.tc, padding: "3px 10px", borderRadius: 6, fontSize: 12 }}>{x.l}</span>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN APP  — Form Renderer
// ─────────────────────────────────────────────────────────────
//export default function SurveyFormColorRenderer() {
const SurveyFormColorRenderer = ({ form, uuid }) => {
  // Use provided schema or default SURVEY_SCHEMA
  const schema = form?.schema || SURVEY_SCHEMA;
  const formUuid = form?.uuid || uuid;

  console.log("schema:", schema);
  console.log("formUuid:", formUuid);

  const [view, setView] = useState("form"); // "form", "dashboard", "records"
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState(() => buildInitialAnswers(schema));
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Access control states
  const [accessCheck, setAccessCheck] = useState(null); // { has_access, is_owner, existing_request }
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [showAccessDialog, setShowAccessDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [accessReason, setAccessReason] = useState("");
  const [requestingAccess, setRequestingAccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    department: '',
    position: '',
    bio: '',
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Survey results dropdown state
  const [showSurveyResultsDropdown, setShowSurveyResultsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const loginPopupRef = useRef(null);

  // Close dropdown when clicking outside
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

  // Handle Google Login - Use redirect instead of popup
  const handleGoogleLogin = () => {
    // Store current URL to return after login
    localStorage.setItem('redirectAfterLogin', window.location.href);

    // Redirect to Google OAuth with form UUID and from=form
    // Add from_path to redirect back to the form after login
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/auth/google?form_uuid=${uuid}&from=form&from_path=${encodeURIComponent(currentPath)}`;
  };

  // Check access permission (defined early to be used in useEffect)
  const checkAccess = useCallback(async () => {
    setCheckingAccess(true);
    try {
      const token = localStorage.getItem('currentToken');

      // Set axios header
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      if (!token) {
        // No token - user not logged in
        setAccessCheck({ has_access: false, is_owner: false, existing_request: null, need_login: true });
        return;
      }

      // Get current user info
      const userResponse = await axios.get('/user');
      const user = userResponse.data;
      setCurrentUser(user);

      // Check if profile is complete
      const isProfileComplete = user.name && user.phone && user.department && user.position;

      if (!isProfileComplete) {
        // Profile not complete - show profile update dialog
        setProfileData({
          name: user.name || '',
          phone: user.phone || '',
          department: user.department || '',
          position: user.position || '',
          bio: user.bio || '',
        });
        setShowProfileDialog(true);
        setAccessCheck({ has_access: false, is_owner: false, existing_request: null, need_login: false });
        setCheckingAccess(false);
        return;
      }

      const response = await axios.get(`/forms/${formUuid}/access/check`);

      const { has_access, is_owner, existing_request } = response.data.data;
      setAccessCheck({ has_access, is_owner, existing_request, need_login: false });

      // If has access, load records from API
      if (has_access || is_owner) {
        loadRecordsFromAPI();
      }
    } catch (error) {
      console.error('Access check error:', error);
      if (error.response?.status === 401) {
        // Token expired - clear and show login
        localStorage.removeItem('currentToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('isInternal');
        localStorage.removeItem('isNewUser');
        delete axios.defaults.headers.common['Authorization'];
        setAccessCheck({ has_access: false, is_owner: false, existing_request: null, need_login: true });
      } else {
        setAccessCheck({ has_access: false, is_owner: false, existing_request: null, need_login: false });
      }
    } finally {
      setCheckingAccess(false);
    }
  }, [formUuid]);

  useEffect(() => {
    if (formUuid) {
      checkAccess();
    }
  }, [formUuid, checkAccess]);

  // Check for Google login success after redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleToken = urlParams.get('google_token');
    const userId = urlParams.get('user_id');
    const isInternal = urlParams.get('is_internal');
    const isNewUser = urlParams.get('is_new_user');

    console.log('=== Google Login Redirect ===');
    console.log('google_token:', googleToken ? 'EXISTS (from URL)' : (localStorage.getItem('currentToken') ? 'EXISTS (from localStorage)' : 'MISSING'));
    console.log('user_id:', userId);
    console.log('is_internal:', isInternal);
    console.log('is_new_user:', isNewUser);

    // Check token from URL or localStorage (set by google-redirect.blade.php)
    const tokenToUse = googleToken || localStorage.getItem('currentToken');

    if (tokenToUse && googleToken) {
      // Only process if token is from URL (not already processed)
      // Store token and user info (if from URL)
      localStorage.setItem('currentToken', googleToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('isInternal', isInternal === 'true' ? 'true' : 'false');
      localStorage.setItem('isNewUser', isNewUser === 'true' ? 'true' : 'false');

      // Set axios header immediately
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenToUse}`;

      console.log('Token stored and header set:', tokenToUse.substring(0, 20) + '...');
      console.log('Current token in localStorage:', localStorage.getItem('currentToken') ? 'EXISTS' : 'MISSING');

      // Clean URL - remove query params without reload
      window.history.replaceState({}, document.title, window.location.pathname);
      console.log('URL cleaned');

      // If new user, redirect to profile setup
      if (isNewUser === 'true') {
        console.log('New user detected, redirecting to profile setup');
        toast.success('ยินดีต้อนรับ! กรุณากรอกข้อมูลโปรไฟล์');
        window.location.href = `/profile/setup?google_token=${tokenToUse}&user_id=${userId}&is_internal=${isInternal}`;
        return;
      }

      // Existing user - re-check access now that we have token
      console.log('Existing user, re-checking access...');
      toast.success('ล็อกอินสำเร็จ!');

      // Re-check access without reload
      checkAccess();
    }
  }, [checkAccess]);

  const section = schema.sections[stepIdx];
  const isLast = stepIdx === schema.sections.length - 1;
  const isFirst = stepIdx === 0;
  const sectionDone = isSectionComplete(section, answers);

  // single answer setter
  const setAnswer = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }));



  // Update profile
  const handleUpdateProfile = async () => {
    if (!profileData.name || !profileData.phone || !profileData.department || !profileData.position) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setUpdatingProfile(true);
    try {
      const token = localStorage.getItem('currentToken');
      await axios.post('/user/profile', {
        ...profileData,
        _method: 'PUT',
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('อัพเดทโปรไฟล์เรียบร้อยแล้ว!');
      setShowProfileDialog(false);

      // Re-check access after profile update
      setTimeout(() => {
        checkAccess();
      }, 500);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถอัพเดทโปรไฟล์ได้');
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Request access
  const requestAccess = async () => {
    if (!accessReason.trim()) {
      toast.error('กรุณากรอกเหตุผลที่ขอสิทธิ์');
      return;
    }

    setRequestingAccess(true);
    try {
      const token = localStorage.getItem('currentToken');
      await axios.post(`/forms/${formUuid}/access/request`, {
        reason: accessReason
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('ส่งคำขอสิทธิ์เรียบร้อยแล้ว รอเจ้าของแบบฟอร์มอนุมัติ');
      setShowAccessDialog(false);
      setAccessReason('');
      checkAccess(); // Re-check access status
    } catch (error) {
      console.error('Request access error:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถส่งคำขอสิทธิ์ได้');
    } finally {
      setRequestingAccess(false);
    }
  };

  // Load records from API
  const loadRecordsFromAPI = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('currentToken');
      const response = await axios.get(`/forms/${formUuid}/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // API returns pagination format: { data: { data: [...], total, ... } }
      // Or direct array: { data: [...] }
      const submissions = response.data?.data?.data || response.data?.data || [];
      setRecords(submissions);
    } catch (error) {
      console.error('Load records error:', error);
      toast.error(error.response?.data?.message || 'ไม่สามารถโหลดข้อมูลได้');
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const loadRecords = async () => {
    // For backward compatibility - check if user has access first
    if (accessCheck?.has_access || accessCheck?.is_owner) {
      loadRecordsFromAPI();
    } else {
      // Show access dialog
      setShowAccessDialog(true);
    }
  };

  const handleSubmit = async () => {
    if (!isSectionComplete(schema.sections[schema.sections.length - 1], answers)) {
      alert("กรุณาตอบให้ครบก่อนบันทึก"); return;
    }
    setSaving(true);

    try {
      // Submit to backend API
      const axios = (await import('axios')).default;

      const payload = {
        responses: answers,
        // Extract respondent info if available
        respondent_name: answers.name || answers.gender || '',
        respondent_email: answers.email || '',
        respondent_phone: answers.phone || ''
      };

      await axios.post(`/forms/${formUuid}/submit`, payload);

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setAnswers(buildInitialAnswers(schema));
        setStepIdx(0);
      }, 2500);
    } catch (error) {
      console.error('Submit error:', error);
      alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึก");
    }

    setSaving(false);
  };

  return (
    <div style={{ fontFamily: "'Sarabun','Noto Sans Thai',sans-serif", minHeight: "100vh", background: "linear-gradient(135deg,#dbeafe 0%,#ecfdf5 100%)", padding: "16px 8px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* ── Top bar ── */}
      <div style={{ maxWidth: 900, margin: "0 auto 18px", background: "#1e3a8a", borderRadius: 16, padding: "18px 26px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 8px 30px rgba(30,58,138,0.3)" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.5, textTransform: "uppercase" }}>SDG Community Survey</div>
          <div style={{ fontSize: 19, fontWeight: 800, marginTop: 3 }}>{form?.title || schema.title}</div>
          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>{form?.description || schema.subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {/* Form button */}
          <button onClick={() => setView("form")} style={{
            padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
            fontFamily: "inherit", fontSize: 13, fontWeight: 700,
            background: view === "form" ? "#fff" : "rgba(255,255,255,0.15)",
            color: view === "form" ? "#1e3a8a" : "#fff", transition: "all 0.2s",
          }}>📝 ตอบแบบสอบถาม</button>

          {/* Survey Results dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button onClick={() => {
              const token = localStorage.getItem('currentToken');
              if (!token) {
                // Not logged in - open login popup
                handleGoogleLogin();
              } else if (!accessCheck?.has_access && !accessCheck?.is_owner) {
                // Logged in but no access - show request dialog
                setShowAccessDialog(true);
              } else {
                // Has access - show dropdown
                setShowSurveyResultsDropdown(!showSurveyResultsDropdown);
              }
            }} style={{
              padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 13, fontWeight: 700,
              background: (view === "dashboard" || view === "records") ? "#fff" : "rgba(255,255,255,0.15)",
              color: (view === "dashboard" || view === "records") ? "#1e3a8a" : "#fff",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              📊 ผลการตอบ
              <svg style={{ width: 14, height: 14, transition: "transform 0.2s", transform: showSurveyResultsDropdown ? "rotate(180deg)" : "rotate(0deg)" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {showSurveyResultsDropdown && (accessCheck?.has_access || accessCheck?.is_owner) && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: 8,
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                zIndex: 1000,
                minWidth: 200,
                overflow: "hidden",
              }}>
                <button onClick={() => { setView("dashboard"); setShowSurveyResultsDropdown(false); }} style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "none",
                  background: view === "dashboard" ? "#eff6ff" : "#fff",
                  color: view === "dashboard" ? "#1e3a8a" : "#374151",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "left",
                  transition: "all 0.15s",
                }}>
                  📈 Dashboard
                </button>
                <button onClick={() => { setView("records"); setShowSurveyResultsDropdown(false); }} style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "none",
                  background: view === "records" ? "#eff6ff" : "#fff",
                  color: view === "records" ? "#1e3a8a" : "#374151",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "left",
                  transition: "all 0.15s",
                }}>
                  📋 ข้อมูลทั้งหมด
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {view === "dashboard" ? (
          <DashboardView schema={schema} records={records} loading={loading} onRefresh={loadRecordsFromAPI} />
        ) : view === "form" ? (<>

          {/* ── Step nav ── */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, background: "#fff", borderRadius: 12, padding: "12px 18px", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
            {schema.sections.map((sec, i) => {
              const active = i === stepIdx;
              const done = isSectionComplete(sec, answers);
              return (
                <button key={sec.id} onClick={() => setStepIdx(i)} style={{
                  padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer",
                  fontFamily: "inherit", fontSize: 13, fontWeight: 700,
                  background: active ? "#1e3a8a" : done ? "#dcfce7" : "#f1f5f9",
                  color: active ? "#fff" : done ? "#166534" : "#64748b",
                  transition: "all 0.2s",
                }}>
                  {done && !active ? "✅ " : ""}ตอนที่ {sec.num}
                </button>
              );
            })}
          </div>

          {/* ── Section card ── */}
          <div style={{ ...S.card, ...(section.id === "part2" ? {} : S.cardPad) }}>
            {section.id !== "part2" ? (
              /* standard padded layout */
              <>
                <SectionHeader section={section} />
                {section.fields.map(field => (
                  <FieldRenderer key={field.id} field={field} answers={answers} setAnswer={setAnswer} />
                ))}
              </>
            ) : (
              /* score_matrix gets full-width, no extra padding */
              <div>
                <div style={{ padding: "24px 28px 0" }}>
                  <SectionHeader section={section} />
                </div>
                {section.fields.map(field => (
                  <FieldRenderer key={field.id} field={field} answers={answers} setAnswer={setAnswer} />
                ))}
              </div>
            )}

            {/* ── Nav footer ── */}
            <div style={{ padding: "20px 28px", borderTop: "2px solid #e2e8f0", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => setStepIdx(i => i - 1)} disabled={isFirst}
                style={{ ...S.btn("#f1f5f9", "#374151"), opacity: isFirst ? 0.3 : 1 }}>← ย้อนกลับ</button>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {saved && <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 15 }}>✅ บันทึกสำเร็จ!</span>}
                {isLast ? (
                  <button onClick={handleSubmit} disabled={saving || saved}
                    style={{ ...S.btn(saved ? "#16a34a" : "#1e3a8a", "#fff"), opacity: saving ? 0.7 : 1 }}>
                    {saving ? "กำลังบันทึก..." : "💾 บันทึกแบบสอบถาม"}
                  </button>
                ) : (
                  <button onClick={() => { if (!sectionDone) { alert("กรุณาตอบให้ครบก่อน"); return; } setStepIdx(i => i + 1); }}
                    style={S.btn("#1e3a8a", "#fff")}>ถัดไป →</button>
                )}
              </div>
            </div>
          </div>

        </>) : (
          /* Records View - Check access first */
          checkingAccess ? (
            <div style={{ ...S.card, ...S.cardPad, textAlign: "center", padding: "40px" }}>
              <div style={{ fontSize: 24, marginBottom: 16 }}>🔒</div>
              <div style={{ color: "#64748b" }}>กำลังตรวจสอบสิทธิ์...</div>
            </div>
          ) : !accessCheck?.has_access && !accessCheck?.is_owner ? (
            <div style={{ ...S.card, ...S.cardPad }}>
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>
                  ต้องการสิทธิ์ในการดูข้อมูล
                </h3>
                {accessCheck?.need_login ? (
                  <>
                    <p style={{ color: "#64748b", marginBottom: 16 }}>
                      กรุณาล็อกอินเพื่อขอสิทธิ์ดูผลลัพธ์
                    </p>
                    <button
                      onClick={() => window.location.href = '/auth/google'}
                      style={{ ...S.btn("#ea4335", "#fff"), display: "inline-flex", alignItems: "center", gap: 8 }}
                    >
                      <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      เข้าสู่ระบบด้วย Google
                    </button>
                  </>
                ) : accessCheck?.existing_request?.status === 'pending' ? (
                  <>
                    <p style={{ color: "#f59e0b", fontWeight: 600, marginBottom: 8 }}>
                      ⏳ คำขอสิทธิ์ของคุณกำลังรออนุมัติ
                    </p>
                    <p style={{ color: "#64748b", marginBottom: 16 }}>
                      {accessCheck.existing_request.reason && (
                        <>เหตุผล: <strong>{accessCheck.existing_request.reason}</strong></>
                      )}
                    </p>
                    <p style={{ color: "#94a3b8", fontSize: 13 }}>
                      เจ้าของแบบฟอร์มจะตรวจสอบและแจ้งผลให้ทราบ
                    </p>
                  </>
                ) : accessCheck?.existing_request?.status === 'rejected' ? (
                  <>
                    <p style={{ color: "#ef4444", fontWeight: 600, marginBottom: 8 }}>
                      ❌ คำขอสิทธิ์ถูกปฏิเสธ
                    </p>
                    {accessCheck.existing_request.rejection_reason && (
                      <p style={{ color: "#64748b", marginBottom: 16, background: "#fef2f2", padding: 12, borderRadius: 8 }}>
                        <strong>เหตุผล:</strong> {accessCheck.existing_request.rejection_reason}
                      </p>
                    )}
                    <button
                      onClick={() => setShowAccessDialog(true)}
                      style={{ ...S.btn("#3b82f6", "#fff") }}
                    >
                      ขอสิทธิ์อีกครั้ง
                    </button>
                  </>
                ) : (
                  <>
                    <p style={{ color: "#64748b", marginBottom: 16 }}>
                      คุณยังไม่มีสิทธิ์ดูผลลัพธ์แบบฟอร์มนี้
                    </p>
                    <button
                      onClick={() => setShowAccessDialog(true)}
                      style={{ ...S.btn("#1e3a8a", "#fff") }}
                    >
                      🔓 ขอสิทธิ์ดูผลลัพธ์
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <RecordsView schema={schema} records={records} loading={loading} onRefresh={loadRecords} />
          )
        )}
      </div>

      {/* Access Request Dialog */}
      {showAccessDialog && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
          <div style={{ ...S.card, ...S.cardPad, width: "100%", maxWidth: 500 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>
              🔓 ขอสิทธิ์ดูผลลัพธ์
            </h3>

            {!localStorage.getItem('currentToken') ? (
              // Not logged in - show login button with popup
              <>
                <p style={{ color: "#64748b", marginBottom: 20, fontSize: 14, lineHeight: 1.6 }}>
                  กรุณาล็อกอินก่อนขอสิทธิ์ดูผลลัพธ์แบบฟอร์มนี้
                </p>
                <button
                  onClick={handleGoogleLogin}
                  style={{ ...S.btn("#ea4335", "#fff"), display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "12px 20px" }}
                >
                  <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  เข้าสู่ระบบด้วย Google
                </button>
                <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 12, textAlign: "center" }}>
                  💡 คลิกเพื่อเลือกบัญชี Google ของคุณ
                </p>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => { setShowAccessDialog(false); setAccessReason(''); }}
                    style={{ ...S.btn("#f1f5f9", "#374151") }}
                  >
                    ยกเลิก
                  </button>
                </div>
              </>
            ) : (
              // Logged in - show request form
              <>
                <p style={{ color: "#64748b", marginBottom: 16, fontSize: 14 }}>
                  กรุณากรอกเหตุผลที่คุณต้องการดูผลลัพธ์แบบฟอร์มนี้
                </p>
                <textarea
                  value={accessReason}
                  onChange={(e) => setAccessReason(e.target.value)}
                  placeholder="ตัวอย่าง: ฉันเป็นทีมงานที่ต้องการวิเคราะห์ข้อมูล..."
                  style={{
                    width: "100%",
                    minHeight: 100,
                    padding: 12,
                    border: "1.5px solid #cbd5e1",
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "inherit",
                    resize: "vertical",
                    marginBottom: 16,
                  }}
                />
                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button
                    onClick={() => { setShowAccessDialog(false); setAccessReason(''); }}
                    style={{ ...S.btn("#f1f5f9", "#374151") }}
                    disabled={requestingAccess}
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={requestAccess}
                    disabled={requestingAccess || !accessReason.trim()}
                    style={{ ...S.btn("#1e3a8a", "#fff"), opacity: requestingAccess ? 0.7 : 1 }}
                  >
                    {requestingAccess ? "กำลังส่งคำขอ..." : "ส่งคำขอ"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Profile Update Dialog */}
      {showProfileDialog && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: 16,
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 16,
            padding: 32,
            maxWidth: 500,
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: 32,
                color: "#fff",
                fontWeight: "bold",
              }}>
                {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: "bold", color: "#1e293b", marginBottom: 8 }}>
                ยินดีต้อนรับ! 🎉
              </h3>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>
                กรุณากรอกข้อมูลโปรไฟล์ของคุณก่อนขอสิทธิ์ดูผลลัพธ์แบบฟอร์ม
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  ชื่อ-นามสกุล <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1.5px solid #cbd5e1",
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "inherit",
                  }}
                  placeholder="กรอกชื่อและนามสกุล"
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  เบอร์โทรศัพท์ <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1.5px solid #cbd5e1",
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "inherit",
                  }}
                  placeholder="08X-XXX-XXXX"
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  หน่วยงาน/คณะ <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={profileData.department}
                  onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1.5px solid #cbd5e1",
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "inherit",
                  }}
                  placeholder="เช่น คณะวิทยาศาสตร์"
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  ตำแหน่ง <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={profileData.position}
                  onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1.5px solid #cbd5e1",
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "inherit",
                  }}
                  placeholder="เช่น นักวิชาการคอมพิวเตอร์"
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>
                  เกี่ยวกับคุณ
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  style={{
                    width: "100%",
                    padding: 10,
                    border: "1.5px solid #cbd5e1",
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "inherit",
                    resize: "vertical",
                    minHeight: 80,
                  }}
                  placeholder="บอกเราเกี่ยวกับตัวคุณสั้นๆ (ไม่บังคับ)"
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24 }}>
              <button
                onClick={handleUpdateProfile}
                disabled={updatingProfile}
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: updatingProfile ? "not-allowed" : "pointer",
                  opacity: updatingProfile ? 0.7 : 1,
                }}
              >
                {updatingProfile ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SurveyFormColorRenderer;