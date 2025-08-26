import React from "react";
import i18n from "../../i18n";

const companies = [
  {
    name: "Genetec",
    href: "https://www.genetec.com/",
  },
  {
    name: "X2O Media",
    href: "https://www.x2omedia.com/",
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
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2c.34 0 .67.02 1 .05V6H9V4.05C9.33 4.02 9.66 4 10 4zm-3.95 1.64L7.6 6.6A1 1 0 0 1 8 7.5V9h4V7.5c0-.28.11-.53.29-.71l1.55-1.55A6.01 6.01 0 0 1 16 10c0 .34-.02.67-.05 1H14v2h1.95A6.01 6.01 0 0 1 10 16a6.01 6.01 0 0 1-5.95-5H6v-2H4.05c.03-.33.07-.66.15-.98z" />
      </svg>
    ),
    description: () => <>{i18n.t("journey.timeline.0")}</>,
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2L2 6l8 4 8-4-8-4zm0 7.236L4.618 6.618 10 4.382l5.382 2.236L10 9.236zm-6 2.764v2a1 1 0 0 0 .553.894l6 3a1 1 0 0 0 .894 0l6-3A1 1 0 0 0 18 14v-2l-8 4-8-4z" />
      </svg>
    ),
    description: () => (
      <>
        <p>{i18n.t("journey.timeline.1")}</p>
        <ul className="list-disc list-inside mt-2 text-cyan-300">
          {companies.map((company) => (
            <li key={company.name}>
              <a
                href={company.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {company.name}
              </a>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M2 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-5v2h2a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2h2v-2H3a1 1 0 0 1-1-1V3zm2 1v8h12V4H4z" />
      </svg>
    ),
    description: () => <>{i18n.t("journey.timeline.2")}</>,
  },
  {
    icon: (
      <svg
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M2 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0v12h10V4H4zm2 2h6v2H6V6zm0 4h6v2H6v-2z" />
      </svg>
    ),
    description: () => <>{i18n.t("journey.timeline.3")}</>,
  },
];
