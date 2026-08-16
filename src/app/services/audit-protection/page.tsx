"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield, CheckCircle, ArrowRight, Phone, ChevronDown,
  Search, FileWarning, Calculator, Scale, ClipboardList,
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

const triggers = [
  { icon: Calculator, title: "Significant Payroll Growth", desc: "A large increase in actual vs. estimated payroll signals potential underreporting and routinely triggers a physical audit." },
  { icon: ClipboardList, title: "New Employee Classifications", desc: "Adding workers in higher-hazard class codes than those on the original policy estimate prompts carrier re-evaluation." },
  { icon: FileWarning, title: "Large Subcontractor Payments", desc: "Carriers scrutinize subcontractor certificates and uninsured sub payments, which can be added to your auditable payroll." },
  { icon: Search, title: "Prior Audit Discrepancies", desc: "Businesses with prior audit findings are flagged for more frequent or intensive audits in subsequent policy years." },
  { icon: Scale, title: "Workers Comp Claims Filed", desc: "A claim filed by a worker whose class code doesn't match their job description triggers reclassification review." },
  { icon: Shield, title: "State Labor Department Referrals", desc: "Tips to state labor agencies about unreported workers or misclassification can initiate both state and carrier investigations." },
];

const coverageItems = [
  { title: "Retroactive Premium Adjustments", desc: "Covers the additional premium assessed after the carrier determines your actual payroll exceeded estimates during the policy period." },
  { title: "Audit Defense Costs", desc: "Pays for legal and professional fees to dispute incorrect audit findings, reclassifications, or improperly applied experience modifiers." },
  { title: "Worker Reclassification Defense", desc: "Provides representation and cost coverage when a carrier attempts to reclassify employees into higher-rated class codes without sufficient basis." },
  { title: "Documentation Assistance", desc: "Covers the cost of gathering, organizing, and presenting payroll records, certificates of insurance, and subcontractor documentation during the audit." },
  { title: "Penalty Mitigation", desc: "Helps negotiate and fund state-assessed penalties arising from audit findings, including penalties for uninsured subcontractor payments." },
  { title: "Carrier Appeal Representation", desc: "Funds the formal appeal process with the carrier or state rating bureau if initial dispute efforts are unsuccessful." },
];

const disputeSteps = [
  { num: "01", title: "Receive Audit Notice", desc: "Carrier sends audit notification — mail audit questionnaire or notice of physical audit visit. Typically issued 60–90 days after policy expiration." },
  { num: "02", title: "Gather Documentation", desc: "Compile payroll journals, tax returns (940/941), certificates of insurance for all subcontractors, and any job classification documentation." },
  { num: "03", title: "Review Audit Findings", desc: "Analyze the auditor's report line by line — verify class codes assigned, payroll figures used, and subcontractor treatment." },
  { num: "04", title: "File Formal Dispute", desc: "Submit a written dispute with supporting documentation to the carrier's audit department. State specific objections with evidence." },
  { num: "05", title: "Negotiate & Resolve", desc: "Work with the carrier's audit review team to negotiate corrections. Many disputes resolve at this stage without formal appeal." },
  { num: "06", title: "Appeal to Rating Bureau", desc: "If the carrier dispute fails, escalate to the NCCI or state rating bureau for a formal classification determination." },
];

const faqItems = [
  {
    q: "What is a workers compensation audit?",
    a: "A workers comp audit is an annual review conducted by your insurance carrier to verify that the premium you paid matches your actual payroll and employee classifications during the policy period. Workers comp premiums are initially estimated based on projected payroll. At policy expiration, the carrier audits your actual payroll records. If your actual payroll exceeded the estimate, you owe additional premium. If it was lower, you may receive a refund.",
  },
  {
    q: "What triggers a workers comp audit investigation?",
    a: "Common audit triggers include significant payroll increases over the estimate, adding new job classifications or hiring in higher-hazard trades, large payments to subcontractors without proper certificates of insurance, prior audit discrepancies, workers who file claims that don't match their reported classification codes, and referrals from state labor departments investigating unreported workers.",
  },
  {
    q: "What happens if I owe additional premium after an audit?",
    a: "If the audit reveals underpaid premium, your carrier will issue a final audit bill — typically due within 30 days. Failure to pay can result in policy cancellation, referral to a collections agency, and difficulty obtaining future workers comp coverage. Depending on the circumstances, large discrepancies may also be referred to state insurance fraud bureaus. Audit protection insurance helps cover these unexpected retroactive charges and provides dispute representation if the audit findings are inaccurate.",
  },
  {
    q: "Can I dispute the results of a workers comp audit?",
    a: "Yes. If you believe the auditor misclassified employees, incorrectly calculated payroll, failed to apply subcontractor certificates properly, or used the wrong experience modification factor, you have the right to dispute the findings. The dispute process involves submitting documentation to the carrier's audit review department and may require negotiation, formal carrier appeal, or escalation to the NCCI or state rating bureau. Many audits are corrected through the dispute process.",
  },
  {
    q: "How long does a workers comp audit typically take?",
    a: "A mail audit — where you submit payroll records directly to the carrier — typically takes 2–4 weeks from submission to final findings. A physical audit where an auditor visits your premises generally takes 1–3 days on-site, with a findings report issued within 30 days of the visit. Complex audits involving multiple states, multiple class codes, or large subcontractor lists can take several months from initiation to final resolution.",
  },
];

export default function AuditProtectionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#9a3412]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.span
                variants={fadeUp}
                className="inline-block bg-[#9a3412]/10 text-[#9a3412] text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              >
                Retroactive Audit Defense
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-extrabold text-[#2a211c] leading-tight mb-6"
              >
                Workers Comp{" "}
                <span className="text-[#9a3412]">Audit Protection</span>{" "}
                Insurance
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-stone-600 mb-8 leading-relaxed">
                Workers comp carriers audit your payroll after every policy period. When actual payroll
                exceeds estimates — or auditors misclassify your workers — you face unexpected premium
                bills that can reach tens of thousands of dollars. Audit protection coverage defends
                your business and pays the difference.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 bg-[#9a3412] text-white px-7 py-4 rounded-xl font-semibold hover:bg-[#83300f] transition-colors"
                >
                  Get a Free Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:844-967-5247"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#9a3412] text-[#9a3412] px-7 py-4 rounded-xl font-semibold hover:bg-[#9a3412]/5 transition-colors"
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
                src="/images/audit-protection.jpg"
                alt="Workers comp audit protection insurance"
                width={600}
                height={450}
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9a3412]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#9a3412]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2a211c]">Audit Defense Included</p>
                  <p className="text-xs text-stone-500">Dispute representation + premium coverage</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How Audits Work ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2a211c] mb-6">
                How Workers Comp Audits Work
              </h2>
              <p className="text-stone-600 leading-relaxed mb-5">
                Workers compensation premiums are calculated as a rate per $100 of payroll, multiplied by
                your experience modification rate (EMR) and applicable class codes. Because you don't know
                your exact year-end payroll at policy inception, carriers charge an <strong>estimated
                premium</strong> based on projected payroll figures.
              </p>
              <p className="text-stone-600 leading-relaxed mb-5">
                At policy expiration — typically 60 to 90 days after the policy period ends — the carrier
                conducts a <strong>final payroll audit</strong>. They review your actual payroll records,
                verify class code assignments for each employee type, and reconcile subcontractor
                payments against certificates of insurance you collected.
              </p>
              <p className="text-stone-600 leading-relaxed">
                If the audit reveals you underpaid — because payroll grew, workers were reclassified into
                higher-rated codes, or subcontractor payments were added to your payroll — you receive
                an <strong>audit bill</strong>. These bills can range from a few hundred dollars to
                hundreds of thousands for large employers. Audit protection coverage is designed to
                shield you from exactly this scenario.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              <div className="bg-[#faf8f5] rounded-2xl p-6 border border-stone-100">
                <h3 className="font-bold text-[#2a211c] mb-4">The Audit Timeline</h3>
                <div className="space-y-3">
                  {[
                    { phase: "Policy Inception", detail: "Estimated premium charged based on projected payroll" },
                    { phase: "Mid-Policy", detail: "Carrier may issue installment adjustments if payroll changes" },
                    { phase: "Policy Expiration", detail: "60–90 day window before audit notification is issued" },
                    { phase: "Audit Notification", detail: "Mail audit questionnaire or physical audit visit scheduled" },
                    { phase: "Audit Completion", detail: "Findings issued — additional premium billed or refund issued" },
                    { phase: "Payment / Dispute", detail: "Pay the final bill or initiate a formal audit dispute" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#9a3412] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <span className="font-semibold text-[#2a211c] text-sm">{item.phase}:</span>{" "}
                        <span className="text-stone-600 text-sm">{item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Audit Triggers ── */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#2a211c] mb-4">
              What Triggers a WC Audit Investigation?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-stone-600 max-w-2xl mx-auto">
              Some businesses face routine annual audits; others are flagged for intensive investigation
              based on specific risk signals that carriers monitor throughout the policy period.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {triggers.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#9a3412]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#9a3412]" />
                </div>
                <h3 className="text-base font-bold text-[#2a211c] mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── What Audit Protection Covers ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#2a211c] mb-4">
              What Audit Protection Covers
            </motion.h2>
            <motion.p variants={fadeUp} className="text-stone-600 max-w-2xl mx-auto">
              Audit protection insurance addresses both the financial exposure and the legal costs
              of defending against incorrect or excessive audit findings.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coverageItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl border-2 border-[#9a3412]/15 bg-[#faf8f5] hover:border-[#9a3412]/40 hover:shadow-md transition-all"
              >
                <CheckCircle className="w-7 h-7 text-[#9a3412] mb-4" />
                <h3 className="font-bold text-[#2a211c] mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Dispute Process ── */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#2a211c] mb-4">
              The Audit Dispute Process
            </motion.h2>
            <motion.p variants={fadeUp} className="text-stone-600 max-w-2xl mx-auto">
              When audit findings are inaccurate, you have defined rights to dispute them. Here's how
              a successful audit dispute unfolds — with CCA and your audit protection coverage in your corner.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {disputeSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#9a3412]/5 rounded-bl-3xl" />
                <div className="text-4xl font-extrabold text-[#9a3412]/15 mb-3">{step.num}</div>
                <h3 className="font-bold text-[#2a211c] mb-2">{step.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why CCA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2a211c] mb-6">
                Why CCA for Audit Protection?
              </h2>
              <p className="text-stone-600 leading-relaxed mb-5">
                Contractors Choice Agency specializes in workers compensation audit defense and retroactive
                exposure coverage. Our specialists have navigated hundreds of carrier audits, NCCI
                reclassification disputes, and state bureau appeals across every major industry class code.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                We don't just sell audit protection coverage — we actively work with you when an audit
                arrives, helping you organize documentation, identify audit errors, and build a compelling
                dispute that protects your bottom line.
              </p>
              <a
                href="tel:844-967-5247"
                className="inline-flex items-center gap-2 text-[#9a3412] font-semibold hover:underline"
              >
                <Phone className="w-5 h-5" /> Call 844-967-5247 to speak with an audit specialist
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4">
              {[
                "Audit dispute specialists on staff — not just brokers",
                "Access to NCCI classification appeals process",
                "Subcontractor certificate collection & tracking support",
                "Experience modifier verification and correction services",
                "Multi-state audit coordination for complex programs",
                "Documented track record of reducing audit assessments",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#faf8f5] rounded-xl border border-stone-100">
                  <CheckCircle className="w-5 h-5 text-[#9a3412] flex-shrink-0" />
                  <p className="text-[#2a211c] font-medium text-sm">{item}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-[#2a211c] mb-4">Frequently Asked Questions</motion.h2>
            <motion.p variants={fadeUp} className="text-stone-600">Common questions about workers comp audits and audit protection coverage.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-[#2a211c] pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#9a3412] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-stone-600 leading-relaxed text-sm">{item.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#9a3412]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Don't Face an Audit Alone
            </motion.h2>
            <motion.p variants={fadeUp} className="text-amber-200 text-lg mb-8 max-w-2xl mx-auto">
              An unexpected audit bill can threaten your business. Get audit protection coverage today
              and have a team of specialists ready when your carrier comes calling.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-white text-[#9a3412] px-8 py-4 rounded-xl font-bold hover:bg-amber-50 transition-colors">
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
