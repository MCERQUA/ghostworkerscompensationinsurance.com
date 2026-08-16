import Link from "next/link";
import { Shield, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2a211c] text-white">
      {/* CTA Band */}
      <div className="bg-gradient-to-r from-[#9a3412] to-[#c2410c] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                Ready to Protect Your Business from Audit Risk?
              </h2>
              <p className="text-amber-100 text-base">
                Talk to a ghost workers comp specialist today. No obligation, answers in hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:+18449675247"
                className="flex items-center gap-2 px-6 py-3 bg-white text-[#9a3412] font-bold rounded-xl hover:bg-amber-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call 844-967-5247
              </a>
              <Link
                href="/quote"
                className="flex items-center justify-center px-6 py-3 bg-[#2a211c] text-white font-bold rounded-xl hover:bg-[#3d3129] transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9a3412] to-[#c2410c] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black text-white leading-tight">GHOST WC INSURANCE</div>
                  <div className="text-xs text-amber-300 font-medium">By Contractors Choice Agency</div>
                </div>
              </Link>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                Specialized ghost policy workers compensation insurance for employers who need audit protection,
                employer liability coverage, and defense against payroll misclassification.
              </p>
              <div className="space-y-3">
                <a href="tel:+18449675247" className="flex items-center gap-3 text-sm text-stone-300 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#c2410c]" />
                  844-967-5247
                </a>
                <a href="mailto:info@contractorschoiceagency.com" className="flex items-center gap-3 text-sm text-stone-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#c2410c]" />
                  info@contractorschoiceagency.com
                </a>
                <div className="flex items-start gap-3 text-sm text-stone-300">
                  <MapPin className="w-4 h-4 text-[#c2410c] mt-0.5 shrink-0" />
                  Phoenix, AZ — Licensed in all 50 states
                </div>
              </div>
            </div>

            {/* Coverage */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Coverage Types</h3>
              <ul className="space-y-3">
                {[
                  { href: "/services/ghost-workers-compensation", label: "Ghost Workers Comp Policy" },
                  { href: "/services/audit-protection", label: "Audit Protection" },
                  { href: "/services/employer-liability", label: "Employer Liability" },
                  { href: "/services/payroll-fraud", label: "Payroll Fraud Coverage" },
                  { href: "/services/independent-contractor", label: "Contractor Misclassification" },
                  { href: "/services/multi-state-coverage", label: "Multi-State Coverage" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-stone-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Company</h3>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/blog", label: "Blog & Resources" },
                  { href: "/quote", label: "Get a Quote" },
                  { href: "/contact", label: "Contact Us" },
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-stone-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter / Quick Quote */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Quote</h3>
              <p className="text-stone-400 text-sm mb-4">
                Get a ghost workers comp quote in minutes. No commitment required.
              </p>
              <Link
                href="/quote"
                className="block text-center px-5 py-3 bg-gradient-to-r from-[#9a3412] to-[#c2410c] text-white text-sm font-bold rounded-xl shadow-lg shadow-[rgba(154,52,18,0.3)] hover:shadow-[rgba(154,52,18,0.5)] hover:-translate-y-0.5 transition-all mb-6"
              >
                Start My Quote →
              </Link>
              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Trust Signals</p>
                <div className="flex flex-wrap gap-2">
                  {["Licensed All 50 States", "20+ Years Experience", "A+ Rated Carriers", "Former Contractor Team"].map((badge) => (
                    <span key={badge} className="text-xs px-2.5 py-1 bg-white/10 rounded-full text-stone-300">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-stone-400 text-sm">
              © {new Date().getFullYear()} Ghost Workers Compensation Insurance by Contractors Choice Agency. All rights reserved.
            </p>
            <p className="text-stone-500 text-xs">
              Insurance products are not available in all states. Coverage subject to policy terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
