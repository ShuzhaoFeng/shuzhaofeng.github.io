import React from "react";
import i18n from "../../i18n";
import {
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  Presentation,
} from "lucide-react";

const companies: { name: string; href?: string; defunct?: boolean }[] = [
  {
    name: "Genetec",
    href: "https://www.genetec.com/",
  },
  {
    name: "X2O Media",
    defunct: true,
  },
  {
    name: "Coveo",
    href: "https://www.coveo.com/",
  },
];

export interface TimelineEntryData {
  icon: React.ReactNode;
  // description is a render function so Trans nodes are created during render under providers
  description: () => React.ReactNode;
}

export const timelineEntries: TimelineEntryData[] = [
  {
    icon: <Clock3 className="w-5 h-5 text-white" aria-hidden="true" />,
    description: () => <>{i18n.t("journey.timeline.0")}</>,
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />,
    description: () => (
      <>
        <p>{i18n.t("journey.timeline.1")}</p>
        <ul className="list-disc list-inside mt-2 text-cyan-300">
          {companies.map((company) => (
            <li key={company.name}>
              {company.href ? (
                <a
                  href={company.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {company.name}
                </a>
              ) : (
                <span>{company.name}</span>
              )}
              {company.defunct ? (
                <span className="text-gray-400 italic ml-1">
                  ({i18n.t("journey.noLongerOperational")})
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: (
      <BriefcaseBusiness className="w-5 h-5 text-white" aria-hidden="true" />
    ),
    description: () => <>{i18n.t("journey.timeline.2")}</>,
  },
  {
    icon: <Presentation className="w-5 h-5 text-white" aria-hidden="true" />,
    description: () => <>{i18n.t("journey.timeline.3")}</>,
  },
];
