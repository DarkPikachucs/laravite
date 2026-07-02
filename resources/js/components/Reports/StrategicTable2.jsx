import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StrategicTable2 = (props) => {
  const { projects, year } = props;
  const [data, setData] = useState(projects);
  const [loading, setLoading] = useState(true);

  // Replace with your actual API endpoint
  const API_URL = '/api/strategic-projects';

  useEffect(() => {
    setData(projects);
    setLoading(false);
  }, []);

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ประเด็นยุทธศาสตร์</th>
            <th>โครงการที่ใช้งบประมาณแผ่นดิน</th>
            <th>โครงการที่ใช้งบประมาณรายได้</th>
            <th>โครงการที่ใช้งบสนับสนุนอื่นๆ (ระบุ)</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">ไม่พบข้อมูล</td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.strategic_issue}</td>
                <td>
                  <ul>
                    {row.national_budget_projects?.map((proj, i) => (
                      <li key={i}>{proj}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {row.revenue_budget_projects?.map((proj, i) => (
                      <li key={i}>{proj}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {row.other_support_projects?.map((proj, i) => (
                      <li key={i}>{proj}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StrategicTable2;