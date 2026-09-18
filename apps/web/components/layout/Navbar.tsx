'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  Info,
  Briefcase,
  Building2,
  FolderGit2,
  Lightbulb,
  Mail,
  MessageCircle,
  MapPin,
  Phone,
  UserCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cloud,
  Code2,
  Bot,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------
     Scroll State
  ------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* -------------------------------------------------------
     Close Dropdown When Clicking Outside
  ------------------------------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* -------------------------------------------------------
     Keyboard Controls
  ------------------------------------------------------- */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        if (isOpen) setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  /* -------------------------------------------------------
     Prevent Body Scrolling When Mobile Menu Is Open
  ------------------------------------------------------- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* -------------------------------------------------------
     Close Mobile Menu On Route Change
  ------------------------------------------------------- */
  useEffect(() => {
    setIsOpen(false);
    setOpenMobileGroup(null);
    setOpenDropdown(null);
  }, [pathname]);

  /* -------------------------------------------------------
     Active Route Helper
  ------------------------------------------------------- */
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /* -------------------------------------------------------
     Dropdown Toggle
  ------------------------------------------------------- */
  const toggleDropdown = (name: string) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  /* -------------------------------------------------------
     Mobile Group Toggle
  ------------------------------------------------------- */
  const toggleMobileGroup = (name: string) => {
    setOpenMobileGroup((current) => (current === name ? null : name));
  };

  /* -------------------------------------------------------
     Company Navigation
  ------------------------------------------------------- */
  const companyLinks = [
    {
      name: 'About Us',
      href: '/about',
      icon: Info,
      description: 'Learn about Mavora Technologies',
    },
    {
      name: 'Featured Projects',
      href: '/projects',
      icon: FolderGit2,
      description: 'Explore our technology work',
    },
    {
      name: 'Insights & Blog',
      href: '/insights',
      icon: Lightbulb,
      description: 'Technology insights and perspectives',
    },
    {
      name: 'Contact Us',
      href: '/contact',
      icon: Mail,
      description: 'Talk to our team',
    },
  ];

  /* -------------------------------------------------------
     Solutions Navigation
  ------------------------------------------------------- */
  const solutionLinks = [
    {
      name: 'AI & Automation',
      href: '/services/ai-automation',
      icon: Bot,
      description: 'Intelligent workflows and business automation',
    },
    {
      name: 'Enterprise Software',
      href: '/services/software-development',
      icon: Code2,
      description: 'Custom software and digital platforms',
    },
    {
      name: 'Cybersecurity',
      href: '/services/cybersecurity',
      icon: ShieldCheck,
      description: 'Zero-trust security and compliance',
    },
    {
      name: 'Cloud & IT',
      href: '/services/cloud-it',
      icon: Cloud,
      description: 'Secure and scalable infrastructure',
    },
  ];

  /* -------------------------------------------------------
     Industry Navigation
  ------------------------------------------------------- */
  const industryLinks = [
    {
      name: 'All Industries',
      href: '/industries',
      icon: Building2,
      description: 'Technology solutions across industries',
    },
  ];

  /* -------------------------------------------------------
     Mobile Navigation
  ------------------------------------------------------- */
  const menuGroups = [
    {
      label: 'COMPANY',
      name: 'company',
      icon: Info,
      links: [
        { name: 'Home', href: '/', icon: Home },
        ...companyLinks,
      ],
    },
    {
      label: 'OUR SOLUTIONS',
      name: 'solutions',
      icon: Briefcase,
      links: solutionLinks,
    },
    {
      label: 'INDUSTRIES',
      name: 'industries',
      icon: Building2,
      links: industryLinks,
    },
  ];

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'shadow-sm' : 'shadow-none'
        }`}
      >
        {/* ===================================================
            TOP UTILITY BAR
        =================================================== */}
        <div
          className={`hidden lg:block w-full bg-slate-900 text-slate-300 border-b border-slate-800 transition-all duration-300 origin-top ${
            isScrolled
              ? 'h-0 opacity-0 overflow-hidden py-0'
              : 'h-[36px] opacity-100 py-1.5'
          }`}
        >
          <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-10 xl:px-16 2xl:px-24">
            <div className="flex items-center justify-between text-[13px]">
              {/* Left */}
              <div className="flex items-center gap-6 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-mavora-teal" />
                  <span>Nairobi, Kenya</span>
                </div>

                <div className="h-3 w-px bg-slate-700" />

                <a
                  href="mailto:info@mavoratechnologies.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-mavora-teal" />
                  info@mavoratechnologies.com
                </a>
              </div>

              {/* Right */}
              <div className="flex items-center gap-6 font-medium">
                <a
                  href="tel:+254799985842"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-mavora-teal" />
                  +254 (0) 799 985 842
                </a>

                <div className="h-3 w-px bg-slate-700" />

                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 text-mavora-teal hover:text-white transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Client Portal Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            MAIN NAVIGATION
        =================================================== */}
        <div
          className={`w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-16 sm:h-20'
          } flex items-center`}
        >
          <div
            className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24"
            ref={dropdownRef}
          >
            <div className="flex items-center justify-between w-full">

              {/* =================================================
                  LOGO
              ================================================= */}
              <Link
                href="/"
                className="flex items-center group shrink-0 z-50 focus:outline-none focus:ring-2 focus:ring-mavora-navy/20 rounded-md"
                aria-label="Mavora Technologies Home"
              >
                <div
                  className={`relative flex items-center transition-all duration-300 ${
                    isScrolled ? 'h-8 sm:h-9' : 'h-9 sm:h-11'
                  }`}
                >
                  <Image
                    src="/logo.png"
                    alt="Mavora Technologies Logo"
                    width={160}
                    height={48}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:opacity-90"
                    priority
                  />
                </div>
              </Link>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}
              <nav
                className="hidden lg:flex items-center flex-1 justify-end ml-10"
                aria-label="Main navigation"
              >
                <div className="flex items-center gap-1 xl:gap-2">

                  {/* Home */}
                  <Link
                    href="/"
                    className={`relative px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200 ${
                      isActive('/')
                        ? 'text-mavora-navy bg-slate-50 shadow-sm shadow-slate-100'
                        : 'text-slate-600 hover:text-mavora-navy hover:bg-slate-50/80'
                    }`}
                  >
                    Home
                    {isActive('/') && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-mavora-teal" />
                    )}
                  </Link>

                  {/* Company Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('company')}
                      onMouseEnter={() => setOpenDropdown('company')}
                      aria-expanded={openDropdown === 'company'}
                      aria-controls="company-dropdown"
                      className={`group flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200 focus:outline-none ${
                        isActive('/about') || isActive('/projects') || isActive('/insights') || isActive('/contact')
                          ? 'text-mavora-navy bg-slate-50 shadow-sm shadow-slate-100'
                          : 'text-slate-600 hover:text-mavora-navy hover:bg-slate-50/80'
                      }`}
                    >
                      Company
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 group-hover:text-mavora-navy transition-transform duration-300 ${
                          openDropdown === 'company' ? '-rotate-180 text-mavora-navy' : ''
                        }`}
                      />
                    </button>

                    <div
                      id="company-dropdown"
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[360px] transition-all duration-300 origin-top ${
                        openDropdown === 'company'
                          ? 'opacity-100 visible translate-y-0 scale-100'
                          : 'opacity-0 invisible -translate-y-3 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-2">
                        <div className="px-4 py-3 mb-1 bg-slate-50/50 rounded-xl">
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                            Company
                          </p>
                          <p className="text-[13px] text-slate-600 mt-1 font-medium">
                            Discover Mavora Technologies
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          {companyLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link
                                key={link.name}
                                href={link.href}
                                className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                                  isActive(link.href) ? 'bg-slate-50' : 'hover:bg-slate-50'
                                }`}
                                onClick={() => setOpenDropdown(null)}
                              >
                                <div
                                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                                    isActive(link.href)
                                      ? 'bg-mavora-navy text-white shadow-md'
                                      : 'bg-white border border-slate-100 text-slate-500 shadow-sm group-hover:bg-mavora-navy group-hover:text-white group-hover:border-mavora-navy'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-[14px] font-semibold text-slate-900 group-hover:text-mavora-navy transition-colors">
                                    {link.name}
                                  </p>
                                  <p className="text-[13px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                                    {link.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Solutions Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('solutions')}
                      onMouseEnter={() => setOpenDropdown('solutions')}
                      aria-expanded={openDropdown === 'solutions'}
                      aria-controls="solutions-dropdown"
                      className={`group flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200 focus:outline-none ${
                        pathname.startsWith('/services')
                          ? 'text-mavora-navy bg-slate-50 shadow-sm shadow-slate-100'
                          : 'text-slate-600 hover:text-mavora-navy hover:bg-slate-50/80'
                      }`}
                    >
                      Solutions
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 group-hover:text-mavora-navy transition-transform duration-300 ${
                          openDropdown === 'solutions' ? '-rotate-180 text-mavora-navy' : ''
                        }`}
                      />
                    </button>

                    <div
                      id="solutions-dropdown"
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[400px] transition-all duration-300 origin-top ${
                        openDropdown === 'solutions'
                          ? 'opacity-100 visible translate-y-0 scale-100'
                          : 'opacity-0 invisible -translate-y-3 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-2">
                        <div className="px-4 py-3 mb-1 bg-slate-50/50 rounded-xl">
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                            Our Expertise
                          </p>
                          <p className="text-[13px] text-slate-600 mt-1 font-medium">
                            Technology solutions built for modern business
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          {solutionLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link
                                key={link.name}
                                href={link.href}
                                className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                                  isActive(link.href) ? 'bg-slate-50' : 'hover:bg-slate-50'
                                }`}
                                onClick={() => setOpenDropdown(null)}
                              >
                                <div
                                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                                    isActive(link.href)
                                      ? 'bg-mavora-navy text-white shadow-md'
                                      : 'bg-white border border-slate-100 text-slate-500 shadow-sm group-hover:bg-mavora-navy group-hover:text-white group-hover:border-mavora-navy'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-[14px] font-semibold text-slate-900 group-hover:text-mavora-navy transition-colors">
                                    {link.name}
                                  </p>
                                  <p className="text-[13px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                                    {link.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100/80">
                          <Link
                            href="/services"
                            onClick={() => setOpenDropdown(null)}
                            className="group flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-semibold text-mavora-navy hover:bg-slate-50 transition-colors"
                          >
                            <span>View All Solutions</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Industries Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('industries')}
                      onMouseEnter={() => setOpenDropdown('industries')}
                      aria-expanded={openDropdown === 'industries'}
                      aria-controls="industries-dropdown"
                      className={`group flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200 focus:outline-none ${
                        isActive('/industries')
                          ? 'text-mavora-navy bg-slate-50 shadow-sm shadow-slate-100'
                          : 'text-slate-600 hover:text-mavora-navy hover:bg-slate-50/80'
                      }`}
                    >
                      Industries
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 group-hover:text-mavora-navy transition-transform duration-300 ${
                          openDropdown === 'industries' ? '-rotate-180 text-mavora-navy' : ''
                        }`}
                      />
                    </button>

                    <div
                      id="industries-dropdown"
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[340px] transition-all duration-300 origin-top ${
                        openDropdown === 'industries'
                          ? 'opacity-100 visible translate-y-0 scale-100'
                          : 'opacity-0 invisible -translate-y-3 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-2">
                        <div className="px-4 py-3 mb-1 bg-slate-50/50 rounded-xl">
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                            Industries
                          </p>
                          <p className="text-[13px] text-slate-600 mt-1 font-medium">
                            Digital solutions tailored to your sector
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          {industryLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                              <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setOpenDropdown(null)}
                                className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200"
                              >
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-500 shadow-sm group-hover:bg-mavora-navy group-hover:text-white group-hover:border-mavora-navy transition-colors">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-[14px] font-semibold text-slate-900 group-hover:text-mavora-navy transition-colors">
                                    {link.name}
                                  </p>
                                  <p className="text-[13px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                                    {link.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                  <Link
                    href="/projects"
                    className={`relative px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200 ${
                      isActive('/projects')
                        ? 'text-mavora-navy bg-slate-50 shadow-sm shadow-slate-100'
                        : 'text-slate-600 hover:text-mavora-navy hover:bg-slate-50/80'
                    }`}
                  >
                    Projects
                    {isActive('/projects') && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-mavora-teal" />
                    )}
                  </Link>

                  {/* Insights */}
                  <Link
                    href="/insights"
                    className={`relative px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200 ${
                      isActive('/insights')
                        ? 'text-mavora-navy bg-slate-50 shadow-sm shadow-slate-100'
                        : 'text-slate-600 hover:text-mavora-navy hover:bg-slate-50/80'
                    }`}
                  >
                    Insights
                    {isActive('/insights') && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-mavora-teal" />
                    )}
                  </Link>

                  {/* Contact */}
                  <Link
                    href="/contact"
                    className={`relative px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all duration-200 ${
                      isActive('/contact')
                        ? 'text-mavora-navy bg-slate-50 shadow-sm shadow-slate-100'
                        : 'text-slate-600 hover:text-mavora-navy hover:bg-slate-50/80'
                    }`}
                  >
                    Contact
                    {isActive('/contact') && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-mavora-teal" />
                    )}
                  </Link>
                </div>

                {/* Divider */}
                <div
                  className="h-8 w-px bg-slate-200/80 mx-5 xl:mx-6"
                  aria-hidden="true"
                />

                {/* CTA */}
                <Link
                  href="/request-project"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-[14px] font-medium hover:bg-mavora-navy transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-slate-900/15 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </nav>

              {/* =================================================
                  MOBILE MENU BUTTON
              ================================================= */}
              <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 focus:outline-none ${
                  isOpen
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE OVERLAY (Darkened/Blurred remaining 50%)
      ===================================================== */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-md z-40 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* =====================================================
          MOBILE DRAWER (50% Screen Width)
      ===================================================== */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 h-[100dvh] w-1/2 min-w-[280px] max-w-[420px] bg-white z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] lg:hidden flex flex-col shadow-2xl overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-4 border-b border-slate-100 shrink-0 bg-white">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="relative h-6 sm:h-7 w-auto flex items-center focus:outline-none"
          >
            <Image
              src="/logo.png"
              alt="Mavora Technologies Logo"
              width={110}
              height={32}
              className="h-full w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>

        {/* Mobile Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3.5 sm:px-5 py-4 bg-slate-50/30 space-y-3">
          
          <div className="mb-2">
             <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-mavora-teal mb-2">
                <Sparkles className="w-3 h-3" />
                <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-slate-700">
                  Mavora
                </span>
             </div>
             <h2 className="text-[15px] sm:text-lg font-bold text-slate-900 leading-snug">
               Tech Built for Business
             </h2>
          </div>

          {/* Home */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 border ${
              isActive('/')
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-100 hover:border-slate-200 shadow-sm'
            }`}
          >
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${
                isActive('/') ? 'bg-white/10' : 'bg-slate-50 text-slate-500'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
            </div>
            <span className="text-[13px] font-semibold">Home</span>
          </Link>

          {/* Mobile Groups */}
          <div className="space-y-2">
            {menuGroups.map((group) => {
              const GroupIcon = group.icon;
              const isGroupOpen = openMobileGroup === group.name;
              const groupIsActive =
                group.name === 'company'
                  ? isActive('/about') || isActive('/projects') || isActive('/insights') || isActive('/contact')
                  : group.name === 'solutions'
                    ? pathname.startsWith('/services')
                    : isActive('/industries');

              return (
                <div
                  key={group.name}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                    isGroupOpen || groupIsActive ? 'border-slate-200 bg-white shadow-sm' : 'border-slate-100 bg-white shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleMobileGroup(group.name)}
                    aria-expanded={isGroupOpen}
                    className="w-full flex items-center justify-between px-3 py-3 focus:outline-none"
                  >
                    <span className="flex items-center gap-2.5">
                      <GroupIcon
                        className={`w-4 h-4 transition-colors ${
                          groupIsActive ? 'text-mavora-navy' : 'text-slate-400'
                        }`}
                      />
                      <span
                        className={`text-[10px] font-bold tracking-wider transition-colors ${
                          groupIsActive ? 'text-mavora-navy' : 'text-slate-600'
                        }`}
                      >
                        {group.label}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isGroupOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isGroupOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-2 pb-2 pt-0.5 space-y-0.5">
                        {group.links.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-200 ${
                                isActive(link.href)
                                  ? 'bg-slate-50 text-slate-900 font-bold'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              <div className={`flex items-center justify-center w-6 h-6 rounded-md transition-colors ${
                                isActive(link.href) ? 'bg-white border border-slate-200 shadow-sm text-mavora-navy' : 'bg-transparent text-slate-400'
                              }`}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[12px] font-medium leading-tight">{link.name}</span>
                              {isActive(link.href) && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-mavora-teal" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Contact */}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 border ${
              isActive('/contact')
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-100 hover:border-slate-200 shadow-sm'
            }`}
          >
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${
                isActive('/contact') ? 'bg-white/10' : 'bg-slate-50 text-slate-500'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="text-[13px] font-semibold">Contact Us</span>
          </Link>
        </div>

        {/* ===================================================
            MOBILE FOOTER ACTIONS
        =================================================== */}
        <div className="px-3.5 sm:px-5 py-3.5 bg-white border-t border-slate-100 shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2">
            <Link
              href="/request-project"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900 text-white text-[12px] font-semibold hover:bg-mavora-navy transition-colors shadow-md focus:outline-none"
            >
              Start Project
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-[12px] font-medium bg-white hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Client Login
            </Link>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-500">
            <a
              href="tel:+254799985842"
              className="flex items-center gap-1 text-slate-800 hover:text-mavora-navy transition-colors font-bold text-[11px]"
            >
              <Phone className="w-3 h-3 text-mavora-teal shrink-0" />
              +254 799 985 842
            </a>
            <a
              href="mailto:info@mavoratechnologies.com"
              className="flex items-center gap-1 text-slate-700 hover:text-mavora-navy transition-colors font-medium text-[10px] truncate max-w-full"
            >
              <MessageCircle className="w-3 h-3 text-mavora-teal shrink-0" />
              <span className="truncate">Email Us</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};