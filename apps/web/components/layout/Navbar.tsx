'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  UserCheck
} from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Grouped Navigation Data for the Mobile Drawer
  const menuGroups = [
    {
      label: 'COMPANY',
      links: [
        { name: 'Home', href: '/', icon: Home },
        { name: 'About Us', href: '/about', icon: Info },
      ],
    },
    {
      label: 'OUR EXPERTISE',
      links: [
        { name: 'Services', href: '/services', icon: Briefcase },
        { name: 'Industries', href: '/industries', icon: Building2 },
        { name: 'Featured Projects', href: '/projects', icon: FolderGit2 },
      ],
    },
    {
      label: 'RESOURCES',
      links: [
        { name: 'Insights & Blog', href: '/insights', icon: Lightbulb },
        { name: 'Contact Sales', href: '/contact', icon: Mail },
      ],
    },
  ];

  // Flat array for desktop mapping
  const desktopLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'Projects', href: '/projects' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        
        {/* Tier 1: Dark Blue Top Utility Bar */}
        <div className="bg-mavora-navy text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Contact Info / Location */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-mavora-teal" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-mavora-teal" />
                <a href="mailto:info@mavoratechnologies.com" className="hover:text-white transition-colors">
                  info@mavoratechnologies.com
                </a>
              </div>
            </div>

            {/* Right: Phone & Client Portal */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-mavora-teal" />
                <a href="tel:+254799985842" className="hover:text-white transition-colors">
                  +254 (0) 799 985 842
                </a>
              </div>
              <div className="h-3 w-px bg-slate-700" />
              <Link href="/contact" className="flex items-center gap-1.5 text-mavora-teal hover:text-white font-medium transition-colors">
                <UserCheck className="w-3.5 h-3.5" /> Client Portal Login
              </Link>
            </div>
          </div>
        </div>

        {/* Tier 2: White Main Navigation Bar */}
        <div className="bg-white border-b border-slate-200 transition-all duration-300 py-3.5 sm:py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              
              {/* Official Logo - Left Aligned */}
              <Link href="/" className="flex items-center gap-3 group z-50">
                <div className="relative h-9 sm:h-10 w-auto flex items-center">
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

              {/* Desktop Navigation - Right Aligned & Minimal */}
              <div className="hidden lg:flex items-center justify-end flex-1 gap-8 ml-12">
                <nav className="flex items-center gap-8">
                  {desktopLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-sm font-semibold text-slate-700 hover:text-mavora-navy transition-colors relative group py-2"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mavora-navy transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </nav>

                <div className="h-6 w-px bg-slate-200 mx-2" aria-hidden="true" />

                {/* Professional Dark Navy CTA Button matching the white theme contrast */}
                <Link
                  href="/request-project"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-mavora-navy text-white text-sm font-bold hover:bg-mavora-blue transition-all shadow-sm hover:shadow"
                >
                  Start a Project
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden flex items-center z-50">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                  className="text-slate-700 hover:text-mavora-navy p-2 transition-colors focus:outline-none bg-slate-100 rounded-lg"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer (Right-sided, Grouped & Icon-driven) */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-[85%] sm:w-[320px] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header with Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="relative h-8 w-auto flex items-center">
            <Image
              src="/logo.png"
              alt="Mavora Technologies Logo"
              width={130}
              height={38}
              className="h-full w-auto object-contain"
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-700 transition-colors bg-slate-50 hover:bg-slate-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3 ml-1">
                {group.label}
              </h4>
              <nav className="flex flex-col space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-mavora-navy transition-all group"
                    >
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-mavora-navy transition-colors" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
        
        {/* Drawer Sticky Footer CTAs */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 mt-auto flex flex-col gap-3">
          <div className="flex gap-3">
            <Link 
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center justify-center px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-bold bg-white hover:bg-slate-100 transition-colors"
            >
              Client Login
            </Link>
            <Link 
              href="/request-project"
              onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center justify-center px-4 py-2.5 rounded-lg bg-mavora-navy text-white text-sm font-bold hover:bg-mavora-blue transition-colors shadow-sm"
            >
              Start Project
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
            Need help? 
            <a href="mailto:info@mavoratechnologies.com" className="flex items-center gap-1 text-mavora-navy hover:text-mavora-teal transition-colors font-semibold">
              <MessageCircle className="w-3.5 h-3.5" /> Message us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};