import React from "react";

export interface Activity {
  id: string;
  title: string;
  // description is a render function so the Trans node is created during render (inside providers)
  description: () => React.ReactNode;
  date: string;
  location: string;
  type: "conference" | "travel" | "presentation" | "meeting" | "other";
}

// Current activity cleared (expired). Set to null to indicate no active item.
export const currentActivity: Activity | null = null;

// You can add future activities here as well
export const upcomingActivities: Activity[] = [
  // Add more activities as needed
  // {
  //   id: "2",
  //   title: i18n.t("activity.upcoming.title"),
  //   description: i18n.t("activity.upcoming.description"),
  //   date: i18n.t("activity.upcoming.date"),
  //   location: i18n.t("activity.upcoming.location"),
  //   type: "presentation",
  // }
];
