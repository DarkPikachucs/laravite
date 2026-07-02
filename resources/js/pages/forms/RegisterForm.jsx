import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const API = "https://script.google.com/macros/s/AKfycbyRy4UtOmjQ0PDxWZZ3ySSBX4eTcrZQRuNEDVQAFeApW3PSiJj3FD3fABm0qzJvDeEC/exec"
const departments = [
  {
    "name": "คณะครุศาสตร์",
    "options": [
      { "name": "ผู้บริหาร", "quota": 2 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 2 },
      {
        "name": "สาขาวิชา", "quota": 6,
        "child": [
          { "name": "สาขาวิชา การศึกษาปฐมวัย", "quota": 1 },
          { "name": "สาขาวิชา คณิตศาสตร์", "quota": 1 },
          { "name": "สาขาวิชา พลศึกษา", "quota": 1 },
          { "name": "สาขาวิชา ภาษาไทย", "quota": 1 },
          { "name": "สาขาวิชา ภาษาอังกฤษ", "quota": 1 },
          { "name": "สาขาวิชา วิทยาศาสตร์ทั่วไป", "quota": 1 }
        ]
      }
    ]
  },
  {
    "name": "คณะมนุษยศาสตร์และสังคมศาสตร์",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 2 },
      {
        "name": "สาขาวิชา", "quota": 12,
        "child": [
          { "name": "สาขาวิชา การเมืองการปกครอง", "quota": 1 },
          { "name": "สาขาวิชา รัฐประศาสนศาสตร์", "quota": 1 },
          { "name": "บรรณารักษศาสตร์และสารสนเทศศาสตร์", "quota": 1 },
          { "name": "นิติศาสตร์", "quota": 1 },
          { "name": "สาขาวิชา นาฏศิลป์และศิลปะการแสดง", "quota": 1 },
          { "name": "สาขาวิชา ศิลปกรรม", "quota": 1 },
          { "name": "สาขาวิชา การบริหารการะบวนการยุติธรรม", "quota": 1 },
          { "name": "สาขาวิชา การเมืองเพื่อการพัฒนาท้องถิ่น", "quota": 1 },
          { "name": "สาขาวิชา พัฒนาสังคม", "quota": 1 },
          { "name": "สาขาวิชา ภาษาจีน", "quota": 1 },
          { "name": "สาขาวิชา ภาษาอังกฤษ", "quota": 1 },
          { "name": "สาขาวิชา ภาษาอังกฤษธุรกิจ", "quota": 1 }
        ]
      }
    ]
  },
  {
    "name": "คณะวิทยาการจัดการ",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 2 },
      {
        "name": "สาขาวิชา", "quota": 10,
        "child": [
          { "name": "สาขาวิชา นิเทศศาสตร์", "quota": 1 },
          { "name": "สาขาวิชา การบัญชี", "quota": 1 },
          { "name": "สาขาวิชา การจัดการทรัพยากรมนุษย์", "quota": 1 },
          { "name": "สาขาวิชา การตลาด", "quota": 1 },
          { "name": "สาขาวิชา คอมพิวเตอร์ธุรกิจดิจิทัล", "quota": 1 },
          { "name": "สาขาวิชา การจัดการ", "quota": 1 },
          { "name": "สาขาวิชา การท่องเที่ยวและการโรงแรม", "quota": 1 },
          { "name": "สาขาวิชา เศรษฐศาสตร์ธุรกิจ", "quota": 1 },
          { "name": "สาขาวิชา การจัดการธุรกิจการค้าสมัยใหม่", "quota": 1 },
          { "name": "สาขาวิชา บริหารธุรกิจมหาบัณฑิต", "quota": 1 }
        ]
      }
    ]
  },
  {
    "name": "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม",
    "options": [
      { "name": "ผู้บริหาร", "quota": 2 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 2 },
      {
        "name": "สาขาวิชา", "quota": 11,
        "child": [
          { "name": "สาขาวิชา เกษตรศาสตร์", "quota": 1 },
          { "name": "สาขาวิชา คหกรรมศาสตร์", "quota": 1 },
          { "name": "สาขาวิชา วิศวกรรมการผลิตและการจัดการ", "quota": 1 },
          { "name": "สาขาวิชา วิศวกรรมคอมพิวเตอร์", "quota": 1 },
          { "name": "สาขาวิชา การงานอาชีพและเทคโนโลยี", "quota": 1 },
          { "name": "สาขาวิชา วิศวกรรมอิเล็กทรอนิกส์และระบบอัตโนมัติ", "quota": 1 },
          { "name": "สาขาวิชา เทคโนโลยีวิศวกรรมโยธา", "quota": 1 },
          { "name": "สาขาวิชา เทคโนโลยีวิศวกรรมอุตสาหการและโลจิสติกส์", "quota": 1 },
          { "name": "สาขาวิชา ออกแบบผลิตภัณฑ์และกราฟิก", "quota": 1 },
          { "name": "สาขาวิชา เทคโนโลยีคอมพิวเตอร์ วิชาเอกเทคโนโลยีดิจิทัล", "quota": 1 },
          { "name": "สาขาวิชา เทคโนโลยีวิศวกรรมไฟฟ้า", "quota": 1 }
        ]
      }
    ]
  },
  {
    "name": "คณะวิทยาศาสตร์และเทคโนโลยี",
    "options": [
      { "name": "ผู้บริหาร", "quota": 2 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 2 },
      {
        "name": "สาขาวิชา", "quota": 11,
        "child": [
          { "name": "สาขาวิชา การแพทย์แผนไทย", "quota": 1 },
          { "name": "สาขาวิชา คณิตศาสตร์และวิทยาการคำนวณ", "quota": 1 },
          { "name": "สาขาวิชา การจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อม", "quota": 1 },
          { "name": "สาขาวิชา คณิตศาสตร์และสถิติประยุกต์", "quota": 1 },
          { "name": "สาขาวิชา เทคโนโลยีสารสนเทศ", "quota": 1 },
          { "name": "สาขาวิชา เทคโนโลยีอาหารและการพัฒนาผลิตภัณฑ์", "quota": 1 },
          { "name": "สาขาวิชา วิทยาการคอมพิวเตอร์", "quota": 1 },
          { "name": "สาขาวิชา ฟิสิกส์", "quota": 1 },
          { "name": "สาขาวิชา เคมี", "quota": 1 },
          { "name": "สาขาวิชา ชีววิทยา", "quota": 1 },
          { "name": "สาขาวิชา สาธารณสุขศาสตร์", "quota": 1 }
        ]
      }
    ]
  },
  {
    "name": "คณะพยาบาลศาสตร์",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 2 },
      {
        "name": "สาขาวิชา", "quota": 1,
        "child": [
          { "name": "พยาบาลศาสตร์", "quota": 1 }
        ]
      }
    ]
  },
  {
    "name": "สถาบันวิจัยและพัฒนา",
    "options": [
      { "name": "ผู้บริหาร", "quota": 2 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 2 }
    ]
  },
  {
    "name": "สำนักศิลปะและวัฒนธรรม",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "สำนักส่งเสริมวิชาการและงานทะเบียน",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "สำนักงานอธิการบดี",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 2 }
    ]
  },
  {
    "name": "กองกลาง สำนักงานอธิการบดี",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 2 }
    ]
  },
  {
    "name": "กองนโยบายและแผน สำนักงานอธิการบดี",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "กองพัฒนานักศึกษา สำนักงานอธิการบดี",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "กองอาคารสถานที่ สำนักงานอธิการบดี",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "อุทยานวิทยาศาสตร์ เทคโนโลยีและนวัตกรรม",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "โรงเรียนสาธิตมหาวิทยาลัยราชภัฏเพชรบูรณ์",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "วิทยาลัยนานาชาติ",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "บัณฑิตวิทยาลัย",
    "options": [
      { "name": "ผู้บริหาร", "quota": 1 },
      { "name": "บุคลากรสายสนับสนุน", "quota": 1 }
    ]
  },
  {
    "name": "รองอธิการบดี ผู้ช่วยอธิการบดี",
    "options": [
      { "name": "รองอธิการบดี", "quota": 5 },
      { "name": "ผู้ช่วยอธิการบดี", "quota": 3 }
    ]
  }
];


const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [dept, setDept] = useState("")
  const [role, setRole] = useState("")
  const [branch, setBranch] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [counts, setCounts] = useState({})
  const [total, setTotal] = useState(0)
  const [loadingCounts, setLoadingCounts] = useState(false)
  const [activeTab, setActiveTab] = useState("register")
  const [statistics, setStatistics] = useState({
    gender: [],
    age: [],
    district: [],
    career: []
  })
  const [loadingStats, setLoadingStats] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState(null)
  const [loadingStatus, setLoadingStatus] = useState(false)

  useEffect(() => {
    document.title = "ลงทะเบียนเข้าร่วมโครงการ : ประชุมชี้แจง การจัดทำข้อเสนอโครงการ ผลผลิตมหาวิทยาลัยราชภัฏเพื่อการพัฒนาท้องถิ่น ปีงบประมาณ 2570";
  })

  useEffect(() => {
    loadRegistrationStatus()
    loadCounts()

    const interval = setInterval(() => {
      loadCounts()
    }, 30000)

    return () => clearInterval(interval)

  }, [])

  const loadRegistrationStatus = async () => {
    setLoadingStatus(true)
    try {
      const response = await axios.get('/registration/status')
      setRegistrationStatus(response.data.data)
    } catch (err) {
      console.error('Error loading registration status:', err)
    } finally {
      setLoadingStatus(false)
    }
  }

  const loadCounts = async () => {
    setLoadingCounts(true)
    try {
      const res = await fetch(API)
      const data = await res.json()

      setCounts(data.counts)
      setTotal(data.total)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingCounts(false)
    }

  }
  const currentDept = departments.find(d => d.name === dept)

  const submit = async (e) => {
    e.preventDefault()

    // Check registration status before submitting
    if (registrationStatus && registrationStatus.status !== 'open') {
      toast.error(registrationStatus.message || 'การลงทะเบียนไม่พร้อมใช้งาน')
      return
    }

    setLoading(true)

    try {
      await fetch(API, {
        method: "POST",
        body: JSON.stringify({
          department: dept,
          role: role,
          branch: branch,
          name: name,
          phone: phone
        })
      })

      toast.success("ลงทะเบียนสำเร็จ 🎉")

      setDept("")
      setRole("")
      setBranch("")
      setName("")
      setPhone("")

      await loadCounts()

    } catch (err) {
      toast.error("เกิดข้อผิดพลาด")
    }

    setLoading(false)
  }

  const branchOption = currentDept?.options?.find(
    o => o.name === "สาขาวิชา"
  )

  const branches = branchOption?.child || []

  const isRegistrationClosed = registrationStatus && registrationStatus.status !== 'open'

  return (

    <div className="flex items-center justify-center min-h-screen bg-slate-100">

      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-xl">

        <h1 className="mb-6 text-2xl font-bold text-left text-blue-600">
          ลงทะเบียนเข้าร่วมโครงการ
        </h1>

        <p className="mb-6 text-lg font-semibold text-center text-blue-600">
          ประชุมชี้แจง การจัดทำข้อเสนอโครงการ ผลผลิตมหาวิทยาลัยราชภัฏเพื่อการพัฒนาท้องถิ่น ปีงบประมาณ 2570
        </p>

        {/* Registration Status Banner */}
        {loadingStatus ? (
          <div className="p-4 mb-4 text-center border border-yellow-200 rounded-lg bg-yellow-50">
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-b-2 border-yellow-600 rounded-full animate-spin"></div>
              <p className="text-sm text-yellow-700">กำลังโหลดสถานะการลงทะเบียน...</p>
            </div>
          </div>
        ) : registrationStatus && (
          <div className={`p-4 mb-4 text-center border rounded-lg ${registrationStatus.status === 'open'
            ? 'border-green-200 bg-green-50'
            : registrationStatus.status === 'ended'
              ? 'border-red-200 bg-red-50'
              : registrationStatus.status === 'not_started'
                ? 'border-orange-200 bg-orange-50'
                : 'border-gray-200 bg-gray-50'
            }`}>
            <p className={`text-sm font-semibold ${registrationStatus.status === 'open'
              ? 'text-green-700'
              : registrationStatus.status === 'ended'
                ? 'text-red-700'
                : registrationStatus.status === 'not_started'
                  ? 'text-orange-700'
                  : 'text-gray-700'
              }`}>
              {registrationStatus.status === 'open' && '✓ '}
              {registrationStatus.status === 'ended' && '✗ '}
              {registrationStatus.message}
            </p>
            {registrationStatus.start_date && registrationStatus.status === 'not_started' && (
              <p className="mt-1 text-xs text-gray-600">
                เปิดลงทะเบียน: {new Date(registrationStatus.start_date).toLocaleString('th-TH')}
              </p>
            )}
            {registrationStatus.end_date && registrationStatus.status === 'open' && (
              <p className="mt-1 text-xs text-gray-600">
                สิ้นสุด: {new Date(registrationStatus.end_date).toLocaleString('th-TH')}
              </p>
            )}
          </div>
        )}

        <div className="p-4 mb-4 text-center border border-blue-200 rounded-lg bg-blue-50">
          <p className="text-sm text-gray-500">
            จำนวนผู้ลงทะเบียนแล้ว
          </p>

          <p className="text-3xl font-bold text-blue-600">
            {loadingCounts ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 border-b-2 border-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              `${total} คน`
            )}
          </p>

        </div>

        <form onSubmit={submit} className="space-y-4">
          {/* หน่วยงาน */}
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              คณะ / หน่วยงาน
            </label>
            <select
              name="department"
              className="w-full p-2 mt-1 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={dept}
              onChange={(e) => {
                setDept(e.target.value)
                setRole("")
                setBranch("")
              }}
              required
              disabled={isRegistrationClosed}
            >
              <option value="">เลือกหน่วยงาน</option>
              {departments.map(d => (
                <option key={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* บทบาท */}
          {currentDept && (
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                ประเภทบุคลากร / สาขาวิชา ที่ท่านสังกัด
              </label>
              <select
                name="role"
                className="w-full p-2 mt-1 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value)
                  setBranch("")
                }}
                required
                disabled={isRegistrationClosed}
              >
                <option value="" disabled>-----ประเภทบุคลากร-----</option>
                {currentDept.options.map(o => {
                  const used = counts[dept + "_" + o.name] || 0
                  const disabled = used >= o.quota
                  return (

                    <option
                      key={o.name}
                      disabled={disabled}
                      value={o.name}
                    >
                      {o.name} ({used}/{o.quota})
                    </option>
                  )
                })}
              </select>
            </div>
          )}

          {/* สาขาวิชา */}

          {role === "สาขาวิชา" && branches.length > 0 && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2-semibold">
                สาขาวิชา
              </label>

              <select
                name="branch"
                className="w-full p-2 mt-1 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                disabled={isRegistrationClosed}
              >
                <option value="">เลือกสาขาวิชา</option>
                {branchOption.child.map(c => {
                  const used = counts[dept + "_" + c.name] || 0
                  const disabled = used >= c.quota
                  return (
                    <option
                      key={c.name}
                      disabled={disabled}
                      value={c.name}
                    >
                      {c.name} ({used}/{c.quota})
                    </option>
                  )
                })}
              </select>
            </div>
          )}

          {/* ชื่อ */}
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              ชื่อ-นามสกุล
            </label>
            <input
              type="text"
              name="name"
              placeholder="ชื่อ-นามสกุล"
              className="w-full p-2 mt-1 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isRegistrationClosed}
            />
          </div>

          {/* โทร */}
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              เบอร์โทรศัพท์
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="ext. 0812345678"
              className="w-full p-2 mt-1 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
              required
              disabled={isRegistrationClosed}
            />
          </div>

          <button
            type="submit"
            disabled={loading || isRegistrationClosed}
            className={`flex items-center justify-center w-full p-3 text-white rounded-lg ${isRegistrationClosed
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                กำลังบันทึก...
              </div>
            ) : isRegistrationClosed ? (
              registrationStatus?.status === 'ended' ? 'สิ้นสุดการลงทะเบียน' : 'ยังไม่เปิดลงทะเบียน'
            ) : (
              "ลงทะเบียน"
            )}
          </button>
        </form>
      </div>
    </div>

  )
}

export default RegisterForm;