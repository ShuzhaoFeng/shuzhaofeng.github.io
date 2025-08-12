"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Normalize pathname by removing trailing slash (except for root)
  const normalizedPathname =
    pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/journey", label: "Journey" },
    { href: "/research", label: "Research" },
    { href: "/projects", label: "Projects" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 shadow-md">
      <div className="bg-gradient-to-t from-[#1e293b]/80 via-[#111827] to-black w-full">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8 w-full">
            <div className="text-base sm:text-xl font-bold tracking-tight text-white drop-shadow-lg mr-2 sm:mr-6 min-w-max">
              Shuzhao Feng
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-4 md:gap-8 text-base font-medium flex-1">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="min-w-max">
                  {normalizedPathname === href ? (
                    <span className="text-cyan-400 font-bold cursor-default">
                      {label}
                    </span>
                  ) : (
                    <a
                      href={href}
                      className="hover:text-cyan-400 transition-colors text-white whitespace-nowrap"
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex-1 flex justify-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-gray-700 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-end min-w-max gap-1">
              <a
                href="mailto:shuzhao.feng@mail.mcgill.ca"
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/shuzhao-feng/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/ShuzhaoFeng"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-600">
            <div className="px-4 py-3 space-y-3">
              {navLinks.map(({ href, label }) => (
                <div key={href}>
                  {normalizedPathname === href ? (
                    <span className="block text-cyan-400 font-bold py-2 text-base">
                      {label}
                    </span>
                  ) : (
                    <a
                      href={href}
                      className="block text-white hover:text-cyan-400 transition-colors py-2 text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
