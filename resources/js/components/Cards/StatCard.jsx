import React from "react";

export default function StatCard({ title, value, icon, color, trend, trendValue }) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
    teal: "bg-teal-500",
    orange: "bg-orange-500",
  };

  const iconColors = {
    blue: "text-blue-500",
    green: "text-green-500",
    red: "text-red-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
    indigo: "text-indigo-500",
    teal: "text-teal-500",
    orange: "text-orange-500",
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded-xl mb-6 xl:mb-0 shadow-lg border border-gray-100">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg ${colorClasses[color] || 'bg-blue-500'} flex items-center justify-center mr-3`}>
                {icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">
                  {title}
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {value}
                </h3>
              </div>
            </div>
            {trend && (
              <div className="mt-3 flex items-center">
                <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {trend === 'up' ? '↑' : '↓'} {trendValue}%
                </span>
                <span className="text-sm text-gray-400 ml-2">จากเดือนก่อน</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
