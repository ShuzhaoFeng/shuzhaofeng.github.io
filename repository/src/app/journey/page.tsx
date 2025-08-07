"use client";
export default function JourneyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-2 sm:px-4">
      {/* Timeline only, no main title */}
      <section className="w-full max-w-2xl mx-auto mt-4">
        <ol className="relative border-l border-cyan-500">
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full -left-4 ring-4 ring-gray-900">
              {/* Globe icon for migration */}
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2c.34 0 .67.02 1 .05V6H9V4.05C9.33 4.02 9.66 4 10 4zm-3.95 1.64L7.6 6.6A1 1 0 0 1 8 7.5V9h4V7.5c0-.28.11-.53.29-.71l1.55-1.55A6.01 6.01 0 0 1 16 10c0 .34-.02.67-.05 1H14v2h1.95A6.01 6.01 0 0 1 10 16a6.01 6.01 0 0 1-5.95-5H6v-2H4.05c.03-.33.07-.66.15-.98z" />
              </svg>
            </span>
            <p className="mb-4 text-base font-normal text-gray-300">
              I was born in China and moved to Canada at 11 years old.
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full -left-4 ring-4 ring-gray-900">
              {/* Graduation cap for undergrad/career start */}
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2L2 6l8 4 8-4-8-4zm0 7.236L4.618 6.618 10 4.382l5.382 2.236L10 9.236zm-6 2.764v2a1 1 0 0 0 .553.894l6 3a1 1 0 0 0 .894 0l6-3A1 1 0 0 0 18 14v-2l-8 4-8-4z" />
              </svg>
            </span>
            <div className="mb-4 text-base font-normal text-gray-300">
              <p>
                In 2021, I began pursuing my undergraduate degree in Software
                Engineering at McGill University. Along the way, I worked as a
                software development intern at several companies, namely:
              </p>
              <ul className="list-disc list-inside mt-2 text-cyan-300">
                <li>
                  <a
                    href="https://www.genetec.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Genetec
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.x2omedia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    X2O Media
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.coveo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Coveo
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full -left-4 ring-4 ring-gray-900">
              {/* Teacher/Chalkboard icon for TA */}
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-5v2h2a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2h2v-2H3a1 1 0 0 1-1-1V3zm2 1v8h12V4H4z" />
              </svg>
            </span>
            <p className="mb-4 text-base font-normal text-gray-300">
              In 2023, I began my first experience teaching as a Teaching
              Assistant at McGill University, supporting students in ECSE 250 –
              Introduction to Software Development.
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full -left-4 ring-4 ring-gray-900">
              {/* Book icon for master's studies */}
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0v12h10V4H4zm2 2h6v2H6V6zm0 4h6v2H6v-2z" />
              </svg>
            </span>
            <p className="mb-4 text-base font-normal text-gray-300">
              In 2025, after completing my undergraduate studies, I continued at
              McGill University to pursue a Master of Engineering in Electrical
              and Computer Engineering.
            </p>
          </li>
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full -left-4 ring-4 ring-gray-900">
              {/* Ellipsis icon for future */}
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <circle cx="4" cy="10" r="2" />
                <circle cx="10" cy="10" r="2" />
                <circle cx="16" cy="10" r="2" />
              </svg>
            </span>
            <p className="mb-4 text-base font-normal text-gray-500 italic">
              To be continued...
            </p>
          </li>
        </ol>
      </section>
      <style jsx>{`
        .shiny-text {
          background: linear-gradient(90deg, #fff 0%, #b3b3b3 50%, #fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          filter: drop-shadow(0 2px 8px #000a);
        }
      `}</style>
    </main>
  );
}
