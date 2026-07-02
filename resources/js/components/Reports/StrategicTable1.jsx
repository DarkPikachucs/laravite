import { React, lazy, useState, useEffect } from "react";
//import '../../../css/strategics-report.css';

export default function StrategicTable1(props) {
  const { projects, year } = props;
  //const [table1, setTable1] = useState({});
  const [table1, setTable1] = useState({});


  const dataReportSummary = () => {
    let nationalBudget = '01';
    let revenueBudget = ['03', '09', '32', '34', '47', '67', '84'];
    let otherSourcesBudget = ['47', '68', '73', '80'];
    setTable1({
      ...table1,
      strategic1: {
        totalProjects: projects.filter(project => ['411', '412', '413', '414', '415', '416', '417'].includes(project.main_activity_id)).length,
        economic: {
          government: projects.filter(project => ['411', '412'].includes(project.main_activity_id) && project.budget_code_id == nationalBudget).length,
          revenue: projects.filter(project => ['411', '412'].includes(project.main_activity_id) && revenueBudget.includes(project.budget_code_id)).length,
          otherSources: projects.filter(project => ['411', '412'].includes(project.main_activity_id) && otherSourcesBudget.includes(project.budget_code_id)).length,
          total: projects.filter(project => ['411', '412'].includes(project.main_activity_id)).length,
        },
        social: {
          government: projects.filter(project => ['413', '419'].includes(project.main_activity_id) && project.budget_code_id == nationalBudget).length,
          revenue: projects.filter(project => ['413', '419'].includes(project.main_activity_id) && ['03', '09', '32', '34', '47', '67', '84'].includes(project.budget_code_id)).length,
          otherSources: projects.filter(project => ['413', '419'].includes(project.main_activity_id) && project.budget_code_id == '01').length,
          total: projects.filter(project => ['413', '419'].includes(project.main_activity_id)).length,
        },
        environmental: {
          government: projects.filter(project => project.main_activity_id == '414' && project.budget_code_id == nationalBudget).length,
          revenue: projects.filter(project => project.main_activity_id == '414' && ['03', '09', '32', '34', '47', '67', '84'].includes(project.budget_code_id)).length,
          otherSources: projects.filter(project => project.main_activity_id == '414' && project.budget_code_id == '01').length,
          total: projects.filter(project => project.main_activity_id == '414').length,
        },
        education: {
          government: projects.filter(project => ['415', '417'].includes(project.main_activity_id) && project.budget_code_id == nationalBudget).length,
          revenue: projects.filter(project => ['415', '417'].includes(project.main_activity_id) && ['03', '09', '32', '34', '47', '67', '84'].includes(project.budget_code_id)).length,
          otherSources: projects.filter(project => ['415', '417'].includes(project.main_activity_id) && project.budget_code_id == '01').length,
          total: projects.filter(project => ['415', '417'].includes(project.main_activity_id)).length,
        },

      },
      strategic2: {
        totalProjects: 45,
        teacherProduction: {
          government: projects.filter(project => project.main_activity_id == '416' && project.budget_code_id == '01').length,
          revenue: projects.filter(project => project.main_activity_id == '416' && ['03', '09', '32', '34', '47', '67', '84'].includes(project.budget_code_id)).length,
          otherSources: projects.filter(project => project.main_activity_id == '416' && project.budget_code_id != '01').length,
          total: projects.filter(project => project.main_activity_id == '416').length,
        },
        teacherDevelopment: {
          government: projects.filter(project => project.main_activity_id == '416' && project.budget_code_id == '01').length,
          revenue: projects.filter(project => project.main_activity_id == '416' && ['03', '09', '32', '34', '47', '67', '84'].includes(project.budget_code_id)).length,
          otherSources: projects.filter(project => project.main_activity_id == '416' && project.budget_code_id != '01').length,
          total: projects.filter(project => project.main_activity_id == '416').length,
        },
      },
      strategic3: {
        totalProjects: projects.filter(project => ['417', '418'].includes(project.main_activity_id)).length,
        budget: {
          government: projects.filter(project => ['417', '418'].includes(project.main_activity_id) && project.budget_code_id == '01').length,
          revenue: projects.filter(project => ['417', '418'].includes(project.main_activity_id) && ['03', '09', '32', '34', '47', '67', '84'].includes(project.budget_code_id)).length,
          otherSources: projects.filter(project => ['417', '418'].includes(project.main_activity_id) && project.budget_code_id != '01').length,
          total: projects.filter(project => ['417', '418'].includes(project.main_activity_id)).length,
        },
      },
      strategic4: {
        totalProjects: 0,
        budget: {
          government: 0,
          revenue: 0,
          otherSources: 0,
          total: 0,
        },
      },
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dataReportSummary();
  }, []);

  return (
    (table1.strategic1 && table1.strategic1.totalProjects) ? (
      <div className="overflow-x-hidden">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{projects.length}</div>
            <div class="stat-label">โครงการทั้งหมด</div>
            <div class="progress-bar" >
              <div class="progress-fill" style={{ width: "100%" }}></div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">ยุทธศาสตร์หลัก</div>
            <div class="progress-bar">
              <div class="progress-fill" style={{ width: "100%" }}></div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-number">xx%</div>
            <div class="stat-label">ความสำเร็จโดยรวม</div>
            <div class="progress-bar">
              <div class="progress-fill" style={{ width: "85%" }}></div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{year + 543}</div>
            <div class="stat-label">ปีงบประมาณ</div>
            <div class="progress-bar">
              <div class="progress-fill" style={{ width: "100%" }}></div>
            </div>
          </div>
        </div>


        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th rowspan="2">ประเด็นยุทธศาสตร์</th>
                <th colspan="3">จำนวนโครงการภายใต้ยุทธศาสตร์ครั้งที่หาวิทยาลัยสีข้าวที่ขอรับการพิจารณาทั้งสิ้น</th>
                <th rowspan="2">รวม</th>
              </tr>
              <tr>
                <th>งบประมาณแผ่นดิน</th>
                <th>งบประมาณรายได้</th>
                <th>งบประมาณจากแหล่งทุนอื่น</th>
              </tr>
            </thead>
            <tbody>
              <tr class="strategy-1">
                <td className="text-left"><strong>1. การพัฒนาท้องถิ่น</strong></td>
                <td>{table1.strategic1.economic.total + table1.strategic1.social.government + table1.strategic1.environmental.government + table1.strategic1.education.government}</td>
                <td>{table1.strategic1.economic.revenue + table1.strategic1.social.revenue + table1.strategic1.environmental.revenue + table1.strategic1.education.revenue}</td>
                <td>{table1.strategic1.economic.otherSources + table1.strategic1.social.otherSources + table1.strategic1.environmental.otherSources + table1.strategic1.education.otherSources}</td>
                <td><strong>{table1.strategic1.totalProjects}</strong></td>
              </tr>
              <tr>
                <td className="text-left">- ด้านเศรษฐกิจ</td>
                <td>{table1.strategic1.economic.government}</td>
                <td>{table1.strategic1.economic.revenue}</td>
                <td>{table1.strategic1.economic.otherSources}</td>
                <td>{table1.strategic1.economic.total}</td>
              </tr>
              <tr>
                <td className="text-left">- ด้านสังคม</td>
                <td>{table1.strategic1.social.government}</td>
                <td>{table1.strategic1.social.revenue}</td>
                <td>{table1.strategic1.social.otherSources}</td>
                <td>{table1.strategic1.social.total}</td>
              </tr>
              <tr>
                <td className="text-left">- ด้านสิ่งแวดล้อม</td>
                <td>{table1.strategic1.environmental.government}</td>
                <td>{table1.strategic1.environmental.revenue}</td>
                <td>{table1.strategic1.environmental.otherSources}</td>
                <td>{table1.strategic1.environmental.total}</td>
              </tr>
              <tr>
                <td className="text-left">- ด้านการศึกษา</td>
                <td>{table1.strategic1.education.government}</td>
                <td>{table1.strategic1.education.revenue}</td>
                <td>{table1.strategic1.education.otherSources}</td>
                <td>{table1.strategic1.education.total}</td>
              </tr>
              <tr class="strategy-2">
                <td className="text-left"><strong>2. การผลิตและพัฒนาครู</strong></td>
                <td><strong>{table1.strategic2.teacherProduction.government}</strong></td>
                <td><strong>{table1.strategic2.teacherProduction.revenue}</strong></td>
                <td><strong>{table1.strategic2.teacherProduction.otherSources}</strong></td>
                <td><strong>{table1.strategic2.teacherProduction.total}</strong></td>
              </tr>
              <tr>
                <td className="text-left">- การผลิตครู</td>
                <td>{table1.strategic2.teacherProduction.government}</td>
                <td>{table1.strategic2.teacherProduction.revenue}</td>
                <td>{table1.strategic2.teacherProduction.otherSources}</td>
                <td>{table1.strategic2.teacherProduction.total}</td>
              </tr>
              <tr>
                <td className="text-left">- การพัฒนาครู (บัณฑิต มรภ.)</td>
                <td>{table1.strategic2.teacherDevelopment.government}</td>
                <td>{table1.strategic2.teacherDevelopment.revenue}</td>
                <td>{table1.strategic2.teacherDevelopment.otherSources}</td>
                <td>{table1.strategic2.teacherDevelopment.total}</td>
              </tr>
              <tr class="strategy-3">
                <td className="text-left"><strong>3. การยกระดับคุณภาพการศึกษา*</strong></td>
                <td><strong>{table1.strategic3.budget.government}</strong></td>
                <td><strong>{table1.strategic3.budget.revenue}</strong></td>
                <td><strong>{table1.strategic3.budget.otherSources}</strong></td>
                <td><strong>{table1.strategic3.budget.total}</strong></td>
              </tr>
              <tr class="strategy-4">
                <td className="text-left"><strong>4. การพัฒนาระบบบริหารจัดการ</strong></td>
                <td><strong>{table1.strategic4.budget.government}</strong></td>
                <td><strong>{table1.strategic4.budget.revenue}</strong></td>
                <td><strong>{table1.strategic4.budget.otherSources}</strong></td>
                <td><strong>{table1.strategic4.budget.total}</strong></td>
              </tr>
              <tr class="total-row">
                <td><strong>รวม</strong></td>
                <td><strong>14 โครงการหลัก<br />(106 โครงการย่อย)</strong></td>
                <td><strong>26 โครงการหลัก</strong></td>
                <td><strong>39 โครงการหลัก</strong></td>
                <td><strong>{projects.length} โครงการหลัก<br />(106 โครงการย่อย)</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="note">
          <h3>หมายเหตุ:</h3>
          <p>*การยกระดับคุณภาพการศึกษา เป็นการพัฒนาคุณภาพการศึกษาภายในมหาวิทยาลัยราชภัฏ ได้แก่ สมรรถนะวิชาชีพและทักษะบัณฑิต หลักสูตร ศักยภาพผู้สอน ห้องปฏิบัติการ/อุปกรณ์ การเรียนรู้ กระบวนการจัดการเรียนรู้ ฯลฯ</p>
        </div>
      </div>) : (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full p-0 rounded-lg shadow-lg bg-cream-lighter md:p-3 sm:p-6">
          <h1 className="text-center text-gray-500">Loading...</h1>
        </div>
      </div>)
  );
}