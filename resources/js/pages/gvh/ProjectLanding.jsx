import React, { useState, useEffect, use } from 'react';
import { useParams, Link } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import * as XLSX from 'xlsx-js-style';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = window.location.origin;

const ProjectLanding = () => {
  const { year, uuid } = useParams();
  const [project, setProject] = useState(null);
  const [gvhData, setGvhData] = useState([]);
  const [gvhSummary, setGvhSummary] = useState({});
  const [dimensionSummary, setDimensionSummary] = useState([]);
  const [respondentStats, setRespondentStats] = useState({ gender: [], age: [], district: [], career: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedQR, setSelectedQR] = useState({ title: '', url: '' });

  useEffect(() => {
    document.title = "แบบประเมินความสุขมวลรวม (GVH) - " + (project ? project.name : 'กำลังโหลด...');
  }, [project]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project details
        const projectResponse = await fetch(`${API_BASE_URL}/projects/${year}/${uuid}?method=minimize`);
        const projectData = await projectResponse.json();
        setProject(projectData);

        // Fetch GVH data
        const gvhResponse = await fetch(`${API_BASE_URL}/gvhs/score/${projectData.id}`);
        const gvhData = await gvhResponse.json();
        setGvhData(gvhData);

        // Calculate summary
        const gvhBefore = gvhData.filter(item => item.phrase === 'before');
        const gvhAfter = gvhData.filter(item => item.phrase === 'after');

        setGvhSummary({
          countBefore: gvhBefore.length,
          scoreBefore: gvhBefore.reduce((acc, item) => acc + item.total_gvh, 0),
          averageBefore: gvhBefore.length > 0 ? gvhBefore.reduce((acc, item) => acc + item.total_gvh, 0) / gvhBefore.length : 0,
          maxBefore: gvhBefore.length > 0 ? gvhBefore.reduce((acc, item) => Math.max(acc, item.total_gvh), 0) : 0,
          minBefore: gvhBefore.length > 0 ? gvhBefore.reduce((acc, item) => Math.min(acc, item.total_gvh), 0) : 0,

          countAfter: gvhAfter.length,
          scoreAfter: gvhAfter.reduce((acc, item) => acc + item.total_gvh, 0),
          averageAfter: gvhAfter.length > 0 ? gvhAfter.reduce((acc, item) => acc + item.total_gvh, 0) / gvhAfter.length : 0,
          maxAfter: gvhAfter.length > 0 ? gvhAfter.reduce((acc, item) => Math.max(acc, item.total_gvh), 0) : 0,
          minAfter: gvhAfter.length > 0 ? gvhAfter.reduce((acc, item) => Math.min(acc, item.total_gvh), 0) : 0,
        });

        // Calculate dimension summary (6 dimensions)
        const dimensions = [
          { id: 1, name: "ด้านวิถีชีวิตแบบพอเพียงของชุมชน" },
          { id: 2, name: "ด้านสุขภาวะและความมั่นคงของครอบครัว" },
          { id: 3, name: "เศรษฐกิจครัวเรือนเข้มแข็ง" },
          { id: 4, name: "ด้านการบริหารจัดการชุมชน" },
          { id: 5, name: "ด้านธรรมชาติและการจัดสรรทรัพยากรชุมชน" },
          { id: 6, name: "ด้านการศึกษาและการจัดสวัสดิการชุมชน" }
        ];

        const dimensionData = dimensions.map(dim => {
          const sectionBefore = gvhBefore.reduce((acc, item) => {
            let sectionSum = 0;
            for (let i = 1; i <= 5; i++) {
              sectionSum += item[`section_${dim.id}_${i}`] || 0;
            }
            return acc + sectionSum;
          }, 0);

          const sectionAfter = gvhAfter.reduce((acc, item) => {
            let sectionSum = 0;
            for (let i = 1; i <= 5; i++) {
              sectionSum += item[`section_${dim.id}_${i}`] || 0;
            }
            return acc + sectionSum;
          }, 0);

          const avgBefore = gvhBefore.length > 0 ? sectionBefore / gvhBefore.length / 5 : 0;
          const avgAfter = gvhAfter.length > 0 ? sectionAfter / gvhAfter.length / 5 : 0;

          return {
            ...dim,
            scoreBefore: sectionBefore,
            scoreAfter: sectionAfter,
            averageBefore: avgBefore,
            averageAfter: avgAfter,
            change: avgAfter - avgBefore
          };
        });

        setDimensionSummary(dimensionData);

        // Calculate respondent statistics (from 'after' data)
        const genderCount = { male: 0, female: 0 };
        const ageCount = { '<26': 0, '26-35': 0, '36-45': 0, '46-55': 0, '>55': 0 };
        const districtCount = {};
        const careerCount = { farmer: 0, government: 0, employee: 0, business: 0, other: 0 };

        gvhAfter.forEach(item => {
          // Gender
          if (item.gender === 'male') genderCount.male++;
          else if (item.gender === 'female') genderCount.female++;

          // Age
          if (ageCount[item.age] !== undefined) ageCount[item.age]++;

          // District (ตำบล)
          if (item.district) {
            districtCount[item.district] = (districtCount[item.district] || 0) + 1;
          }

          // Career
          if (item.career) {
            if (careerCount[item.career] !== undefined) {
              careerCount[item.career]++;
            } else {
              careerCount.other++;
            }
          }
        });

        const careerLabels = {
          farmer: 'เกษตรกร',
          government: 'รับราชการ',
          employee: 'รับจ้าง',
          business: 'ประกอบการค้า/ค้าขาย',
          other: 'อื่นๆ'
        };

        const ageLabels = {
          '<26': 'ต่ำกว่า 26 ปี',
          '26-35': '26 – 35 ปี',
          '36-45': '36 – 45 ปี',
          '46-55': '46 – 55 ปี',
          '>55': 'สูงกว่า 55 ปี'
        };

        setRespondentStats({
          gender: [
            { label: 'ชาย', value: genderCount.male, percentage: gvhAfter.length > 0 ? ((genderCount.male / gvhAfter.length) * 100).toFixed(1) : 0 },
            { label: 'หญิง', value: genderCount.female, percentage: gvhAfter.length > 0 ? ((genderCount.female / gvhAfter.length) * 100).toFixed(1) : 0 }
          ],
          age: Object.entries(ageCount).map(([key, value]) => ({
            label: ageLabels[key],
            value,
            percentage: gvhAfter.length > 0 ? ((value / gvhAfter.length) * 100).toFixed(1) : 0
          })),
          district: Object.entries(districtCount)
            .map(([label, value]) => ({
              label,
              value,
              percentage: gvhAfter.length > 0 ? ((value / gvhAfter.length) * 100).toFixed(1) : 0
            }))
            .sort((a, b) => b.value - a.value),
          career: Object.entries(careerCount).map(([key, value]) => ({
            label: careerLabels[key],
            value,
            percentage: gvhAfter.length > 0 ? ((value / gvhAfter.length) * 100).toFixed(1) : 0
          }))
        });

        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

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
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },
      alignment: { vertical: "top", horizontal: "left", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
    };
    let dataStyle1 = {
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },
      alignment: { vertical: "top", horizontal: "center", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
    };
    let dataStyle2 = {
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },
      alignment: { vertical: "top", horizontal: "left", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
    };
    let dataStyle3 = {
      font: { name: "Sarabun", sz: 8, bold: false, color: { rgb: "000000" } },
      alignment: { vertical: "top", horizontal: "center", wrapText: true },
      border: {
        top: { style: 'thin', color: '000000' },
        bottom: { style: 'thin', color: '000000' },
        right: { style: 'thin', color: '000000' },
        left: { style: 'thin', color: '000000' },
      },
      numFmt: "0.0%"
    };

    const gvhBefore = gvhData.filter(item => item.phrase === 'before');
    const gvhAfter = gvhData.filter(item => item.phrase === 'after');
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
    XLSX.writeFile(wb, 'gvh-' + project.id + '-' + Date.now() + '.xlsx');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xl p-4 mx-auto border border-blue-300 rounded-md">
          <div className="flex space-x-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 py-1 space-y-6">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 col-span-2 bg-gray-200 rounded"></div>
                  <div className="h-2 col-span-1 bg-gray-200 rounded"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">ไม่พบข้อมูลโครงการ</h2>
          <Link to="/gvh" className="mt-4 text-blue-600 hover:underline">กลับไปยังรายการโครงการ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.id}</h1>
              <p className="mt-2 text-lg text-gray-600">{project.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setSelectedQR({
                    title: 'หน้าโครงการ',
                    url: `${BASE_URL}/gvh/${year}/${uuid}`
                  });
                  setShowQRModal(true);
                }}
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                QR โครงการ
              </button>
              <Link
                to={`/gvh/${project.year - 543}/${project.uuid}/before`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                สำรวจ GVH ก่อนเริ่มโครงการ
              </Link>
              <button
                onClick={() => {
                  setSelectedQR({
                    title: 'แบบสำรวจก่อนเริ่มโครงการ',
                    url: `${BASE_URL}/gvh/${year}/${uuid}/before`
                  });
                  setShowQRModal(true);
                }}
                className="flex items-center px-4 py-2 text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                QR ก่อน
              </button>
              <Link
                to={`/gvh/${project.year - 543}/${project.uuid}/after`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                สำรวจ GVH หลังจบโครงการ
              </Link>
              <button
                onClick={() => {
                  setSelectedQR({
                    title: 'แบบสำรวจหลังจบโครงการ',
                    url: `${BASE_URL}/gvh/${year}/${uuid}/after`
                  });
                  setShowQRModal(true);
                }}
                className="flex items-center px-4 py-2 text-green-700 bg-green-100 rounded-md hover:bg-green-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                QR หลัง
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex -mb-px space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              ภาพรวม
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'activities'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              กิจกรรม
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'results'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              ผลลัพธ์
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'statistics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              สถิติผู้ตอบแบบสอบถาม
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Project Info Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">ปีงบประมาณ</p>
                    <p className="text-2xl font-bold text-gray-900">{project.year}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-green-100 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">หน่วยงาน</p>
                    <p className="text-lg font-semibold text-gray-900 truncate">{project.section?.name}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">ผู้เข้าร่วม (ก่อน)</p>
                    <p className="text-2xl font-bold text-gray-900">{gvhSummary.countBefore || 0}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-full">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">ผู้เข้าร่วม (หลัง)</p>
                    <p className="text-2xl font-bold text-gray-900">{gvhSummary.countAfter || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GVH Summary */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-xl font-bold text-gray-900">สรุปผลคะแนนความสุขมวลรวม (GVH)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">รายการ</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ก่อนเริ่มโครงการ</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">หลังเริ่มโครงการ</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">เปลี่ยนแปลง</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">จำนวนผู้เข้าร่วม</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{gvhSummary.countBefore || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{gvhSummary.countAfter || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {(gvhSummary.countAfter || 0) - (gvhSummary.countBefore || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">คะแนนเฉลี่ย</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{(gvhSummary.averageBefore || 0).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{(gvhSummary.averageAfter || 0).toFixed(2)}</td>
                      <td className={`px-6 py-4 text-sm font-medium ${(gvhSummary.averageAfter || 0) > (gvhSummary.averageBefore || 0)
                        ? 'text-green-600'
                        : (gvhSummary.averageAfter || 0) < (gvhSummary.averageBefore || 0)
                          ? 'text-red-600'
                          : 'text-gray-500'
                        }`}>
                        {((gvhSummary.averageAfter || 0) - (gvhSummary.averageBefore || 0)).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">คะแนนสูงสุด</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{gvhSummary.maxBefore || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{gvhSummary.maxAfter || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {(gvhSummary.maxAfter || 0) - (gvhSummary.maxBefore || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">คะแนนต่ำสุด</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{gvhSummary.minBefore || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{gvhSummary.minAfter || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {(gvhSummary.minAfter || 0) - (gvhSummary.minBefore || 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export Button */}
            <div className="text-center">
              <button
                onClick={exportExcelFile}
                disabled={!gvhSummary.countAfter}
                className={`px-6 py-3 font-bold text-white rounded-md ${gvhSummary.countAfter
                  ? 'bg-blue-500 hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
                  }`}
              >
                📊 Export Results (Excel)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">กิจกรรมในโครงการ</h3>
            {project.activity && project.activity.length > 0 ? (
              project.activity.map((act, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-900">{act.name}</h4>
                  {act.location && act.location.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {act.location.map((location, locIndex) => (
                        <div key={locIndex} className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location.location}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
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
              ))
            ) : (
              <p className="text-gray-500">ไม่มีข้อมูลกิจกรรม</p>
            )}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">ผลลัพธ์การสำรวจ</h3>

            {/* Dimension Summary (6 Dimensions) */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">สรุปผลตามด้านทั้ง 6 ด้าน</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ด้าน</th>
                      <th className="px-4 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">ก่อน (คะแนนเฉลี่ย)</th>
                      <th className="px-4 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">หลัง (คะแนนเฉลี่ย)</th>
                      <th className="px-4 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">เปลี่ยนแปลง</th>
                      <th className="px-4 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dimensionSummary.map((dim, index) => (
                      <tr key={dim.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {dim.id}. {dim.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-center text-gray-500">
                          {dim.averageBefore.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm text-center text-gray-500">
                          {dim.averageAfter.toFixed(2)}
                        </td>
                        <td className={`px-4 py-4 text-sm text-center font-medium ${
                          dim.change > 0 ? 'text-green-600' : 
                          dim.change < 0 ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {dim.change > 0 ? '+' : ''}{dim.change.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          {dim.change > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              เพิ่มขึ้น
                            </span>
                          ) : dim.change < 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              ลดลง
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              คงที่
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Before Survey */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">ก่อนเริ่มโครงการ</h4>
                <Link
                  to={`/gvh/${project.year - 543}/${project.uuid}/before`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  เข้าแบบสำรวจ
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 text-center rounded-lg bg-blue-50">
                  <p className="text-sm text-gray-600">จำนวนผู้ตอบ</p>
                  <p className="text-2xl font-bold text-blue-600">{gvhSummary.countBefore || 0}</p>
                </div>
                <div className="p-4 text-center rounded-lg bg-blue-50">
                  <p className="text-sm text-gray-600">คะแนนเฉลี่ย</p>
                  <p className="text-2xl font-bold text-blue-600">{(gvhSummary.averageBefore || 0).toFixed(2)}</p>
                </div>
                <div className="p-4 text-center rounded-lg bg-blue-50">
                  <p className="text-sm text-gray-600">คะแนนรวม</p>
                  <p className="text-2xl font-bold text-blue-600">{gvhSummary.scoreBefore || 0}</p>
                </div>
              </div>
            </div>

            {/* After Survey */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">หลังจบโครงการ</h4>
                <Link
                  to={`/gvh/${project.year - 543}/${project.uuid}/after`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  เข้าแบบสำรวจ
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 text-center rounded-lg bg-green-50">
                  <p className="text-sm text-gray-600">จำนวนผู้ตอบ</p>
                  <p className="text-2xl font-bold text-green-600">{gvhSummary.countAfter || 0}</p>
                </div>
                <div className="p-4 text-center rounded-lg bg-green-50">
                  <p className="text-sm text-gray-600">คะแนนเฉลี่ย</p>
                  <p className="text-2xl font-bold text-green-600">{(gvhSummary.averageAfter || 0).toFixed(2)}</p>
                </div>
                <div className="p-4 text-center rounded-lg bg-green-50">
                  <p className="text-sm text-gray-600">คะแนนรวม</p>
                  <p className="text-2xl font-bold text-green-600">{gvhSummary.scoreAfter || 0}</p>
                </div>
              </div>
            </div>

            {/* Change Indicator */}
            <div className={`p-6 rounded-lg shadow-md ${(gvhSummary.averageAfter || 0) > (gvhSummary.averageBefore || 0)
              ? 'bg-green-50'
              : (gvhSummary.averageAfter || 0) < (gvhSummary.averageBefore || 0)
                ? 'bg-red-50'
                : 'bg-gray-50'
              }`}>
              <h4 className="mb-4 text-lg font-semibold text-gray-900">การเปลี่ยนแปลง</h4>
              <div className="flex items-center justify-center">
                {(gvhSummary.averageAfter || 0) > (gvhSummary.averageBefore || 0) ? (
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <p className="mt-2 text-2xl font-bold text-green-600">
                      +{((gvhSummary.averageAfter || 0) - (gvhSummary.averageBefore || 0)).toFixed(2)}
                    </p>
                    <p className="text-gray-600">คะแนนเฉลี่ยเพิ่มขึ้น</p>
                  </div>
                ) : (gvhSummary.averageAfter || 0) < (gvhSummary.averageBefore || 0) ? (
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <p className="mt-2 text-2xl font-bold text-red-600">
                      {((gvhSummary.averageAfter || 0) - (gvhSummary.averageBefore || 0)).toFixed(2)}
                    </p>
                    <p className="text-gray-600">คะแนนเฉลี่ยลดลง</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                    <p className="mt-2 text-2xl font-bold text-gray-600">0.00</p>
                    <p className="text-gray-600">คะแนนเฉลี่ยคงที่</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">ข้อมูลสถิติผู้ตอบแบบสอบถาม</h3>
            <p className="text-sm text-gray-600">ข้อมูลจากผู้ตอบแบบสอบถามหลังจบโครงการ (n = {gvhSummary.countAfter || 0})</p>

            {/* Gender Statistics */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">เพศ</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                {respondentStats.gender.map((stat, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                      <span className="text-lg font-bold text-blue-600">{stat.value} คน</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{stat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Statistics */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">ช่วงอายุ</h4>
              <div className="space-y-3">
                {respondentStats.age.map((stat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-gray-700">{stat.label}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 text-sm font-medium text-gray-900 text-right">{stat.value} คน</div>
                    <div className="w-16 text-xs text-gray-500 text-right">{stat.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* District Statistics */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">ตำบล</h4>
              <div className="space-y-3">
                {respondentStats.district.length > 0 ? (
                  respondentStats.district.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-32 text-sm text-gray-700 truncate">{stat.label}</div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-purple-600 h-2.5 rounded-full"
                            style={{ width: `${stat.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-20 text-sm font-medium text-gray-900 text-right">{stat.value} คน</div>
                      <div className="w-16 text-xs text-gray-500 text-right">{stat.percentage}%</div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">ไม่มีข้อมูลตำบล</p>
                )}
              </div>
            </div>

            {/* Career Statistics */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">อาชีพ</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {respondentStats.career.map((stat, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl font-bold text-orange-600">{stat.value}</span>
                      <span className="text-xs text-gray-500">{stat.percentage}%</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-orange-600 h-2.5 rounded-full"
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl animate-slideUp">
            {/* Modal Header */}
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900">{selectedQR.title}</h3>
              <p className="mt-2 text-sm text-gray-500 break-all">{selectedQR.url}</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white border-4 border-gray-100 shadow-lg rounded-2xl">
                <QRCodeSVG
                  value={selectedQR.url}
                  size={256}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    excavate: false,
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedQR.url);
                }}
                className="flex items-center justify-center flex-1 px-4 py-3 text-gray-700 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                คัดลอก URL
              </button>
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 px-4 py-3 text-white transition-colors bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="fixed bottom-6 right-6">
        <Link
          to="/gvh"
          className="flex items-center px-4 py-2 text-white bg-gray-700 rounded-full shadow-lg hover:bg-gray-800"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          กลับ
        </Link>
      </div>

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
    </div>
  );
};

export default ProjectLanding;
