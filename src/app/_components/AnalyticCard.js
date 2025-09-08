"use client";
import React from "react";

const AnalyticCard = ({ label, data, colorClass = "text-gray-700", icon: Icon }) => {
  return (
    <div className="flex items-center justify-between rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition duration-200">
      {/* Text Section */}
      <div className="space-y-5">
        <h1 className={`text-[13px] font-medium uppercase tracking-wide ${colorClass}`}>
          {label}
        </h1>
        <h2 className="text-4xl font-semibold mt-1 text-gray-800">{data}</h2>
      </div>

      {/* Icon Section */}
      {Icon && (
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full ${colorClass.replace(
            "text-",
            "bg-"
          ).replace("500", "100")}`}
        >
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      )}
    </div>
  );
};

export default AnalyticCard;
