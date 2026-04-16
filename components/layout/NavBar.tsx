"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navData } from "@/lib/data/navData";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { ChevronDown, Menu, X } from "lucide-react";

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className="w-full bg-white border-b border-red-100 relative z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[#9b1d20] font-black text-lg md:text-xl tracking-tight leading-none">
                ICSHSM
              </span>
              <span className="text-gray-300 font-thin text-lg">|</span>
              <span className="text-gray-600 font-semibold text-xs md:text-sm tracking-wider leading-tight">
                2026
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1 lg:space-x-5" ref={dropdownRef}>
            {navData.navItems.map((item) => {
              const exactMatch = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              const isSubItemActive = item.subItems?.some(sub => pathname === sub.href);
              const isActive = item.isActive || exactMatch || isSubItemActive;

              return item.subItems ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={(e) => toggleDropdown(item.label, e)}
                    className={cn(
                      "flex items-center text-[13px] font-bold transition-colors hover:text-[#9b1d20] uppercase tracking-wider whitespace-nowrap",
                      isActive
                        ? "text-[#9b1d20] border-b-2 border-[#9b1d20] pb-1"
                        : "text-gray-700"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("ml-1 h-3 w-3 transition-transform", openDropdown === item.label ? "rotate-180" : "")} />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute left-0 mt-4 w-56 shadow-xl flex flex-col overflow-hidden bg-white border border-gray-100 rounded-lg">
                      {item.subItems.map((subItem) => {
                        return (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            target={subItem.isDownload ? "_blank" : undefined}
                            download={subItem.isDownload ? true : undefined}
                            className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:text-white hover:bg-[#9b1d20] transition-colors border-b border-gray-50 last:border-0"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.isDownload ? "_blank" : undefined}
                  download={item.isDownload ? true : undefined}
                  className={cn(
                    "text-[13px] font-bold transition-colors hover:text-[#9b1d20] uppercase tracking-wider whitespace-nowrap px-1",
                    isActive
                      ? "text-[#9b1d20] border-b-2 border-[#9b1d20] pb-1"
                      : "text-gray-700"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="md"
                href={navData.ctaButton.href}
                className="rounded-full shadow-md whitespace-nowrap"
              >
                {navData.ctaButton.label}
              </Button>
            </div>
            
            {/* Mobile Nav Button */}
            <button
              className="xl:hidden p-2 text-gray-700 hover:text-[#9b1d20] focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-xl overflow-y-auto max-h-[80vh]">
          <div className="px-4 py-6 space-y-2">
            {navData.navItems.map((item) => (
              <div key={item.label}>
                {item.subItems ? (
                  <div className="space-y-1">
                    <div className="w-full flex justify-between items-center px-4 py-3 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg uppercase">
                      {item.label}
                      <ChevronDown size={16} />
                    </div>
                    <div className="pl-6 space-y-1 mt-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#9b1d20] hover:bg-gray-50 rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-bold text-gray-900 hover:text-[#9b1d20] hover:bg-gray-50 rounded-lg uppercase"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="pt-4 pb-2 px-4 sm:hidden">
              <Button
                variant="primary"
                href={navData.ctaButton.href}
                className="w-full justify-center rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {navData.ctaButton.label}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
