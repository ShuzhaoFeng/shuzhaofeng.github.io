import React from "react";

interface TimelineEntryProps {
  icon: React.ReactNode;
  description: React.ReactNode;
}

export default function TimelineEntry({
  icon,
  description,
}: TimelineEntryProps) {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full -left-4 ring-4 ring-gray-900">
        {icon}
      </span>
      <div className="mb-4 text-base font-normal text-gray-300">
        {description}
      </div>
    </li>
  );
}
