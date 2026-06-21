"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield, CheckCircle, ArrowRight, Phone, ChevronDown,
  Briefcase, Scale, AlertOctagon, FileText, DollarSign,
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

const scenarios = [
  {
    icon: Scale,
    title: "Third-Party Over Actions",
    desc: "An employee injured by defective equipment sues the manufacturer. The manufacturer then sues your company for contribution — claiming your negligence contributed to the injury. Part B responds to this third-party-over lawsuit even after the employee has received WC benefits.",
  },
  {
    icon: Briefcase,
    title: "Loss of Consortium Claims",
    desc: "The spouse or dependents of a severely injured employee may sue the employer for damages — loss of companionship, household services, and consortium. These claims fall outside the workers comp statutory system and require employer liability Part B coverage.",
  },
  {
    icon: AlertOctagon,
    title: "Dual Capacity Suits",
    desc: "When an employer also acts in a different capacity — as a product manufacturer, property owner, or healthcare provider — an employee may sue both as an employee and as a third-party plaintiff. Dual capacity claims bypass the exclusive remedy bar of workers comp.",
  },
  {
    icon: FileText,
    title: "Consequential Bodily Injury",
    desc: "A family member who cares for an injured employee and suffers their own physical injury as a direct result may bring a consequential bodily injury claim. Part B covers these consequential claims that arise from the original workplace injury.",
  },
];

const ghostScenarios = [
  {
    title: "Ghost Employee Injury Lawsuit",
    desc: "A sole proprietor with a ghost policy is injured on a client's job site. If the client's property conditions contributed to the injury, the owner may pursue a premises liability or third-party action. Part B provides defense coverage for counter-claims.",
  },
  {
    title: "Reclassified 1099 Worker Claims",
    desc: "A worker originally classified as an independent contractor is later reclassified as an employee. If injured, they may pursue a workers comp claim and separately file an employer liability suit — Part B covers the civil exposure.",
  },
  {
    title: "Subcontractor Misclassification",
    desc: "An uninsured subcontractor treated as an independent contractor sues the general contractor after injury. If the GC is deemed a statutory employer, Part B provides defense and indemnity for the resulting employer liability claim.",
  },
];

const limits = [
  { label: "Per Accident Bodily Injury Limit", amount: "$100,000", note: "Per occurrence limit for bodily injury by accident" },
  { label: "Per Disease Per Employee Limit", amount: "$100,000", note: "Per employee limit for occupational disease claims" },
  { label: "Disease Policy Aggregate Limit", amount: "$500,000", note: "Total policy limit for all disease claims" },
];

const faqItems = [
  {
    q: "What is the difference between workers comp Part A and Part B?",
    a: "Part A (workers compensation) provides no-fault statutory benefits to injured employees — medical care, lost wages, vocational rehabilitation, and death benefits as required by state law. Employees give up the right to sue in exchange for guaranteed no-fault benefits. Part B (employer liability) protects the employer against lawsuits filed by injured workers or their family members that fall outside the statutory workers comp system — such as third-party over actions, dual capacity suits, and loss of consortium claims by an injured worker's spouse.",
  },
  {
    q: "What is a third-party over action in employer liability?",
    a: "A third-party over action occurs when an injured employee sues a third party — such as an equipment manufacturer, property owner, or general contractor — for their injuries, and that third party then files a contribution or indemnity claim against the employer. Part B employer liability coverage responds to these third-party over claims even after the employee has already received workers comp Part A benefits. These cases are common in construction where multiple parties are present at job sites.",
  },
  {
    q: "What are standard employer liability coverage limits?",
    a: "Standard employer liability (Part B) limits are $100,000 per accident for bodily injury, $100,000 per disease per employee, and $500,000 per disease policy aggregate. Many businesses elect higher limits — $500,000/$500,000/$500,000 or $1,000,000/$1,000,000/$1,000,000 — particularly in industries with significant third-party exposure. Commercial umbrella or excess liability policies can also provide additional limits above the underlying employer liability policy to create a higher tower of protection.",
  },
  {
    q: "Does a ghost workers comp policy include employer liability?",
    a: "Yes — most ghost workers comp policies include the standard Part B employer liability coverage in the same policy form. Since ghost policies cover owner-operators with no employees, the employer liability portion primarily provides protection in misclassification scenarios: if a worker claimed as an independent contractor is later determined to be an employee by a court or agency and subsequently brings a civil lawsuit, Part B provides defense and indemnity coverage for the resulting employer liability claims.",
  },
  {
    q: "Can employer liability cover mental injury claims?",
    a: "Employer liability can cover mental injury claims that arise directly from a compensable physical injury — for example, post-traumatic stress disorder (PTSD) following a severe workplace accident is often covered as a consequential claim. Pure mental stress claims without an accompanying physical injury are typically excluded under most Part B forms. Coverage for mental injuries varies significantly by state law and policy language — consult with a coverage specialist to understand your specific policy's mental injury provisions.",
  },
];

export default function EmployerLiabilityPage() {
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
                Part B Coverage
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-extrabold text-[#1e2d3d] leading-tight mb-6"
              >
                Employer Liability Insurance{" "}
                <span className="text-[#0052cc]">Workers Comp Part B</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-8 leading-relaxed">
                Part A workers comp covers statutory employee benefits. Part B — employer liability —
                protects your business against lawsuits that fall outside the workers comp system:
                third-party over actions, loss of consortium claims, dual capacity suits, and more.
                Don't assume your WC policy fully protects you.
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
                src="/images/employer-liability.jpg"
                alt="Employer liability insurance — workers comp Part B coverage"
                width={600}
                height={450}
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0052cc]/10 rounded-full flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#0052cc]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1e2d3d]">Lawsuit Defense Included</p>
                  <p className="text-xs text-gray-500">Third-party over, dual capacity & more</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Part A vs Part B ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">
              Part A vs. Part B: Understanding Workers Comp
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
              A standard workers compensation policy contains two distinct coverage parts. Most employers
              focus exclusively on Part A — but Part B is equally essential to complete protection.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Part A */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border-2 border-gray-200 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  <Shield className="w-4 h-4" /> Part A — Workers Compensation
                </div>
                <h3 className="text-2xl font-extrabold text-[#1e2d3d] mb-4">Statutory Benefits</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Covers the no-fault, statutory benefits your state mandates for injured employees.
                  Employees exchange their right to sue for guaranteed coverage of:
                </p>
                <ul className="space-y-2 mb-6">
                  {["Medical expenses — all necessary treatment", "Lost wages — temporary & permanent disability", "Vocational rehabilitation & retraining", "Death benefits & funeral expenses", "Coverage for all eligible W-2 employees"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs text-green-800 font-medium">Limits set by state law — no elected limit required</p>
                </div>
              </div>
            </motion.div>

            {/* Part B */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border-2 border-[#0052cc]/30 bg-[#f8fafc] p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0052cc]/10 rounded-bl-full" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#0052cc]/10 text-[#0052cc] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  <Scale className="w-4 h-4" /> Part B — Employer Liability
                </div>
                <h3 className="text-2xl font-extrabold text-[#1e2d3d] mb-4">Lawsuit Protection</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Covers lawsuits brought against the employer for work-related injuries that fall
                  outside the exclusive remedy protection of workers comp:
                </p>
                <ul className="space-y-2 mb-6">
                  {["Third-party over actions (contribution claims)", "Loss of consortium — spouse & dependent claims", "Dual capacity suits (employer as product maker)", "Consequential bodily injury to family members", "Defense costs + indemnity for covered suits"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#0052cc] flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-[#0052cc]/10 rounded-xl p-4">
                  <p className="text-xs text-[#0052cc] font-medium">Limits elected — standard $100K/$100K/$500K; higher limits available</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── When Employer Liability Applies ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">
              When Employer Liability Part B Applies
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
              Part B coverage steps in for specific legal theories that allow injured workers or their families
              to pursue claims outside the workers comp exclusive remedy system.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6">
            {scenarios.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#0052cc]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#0052cc]" />
                </div>
                <h3 className="text-lg font-bold text-[#1e2d3d] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Ghost Employee Scenarios ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">
              Ghost Policy & Employer Liability: Key Scenarios
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
              Ghost policies include Part B coverage — here's how it applies in owner-operator
              and independent contractor contexts.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-3 gap-6">
            {ghostScenarios.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="p-6 rounded-2xl bg-[#f8fafc] border-2 border-[#0052cc]/15 hover:border-[#0052cc]/40 transition-colors">
                <div className="w-8 h-8 bg-[#0052cc] rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-[#1e2d3d] mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Coverage Limits ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">Standard Coverage Limits</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">Employer liability limits are stated in three parts — all three should be considered when selecting your coverage level.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {limits.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-8 border-2 border-[#0052cc]/20 text-center shadow-sm">
                <div className="text-4xl font-extrabold text-[#0052cc] mb-2">{item.amount}</div>
                <div className="text-[#1e2d3d] font-bold mb-2">{item.label}</div>
                <p className="text-gray-500 text-xs">{item.note}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-8 bg-[#0052cc]/5 border border-[#0052cc]/20 rounded-2xl p-6 max-w-4xl mx-auto text-center"
          >
            <p className="text-[#1e2d3d] font-semibold mb-2">Higher Limits Available</p>
            <p className="text-gray-600 text-sm">
              Most carriers offer optional limits of $500,000/$500,000/$500,000 or $1,000,000/$1,000,000/$1,000,000.
              Commercial umbrella policies can provide additional limits above the underlying employer liability tower.
              Call CCA at <a href="tel:844-967-5247" className="text-[#0052cc] font-semibold">844-967-5247</a> to
              discuss the right limit structure for your risk profile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-[#1e2d3d] mb-4">Frequently Asked Questions</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600">Common questions about employer liability and workers comp Part B coverage.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-[#f8fafc] rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
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
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Secure Complete Employer Liability Protection
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Don't let a third-party lawsuit or consortium claim catch you without Part B coverage.
              CCA structures complete workers comp programs — Part A and Part B — for businesses of all sizes.
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
