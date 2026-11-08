import React from "react";

interface TimelineEntryProps {
  icon: React.ReactNode;
  description: React.ReactNode | (() => React.ReactNode);
}

export default function TimelineEntry({
  icon,
  description,
}: TimelineEntryProps) {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-8 h-8 bg-site-axis rounded-full -left-4 ring-4 ring-site-timeline-ring">
        {icon}
      </span>
      <div className="mb-4 text-base font-normal text-site-soft">
        {typeof description === "function" ? description() : description}
      </div>
    </li>
  );
}
