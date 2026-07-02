import React from "react";
import { Link } from "react-router-dom";

export default function TopFormsCard({ forms }) {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl border border-gray-100">
      <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800">แบบฟอร์มยอดนิยม</h4>
        <Link 
          to="/admin/forms" 
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          ดูทั้งหมด →
        </Link>
      </div>
      <div className="flex-auto">
        {forms && forms.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {forms.map((form, index) => (
              <div 
                key={index}
                className="p-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {form.title}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${form.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      <span className="text-xs text-gray-500">
                        {form.is_active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      {form.submissions_count || 0}
                    </p>
                    <p className="text-xs text-gray-400">ครั้ง</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">ยังไม่มีข้อมูลแบบฟอร์ม</p>
          </div>
        )}
      </div>
    </div>
  );
}
