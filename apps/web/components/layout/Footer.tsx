import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#EBF3FF] text-slate-700 border-t border-slate-200/80 overflow-hidden">
      {/* Background Grids & Ambient Lighting */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="flex flex-col gap-5">

            {/* Logo + Tagline */}
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-block group shrink-0">
                <div className="inline-flex items-center transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src="/logo.png"
                    alt="Mavora Technologies Logo"
                    width={240}
                    height={90}
                    className="h-10 w-auto object-contain"
                    priority
                  />
                </div>
              </Link>

              <div className="h-9 w-px bg-slate-300/80 shrink-0" />

              <p className="text-slate-800 text-xs sm:text-sm font-medium leading-snug italic max-w-[230px]">
                “Turning innovative ideas into powerful digital solutions.”
              </p>
            </div>

            {/* Company Description */}
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              Mavora Technologies helps enterprise businesses grow through
              custom software, AI automation pipelines, zero-trust
              cybersecurity, and cloud platform infrastructure.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mavora-technologies-a4938a437/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-600 hover:text-blue-600 transition-colors bg-white/90 p-2.5 rounded-xl border border-slate-200 shadow-sm"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61594348532790"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-600 hover:text-blue-600 transition-colors bg-white/90 p-2.5 rounded-xl border border-slate-200 shadow-sm"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mav0ratechnologiesltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-600 hover:text-blue-600 transition-colors bg-white/90 p-2.5 rounded-xl border border-slate-200 shadow-sm"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@mavoratechnologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-slate-600 hover:text-blue-600 transition-colors bg-white/90 p-2.5 rounded-xl border border-slate-200 shadow-sm"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.525.001h3.08c.092 1.571.7 2.88 1.8 3.93 1.101 1.05 2.44 1.63 4.02 1.72V8.78c-1.48-.05-2.83-.49-4.04-1.32v7.19c0 1.88-.51 3.52-1.53 4.92-1.02 1.4-2.38 2.29-4.08 2.67-1.7.38-3.37.16-5.01-.66-1.64-.82-2.82-2.07-3.54-3.75-.72-1.68-.81-3.44-.27-5.28.54-1.84 1.63-3.23 3.27-4.17 1.64-.94 3.39-1.22 5.25-.84v3.31c-1.12-.22-2.18.02-3.18.72-1 .7-1.57 1.65-1.71 2.85-.14 1.2.2 2.28 1.02 3.24.82.96 1.88 1.47 3.18 1.53 1.3.06 2.38-.37 3.24-1.29.86-.92 1.29-2.04 1.29-3.36V.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Quick Links */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Company
            </h3>

            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-700 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-700 transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="hover:text-blue-700 transition-colors"
                >
                  Capabilities
                </Link>
              </li>

              <li>
                <Link
                  href="/projects"
                  className="hover:text-blue-700 transition-colors"
                >
                  Case Studies
                </Link>
              </li>

              <li>
                <Link
                  href="/insights"
                  className="hover:text-blue-700 transition-colors"
                >
                  Insights & Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-700 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities & Services */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Capabilities
            </h3>

            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link
                  href="/services/ai-automation"
                  className="group flex items-center gap-2 hover:text-blue-700 transition-colors"
                >
                  <ArrowRight className="size-3 text-blue-600 transition-transform group-hover:translate-x-1 shrink-0" />
                  AI & Automation
                </Link>
              </li>

              <li>
                <Link
                  href="/services/software-development"
                  className="group flex items-center gap-2 hover:text-blue-700 transition-colors"
                >
                  <ArrowRight className="size-3 text-blue-600 transition-transform group-hover:translate-x-1 shrink-0" />
                  Enterprise Software
                </Link>
              </li>

              <li>
                <Link
                  href="/services/cybersecurity"
                  className="group flex items-center gap-2 hover:text-blue-700 transition-colors"
                >
                  <ArrowRight className="size-3 text-blue-600 transition-transform group-hover:translate-x-1 shrink-0" />
                  Cybersecurity & Compliance
                </Link>
              </li>

              <li>
                <Link
                  href="/services/cloud-it"
                  className="group flex items-center gap-2 hover:text-blue-700 transition-colors"
                >
                  <ArrowRight className="size-3 text-blue-600 transition-transform group-hover:translate-x-1 shrink-0" />
                  Cloud Platforms
                </Link>
              </li>

              <li>
                <Link
                  href="/request-project"
                  className="group flex items-center gap-2 text-blue-600 font-semibold hover:underline pt-1"
                >
                  Request a Project
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1 shrink-0" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Headquarters Contact */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Headquarters
            </h3>

            <ul className="flex flex-col gap-3 text-xs text-slate-600">
              <li className="leading-relaxed text-slate-800 font-medium">
                Wood Garden Road, off Wood Avenue
              </li>

              <li>Kilimani, Nairobi, Kenya</li>

              <li className="mt-2 text-slate-900 font-medium hover:text-blue-600 transition-colors">
                <a href="mailto:info@mavoratechnologies.com">
                  info@mavoratechnologies.com
                </a>
              </li>

              <li className="text-slate-900 font-medium">
                <a href="tel:0799985842">0799 985842</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-200/80 bg-white/50 backdrop-blur-sm py-6 relative z-10">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-500 md:flex-row">
          <p>
            &copy; {currentYear} Mavora Technologies Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </Link>

            <span>•</span>

            <Link
              href="/terms"
              className="hover:text-slate-900 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}