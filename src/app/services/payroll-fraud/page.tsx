"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield, CheckCircle, ArrowRight, Phone, ChevronDown,
  AlertTriangle, Search, FileWarning, UserX, Calculator,
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

const employerRisks = [
  { icon: AlertTriangle, title: "Criminal Fraud Charges", desc: "Intentional payroll fraud — including ghost employee schemes — can result in criminal charges at the state and federal level, including wire fraud, mail fraud, and insurance fraud statutes.", color: "bg-red-50 border-red-200", iconColor: "text-red-600", iconBg: "bg-red-100" },
  { icon: Search, title: "Carrier Fraud Investigation", desc: "Workers comp carriers partner with the National Insurance Crime Bureau (NICB) and state fraud bureaus. Audit triggers can initiate a full fraud investigation, including subpoena of payroll records.", color: "bg-orange-50 border-orange-200", iconColor: "text-orange-600", iconBg: "bg-orange-100" },
  { icon: FileWarning, title: "Policy Rescission", desc: "Carriers can rescind a policy retroactively when fraud is discovered — voiding coverage back to inception and denying all pending claims filed under the policy.", color: "bg-red-50 border-red-200", iconColor: "text-red-600", iconBg: "bg-red-100" },
  { icon: Calculator, title: "Retroactive Premium Demands", desc: "Underpaid premium resulting from payroll underreporting becomes immediately due when discovered — plus interest, penalties, and audit costs assessed by the carrier.", color: "bg-orange-50 border-orange-200", iconColor: "text-orange-600", iconBg: "bg-orange-100" },
  { icon: UserX, title: "State Insurance Department Penalties", desc: "State insurance commissioners can impose fines, suspend licenses, and bar carriers from writing future business with the employer when fraud findings are substantiated.", color: "bg-red-50 border-red-200", iconColor: "text-red-600", iconBg: "bg-red-100" },
  { icon: Shield, title: "Civil Lawsuits from Injured Workers", desc: "When a fraudulently procured policy is rescinded, injured workers may sue the employer directly for compensation — bypassing the exclusive remedy bar that workers comp otherwise provides.", color: "bg-orange-50 border-orange-200", iconColor: "text-orange-600", iconBg: "bg-orange-100" },
];

const redFlags = [
  "Payroll totals that don't match industry norms for business size and revenue",
  "Many employees with similar job duties but widely disparate compensation",
  "Excessive or unusual overtime concentrations in a single department",
  "High volume of cash wage payments without clear documentation",
  "Subcontractors receiving employee-like benefits or consistent hours",
  "IRS Form 1099 and W-2 counts that don't reconcile with reported payroll",
  "Employee addresses or direct deposit accounts linked to the same household",
  "Payroll for employees whose names don't appear in HR or benefits records",
];

const coverageProtections = [
  { title: "Retroactive Premium Coverage", desc: "Covers additional premium assessments arising from audit findings of payroll discrepancies, even if caused by administrative errors rather than intentional fraud." },
  { title: "Audit Defense Costs", desc: "Funds legal and professional fees to respond to carrier audit investigations, dispute incorrect findings, and negotiate settlement of premium deficiencies." },
  { title: "Misclassification Defense", desc: "Provides coverage for retroactive premium and defense costs when workers are reclassified from independent contractor to employee status by a state agency or carrier." },
  { title: "Penalty Mitigation", desc: "Helps fund negotiation and payment of state-assessed penalties arising from audit findings, reducing the financial impact of inadvertent payroll classification errors." },
];

const faqItems = [
  {
    q: "What is a ghost employee in the context of payroll fraud?",
    a: "In payroll fraud, a ghost employee is a fictitious or former employee whose name remains on the payroll to divert wages. The fraudster — often someone with access to payroll systems — adds a ghost employee and redirects the pay to themselves or an accomplice. This is entirely distinct from the insurance term 'ghost policy,' which is a legitimate workers comp policy that covers a real sole proprietor or owner-operator with no actual employees on payroll.",
  },
  {
    q: "How does payroll underreporting affect workers comp premiums?",
    a: "Workers comp premiums are calculated as a rate per $100 of payroll, multiplied by the applicable class code rate and experience modifier. Deliberately understating payroll — by paying workers in cash, misreporting hours, or excluding certain employee types — reduces the premium artificially. When discovered during a carrier audit or investigation, the employer owes all back premium plus interest and potentially penalties. Carriers may also rescind the policy and report the matter to state insurance fraud bureaus.",
  },
  {
    q: "What happens when a carrier discovers payroll fraud?",
    a: "When a carrier detects payroll fraud, consequences can include retroactive policy rescission (voiding coverage back to inception), denial of all pending claims filed under the policy, demands for all underpaid premium plus interest, referral to state insurance fraud bureaus and the National Insurance Crime Bureau (NICB), civil lawsuits for fraud damages, and criminal referrals for wire fraud, mail fraud, or insurance fraud. The severity depends on the magnitude of the fraud and whether it was intentional or an administrative error.",
  },
  {
    q: "Can workers comp misclassification be considered fraud?",
    a: "Yes — intentional misclassification of employees as independent contractors to avoid workers comp premiums can be treated as insurance fraud in many states. Even unintentional misclassification creates significant financial exposure: retroactive premiums, penalties, and workers left without coverage who may sue the employer directly. Misclassification coverage and audit protection help manage the financial impact of inadvertent classification errors before they escalate into fraud investigations.",
  },
  {
    q: "How can I protect my business from internal ghost employee payroll fraud?",
    a: "Internal controls that prevent ghost employee fraud include: requiring dual authorization for adding new employees to payroll, conducting annual payroll audits reconciled against HR and benefits records, requiring direct deposit to independently verified bank accounts, periodically verifying that all payroll recipients are active in HR systems, using payroll software with anomaly detection that flags unusual patterns, and rotating payroll processing responsibilities to prevent single-person control. For the carrier-facing side of payroll audit exposure, audit protection insurance provides the financial backstop.",
  },
];

export default function PayrollFraudPage() {
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
                Fraud Protection
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-extrabold text-[#1e2d3d] leading-tight mb-6"
              >
                Payroll Fraud &amp; Ghost Employee{" "}
                <span className="text-[#0052cc]">Workers Comp Insurance</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-8 leading-relaxed">
                Payroll fraud in the workers comp context exposes businesses to rescinded policies, criminal
                charges, and massive retroactive premium demands. Whether the issue is intentional fraud or
                inadvertent misclassification, understanding your exposure — and your coverage options — is critical.
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
                src="/images/payroll-audit.jpg"
                alt="Payroll fraud and ghost employee workers comp insurance"
                width={600}
                height={450}
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1e2d3d]">High Exposure Risk</p>
                  <p className="text-xs text-gray-500">Audit protection + misclassification defense</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What Is Payroll Fraud ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">
              What Is Payroll Fraud in Workers Comp?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
              In the workers comp insurance context, payroll fraud takes two primary forms — each with distinct
              causes, consequences, and coverage implications.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-100">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <UserX className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1e2d3d] mb-3">Type 1: Ghost Employee Payroll Fraud</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                A fictitious or former employee is added to payroll to divert wages to an unauthorized recipient —
                typically someone with access to the payroll system. The "employee" never shows up, never performs
                work, but collects a paycheck. This scheme inflates the reported payroll, paradoxically increasing
                WC premium costs while defrauding the business of wages.
              </p>
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-xs text-red-800 font-medium">Who's at risk: Businesses with weak internal payroll controls and limited HR oversight of payroll additions.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-100">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1e2d3d] mb-3">Type 2: Payroll Underreporting Fraud</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                An employer deliberately understates payroll figures provided to the workers comp carrier —
                paying workers in cash off the books, misreporting job classifications into lower-rated codes,
                or excluding entire employee classes from the reported payroll. This reduces WC premiums
                illegally, leaving workers uninsured and the carrier holding underfunded risk.
              </p>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-xs text-orange-800 font-medium">Who's at risk: Businesses in cash-heavy industries (construction, landscaping, restaurants) with informal payroll practices.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Ghost Employee Definition ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border-2 border-[#0052cc]/20 shadow-sm">
              <div className="inline-flex items-center gap-2 bg-[#0052cc]/10 text-[#0052cc] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <FileWarning className="w-4 h-4" /> Important Distinction
              </div>
              <h2 className="text-3xl font-extrabold text-[#1e2d3d] mb-6">The Two Meanings of "Ghost Employee"</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                  <h3 className="font-bold text-red-800 mb-3">Fraudulent Ghost Employee</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    A fictitious person added to payroll to steal wages. This is illegal, constitutes
                    insurance fraud, and can result in criminal prosecution. This is the definition used
                    in forensic accounting, HR compliance, and law enforcement contexts.
                  </p>
                </div>
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                  <h3 className="font-bold text-green-800 mb-3">Ghost Policy (Legitimate)</h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    A legitimate workers comp policy issued to a real sole proprietor or owner-operator
                    who has no employees. The "ghost" refers to the absence of employees — not fraud.
                    Ghost policies satisfy COI requirements for self-employed contractors and are issued
                    by admitted carriers in 46 states.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-6 leading-relaxed">
                When evaluating your workers comp exposure, it is essential to understand which definition
                applies to your situation. CCA specialists can help clarify the right coverage structure —
                whether you need a legitimate ghost policy for COI purposes or audit protection against
                carrier fraud investigations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Employer Exposure ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">Employer Exposure: What's at Stake</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">When payroll fraud — intentional or inadvertent — is discovered, the consequences are severe and multi-dimensional.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerRisks.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className={`rounded-2xl p-6 border ${item.color} hover:shadow-md transition-shadow`}>
                <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="font-bold text-[#1e2d3d] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── What Coverage Protects ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">What Coverage Addresses This</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">Audit protection and misclassification coverage provide a financial backstop against the retroactive costs of payroll discrepancies — both fraudulent and inadvertent.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {coverageProtections.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-6 border-2 border-[#0052cc]/15 hover:border-[#0052cc]/40 transition-colors shadow-sm">
                <CheckCircle className="w-7 h-7 text-[#0052cc] mb-4" />
                <h3 className="font-bold text-[#1e2d3d] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Red Flags ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-6">Red Flags Carriers Look For</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Workers comp carriers and their Special Investigations Units (SIUs) use sophisticated analytics
                to identify payroll anomalies. Understanding what triggers scrutiny helps you ensure your
                payroll practices are compliant and defensible.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If your business exhibits any of these patterns — even innocently — you may face an
                intensive audit. Audit protection coverage and clean payroll documentation are your
                best defenses.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-3">
              {redFlags.map((flag, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900">{flag}</p>
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
            <motion.p variants={fadeUp} className="text-gray-600">Common questions about payroll fraud and ghost employee exposure in workers comp.</motion.p>
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
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Protect Against Payroll Audit Exposure</motion.h2>
            <motion.p variants={fadeUp} className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're concerned about internal fraud controls or carrier audit exposure, CCA's specialists can
              structure the right audit protection and misclassification coverage for your business.
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
