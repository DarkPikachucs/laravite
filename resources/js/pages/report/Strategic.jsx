import React, { useState, useEffect } from 'react';
import { Link } from "react-router";
import { useSearchParams } from "react-router-dom";

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import StrategicTable1 from '../../components/Reports/StrategicTable1';
import StrategicTable2 from '../../components/Reports/StrategicTable2';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const { Header, Content, Footer } = Layout;
const items = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));


const Strategic = (budgetYear = 2025) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [projects, setProjects] = useState([]);
  //const [table1, setTable1] = useState({});
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || budgetYear; // ใช้ปีที่ส่งมาเป็นค่าเริ่มต้นถ้าไม่มีการระบุปีใน URL
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // Animation for progress bars
  /* window.addEventListener('load', function () {
     const progressBars = document.querySelectorAll('.progress-fill');
     progressBars.forEach(bar => {
       const width = bar.style.width;
       bar.style.width = '0%';
       setTimeout(() => {
         bar.style.width = width;
       }, 500);
     });
   });*/

  // Hover effects for table rows
  /*const tableRows = document.querySelectorAll('tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.01)';
      this.style.zIndex = '10';
    });

    row.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.style.zIndex = 'auto';
    });
  });*/
  const dataReportSummary = () => {
    setTable1({
      ...table1,
      strategic1: {
        totalProjects: projects.filter(project => project.output_id == '04' && ["411", "412"].includes(project.main_activity_id)).length,
        budget: {
          economic: {
            budget01: projects.filter(project => project.output_id == '04' && project.main_activity_id == '411' && project.budget_code_id == '01').length,
            budget02: projects.filter(project => project.output_id != '04' && project.main_activity_id == '412' && project.budget_code_id == '01').length,

            total: projects.filter(project => project.output_id != '04' && ["411", "412"].includes(project.main_activity_id)).length,
          },
          social: 8,
          environmental: 24,
          education: 12,
        },
      },
      strategic2: {
        totalProjects: 45,
        budget: {
          government: 1,
          revenue: 8,
          otherSources: 24,
        },
      },
      strategic3: {
        totalProjects: 45,
        budget: {
          government: 1,
          revenue: 8,
          otherSources: 24,
        },
      },
      strategic4: {
        totalProjects: 45,
        budget: {
          government: 1,
          revenue: 8,
          otherSources: 24,
        },
      },
    })

    return {
      year: year,
      totalProjects: 195,
      mainStrategies: 4,
      overallSuccess: '85%',
      budgetYear: year + 543,
      totalBudget: '1,000,000',
    }
  }

  useEffect(async () => {
    setLoading(true)
    //await axios.get("/sanctum/csrf-cookie");
    await fetch(`${API_BASE_URL}/projects/${year}?method=minimize&layout=strategics`)
      //fetch('http://laravite.test/api/projects')
      .then((response) => response.json())
      .then((data) => {
        //data.data.filter(project => project.output_id === '04');

        console.log(data.filter(project => project.output_id === '04'));
        setProjects(data.filter(project => project.output_id === '04'))
        //dataReportSummary();
        //const projrctGroup = Object.groupBy(data.data, ({ type }) => type);

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
      <div class="container">
        <style jsx>{`
        .header h1,.header p{position:relative;z-index:1}.content,.header{padding:40px 30px}.header,th{color:#fff}.total-row,th{font-weight:600}.stat-card,td,th{text-align:center;transition:.3s}*{margin:0;padding:0;box-sizing:border-box}body{font-family:Sarabun,Arial,sans-serif;background:linear-gradient(135deg,#f5f7fa 0,#c3cfe2 100%);min-height:100vh;padding:20px}.container{max-width:1200px;margin:0 auto;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.1);overflow:hidden}.header{background:linear-gradient(135deg,#667eea 0,#764ba2 100%);text-align:center;position:relative;overflow:hidden}.header::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,.1) 0,transparent 70%);animation:6s ease-in-out infinite float}@keyframes float{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(-20px,-20px) rotate(180deg)}}.header h1{font-size:2.5rem;margin-bottom:10px}.header p{font-size:1.2rem;opacity:.9}.table-container{overflow:visible;margin-bottom:30px;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,.1)}.note,tr:hover td{box-shadow:0 5px 15px rgba(0,0,0,.1)}table{width:100%;border-collapse:collapse;background:#fff;font-size:14px}td,th{padding:15px 12px;border:1px solid #e0e0e0}.note,.stat-card{border-radius:15px}th{background:linear-gradient(135deg,#4a5568 0,#2d3748 100%);text-shadow:0 1px 2px rgba(0,0,0,.3)}.strategy-1{background:linear-gradient(135deg,#fef3c7 0,#fcd34d 100%)}.strategy-2{background:linear-gradient(135deg,#cffafe 0,#22d3ee 100%)}.strategy-3{background:linear-gradient(135deg,#fed7aa 0,#fb923c 100%)}.strategy-4{background:linear-gradient(135deg,#e0e7ff 0,#8b5cf6 100%)}.total-row{background:linear-gradient(135deg,#f3f4f6 0,#e5e7eb 100%)}tr:hover td{transform:scale(1.02)}.note{background:linear-gradient(135deg,#fef7cd 0,#fbbf24 20%);padding:20px;margin-top:30px;border-left:5px solid #f59e0b}.note h3{color:#92400e;margin-bottom:10px;font-size:1.1rem}.note p{color:#78350f;line-height:1.6}.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:30px}.stat-card{background:linear-gradient(135deg,#fff 0,#f8fafc 100%);padding:25px;box-shadow:0 10px 25px rgba(0,0,0,.1);border:1px solid #e2e8f0}.stat-card:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,.15)}.stat-number{font-size:2.5rem;font-weight:700;background:linear-gradient(135deg,#667eea 0,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.stat-label{color:#64748b;margin-top:10px;font-weight:500}@media (max-width:768px){.header h1{font-size:1.8rem}.header p{font-size:1rem}.content{padding:20px 15px}td,th{padding:10px 8px;font-size:12px}}.progress-bar{width:100%;height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-top:10px}.progress-fill{height:100%;background:linear-gradient(90deg,#10b981 0,#059669 100%);border-radius:4px;transition:width 2s ease-in-out}
      `}</style>
        <div class="header">
          <h1>รายงานผลการดำเนินงานภายใต้ยุทธศาสตร์</h1>
          <p>มหาวิทยาลัยราชภัฎเพชรบูรณ์ ประจำปี {year + 543}</p>
        </div>

        {success && (
          <div class="content">
            <Link to="/strategics">Back</Link> -  <Link to="/str">Back</Link>
            <StrategicTable1 projects={projects} year={year}></StrategicTable1>
            <StrategicTable2 projects={projects} year={year}></StrategicTable2>

          </div>
        )}


      </div >
    </>
  );
};

export default Strategic;