'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Award, 
  TrendingUp, 
  User, 
  LogOut, 
  Mic,
  Menu,
  X,
  BookOpen
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'AI Topics', href: '/practice/topic', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Learn Vocab', href: '/practice/vocab', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Debate', href: '/practice/debate', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Interview', href: '/practice/interview', icon: <Award className="w-4 h-4" /> },
    { name: 'Group Discussion', href: '/practice/gd', icon: <Users className="w-4 h-4" /> },
    { name: 'Analytics', href: '/analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <>
      {/* Desktop Top Navigation Bar */}
      <header className="hidden lg:flex items-center justify-between h-14 bg-[#FAF6F0] border-b border-slate-200 sticky top-0 z-50 w-full px-10 select-none">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0 mr-8">
          <div className="w-7 h-7 rounded-lg bg-[#FEF5D1] border border-slate-300 flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-slate-800" />
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight text-sm">SpeakUp</span>
        </Link>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-slate-900 bg-white border border-slate-200 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/70'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Sign Out pill button (only visible on profile page) */}
        {pathname === '/profile' ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-slate-800 bg-transparent border border-slate-800 rounded-full hover:bg-slate-900 hover:text-white transition-all duration-200 cursor-pointer shrink-0"
          >
            Sign out
          </button>
        ) : (
          <div className="w-24 lg:w-28 shrink-0" />
        )}
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden h-14 border-b border-slate-200 bg-[#FAF6F0] sticky top-0 z-50 flex items-center justify-between px-6 w-full">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FEF5D1] border border-slate-300 flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-slate-800" />
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight text-sm">SpeakUp</span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden fixed inset-x-0 top-14 bg-[#FAF6F0] border-b border-slate-200 z-40 px-6 py-4 flex flex-col gap-1 shadow-md"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                  }`}
                >
                  <span className="text-slate-400">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
            {pathname === '/profile' && (
              <div className="border-t border-slate-100 pt-3 mt-1">
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/70 rounded-xl transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-slate-400" />
                  Sign out
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
