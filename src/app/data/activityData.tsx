import React from "react";
import { Trans } from "react-i18next";
import Link from "next/link";
import i18n from "../../i18n";

export interface Activity {
  id: string;
  title: string;
  // description is a render function so the Trans node is created during render (inside providers)
  description: () => React.ReactNode;
  date: string;
  location: string;
  type: "conference" | "travel" | "presentation" | "meeting" | "other";
}

export const currentActivity: Activity = {
  id: "1",
  title: i18n.t("activity.current.title"),
  description: () => (
    <Trans
      i18nKey="activity.current.description"
      components={[
        <Link
          key="paper"
          href="/research"
          className="text-blue-400 hover:text-blue-300 underline"
        />,
      ]}
    />
  ),
  date: i18n.t("activity.current.date"),
  location: i18n.t("activity.current.location"),
  type: "conference",
};

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
