import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx-js-style'; // Import xlsx-js-style
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectList = () => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState({});
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const [gvhSummary, setGvhSummary] = useState({}); //gvhSummary
  const [gvhProjectData, setGvhProjectData] = useState({});

  const [searchParams] = useSearchParams();
  const [year, setYear] = useState(searchParams.get("year") || new Date().getFullYear()); // ใช้ปีปัจจุบันเป็นค่าเริ่มต้นถ้าไม่มีการระบุปีใน URL
  const years = Array.from({ length: 2 }, (_, i) => new Date().getFullYear() - i); // สร้างอาร์เรย์ของปีย้อนหลัง 2 ปี

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onSelectedProject = async (project) => {
    await fetch(`${API_BASE_URL}/gvhs/score/${project.id}`)
      .then((response) => response.json())
      .then((data) => {
        setGvhProjectData(data);

        const gvhBefore = data.filter(item => item.phrase === 'before');
        const gvhAfter = data.filter(item => item.phrase === 'after');

        setGvhSummary({
          ...gvhSummary,
          countBefore: gvhBefore.length,
          scoreBefore: gvhBefore.reduce((acc, item) => acc + item.total_gvh, 0),
          averageBefore: gvhBefore.reduce((acc, item) => acc + item.total_gvh, 0) / gvhBefore.length,
          maxBefore: gvhBefore.reduce((acc, item) => Math.max(acc, item.total_gvh), 0),
          minBefore: gvhBefore.reduce((acc, item) => Math.min(acc, item.total_gvh), 0),

          countAfter: gvhAfter.length,
          scoreAfter: gvhAfter.reduce((acc, item) => acc + item.total_gvh, 0),
          averageAfter: gvhAfter.reduce((acc, item) => acc + item.total_gvh, 0) / gvhAfter.length,
          maxAfter: gvhAfter.reduce((acc, item) => Math.max(acc, item.total_gvh), 0),
          minAfter: gvhAfter.reduce((acc, item) => Math.min(acc, item.total_gvh), 0),
        });
        // setProjects(data.data)

        //setLoading(false)
        //setSuccess(true);
      })
      .catch((err) => {
        console.log(err.message);
        //setLoading(false)
        //setSuccess(true);
      });
  };

  const exportExcelFile = () => {

    const formInitData = [
      {
        section: "1. ด้านวิถีชีวิตแบบพอเพียงของชุมชน",
        questions: [
          "1.1 คนในชุมชนมีลักษณะเป็นกัลยาณมิตรหรือเป็นเพื่อนบ้านที่ดี มีการช่วยเหลือ แบ่งปัน และคอยห่วงใยทุกข์สุขซึ่งกันและกัน",
          "1.2 คนในชุมชนมีดำเนินชีวิตแบบพอมี โดยไม่เบียดเบียนตนเองและผู้อื่น",
          "1.3 คนในชุมชนเข้าประชุม และจัดเวทีประชาคมต่าง ๆ ในชุมชนอย่างสม่ำเสมอ",
          "1.4 คนในชุมชนได้รับความยุติธรรมจากการใช้กฎ ระเบียบในชุมชน และได้รับประโยชน์จากเครือข่ายชุมชน",
          "1.5 ครัวเรือนในชุมชนมีประกอบอาชีพที่สุจริต",
        ],
      },
      {
        section: "2. ด้านสุขภาวะและความมั่นคงของครอบครัว",
        questions: [
          "2.1 คนในชุมชนมีสุขภาพกายดี",
          "2.2 คนในชุมชนมีสุขภาพจิตดี",
          "2.3 ครอบครัวมีความอบอุ่น สมาชิกในครอบครัวมีกิจกรรมร่วมกัน",
          "2.4 ครอบครัวมีความปลอดภัยในชีวิตและทรัพย์สินไม่มีการก่อคดีอาชญากรรม ยาเสพติดและอบายมุขในชุมชน",
          "2.5 สมาชิกในครอบครัวพึ่งตนเองได้ ไม่เป็นภาระให้กับคนในครอบครัวหรือชุมชน",
        ],
      },
      {
        section: "3. เศรษฐกิจครัวเรือนเข้มแข็ง",
        questions: [
          "3.1 ครัวเรือนในชุมชน มีความเป็นไท ไม่มีหนี้สินติดค้างใครหรือนอกชุมชน",
          "3.2 คนในชุมชน มีงานทำและมีรายได้เพียงพอกับรายจ่ายที่เกิดขึ้น",
          "3.3 ครัวเรือนในชุมชน มีโภคทรัพย์ที่ได้มาโดยสุจริต",
          "3.4 ครัวเรือนในชุมชนได้ใช้ทรัพย์ที่ได้มาโดยชอบ สำหรับเลี้ยงเลี้ยงผู้ควรเลี้ยง และบำเพ็ญประโยชน์",
          "3.5 ครัวเรือนในชุมชนมีเงินฝากไว้กับสถาบันการเงินในชุมชน",
        ],
      },
      {
        section: "4. ด้านการบริหารจัดการชุมชน",
        questions: [
          "4.1 คนในชุมชนมีส่วนร่วมในการคิด ตัดสินใจและดำเนินการในกิจกรรมของชุมชนอย่างเป็นอิสระ",
          "4.2 ชุมชนมีแผนชุมชนในการกำหนดทิศทางการพัฒนาชุมชนของตนเองในอนาคตไว้เป็นลายลักษณ์อักษร",
          "4.3 คนในชุมชนรวมกลุ่มบริหารจัดการอาชีพหรือวิสาหกิจชุมชนร่วมกันจนทำให้เศรษฐกิจชุมชนเข้มแข็ง",
          "4.4 ชุมชนมีผู้นำที่ดีและเก่ง ที่มีความเอาใจใส่ต่อลูกบ้านช่วยเหลือชุมชนและสามารถแก้ไขปัญหาชุมชนได้",
          "4.5 ชุมชนมีความเกื้อกูล พึ่งพาซึ่งกันและกันที่ดีต่อกัน",
        ],
      },
      {
        section: "5. ด้านธรรมชาติและการจัดสรรทรัพยากรชุมชน",
        questions: [
          "5.1 ชุมชนมีระบบนิเวศที่สมดุลและการมีพื้นที่สีเขียวในชุมชนเพิ่มมากขึ้น",
          "5.2 คนในชุมชนได้รับการเรียนรู้ธรรมชาติ เพื่อการดำรงชีวิตอยู่ตลอดเวลา",
          "5.3 คนในชุมชนแสดงออกถึงการมีจิตสำนึกรักและห่วงแหนต่อธรรมชาติและสิ่งแวดล้อมในชุมชน",
          "5.4 คนในชุมชนมีความรัก ความผูกพันและภาคภูมิใจต่อชุมชนของตนเอง",
          "5.5 คนในชุมชนได้รับการปฏิบัติอย่างเท่าเทียมกันในด้านกฎระเบียบ และเครือข่ายของชุมชน",
        ],
      },
      {
        section: "6. ด้านการศึกษาและการจัดสวัสดิการชุมชน",
        questions: [
          "6.1 คนในชุมชนได้รับการศึกษาที่มีคุณภาพ สามารถนำมาประยุกต์ในการดำรงชีวิตประจำวันได้",
          "6.2 คนในชุมชนได้รับโอกาสในการเรียนรู้ และเข้าถึงแหล่งเรียนรู้ในชุมชนได้อย่างเท่าเทียมกัน",
          "6.3 ครัวเรือนในชุมชน นำเอาภูมิปัญญาท้องถิ่นมาพัฒนาต่อยอดและสร้างมูลค่าเพิ่มได้มากขึ้น",
          "6.4 ในชุมชนมีกองทุนสวัสดิการไว้ให้การช่วยเหลือ สนับสนุนผู้ด้อยโอกาส ตลอดจนช่วยเหลือเกี่ยวกับการเกิด การศึกษา การประกอบอาชีพและการเสียชีวิตของคนในชุมชนอย่างทั่วถึง",
          "6.5 ชุมชนมีกิจกรรมส่งเสริมคุณธรรม จริยธรรมให้แก่คนทุกเพศทุกวัยในชุมชนอย่างทั่วถึง",
        ],
      },
    ];

    // STEP 1: Create a new workbook
    const wb = XLSX.utils.book_new();

    // STEP 2: Create data rows and styles
    let headerStyle = {
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "E9E9E9" } },
      alignment: { vertical: "center", horizontal: "center", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
    };
    let headerStyle2 = {
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },
      fill: { fgColor: { rgb: "dcdcdc" } },
      alignment: { vertical: "center", horizontal: "center", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
    };
    let titleStyle1 = {
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },  //fill: { fgColor: { rgb: "dcdcdc" } },
      alignment: { vertical: "top", horizontal: "left", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
    };
    let dataStyle1 = {
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },  //fill: { fgColor: { rgb: "dcdcdc" } },
      alignment: { vertical: "top", horizontal: "center", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
    };
    let dataStyle2 = {
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },  //fill: { fgColor: { rgb: "dcdcdc" } },
      alignment: { vertical: "top", horizontal: "left", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
    };
    let dataStyle3 = {
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },  //fill: { fgColor: { rgb: "dcdcdc" } },
      alignment: { vertical: "top", horizontal: "center", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
      numFmt: "0.0%"
    };

    const gvhBefore = gvhProjectData.filter(item => item.phrase === 'before');
    const gvhAfter = gvhProjectData.filter(item => item.phrase === 'after');
    let row = [
      { v: "หัวข้อ", t: "s", s: headerStyle },
      { v: "ก่อนเริ่มโครงการ(" + gvhBefore.length + ")", t: "s", s: headerStyle },
      { v: "หลังเริ่มโครงการ(" + gvhAfter.length + ")", t: "s", s: headerStyle },
      { v: "ผล", t: "s", s: headerStyle },

    ];

    let formData = [];
    let varBefore = 0, varAfter = 0;

    formInitData.forEach((item, index) => {
      formData.push([
        { v: item.section, t: "s", s: dataStyle2 },
        { v: "", t: "n", s: dataStyle1 },
        { v: "", t: "n", s: dataStyle1 },
        { v: "", t: "s", s: dataStyle2 },
      ]);
      item.questions.forEach((question, qIndex) => {
        //console.log(question, index, qIndex);
        formData.push([
          { v: question, t: "s", s: titleStyle1 },
          { v: varBefore = (gvhBefore.reduce((acc, item1) => acc + item1["section_" + (index + 1) + "_" + (qIndex + 1)], 0) / gvhBefore.length).toFixed(2), t: "n", s: dataStyle1 },
          { v: varAfter = (gvhAfter.reduce((acc, item1) => acc + item1["section_" + (index + 1) + "_" + (qIndex + 1)], 0) / gvhAfter.length).toFixed(2), t: "n", s: dataStyle1 },
          { v: varBefore == varAfter ? "คงที่" : (varBefore < varAfter ? "เพิ่มขึ้น" : "ลดลง"), t: "s", s: dataStyle1 },
        ]);

      });
    });
    formData.push([
      { v: "", t: "s", s: titleStyle1 },
      { v: "", t: "n", s: dataStyle1 },
      { v: "", t: "n", s: dataStyle1 },
      { v: "", t: "s", s: dataStyle2 },
    ]);
    formData.push([
      { v: "ส่วนที่ 3 ", t: "s", s: titleStyle1 },
      { v: "", t: "n", s: dataStyle1 },
      { v: "", t: "n", s: dataStyle1 },
      { v: "", t: "s", s: dataStyle2 },
    ]);
    formData.push([
      { v: "ภาพรวมความสุขมวลรวม (GVH) ของครัวเรือนที่เข้าร่วมโครงการ", t: "s", s: titleStyle1 },
      { v: varBefore = (gvhBefore.reduce((acc, item1) => acc + item1.total_gvh, 0) / gvhBefore.length).toFixed(2), t: "n", s: dataStyle1 },
      { v: varAfter = (gvhAfter.reduce((acc, item1) => acc + item1.total_gvh, 0) / gvhAfter.length).toFixed(2), t: "n", s: dataStyle1 },
      { v: varBefore < varAfter ? "เพิ่มขึ้น" : "ลดลง", t: "s", s: dataStyle1 },
    ]);


    const ws = XLSX.utils.aoa_to_sheet([row], { origin: "A1" });
    XLSX.utils.sheet_add_aoa(ws, formData, { origin: "A2" });

    ws['!cols'] = [{ wch: 40 }, { wch: 10 }, { wch: 10 },];
    ws['!merges'] = [
      XLSX.utils.decode_range('A2:D2'),
      XLSX.utils.decode_range('A8:D8'),
      XLSX.utils.decode_range('A14:D14'),
      XLSX.utils.decode_range('A20:D20'),
      XLSX.utils.decode_range('A26:D26'),
      XLSX.utils.decode_range('A32:D32'),
      XLSX.utils.decode_range('A38:D38'),
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Report");

    // STEP 4: Write Excel file to browser
    XLSX.writeFile(wb, 'gvh-' + selectedProject.id + '-' + Date.now() + '.xlsx');

  };

  useEffect(() => {
    // ข้อมูลจำลองของคณะ
    const facultyData = [
      { id: 1, section_id: 1, name: "มหาวิทยาลัยราชภัฎเพชรบูรณ์" },
      { id: 102, section_id: 102, name: "คณะครุศาสตร์" },
      { id: 103, section_id: 103, name: "คณะเทคโนโลยีการเกษตรและเทคโนโลยีอุตสาหกรรม" },
      { id: 104, section_id: 104, name: "คณะมนุษยศาสตร์และสังคมศาสตร์" },
      { id: 105, section_id: 105, name: "คณะวิทยาการจัดการ" },
      { id: 106, section_id: 106, name: "คณะวิทยาศาสตร์และเทคโนโลยี" },
      { id: 112, section_id: 112, name: "คณะพยาบาลศาสตร์" },
      { id: 107, section_id: 107, name: "สถาบันวิจัยและพัฒนา" },
      { id: 108, section_id: 108, name: "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ" },
      { id: 109, section_id: 109, name: "สำนักศิลปะและวัฒนธรรม" },
      { id: 110, section_id: 110, name: "สำนักส่งเสริมวิชาการและงานทะเบียน" },
      { id: 111, section_id: 111, name: "สังกัดอธิการบดี" },
      { id: 113, section_id: 113, name: "โครงการศูนย์อุทยานวิทยาศาสตร์และเทคโนโลยีเพื่อนวัตกรรม" },
      { id: 114, section_id: 114, name: "บัณฑิตวิทยาลัย" },
      { id: 115, section_id: 115, name: "โครงการจัดตั้งวิทยาลัยนานาชาติ มหาวิทยาลัยราชภัฏเพชรบูรณ์" },
      { id: 116, section_id: 116, name: "โรงเรียนสาธิตมหาวิทยาลัยราชภัฏเพชรบูรณ์" },

      { id: 11101, section_id: 11101, name: "งานตรวจสอบภายใน" },
      { id: 1100105, section_id: 1100105, name: "งานบัณฑิตศึกษา" },

      { id: 101, section_id: 101, name: "สำนักงานอธิการบดี" },
      { id: 10101, section_id: 10101, name: "กองกลาง" },
      { id: 10102, section_id: 10102, name: "กองนโยบายและแผน" },
      { id: 10103, section_id: 10103, name: "กองพัฒนานักศึกษา" },
      { id: 10105, section_id: 10105, name: "กองอาคารสถานที่" },
    ];

    setFaculties(facultyData);
    setSelectedFaculty(facultyData[0].section_id); // เลือกคณะแรกเป็นค่าเริ่มต้
  }, []);


  useEffect(async () => {
    setLoading(true)
    await fetch(`${API_BASE_URL}/projects?method=minimize&year=${year}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setProjects(data)

        setLoading(false)
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false)
        setSuccess(true);
      });
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Header */}
        <div className="border-b border-gray-200 shadow-sm bg-white/80 backdrop-blur-md">
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text sm:text-4xl">
                  โครงการ GVH
                </h1>
                <p className="mt-1 text-sm text-gray-600 sm:text-base">ระบบติดตามและประเมินผลความสุขมวลรวม</p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="px-3 py-2 bg-blue-100 rounded-lg sm:px-4 sm:py-2">
                  <span className="text-xs text-blue-700 sm:text-sm">ปี {year + 543}</span>

                </div>
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-gray-600 rounded-lg lg:hidden hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mx-auto max-w-7xl">
          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar คณะ */}
          <div className={`fixed inset-y-0 left-0 z-50 w-80 p-6 transition-transform duration-300 ease-in-out bg-white lg:sticky lg:top-6 lg:z-auto lg:translate-x-0 lg:w-80 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-lg font-bold text-gray-900">คณะ/หน่วยงาน</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-hidden bg-white shadow-lg rounded-2xl">
                <div className="hidden px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 lg:block">
                  <h2 className="flex items-center text-lg font-bold text-white">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    คณะ/หน่วยงาน
                  </h2>
                </div>
                <div className="max-h-[calc(100vh-270px)] overflow-y-auto">
                  {faculties.map((faculty) => (
                    <div
                      key={faculty.id}
                      className={`px-6 py-3 cursor-pointer transition-all duration-200 border-l-4 ${selectedFaculty === faculty.section_id
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-600"
                        : "border-transparent hover:bg-gray-50"
                        }`}
                      onClick={() => setSelectedFaculty(faculty.section_id)}
                    >
                      <p className={`text-sm ${selectedFaculty === faculty.section_id
                        ? "font-semibold text-blue-700"
                        : "text-gray-700"
                        }`}>
                        {faculty.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* รายการโครงการ */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">โครงการในคณะ</h2>
              <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:px-4 sm:py-2">
                <span className="text-xs text-gray-600 sm:text-sm">
                  พบ {projects.filter(item => item.section_id == selectedFaculty && item.output_id == '04').length} โครงการ
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {!success ? (
                // Skeleton Loading
                Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="overflow-hidden bg-white shadow-lg rounded-2xl">
                    <div className="p-4 sm:p-6 animate-pulse">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="w-3/4 h-5 mb-3 bg-gray-200 rounded sm:h-6"></div>
                          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : projects.filter(item => item.section_id == selectedFaculty && item.output_id == '04').length > 0 ? (
                projects.filter(
                  item => item.section_id == selectedFaculty && item.output_id == '04'
                ).map((project, index) => (
                  <li
                    key={project.uuid}
                    className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div className="flex-1">
                          <div className="flex items-start space-x-3">
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                              {project.id.split('/').pop() || index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-md whitespace-nowrap">
                                  {project.id}
                                </span>
                              </div>
                              <h3
                                className="text-base font-bold text-gray-800 transition-colors cursor-pointer hover:text-blue-600 line-clamp-2 sm:text-lg"
                                onClick={() => { setSelectedProject(project); onSelectedProject(project) }}
                              >
                                {project.name}
                              </h3>
                              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                {project.year} • {project.section?.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 sm:flex-col lg:flex-row">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`/gvh/${project.year - 543}/${project.uuid}`, '_blank');
                            }}
                            className="flex items-center justify-center px-3 py-2 text-xs font-medium text-white transition-all duration-200 rounded-lg shadow-md sm:text-sm bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg whitespace-nowrap"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="hidden sm:inline">ดูรายละเอียด</span>
                            <span className="sm:hidden">รายละเอียด</span>
                          </button>
                          <button
                            onClick={() => toggleItem(project.id)}
                            className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-all duration-200 bg-gray-100 rounded-lg hover:bg-blue-100"
                          >
                            <span className={`text-gray-600 transition-transform duration-300 ${openItems[project.id] ? "rotate-180" : ""}`}>
                              ▼
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Expanded Activities */}
                      {openItems[project.id] && (
                        <div className="mt-6 space-y-3 animate-fadeIn">
                          <div className="flex items-center mb-4 space-x-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h4 className="font-semibold text-gray-700">กิจกรรม</h4>
                          </div>
                          {project.activity.map((act, actIndex) => (
                            <div
                              key={actIndex}
                              className={`overflow-hidden rounded-xl border-l-4 ${act.location[0] && new Date(act.location[0].start_at) > new Date()
                                ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-500"
                                : act.location[0]
                                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500"
                                  : "bg-gray-50 border-gray-400"
                                }`}
                            >
                              <div className="p-4">
                                <div className="flex items-start">
                                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${act.location[0] && new Date(act.location[0].start_at) > new Date()
                                    ? "bg-orange-100"
                                    : act.location[0]
                                      ? "bg-green-100"
                                      : "bg-gray-200"
                                    }`}>
                                    <span className={`text-sm font-bold ${act.location[0] && new Date(act.location[0].start_at) > new Date()
                                      ? "text-orange-600"
                                      : act.location[0]
                                        ? "text-green-600"
                                        : "text-gray-600"
                                      }`}>
                                      {actIndex + 1}
                                    </span>
                                  </div>
                                  <div className="flex-1 ml-3">
                                    <p className="font-medium text-gray-800">{act.name}</p>
                                    {act.location && act.location.length > 0 && (
                                      <div className="mt-2 space-y-1">
                                        {act.location.map((location, locIndex) => (
                                          <div key={locIndex} className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{location.location}</span>
                                            <span className="mx-2 text-gray-300">•</span>
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>
                                              {new Date(location.start_at).toLocaleDateString('th-TH', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                              })}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                // Empty State
                <div className="flex flex-col items-center justify-center py-16 bg-white shadow-lg rounded-2xl">
                  <svg className="w-24 h-24 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <p className="text-lg font-medium text-gray-500">ไม่มีโครงการในคณะนี้</p>
                  <p className="mt-1 text-sm text-gray-400">กรุณาเลือกคณะอื่นเพื่อดูโครงการ</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal แสดงรายละเอียดโครงการ */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-4xl my-8 bg-white shadow-2xl rounded-2xl sm:rounded-3xl animate-slideUp">
              {/* Modal Header */}
              <div className="relative p-6 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl sm:rounded-t-3xl sm:p-8">
                <div className="absolute top-0 right-0 w-64 h-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10"></div>
                <div className="relative">
                  <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{selectedProject.id}</h2>
                  <p className="text-sm text-white/90 sm:text-lg">{selectedProject.name}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-8">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 sm:gap-4">
                  <Link
                    to={`/gvh/${selectedProject.year - 543}/${selectedProject.uuid}/before`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-4 overflow-hidden transition-all duration-300 border-2 border-indigo-200 group bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl sm:p-6 hover:shadow-lg hover:border-indigo-400"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-indigo-500 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl group-hover:scale-110">
                        <svg className="w-6 h-6 text-white sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <p className="text-base font-bold text-indigo-700 sm:text-lg">สำรวจ GVH ก่อนเริ่มโครงการ</p>
                        <p className="text-xs text-indigo-500 sm:text-sm">{gvhSummary && gvhSummary.countBefore} ผู้เข้าร่วม</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    to={`/gvh/${selectedProject.year - 543}/${selectedProject.uuid}/after`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-4 overflow-hidden transition-all duration-300 border-2 border-green-200 group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:p-6 hover:shadow-lg hover:border-green-400"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-green-500 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl group-hover:scale-110">
                        <svg className="w-6 h-6 text-white sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-bold text-green-700">สำรวจ GVH หลังจบโครงการ</p>
                        <p className="text-sm text-green-500">{gvhSummary && gvhSummary.countAfter} ผู้เข้าร่วม</p>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Export Button */}
                <div className="flex justify-center mb-8">
                  <button
                    onClick={exportExcelFile}
                    disabled={!gvhSummary || gvhSummary.countAfter === 0}
                    className={`flex items-center justify-center w-full px-6 py-3 font-bold text-white rounded-xl transition-all duration-300 sm:w-auto sm:px-8 sm:py-4 ${gvhSummary && gvhSummary.countAfter !== 0
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105"
                      : "bg-gray-300 cursor-not-allowed"
                      }`}
                  >
                    <svg className="w-5 h-5 mr-2 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm sm:text-base">Export Results (Excel)</span>
                  </button>
                </div>

                {/* Activities List */}
                <div className="overflow-hidden bg-gray-50 rounded-xl sm:rounded-2xl">
                  <div className="px-4 py-3 bg-white border-b border-gray-200 sm:px-6 sm:py-4">
                    <h3 className="flex items-center text-base font-bold text-gray-800 sm:text-lg">
                      <svg className="w-4 h-4 mr-2 text-blue-600 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      กิจกรรมในโครงการ
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {selectedProject.activity.map((act, index) => (
                      <div key={index} className="px-4 py-3 transition-colors hover:bg-white sm:px-6 sm:py-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 sm:text-base">{act.name}</h4>
                            {act.location && act.location[0] && (
                              <div className="flex items-center mt-1 text-xs text-gray-500 sm:text-sm">
                                <svg className="w-3 h-3 mr-1 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {act.location[0].location}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center">
                            {act.location && act.location[0] && (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full sm:px-3 sm:py-1 ${new Date(act.location[0].start_at) > new Date()
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                                }`}>
                                {new Date(act.location[0].start_at).toLocaleDateString('th-TH', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-center mt-6 sm:mt-8">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center justify-center w-full px-6 py-3 text-white transition-all duration-300 bg-red-500 rounded-xl hover:bg-red-600 hover:shadow-lg sm:w-auto"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectList;
