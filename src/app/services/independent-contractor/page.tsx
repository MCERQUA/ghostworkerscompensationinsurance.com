"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield, CheckCircle, ArrowRight, Phone, ChevronDown,
  UserCheck, FileText, Scale, AlertTriangle, Building,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const classificationTests = [
  {
    title: "IRS Common Law Test",
    agency: "Internal Revenue Service",
    factors: [
      { label: "Behavioral Control", detail: "Does the company control how work is performed — tools used, schedule set, work reviewed?" },
      { label: "Financial Control", detail: "Does the company control the economic aspects — investment, profit/loss opportunity, services available to market?" },
      { label: "Type of Relationship", detail: "Are there written contracts, employee-type benefits, indefinite duration, and work that is a key business activity?" },
    ],
    note: "All factors are weighed; no single factor is determinative.",
    color: "border-blue-200 bg-blue-50",
    titleColor: "text-blue-800",
  },
  {
    title: "DOL Economic Reality Test",
    agency: "Dept. of Labor (FLSA)",
    factors: [
      { label: "Degree of Economic Dependence", detail: "Is the worker economically dependent on this one company, or truly in business for themselves?" },
      { label: "Control & Integration", detail: "Is the work integral to the company's business? Does the company control the manner and means?" },
      { label: "Permanency & Investment", detail: "Is the relationship permanent or indefinite? Has the worker invested in tools, facilities, or employees?" },
    ],
    note: "Under DOL's 2024 rule, economic dependence is the central inquiry.",
    color: "border-green-200 bg-green-50",
    titleColor: "text-green-800",
  },
  {
    title: "ABC Test (State WC Laws)",
    agency: "Used by many states",
    factors: [
      { label: "A — Free from Control", detail: "The worker is free from direction and control of the hiring company in connection with the work performed." },
      { label: "B — Outside Usual Business", detail: "The work performed is outside the usual course of the company's business (or performed outside its place of business)." },
      { label: "C — Independent Trade", detail: "The worker is customarily engaged in an independently established trade, occupation, or business of the same nature." },
    ],
    note: "Failing any single prong means employee status — California AB5 uses this strict standard.",
    color: "border-purple-200 bg-purple-50",
    titleColor: "text-purple-800",
  },
];

const misclassificationRisks = [
  { icon: AlertTriangle, title: "Retroactive WC Premiums", desc: "Retroactive workers comp premiums for all periods during which the worker was misclassified — potentially years of back premium plus interest and audit penalties." },
  { icon: Scale, title: "Back Payroll Taxes & Penalties", desc: "IRS and state tax authorities can assess back payroll taxes (FICA, FUTA, SUTA), plus substantial penalties and interest for unreported wage employment." },
  { icon: FileText, title: "Wage & Hour Violations", desc: "Misclassified workers may be entitled to minimum wage and overtime pay they were denied as contractors — including liquidated damages and attorney's fees." },
  { icon: Shield, title: "Benefits Liability", desc: "If the employer offers employee benefits, a reclassified worker may have claims to retroactive benefits — health insurance, 401(k) contributions, and paid leave." },
  { icon: Building, title: "State Enforcement Penalties", desc: "State labor agencies can impose per-worker per-day penalties for intentional misclassification. California penalties reach $15,000 per violation ($25,000 for repeat violations)." },
  { icon: UserCheck, title: "Workers Comp Claim Exposure", desc: "A reclassified worker injured during the misclassification period may file a workers comp claim against your policy — and pursue a civil lawsuit if coverage is rescinded." },
];

const hotspots = [
  { state: "New Jersey", law: "ABC Test", detail: "New Jersey applies the ABC test for WC and unemployment purposes. Significant enforcement activity across construction, transportation, and personal services." },
  { state: "Massachusetts", law: "ABC Test (M.G.L. c. 149 §148B)", detail: "One of the strictest ABC tests in the country — Factor B requires the work to be both outside usual business AND performed outside the employer's place of business." },
  { state: "Illinois", law: "Employee Classification Act", detail: "Specific statute for construction workers creating a presumption of employee status. Penalties up to $1,500 per day per violation for willful misclassification." },
];

const faqItems = [
  {
    q: "What is the difference between an independent contractor and an employee for workers comp?",
    a: "For workers comp purposes, employees are covered under your policy and their injuries are compensable claims. Independent contractors are generally excluded — they're expected to carry their own coverage. However, if a state agency, court, or auditor determines that a 1099 worker was actually an employee under the applicable classification test, your carrier can retroactively charge additional premium for that worker's entire tenure, and the worker may be entitled to workers comp benefits from your policy.",
  },
  {
    q: "What is the ABC test for worker classification?",
    a: "The ABC test, used by many states for workers comp and unemployment purposes, presumes all workers are employees unless the hiring company proves all three factors: (A) the worker is free from the company's control and direction, (B) the work performed is outside the usual course of the company's business, and (C) the worker is customarily engaged in an independently established trade or occupation. Failing any one prong means the worker is classified as an employee. California's AB5 adopted this strict standard, dramatically expanding employee status across industries.",
  },
  {
    q: "Can I be held liable for workers comp if a 1099 contractor is injured?",
    a: "Yes — if a state investigator, auditor, or court determines the 1099 contractor was actually an employee under that state's classification test. The injured worker could pursue a workers comp claim against your policy. Your carrier could retroactively add that worker's payroll to your audit — resulting in significant additional premium for the entire period they worked for you. In some states, if you're deemed a 'statutory employer,' you may be directly liable for the contractor's workers comp benefits even without misclassification.",
  },
  {
    q: "Which states are most aggressive about 1099 reclassification?",
    a: "California leads with AB5, which applies the strict ABC test to virtually all industries. New Jersey, Massachusetts, and Illinois are also aggressive enforcers using the ABC test. New York and Washington have active enforcement programs as well. California's enforcement is particularly comprehensive — the EDD, Labor Commissioner, and Attorney General all have overlapping authority to investigate and penalize misclassification, and criminal charges are possible for willful violations.",
  },
  {
    q: "What documentation should I keep to support contractor status?",
    a: "Maintain written independent contractor agreements for each 1099 worker that clearly define the scope of work and the contractor's control over how work is performed. Document that the contractor sets their own schedule, uses their own tools and equipment, and works for multiple clients simultaneously. Keep records of the contractor's business license, general liability insurance, and their own workers comp policy if they have employees. Retain invoices and 1099s rather than W-2s and timesheets. Strong documentation is your first line of defense in a reclassification audit.",
  },
];

export default function IndependentContractorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#0052cc]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-200/30 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.span
                variants={fadeUp}
                className="inline-block bg-[#0052cc]/10 text-[#0052cc] text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              >
                1099 Worker Protection
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-extrabold text-[#1e2d3d] leading-tight mb-6"
              >
                Independent Contractor{" "}
                <span className="text-[#0052cc]">Misclassification Insurance</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-8 leading-relaxed">
                Millions of businesses rely on 1099 contractors — but the IRS, DOL, and state agencies are
                aggressively reclassifying workers as employees, creating massive retroactive WC premium,
                tax, and wage liabilities. Misclassification coverage protects your business before a
                reclassification audit becomes a financial crisis.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 bg-[#0052cc] text-white px-7 py-4 rounded-xl font-semibold hover:bg-[#0041a8] transition-colors"
                >
                  Get a Free Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:844-967-5247"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#0052cc] text-[#0052cc] px-7 py-4 rounded-xl font-semibold hover:bg-[#0052cc]/5 transition-colors"
                >
                  <Phone className="w-5 h-5" /> 844-967-5247
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="/images/workers-comp-coverage.jpg"
                alt="Independent contractor misclassification insurance — 1099 worker coverage"
                width={600}
                height={450}
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1e2d3d]">Reclassification Defense</p>
                  <p className="text-xs text-gray-500">IRS, DOL, and state audit protection</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── The Classification Problem ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-6">The Classification Problem</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                An estimated 10–30% of U.S. workers may be misclassified as independent contractors when they
                legally qualify as employees under federal or state law. Businesses rely on 1099 arrangements
                to reduce payroll taxes, avoid workers comp premiums, and sidestep employment regulations —
                but federal and state agencies are aggressively pushing back.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                The IRS, Department of Labor, NLRB, and nearly every state labor agency have active
                misclassification enforcement programs. When a reclassification determination is made,
                the employer faces retroactive liability for <strong>all periods of misclassification</strong> —
                not just going forward. For a business that has used 1099 workers for years, this exposure
                can be catastrophic.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Workers comp is often the largest component of retroactive liability. Carriers retroactively
                add reclassified workers' payroll to prior policy audits, triggering additional premium demands
                — plus interest and penalties — going back as far as the statute of limitations allows.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              {[
                { label: "Enforcement Actions", value: "Rising", note: "Federal and state misclassification enforcement at decade-high levels" },
                { label: "Average Retroactive Exposure", value: "3–5 Years", note: "Most state WC statutes of limitations extend 3–5 years for premium recovery" },
                { label: "Key Federal Laws", value: "IRS + DOL + NLRA", note: "Multiple federal agencies each apply different classification tests" },
                { label: "States with ABC Test", value: "20+", note: "Over 20 states use strict ABC test presuming employee status" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-[#f8fafc] rounded-xl border border-gray-100">
                  <div className="text-2xl font-extrabold text-[#0052cc] min-w-[90px]">{item.value}</div>
                  <div>
                    <p className="font-semibold text-[#1e2d3d] text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.note}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Classification Tests ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">IRS, DOL &amp; State Classification Tests</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
              Three distinct legal frameworks govern worker classification — and satisfying one does not guarantee compliance with the others.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-3 gap-6">
            {classificationTests.map((test, i) => (
              <motion.div key={i} variants={fadeUp} className={`rounded-2xl p-6 border-2 ${test.color}`}>
                <div className={`text-xs font-bold uppercase tracking-wide mb-1 ${test.titleColor}`}>{test.agency}</div>
                <h3 className="text-lg font-extrabold text-[#1e2d3d] mb-5">{test.title}</h3>
                <div className="space-y-4 mb-5">
                  {test.factors.map((factor, j) => (
                    <div key={j}>
                      <p className="font-semibold text-[#1e2d3d] text-sm mb-1">{factor.label}</p>
                      <p className="text-gray-600 text-xs leading-relaxed">{factor.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-xs text-gray-700 italic">{test.note}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Risks ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">Risks of Misclassification</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">Retroactive reclassification triggers liability across multiple agencies and legal theories simultaneously.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {misclassificationRisks.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#0052cc]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#0052cc]" />
                </div>
                <h3 className="font-bold text-[#1e2d3d] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── State Enforcement Hotspots ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">State Enforcement Hotspots</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
              These states have the most aggressive misclassification enforcement programs — with penalties and retroactive liability that can threaten business solvency.
            </motion.p>
          </motion.div>

          {/* California callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-8 mb-8 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <div className="inline-block bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-2">Highest Risk State</div>
                <h3 className="text-xl font-extrabold text-amber-900 mb-2">California — AB5</h3>
                <p className="text-amber-800 leading-relaxed text-sm">
                  California's Assembly Bill 5 (effective January 2020) applies the strict ABC test to virtually all employment relationships, with limited industry-specific exemptions. Enforcement authority is spread across the Labor Commissioner, Employment Development Department (EDD), and the Attorney General's office. Penalties for willful misclassification can reach $25,000 per violation. The EDD alone has collected over $1 billion in back taxes and penalties from misclassification enforcement since AB5 took effect.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {hotspots.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-extrabold text-[#1e2d3d] mb-1">{item.state}</h3>
                <div className="text-xs text-[#0052cc] font-semibold mb-3">{item.law}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── What Coverage Protects ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-6">What Coverage Addresses Your Exposure</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Misclassification coverage combined with audit protection provides a comprehensive financial
                backstop against the retroactive costs of reclassification — whether triggered by a carrier
                audit, state agency investigation, or injured worker's claim.
              </p>
              <p className="text-gray-600 leading-relaxed">
                CCA's specialists structure coverage programs that address the full spectrum of 1099 worker
                exposure — from the first audit notice through final resolution, including legal defense,
                retroactive premium, and penalty mitigation.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4">
              {[
                { title: "Retroactive WC Premium Coverage", detail: "Covers additional premium assessed when reclassified workers' payroll is added to prior policy audits" },
                { title: "Audit Defense Representation", detail: "Funds legal and professional fees to dispute reclassification findings and negotiate with carriers and state agencies" },
                { title: "Penalty Mitigation Coverage", detail: "Helps fund state-assessed penalties for misclassification findings, reducing out-of-pocket financial impact" },
                { title: "Employer Liability Part B Defense", detail: "Covers civil lawsuits filed by reclassified workers who suffered injuries during the misclassification period" },
                { title: "Multi-Agency Coordination", detail: "CCA specialists coordinate defense across IRS, DOL, and state labor agency investigations simultaneously" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#f8fafc] rounded-xl border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-[#0052cc] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1e2d3d] text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-[#1e2d3d] mb-4">Frequently Asked Questions</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600">Common questions about independent contractor classification and misclassification insurance.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-[#1e2d3d] pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#0052cc] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0052cc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Protect Your 1099 Workforce Strategy</motion.h2>
            <motion.p variants={fadeUp} className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Don't let a reclassification audit unravel years of contractor arrangements. CCA structures misclassification
              coverage and audit protection programs that address the full spectrum of 1099 worker exposure.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-white text-[#0052cc] px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:844-967-5247" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                <Phone className="w-5 h-5" /> 844-967-5247
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <Footer />
    </div>
  );
}
