"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield, Phone, ArrowRight, CheckCircle, AlertTriangle, FileText,
  Users, ClipboardList, Globe, Star, ChevronDown, TrendingUp, Lock, Search
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  {
    icon: Shield,
    title: "Ghost Workers Comp Policy",
    short: "The foundational ghost policy",
    description:
      "A ghost workers compensation policy—also called a ghost policy—provides proof of WC coverage for contractors and business owners who have no employees at the time of issuance, or whose workforce composition creates audit exposure.",
    features: [
      "Satisfies contract & licensing requirements",
      "Certificate of insurance issued immediately",
      "Protects against retroactive audit assessments",
      "Affordable annual premiums",
    ],
    href: "/services/ghost-workers-compensation",
    color: "from-[#0052cc]/10 to-[#1a6bff]/10",
    border: "border-[rgba(0,82,204,0.2)]",
  },
  {
    icon: Search,
    title: "Audit Protection Coverage",
    short: "Defend against retroactive audits",
    description:
      "Workers comp carriers conduct payroll audits after policy expiration. If your actual payroll—or misclassified employees—reveal underpayment, you face significant premium bills. Audit protection coverage shields you from these retroactive assessments.",
    features: [
      "Covers audit-generated premium deficits",
      "Defense costs for audit disputes",
      "Prior period payroll reconciliation support",
      "Carrier dispute representation",
    ],
    href: "/services/audit-protection",
    color: "from-[#0052cc]/10 to-[#1a6bff]/10",
    border: "border-[rgba(0,82,204,0.2)]",
  },
  {
    icon: AlertTriangle,
    title: "Employer Liability Coverage",
    short: "When employees claim on-the-job injuries",
    description:
      "Employer's liability protects you when an employee suffers a work-related injury and sues your business directly—outside the standard workers comp system. Ghost employee situations make this exposure even more complex.",
    features: [
      "Defense for employee negligence claims",
      "Third-party action lawsuits coverage",
      "Loss of consortium claims",
      "Consequential bodily injury defense",
    ],
    href: "/services/employer-liability",
    color: "from-[#0052cc]/10 to-[#1a6bff]/10",
    border: "border-[rgba(0,82,204,0.2)]",
  },
  {
    icon: FileText,
    title: "Payroll Fraud & Misclassification",
    short: "Protect against ghost payroll liability",
    description:
      "When employees misrepresent their job class, go unreported, or are misclassified as 1099 contractors, your WC exposure multiplies. We provide coverage specifically designed for these complex payroll scenarios.",
    features: [
      "Ghost employee claim defense",
      "Misclassification audit coverage",
      "1099 re-classification exposure",
      "Unreported payroll protection",
    ],
    href: "/services/payroll-fraud",
    color: "from-[#0052cc]/10 to-[#1a6bff]/10",
    border: "border-[rgba(0,82,204,0.2)]",
  },
  {
    icon: Users,
    title: "Independent Contractor Classification",
    short: "1099 misclassification defense",
    description:
      "Misclassifying employees as independent contractors is one of the leading causes of workers comp audits and legal exposure. Our specialized coverage addresses exactly this scenario before state labor departments get involved.",
    features: [
      "NLRB & DOL audit defense",
      "Retroactive classification penalties",
      "Settlement cost coverage",
      "Multi-worker class action defense",
    ],
    href: "/services/independent-contractor",
    color: "from-[#0052cc]/10 to-[#1a6bff]/10",
    border: "border-[rgba(0,82,204,0.2)]",
  },
  {
    icon: Globe,
    title: "Multi-State Coverage",
    short: "Operations in multiple states",
    description:
      "Ghost worker issues don't respect state borders. If you deploy workers across state lines or hire across multiple jurisdictions, your WC exposure multiplies. We write coverage in all 50 states from a single policy.",
    features: [
      "All 50 states on one policy",
      "Interstate worker protections",
      "State monopolistic fund compliance",
      "USL&H coverage available",
    ],
    href: "/services/multi-state-coverage",
    color: "from-[#0052cc]/10 to-[#1a6bff]/10",
    border: "border-[rgba(0,82,204,0.2)]",
  },
];

const stats = [
  { value: "50+", label: "States Licensed", icon: Globe },
  { value: "20+", label: "Years Experience", icon: TrendingUp },
  { value: "A+", label: "Rated Carriers", icon: Star },
  { value: "24h", label: "Quote Turnaround", icon: ClipboardList },
];

const faqs = [
  {
    q: "What exactly is a ghost workers compensation policy?",
    a: "A ghost workers compensation policy (ghost policy) is a workers comp policy issued to an employer with zero employees at the time of issuance. It satisfies state licensing requirements and contract certificate demands. Premiums are based on the minimum premium a carrier will accept, since there is no payroll to rate on. It does NOT cover injuries to employees if you later hire workers—you need a standard WC policy at that point.",
  },
  {
    q: "Who needs ghost workers comp insurance?",
    a: "Ghost workers comp policies are typically needed by: sole proprietors who must show proof of WC to win contracts; employers whose employees misrepresent their job classification; companies that use mostly 1099 contractors but need WC proof; and businesses facing a workers comp audit where employee classification is questioned.",
  },
  {
    q: "How does a workers comp audit work?",
    a: "After your WC policy expires, the insurance carrier conducts a payroll audit to verify the premium you paid was accurate. If your actual payroll—job classifications, hours, or headcount—was higher than estimated, you'll receive a bill for the additional premium. Ghost employee situations, where workers were not reported, create significant audit exposure.",
  },
  {
    q: "What is employer liability and why is it different from workers comp?",
    a: "Workers compensation covers an employee's medical costs and lost wages after a work injury without requiring proof of employer fault. Employer liability (Part B of most WC policies) covers your legal costs and damages when an employee sues you directly for a work injury—claiming your negligence made their injury worse, or that you failed to provide a safe workplace.",
  },
  {
    q: "How much does a ghost workers comp policy cost?",
    a: "Ghost policy premiums typically range from $800 to $2,500 annually depending on your state, business classification, and carrier. Because ghost policies are based on minimum premium (no payroll to rate), they're much cheaper than standard WC coverage. Contact us for an exact quote for your state and situation.",
  },
  {
    q: "Do you cover payroll misclassification from prior years?",
    a: "This depends on the nature of the situation. Prior audit deficits may be coverable under certain employer liability products. We recommend speaking with one of our specialists—the answer depends on which state, what audit is pending, and whether coverage was in force at the relevant policy period.",
  },
];

const testimonials = [
  {
    name: "Marcus T.",
    role: "General Contractor, Texas",
    text: "Our workers comp audit came back with three employees who had misrepresented their job class. The Contractors Choice team helped us get employer liability coverage retroactively and defended us through the audit process. Saved us over $40,000 in penalties.",
  },
  {
    name: "Sandra L.",
    role: "Staffing Agency Owner, Florida",
    text: "We use a lot of 1099 workers and needed proof of WC to land contracts with larger clients. The ghost policy was fast, affordable, and our COI was issued same day. Highly recommend.",
  },
  {
    name: "James R.",
    role: "Electrical Contractor, Ohio",
    text: "Ghost employees are a real risk in construction. CCA was the only agency that understood our situation—unreported payroll from a subcontractor—and found us a carrier willing to write the policy.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient pt-20">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#1a6bff]/10 rounded-full blur-[128px]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#0052cc]/10 rounded-full blur-[128px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,82,204,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,82,204,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,82,204,0.08)] border border-[rgba(0,82,204,0.2)] mb-8"
              >
                <Shield className="w-4 h-4 text-[#0052cc]" />
                <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider">
                  Specialized Ghost Policy Workers Comp
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1e2d3d] leading-[1.05] mb-6">
                Ghost Workers{" "}
                <span className="blue-gradient-text">Compensation</span>{" "}
                Insurance
              </h1>

              <p className="text-lg md:text-xl text-[#475569] leading-relaxed mb-8 max-w-xl">
                When your employees misclassify themselves or go unreported, your business faces workers comp
                audit exposure, employer liability risk, and retroactive premium bills.{" "}
                <strong className="text-[#1e2d3d]">We specialize in exactly this situation.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/quote"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0052cc] to-[#1a6bff] text-white font-bold rounded-xl shadow-xl shadow-[rgba(0,82,204,0.35)] hover:shadow-[rgba(0,82,204,0.5)] transition-all text-lg"
                  >
                    Get a Free Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <a
                    href="tel:+18449675247"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0052cc] font-bold rounded-xl border-2 border-[rgba(0,82,204,0.3)] hover:border-[rgba(0,82,204,0.6)] transition-all text-lg shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    844-967-5247
                  </a>
                </motion.div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {["Licensed All 50 States", "20+ Years Experience", "A+ Rated Carriers", "Former Contractor Expertise"].map(
                  (badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-[rgba(0,82,204,0.1)]"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#0052cc]" />
                      <span className="text-xs font-semibold text-[#1e2d3d]">{badge}</span>
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* Right — floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:block hidden"
            >
              <div className="relative h-[520px]">
                {/* Main card */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-0 left-10 right-0 bg-white rounded-3xl shadow-2xl shadow-[rgba(0,82,204,0.15)] border border-[rgba(0,82,204,0.12)] p-8 z-20"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0052cc] to-[#1a6bff] rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-black text-[#1e2d3d] text-base">Ghost Policy Active</p>
                      <p className="text-xs text-[#64748b]">Effective immediately</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Coverage Type", value: "Ghost Workers Comp" },
                      { label: "Audit Protection", value: "Included" },
                      { label: "Employer Liability", value: "Part A & B" },
                      { label: "States Covered", value: "All 50" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center py-2 border-b border-[rgba(0,82,204,0.07)]">
                        <span className="text-xs text-[#64748b] font-medium">{row.label}</span>
                        <span className="text-sm font-bold text-[#1e2d3d]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 p-3 bg-[rgba(0,82,204,0.06)] rounded-xl">
                    <p className="text-xs text-center font-bold text-[#0052cc]">Certificate of Insurance Available</p>
                  </div>
                </motion.div>

                {/* Alert card */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-0 left-0 w-72 bg-white rounded-2xl shadow-xl shadow-[rgba(0,82,204,0.1)] border border-[rgba(0,82,204,0.1)] p-5 z-10"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1e2d3d] mb-1">Audit Notice Received?</p>
                      <p className="text-xs text-[#64748b]">
                        We help employers respond to workers comp audit inquiries and minimize retroactive premiums.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-[#1e2d3d] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Icon className="w-6 h-6 text-[#1a6bff] mx-auto mb-2" />
                  <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT IS GHOST POLICY ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,82,204,0.06)] border border-[rgba(0,82,204,0.15)] mb-6">
                <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider">Understanding Ghost Policies</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1e2d3d] mb-6 leading-tight">
                What Is a{" "}
                <span className="blue-gradient-text">Ghost Workers Comp</span>{" "}
                Policy?
              </h2>
              <p className="text-lg text-[#475569] mb-5 leading-relaxed">
                A ghost workers compensation policy—sometimes called a ghost WC policy or shell policy—is a
                legitimate, carrier-issued workers compensation insurance policy where the employer is listed but
                no employees are covered at issuance.
              </p>
              <p className="text-base text-[#475569] mb-5 leading-relaxed">
                The term &ldquo;ghost&rdquo; refers to the absence of covered employees, NOT to any fraudulent practice.
                Ghost policies are commonly used by sole proprietors, LLC owners, and small employers who must
                show proof of WC insurance to satisfy contract requirements or state licensing rules.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Legally issued by admitted carriers in all 50 states",
                  "Satisfies licensing board and GC contract requirements",
                  "COI available immediately upon policy issuance",
                  "Audit exposure must still be managed—ghost policies don't eliminate it",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0052cc] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#475569]">{point}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/services/ghost-workers-compensation"
                className="inline-flex items-center gap-2 text-[#0052cc] font-bold hover:gap-3 transition-all"
              >
                Learn more about ghost policies
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="/images/ghost-employee.jpg"
                  alt="Ghost workers compensation policy documentation review"
                  width={640}
                  height={480}
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d3d]/50 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl shadow-[rgba(0,82,204,0.15)] p-5 border border-[rgba(0,82,204,0.1)]"
              >
                <p className="text-xs font-bold text-[#64748b] uppercase tracking-wide mb-1">Audit Risk</p>
                <p className="text-2xl font-black text-[#0052cc]">$40K+</p>
                <p className="text-xs text-[#64748b]">Avg. retroactive premium bill</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,82,204,0.06)] border border-[rgba(0,82,204,0.15)] mb-6">
              <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider">Coverage Options</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-[#1e2d3d] mb-5">
              Ghost Workers Comp{" "}
              <span className="blue-gradient-text">Coverage Types</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-[#475569] max-w-2xl mx-auto">
              Every ghost employee situation is different. We offer specialized coverage for the full spectrum of
              employer liability and audit protection needs.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-hover"
                >
                  <Link
                    href={svc.href}
                    className={`block h-full bg-white rounded-3xl border ${svc.border} p-8 shadow-sm hover:border-[rgba(0,82,204,0.4)] transition-all`}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} border ${svc.border} flex items-center justify-center mb-5`}>
                      <Icon className="w-7 h-7 text-[#0052cc]" />
                    </div>
                    <h3 className="text-xl font-black text-[#1e2d3d] mb-2">{svc.title}</h3>
                    <p className="text-sm font-semibold text-[#0052cc] mb-4">{svc.short}</p>
                    <p className="text-sm text-[#475569] leading-relaxed mb-5">{svc.description}</p>
                    <ul className="space-y-2 mb-6">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[#475569]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0052cc] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-[#0052cc]">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CCA ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/images/about-team.jpg"
                alt="Contractors Choice Agency team of insurance specialists"
                width={640}
                height={500}
                className="w-full h-[440px] object-cover rounded-3xl shadow-2xl shadow-[rgba(0,82,204,0.1)]"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-5 border border-[rgba(0,82,204,0.12)]"
              >
                <div className="flex items-center gap-2 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-black text-[#1e2d3d]">5.0 Average Rating</p>
                <p className="text-xs text-[#64748b]">From 400+ employer clients</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,82,204,0.06)] border border-[rgba(0,82,204,0.15)] mb-6">
                <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider">Why Contractors Choice Agency</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1e2d3d] mb-6 leading-tight">
                Former Contractors Who{" "}
                <span className="blue-gradient-text">Know the Risks</span>
              </h2>
              <p className="text-lg text-[#475569] mb-6 leading-relaxed">
                Contractors Choice Agency was founded by former contractors and construction business owners who
                experienced workers comp audits, ghost employee situations, and employer liability claims firsthand.
              </p>
              <div className="space-y-5 mb-8">
                {[
                  {
                    icon: Shield,
                    title: "Niche Expertise",
                    desc: "We exclusively serve employers in trades and contracting. Ghost WC is our core competency, not a footnote.",
                  },
                  {
                    icon: Lock,
                    title: "Carrier Access",
                    desc: "Access to A-rated carriers who write ghost policies in difficult states—not just the easy markets.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Audit Defense Support",
                    desc: "We don't just sell policies—we walk with you through audit disputes, premium reconciliations, and carrier negotiations.",
                  },
                  {
                    icon: Globe,
                    title: "All 50 States",
                    desc: "Multi-state employers get one broker who handles everything. No referrals to state-specific agents.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[rgba(0,82,204,0.08)] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#0052cc]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1e2d3d] mb-1">{item.title}</p>
                        <p className="text-sm text-[#475569]">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0052cc] to-[#1a6bff] text-white font-bold rounded-xl shadow-lg shadow-[rgba(0,82,204,0.3)] hover:shadow-[rgba(0,82,204,0.5)] transition-all"
              >
                About Contractors Choice Agency
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,82,204,0.06)] border border-[rgba(0,82,204,0.15)] mb-6">
              <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider">The Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1e2d3d] mb-5">
              How to Get Your{" "}
              <span className="blue-gradient-text">Ghost WC Policy</span>
            </h2>
            <p className="text-lg text-[#475569] max-w-xl mx-auto">
              From initial contact to certificate of insurance—typically within 24 hours.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Tell Us Your Situation", desc: "Complete our short quote form or call us. Describe your ghost employee situation, audit status, and coverage needs." },
              { step: "02", title: "We Review Your Risk", desc: "Our specialists assess your exposure: payroll classification, state requirements, audit timeline, and prior coverage." },
              { step: "03", title: "Get Custom Quotes", desc: "We shop A-rated carriers who specialize in ghost policies and present you with options within 24 hours." },
              { step: "04", title: "Bind & Get Your COI", desc: "Once you choose a policy, we bind coverage and issue your certificate of insurance typically the same business day." },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-[rgba(0,82,204,0.1)] shadow-sm relative"
              >
                <div className="text-5xl font-black text-[rgba(0,82,204,0.08)] absolute top-4 right-5 leading-none">
                  {step.step}
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#0052cc] to-[#1a6bff] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-[rgba(0,82,204,0.3)]">
                  <span className="text-white text-sm font-black">{step.step}</span>
                </div>
                <h3 className="text-lg font-black text-[#1e2d3d] mb-3">{step.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,82,204,0.06)] border border-[rgba(0,82,204,0.15)] mb-6">
              <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider">Client Results</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1e2d3d]">
              Employers We&apos;ve{" "}
              <span className="blue-gradient-text">Protected</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-hover bg-white rounded-3xl p-8 border border-[rgba(0,82,204,0.12)] shadow-md"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[#475569] text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-black text-[#1e2d3d] text-sm">{t.name}</p>
                  <p className="text-xs text-[#64748b]">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,82,204,0.06)] border border-[rgba(0,82,204,0.15)] mb-6">
              <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider">Common Questions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1e2d3d]">
              Ghost WC Insurance{" "}
              <span className="blue-gradient-text">FAQs</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-[rgba(0,82,204,0.1)] overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-[rgba(0,82,204,0.03)] transition-colors"
                >
                  <p className="font-bold text-[#1e2d3d] text-base">{faq.q}</p>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0052cc] shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="px-6 pb-6"
                  >
                    <p className="text-sm text-[#475569] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#0052cc] via-[#1a6bff] to-[#0052cc] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
          >
            Don&apos;t Wait for an Audit Notice.{" "}
            <br />
            Get Protected Today.
          </motion.h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Whether you need a ghost policy, audit protection, or employer liability coverage—our specialists
            will find the right solution for your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/quote"
                className="flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#0052cc] font-black rounded-xl text-lg shadow-2xl hover:-translate-y-1 transition-all"
              >
                Get My Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="tel:+18449675247"
                className="flex items-center justify-center gap-2 px-10 py-4 bg-transparent text-white font-black rounded-xl text-lg border-2 border-white/50 hover:border-white transition-all"
              >
                <Phone className="w-5 h-5" />
                Call 844-967-5247
              </a>
            </motion.div>
          </div>
          <p className="text-blue-200 text-sm mt-8">
            Mon–Fri 8am–5pm MST · Licensed in all 50 states · No obligation quote
          </p>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "InsuranceAgency",
            name: "Ghost Workers Compensation Insurance by Contractors Choice Agency",
            url: "https://ghostworkerscompensationinsurance.com",
            telephone: "+18449675247",
            email: "info@contractorschoiceagency.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Phoenix",
              addressRegion: "AZ",
              addressCountry: "US",
            },
            areaServed: { "@type": "Country", name: "United States" },
            serviceType: [
              "Ghost Workers Compensation Insurance",
              "Audit Protection Coverage",
              "Employer Liability Insurance",
              "Payroll Fraud Coverage",
              "Independent Contractor Misclassification Insurance",
            ],
            description:
              "Specialized ghost policy workers compensation insurance for employers facing audit risk, ghost employee liability, and payroll misclassification.",
          }),
        }}
      />

      <Footer />
    </div>
  );
}
