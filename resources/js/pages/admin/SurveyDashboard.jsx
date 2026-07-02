import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import StatCard from "../../components/Cards/StatCard.jsx";
import LineChartCard from "../../components/Cards/LineChartCard.jsx";
import BarChartCard from "../../components/Cards/BarChartCard.jsx";
import PieChartCard from "../../components/Cards/PieChartCard.jsx";
import RecentSubmissionsCard from "../../components/Cards/RecentSubmissionsCard.jsx";
import TopFormsCard from "../../components/Cards/TopFormsCard.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SurveyDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("30");

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/forms/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (response.data.success) {
        setDashboardData(response.data.data);
        setError(null);
      } else {
        setError("ไม่สามารถโหลดข้อมูลได้");
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0";
    return num.toLocaleString("th-TH");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Prepare data for charts
  const getSubmissionsByDateData = () => {
    if (!dashboardData?.submissions_by_date) return { labels: [], data: [] };

    const labels = dashboardData.submissions_by_date.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString("th-TH", { day: "numeric", month: "short" });
    });
    const data = dashboardData.submissions_by_date.map(item => item.count);

    return { labels, data };
  };

  const getSubmissionsByHourData = () => {
    if (!dashboardData?.submissions_by_hour) return { labels: [], data: [] };

    const labels = dashboardData.submissions_by_hour.map(item => `${item.hour}:00`);
    const data = dashboardData.submissions_by_hour.map(item => item.count);

    return { labels, data };
  };

  const getSubmissionsByFormData = () => {
    if (!dashboardData?.submissions_by_form) return { labels: [], data: [] };

    const labels = dashboardData.submissions_by_form.map(item =>
      item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title
    );
    const data = dashboardData.submissions_by_form.map(item => item.submissions_count);

    return { labels, data };
  };

  const getFormStatusData = () => {
    if (!dashboardData?.form_status) return { labels: [], data: [] };

    const labels = [
      "เปิดใช้งาน",
      "ปิดใช้งาน",
      "หมดอายุ",
      "กำหนดการ",
    ];
    const data = [
      dashboardData.form_status.active || 0,
      dashboardData.form_status.inactive || 0,
      dashboardData.form_status.expired || 0,
      dashboardData.form_status.scheduled || 0,
    ];

    return { labels, data };
  };

  const getDeviceData = () => {
    if (!dashboardData?.device_breakdown || dashboardData.device_breakdown.length === 0) {
      return { labels: ["ไม่ทราบ"], data: [1] };
    }

    const labels = dashboardData.device_breakdown.map(item => {
      const device = JSON.parse(item.device || 'null');
      return device || "อื่นๆ";
    });
    const data = dashboardData.device_breakdown.map(item => item.count);

    return { labels, data };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800">เกิดข้อผิดพลาด</h3>
          </div>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            ลองอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  const overview = dashboardData?.overview || {};
  const submissionsByDate = getSubmissionsByDateData();
  const submissionsByHour = getSubmissionsByHourData();
  const submissionsByForm = getSubmissionsByFormData();
  const formStatus = getFormStatusData();
  const deviceData = getDeviceData();

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Dashboard ผลการตอบแบบสอบถาม
            </h1>
            <p className="text-blue-100">
              ภาพรวมผลการตอบแบบสอบถามทั้งหมดในระบบ
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="7" className="text-gray-800">7 วันที่ผ่านมา</option>
              <option value="30" className="text-gray-800">30 วันที่ผ่านมา</option>
              <option value="90" className="text-gray-800">90 วันที่ผ่านมา</option>
            </select>
            <button
              onClick={fetchDashboardData}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all"
              title="รีเฟรชข้อมูล"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="แบบฟอร์มทั้งหมด"
          value={formatNumber(overview.total_forms)}
          color="blue"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="แบบฟอร์ม aktif"
          value={formatNumber(overview.active_forms)}
          color="green"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="การตอบทั้งหมด"
          value={formatNumber(overview.total_submissions)}
          color="purple"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
          trend="up"
          trendValue="12.5"
        />
        <StatCard
          title="ยังไม่ได้อ่าน"
          value={formatNumber(overview.unread_submissions)}
          color="yellow"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          }
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">ยอดดูแบบฟอร์ม</p>
              <h3 className="text-3xl font-bold text-gray-800">{formatNumber(overview.total_views)}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">อัตราการตอบกลับ</p>
              <h3 className="text-3xl font-bold text-gray-800">{overview.response_rate}%</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">เฉลี่ยต่อวัน</p>
              <h3 className="text-3xl font-bold text-gray-800">{formatNumber(overview.avg_submissions_per_day)}</h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChartCard
          title="สถิติการตอบแบบสอบถาม (30 วัน)"
          data={submissionsByDate.data}
          labels={submissionsByDate.labels}
          color="blue"
        />
        <BarChartCard
          title="สถิติการตอบแบบสอบถามรายชั่วโมง (วันนี้)"
          data={submissionsByHour.data}
          labels={submissionsByHour.labels}
          color="gradient"
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PieChartCard
          title="สถานะแบบฟอร์ม"
          data={formStatus.data}
          labels={formStatus.labels}
          colors={[
            "rgb(34, 197, 94)",
            "rgb(156, 163, 175)",
            "rgb(239, 68, 68)",
            "rgb(59, 130, 246)",
          ]}
        />
        <PieChartCard
          title="การตอบแยกตามแบบฟอร์ม"
          data={submissionsByForm.data}
          labels={submissionsByForm.labels}
        />
      </div>

      {/* Recent Submissions and Top Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentSubmissionsCard submissions={dashboardData?.recent_submissions || []} />
        <TopFormsCard forms={dashboardData?.top_forms || []} />
      </div>

      {/* Device Breakdown */}
      {dashboardData?.device_breakdown && dashboardData.device_breakdown.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">อุปกรณ์ที่ใช้ในการตอบแบบฟอร์ม</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dashboardData.device_breakdown.map((device, index) => {
              const deviceInfo = JSON.parse(device.device || 'null');
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">{deviceInfo || "อื่นๆ"}</p>
                  <p className="text-2xl font-bold text-gray-800">{device.count}</p>
                  <p className="text-xs text-gray-400">ครั้ง</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
