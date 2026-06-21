"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Shield, ChevronDown } from "lucide-react";

const services = [
  { href: "/services/ghost-workers-compensation", label: "Ghost WC Policy" },
  { href: "/services/audit-protection", label: "Audit Protection" },
  { href: "/services/employer-liability", label: "Employer Liability" },
  { href: "/services/payroll-fraud", label: "Payroll Fraud Coverage" },
  { href: "/services/independent-contractor", label: "Contractor Misclassification" },
  { href: "/services/multi-state-coverage", label: "Multi-State Coverage" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-[rgba(0,82,204,0.08)]"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052cc] to-[#1a6bff] flex items-center justify-center shadow-lg shadow-[rgba(0,82,204,0.3)] group-hover:shadow-[rgba(0,82,204,0.5)] transition-all">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-black text-[#0052cc] leading-tight">GHOST WC</div>
              <div className="text-xs text-[#64748b] font-medium leading-tight">INSURANCE</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-[#1e2d3d] font-semibold text-sm hover:text-[#0052cc] transition-colors py-2">
                Coverage
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl shadow-[rgba(0,82,204,0.15)] border border-[rgba(0,82,204,0.1)] py-2 mt-1"
                  >
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-5 py-3 text-sm text-[#1e2d3d] hover:text-[#0052cc] hover:bg-[rgba(0,82,204,0.05)] transition-colors font-medium"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="text-[#1e2d3d] font-semibold text-sm hover:text-[#0052cc] transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-[#1e2d3d] font-semibold text-sm hover:text-[#0052cc] transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-[#1e2d3d] font-semibold text-sm hover:text-[#0052cc] transition-colors">
              Contact
            </Link>

            <a
              href="tel:+18449675247"
              className="flex items-center gap-2 text-sm font-bold text-[#0052cc] hover:text-[#003d99] transition-colors"
            >
              <Phone className="w-4 h-4" />
              844-967-5247
            </a>

            <Link
              href="/quote"
              className="px-5 py-2.5 bg-gradient-to-r from-[#0052cc] to-[#1a6bff] text-white text-sm font-bold rounded-xl shadow-lg shadow-[rgba(0,82,204,0.3)] hover:shadow-[rgba(0,82,204,0.5)] hover:-translate-y-0.5 transition-all"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#1e2d3d] hover:text-[#0052cc] transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-[rgba(0,82,204,0.1)] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider px-4 pt-2 pb-1">Coverage</p>
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm font-semibold text-[#1e2d3d] hover:text-[#0052cc] hover:bg-[rgba(0,82,204,0.05)] rounded-xl transition-colors"
                >
                  {s.label}
                </Link>
              ))}
              <div className="border-t border-[rgba(0,82,204,0.1)] pt-2 mt-2">
                {[
                  { href: "/about", label: "About" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-[#1e2d3d] hover:text-[#0052cc] hover:bg-[rgba(0,82,204,0.05)] rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="pt-2 space-y-2">
                <a
                  href="tel:+18449675247"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#0052cc] bg-[rgba(0,82,204,0.06)] rounded-xl"
                >
                  <Phone className="w-4 h-4" />
                  844-967-5247
                </a>
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center px-4 py-3 bg-gradient-to-r from-[#0052cc] to-[#1a6bff] text-white text-sm font-bold rounded-xl"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
