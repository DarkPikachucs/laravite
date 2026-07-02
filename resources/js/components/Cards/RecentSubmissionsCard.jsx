import React from "react";
import { Link } from "react-router-dom";

export default function RecentSubmissionsCard({ submissions }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "เมื่อสักครู่";
    if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
    if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
    
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (isRead) => {
    return isRead 
      ? "bg-green-100 text-green-700" 
      : "bg-yellow-100 text-yellow-700";
  };

  const getStatusText = (isRead) => {
    return isRead ? "อ่านแล้ว" : "ยังไม่ได้อ่าน";
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl border border-gray-100">
      <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800">การส่งล่าสุด</h4>
        <Link 
          to="/admin/forms" 
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          ดูทั้งหมด →
        </Link>
      </div>
      <div className="flex-auto">
        {submissions && submissions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {submissions.map((submission, index) => (
              <div 
                key={index}
                className="p-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm mr-3">
                      {(submission.respondent_name || submission.respondent_email || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {submission.respondent_name || "ไม่ระบุชื่อ"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {submission.form?.title || "แบบฟอร์ม"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(submission.is_read)}`}>
                      {getStatusText(submission.is_read)}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(submission.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">ยังไม่มีข้อมูลการส่งแบบฟอร์ม</p>
          </div>
        )}
      </div>
    </div>
  );
}
