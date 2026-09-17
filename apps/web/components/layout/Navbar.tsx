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
  Database,
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
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /* -------------------------------------------------------
     Keyboard Controls
  ------------------------------------------------------- */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);

        if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
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
    if (href === '/') {
      return pathname === '/';
    }

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
        {
          name: 'Home',
          href: '/',
          icon: Home,
        },
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'shadow-lg shadow-slate-900/5'
            : 'shadow-none'
        }`}
      >
        {/* ===================================================
            TOP UTILITY BAR
        =================================================== */}
        <div
          className={`hidden md:block bg-mavora-navy text-slate-300 border-b border-slate-800/70 transition-all duration-500 ${
            isScrolled
              ? 'max-h-0 overflow-hidden opacity-0 py-0'
              : 'max-h-20 opacity-100 py-2'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-xs">
              {/* Left */}
              <div className="flex items-center gap-6">
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
              <div className="flex items-center gap-6">
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
                  className="flex items-center gap-1.5 text-mavora-teal hover:text-white font-medium transition-colors"
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
          className={`bg-white/95 backdrop-blur-xl border-b border-slate-200/80 transition-all duration-500 ${
            isScrolled
              ? 'py-2'
              : 'py-3.5 sm:py-4'
          }`}
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            ref={dropdownRef}
          >
            <div className="flex items-center justify-between">

              {/* =================================================
                  LOGO
              ================================================= */}
              <Link
                href="/"
                className="flex items-center gap-3 group shrink-0 z-50"
                aria-label="Mavora Technologies Home"
              >
                <div
                  className={`relative w-auto flex items-center transition-all duration-500 ${
                    isScrolled
                      ? 'h-8 sm:h-9'
                      : 'h-9 sm:h-10'
                  }`}
                >
                  <Image
                    src="/logo.png"
                    alt="Mavora Technologies Logo"
                    width={150}
                    height={45}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </Link>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}
              <nav
                className="hidden lg:flex items-center flex-1 justify-end ml-8"
                aria-label="Main navigation"
              >
                <div className="flex items-center gap-1">

                  {/* Home */}
                  <Link
                    href="/"
                    className={`relative px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive('/')
                        ? 'text-mavora-navy bg-slate-50'
                        : 'text-slate-700 hover:text-mavora-navy hover:bg-slate-50'
                    }`}
                  >
                    Home

                    {isActive('/') && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-mavora-teal" />
                    )}
                  </Link>

                  {/* =================================================
                      COMPANY DROPDOWN
                  ================================================= */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('company')}
                      onMouseEnter={() => setOpenDropdown('company')}
                      aria-expanded={openDropdown === 'company'}
                      aria-controls="company-dropdown"
                      className={`group flex items-center gap-1 px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        isActive('/about') ||
                        isActive('/projects') ||
                        isActive('/insights') ||
                        isActive('/contact')
                          ? 'text-mavora-navy bg-slate-50'
                          : 'text-slate-700 hover:text-mavora-navy hover:bg-slate-50'
                      }`}
                    >
                      Company

                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          openDropdown === 'company'
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>

                    <div
                      id="company-dropdown"
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[350px] transition-all duration-200 ${
                        openDropdown === 'company'
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-900/10 p-3">
                        <div className="px-3 py-2 mb-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            Company
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Discover Mavora Technologies
                          </p>
                        </div>

                        {companyLinks.map((link) => {
                          const Icon = link.icon;

                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              className={`group flex items-center gap-3 p-3 rounded-xl transition-all ${
                                isActive(link.href)
                                  ? 'bg-slate-50'
                                  : 'hover:bg-slate-50'
                              }`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div
                                className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                                  isActive(link.href)
                                    ? 'bg-mavora-navy text-white'
                                    : 'bg-slate-100 text-slate-500 group-hover:bg-mavora-navy group-hover:text-white'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>

                              <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-800 group-hover:text-mavora-navy">
                                  {link.name}
                                </p>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  {link.description}
                                </p>
                              </div>

                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-mavora-navy group-hover:translate-x-1 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      SOLUTIONS DROPDOWN
                  ================================================= */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('solutions')}
                      onMouseEnter={() => setOpenDropdown('solutions')}
                      aria-expanded={openDropdown === 'solutions'}
                      aria-controls="solutions-dropdown"
                      className={`group flex items-center gap-1 px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        pathname.startsWith('/services')
                          ? 'text-mavora-navy bg-slate-50'
                          : 'text-slate-700 hover:text-mavora-navy hover:bg-slate-50'
                      }`}
                    >
                      Solutions

                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          openDropdown === 'solutions'
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>

                    <div
                      id="solutions-dropdown"
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[390px] transition-all duration-200 ${
                        openDropdown === 'solutions'
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-900/10 p-3">
                        <div className="px-3 py-2 mb-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            Our Expertise
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Technology solutions built for modern business
                          </p>
                        </div>

                        {solutionLinks.map((link) => {
                          const Icon = link.icon;

                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              className={`group flex items-center gap-3 p-3 rounded-xl transition-all ${
                                isActive(link.href)
                                  ? 'bg-slate-50'
                                  : 'hover:bg-slate-50'
                              }`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div
                                className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                                  isActive(link.href)
                                    ? 'bg-mavora-navy text-white'
                                    : 'bg-slate-100 text-slate-500 group-hover:bg-mavora-navy group-hover:text-white'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>

                              <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-800 group-hover:text-mavora-navy">
                                  {link.name}
                                </p>

                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  {link.description}
                                </p>
                              </div>

                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-mavora-navy group-hover:translate-x-1 transition-all" />
                            </Link>
                          );
                        })}

                        <div className="mt-2 pt-2 border-t border-slate-100">
                          <Link
                            href="/services"
                            onClick={() => setOpenDropdown(null)}
                            className="group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-mavora-navy hover:bg-slate-50 transition-colors"
                          >
                            <span>View All Solutions</span>

                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      INDUSTRIES DROPDOWN
                  ================================================= */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown('industries')}
                      onMouseEnter={() => setOpenDropdown('industries')}
                      aria-expanded={openDropdown === 'industries'}
                      aria-controls="industries-dropdown"
                      className={`group flex items-center gap-1 px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        isActive('/industries')
                          ? 'text-mavora-navy bg-slate-50'
                          : 'text-slate-700 hover:text-mavora-navy hover:bg-slate-50'
                      }`}
                    >
                      Industries

                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          openDropdown === 'industries'
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>

                    <div
                      id="industries-dropdown"
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[330px] transition-all duration-200 ${
                        openDropdown === 'industries'
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-900/10 p-3">
                        <div className="px-3 py-2 mb-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            Industries
                          </p>

                          <p className="text-xs text-slate-500 mt-1">
                            Digital solutions tailored to your sector
                          </p>
                        </div>

                        {industryLinks.map((link) => {
                          const Icon = link.icon;

                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setOpenDropdown(null)}
                              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all"
                            >
                              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-mavora-navy group-hover:text-white transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>

                              <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-800 group-hover:text-mavora-navy">
                                  {link.name}
                                </p>

                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  {link.description}
                                </p>
                              </div>

                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-mavora-navy group-hover:translate-x-1 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                  <Link
                    href="/projects"
                    className={`relative px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive('/projects')
                        ? 'text-mavora-navy bg-slate-50'
                        : 'text-slate-700 hover:text-mavora-navy hover:bg-slate-50'
                    }`}
                  >
                    Projects

                    {isActive('/projects') && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-mavora-teal" />
                    )}
                  </Link>

                  {/* Insights */}
                  <Link
                    href="/insights"
                    className={`relative px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive('/insights')
                        ? 'text-mavora-navy bg-slate-50'
                        : 'text-slate-700 hover:text-mavora-navy hover:bg-slate-50'
                    }`}
                  >
                    Insights

                    {isActive('/insights') && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-mavora-teal" />
                    )}
                  </Link>

                  {/* Contact */}
                  <Link
                    href="/contact"
                    className={`relative px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive('/contact')
                        ? 'text-mavora-navy bg-slate-50'
                        : 'text-slate-700 hover:text-mavora-navy hover:bg-slate-50'
                    }`}
                  >
                    Contact

                    {isActive('/contact') && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-mavora-teal" />
                    )}
                  </Link>
                </div>

                {/* Divider */}
                <div
                  className="h-7 w-px bg-slate-200 mx-4"
                  aria-hidden="true"
                />

                {/* CTA */}
                <Link
                  href="/request-project"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-mavora-navy text-white text-sm font-bold hover:bg-mavora-blue transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-900/10 hover:-translate-y-0.5"
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
                className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-mavora-navy text-white border-mavora-navy'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {isOpen ? (
                  <X size={21} />
                ) : (
                  <Menu size={21} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}
      <div
        className={`fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${
          isOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 h-[100dvh] w-[88%] sm:w-[380px] bg-white z-50 transform transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden flex flex-col shadow-2xl overflow-hidden ${
          isOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-slate-100 shrink-0">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="relative h-8 w-auto flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Mavora Technologies Logo"
              width={130}
              height={38}
              className="h-full w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <X size={19} />
          </button>
        </div>

        {/* Mobile Intro */}
        <div className="px-6 pt-6 pb-3">
          <div className="flex items-center gap-2 text-mavora-teal mb-2">
            <Sparkles className="w-3.5 h-3.5" />

            <span className="text-[10px] font-bold tracking-[0.18em] uppercase">
              Mavora Technologies
            </span>
          </div>

          <h2 className="text-xl font-bold text-mavora-navy">
            Technology solutions built for business.
          </h2>

          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Software, AI, cybersecurity and cloud solutions for modern enterprises and SMEs.
          </p>
        </div>

        {/* Mobile Navigation Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-4 px-3.5 py-3.5 rounded-xl mb-2 transition-all ${
              isActive('/')
                ? 'bg-mavora-navy text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                isActive('/')
                  ? 'bg-white/10'
                  : 'bg-slate-100'
              }`}
            >
              <Home className="w-4.5 h-4.5" />
            </div>

            <span className="text-sm font-semibold">
              Home
            </span>
          </Link>

          {/* Mobile Groups */}
          <div className="space-y-3">
            {menuGroups.slice(0).map((group) => {
              const GroupIcon = group.icon;
              const isGroupOpen = openMobileGroup === group.name;

              const groupIsActive =
                group.name === 'company'
                  ? isActive('/about') ||
                    isActive('/projects') ||
                    isActive('/insights') ||
                    isActive('/contact')
                  : group.name === 'solutions'
                    ? pathname.startsWith('/services')
                    : isActive('/industries');

              return (
                <div
                  key={group.name}
                  className="border border-slate-100 rounded-2xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleMobileGroup(group.name)}
                    aria-expanded={isGroupOpen}
                    className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${
                      groupIsActive
                        ? 'bg-slate-50'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <GroupIcon
                        className={`w-4 h-4 ${
                          groupIsActive
                            ? 'text-mavora-navy'
                            : 'text-slate-400'
                        }`}
                      />

                      <span
                        className={`text-[11px] font-bold tracking-widest ${
                          groupIsActive
                            ? 'text-mavora-navy'
                            : 'text-slate-500'
                        }`}
                      >
                        {group.label}
                      </span>
                    </span>

                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isGroupOpen
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isGroupOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-2 pb-2 pt-1 space-y-1">
                        {group.links.map((link) => {
                          const Icon = link.icon;

                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                                isActive(link.href)
                                  ? 'bg-mavora-navy text-white'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <Icon
                                className={`w-4 h-4 ${
                                  isActive(link.href)
                                    ? 'text-white'
                                    : 'text-slate-400'
                                }`}
                              />

                              <span className="text-sm font-semibold">
                                {link.name}
                              </span>

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
            className={`flex items-center gap-4 px-3.5 py-3.5 rounded-xl mt-3 transition-all ${
              isActive('/contact')
                ? 'bg-mavora-navy text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-lg ${
                isActive('/contact')
                  ? 'bg-white/10'
                  : 'bg-slate-100'
              }`}
            >
              <Mail className="w-4.5 h-4.5" />
            </div>

            <span className="text-sm font-semibold">
              Contact Us
            </span>
          </Link>
        </div>

        {/* ===================================================
            MOBILE FOOTER ACTIONS
        =================================================== */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 shrink-0">

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold bg-white hover:bg-slate-100 transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              Client Login
            </Link>

            <Link
              href="/request-project"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-mavora-navy text-white text-sm font-bold hover:bg-mavora-blue transition-colors shadow-sm"
            >
              Start Project

              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center justify-center gap-2 mt-4 text-xs text-slate-500">
            <span className="font-medium">
              Need assistance?
            </span>

            <div className="flex items-center gap-4">
              <a
                href="tel:+254799985842"
                className="flex items-center gap-1.5 text-mavora-navy hover:text-mavora-teal transition-colors font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                +254 799 985 842
              </a>

              <span className="w-1 h-1 rounded-full bg-slate-300" />

              <a
                href="mailto:info@mavoratechnologies.com"
                className="flex items-center gap-1.5 text-mavora-navy hover:text-mavora-teal transition-colors font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Message us
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};