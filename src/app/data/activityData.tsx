import Link from "next/link";
import { ReactNode } from "react";

export interface Activity {
  id: string;
  title: string;
  description: ReactNode;
  date: string;
  location: string;
  type: "conference" | "travel" | "presentation" | "meeting" | "other";
}

export const currentActivity: Activity = {
  id: "1",
  title: "RE '25 Conference",
  description: (
    <>
      I will be in Valencia, Spain to attend the RE &apos;25 conference and
      present{" "}
      <Link
        href="/research"
        className="text-blue-400 hover:text-blue-300 underline"
      >
        our paper
      </Link>
      .
    </>
  ),
  date: "September 1-5, 2025",
  location: "Valencia, Spain",
  type: "conference",
};

// You can add future activities here as well
export const upcomingActivities: Activity[] = [
  // Add more activities as needed
  // {
  //   id: "2",
  //   title: "Research Presentation",
  //   description: "Presenting my latest research findings at the university symposium",
  //   date: "October 2025",
  //   location: "McGill University",
  //   type: "presentation",
  // }
];
