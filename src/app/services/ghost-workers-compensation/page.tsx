"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield, CheckCircle, ArrowRight, Phone, ChevronDown,
  Building2, Users, FileText, AlertTriangle, DollarSign,
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

const whoNeedsItems = [
  {
    icon: Building2,
    title: "Sole Proprietors",
    desc: "Owner-operators who run their business without W-2 employees and need a certificate of insurance to satisfy client or licensing requirements.",
  },
  {
    icon: Users,
    title: "Independent Contractors",
    desc: "Self-employed tradespeople — electricians, plumbers, roofers, painters — who must show proof of workers comp to be awarded contracts.",
  },
  {
    icon: FileText,
    title: "Single-Member LLCs",
    desc: "Business owners operating as an LLC with no employees on payroll who still must meet contractual insurance requirements.",
  },
  {
    icon: AlertTriangle,
    title: "Owner-Operators in High-Risk Trades",
    desc: "Construction and specialty trade contractors in industries where general contractors require subcontractor WC certificates before allowing access to a job site.",
  },
  {
    icon: DollarSign,
    title: "Real Estate Investors & Landlords",
    desc: "Investors who perform their own maintenance and repairs and need WC documentation for licensing or lender requirements.",
  },
  {
    icon: Shield,
    title: "Freelancers & Gig Workers",
    desc: "Professionals who work project-to-project and need a certificate of insurance as a prerequisite for platform approval or client onboarding.",
  },
];

const howSteps = [
  {
    num: "01",
    title: "Application & Classification",
    desc: "You apply for coverage under your specific trade classification code (class code). Class codes determine your rate and are set by NCCI or your state's rating bureau.",
  },
  {
    num: "02",
    title: "Premium Calculation",
    desc: "Because there is no payroll, the premium is set at the minimum premium for your class code and state — typically a flat annual amount with no audit variable.",
  },
  {
    num: "03",
    title: "Policy Issuance & Certificate",
    desc: "Your policy is bound and a certificate of insurance (COI) naming your client or general contractor as the certificate holder is issued — often same day.",
  },
  {
    num: "04",
    title: "Renewal & Reporting",
    desc: "At renewal, you confirm no employees have been added. If you hire W-2 employees at any point, you must notify your carrier immediately to add payroll to the policy.",
  },
];

const faqItems = [
  {
    q: "What is a ghost workers compensation policy?",
    a: "A ghost policy (also called a ghost employee policy) is a workers compensation insurance policy that covers a business owner or sole proprietor with zero employees or payroll. It satisfies state licensing requirements and client certificate of insurance (COI) demands without covering actual employees — because there are none. The term 'ghost' refers to the absence of employees on the policy, not any fraudulent activity.",
  },
  {
    q: "Who qualifies for a ghost workers comp policy?",
    a: "Ghost policies are designed for sole proprietors, owner-operators, and self-employed contractors who work alone without W-2 employees. Common applicants include independent electricians, plumbers, roofers, painters, landscapers, and other tradespeople who need proof of workers comp to win contracts or satisfy licensing boards. Single-member LLCs with no employees also commonly use ghost policies.",
  },
  {
    q: "Are ghost policies available in all states?",
    a: "No. Ghost policies are not available in monopolistic workers comp states — North Dakota, Ohio, Washington, and Wyoming — where all employers must purchase coverage through the state fund. Private carriers cannot issue workers comp policies for work performed in those states. In all other 46 competitive states, ghost policies are available through private carriers. Requirements, minimum premiums, and eligibility rules vary by state.",
  },
  {
    q: "How much does a ghost workers comp policy cost?",
    a: "Ghost policy premiums typically range from $800 to $2,500 per year depending on the state, classification code (class code), and carrier. Because there is no payroll to audit, the premium is flat and predictable — no year-end audit surprises. High-hazard class codes (roofing, structural steel) carry higher rates than low-hazard codes (clerical, consulting).",
  },
  {
    q: "Can I add employees to a ghost policy later?",
    a: "Yes. If your business grows and you hire W-2 employees, you must notify your carrier immediately. Adding employees changes the policy structure — premiums will be recalculated based on actual payroll and classification codes, and a year-end payroll audit will apply. Failure to report new employees can result in coverage gaps for injured workers and significant retroactive premium charges.",
  },
];

export default function GhostWorkersCompensationPage() {
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
                Ghost Policy Insurance
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-extrabold text-[#1e2d3d] leading-tight mb-6"
              >
                Ghost Workers{" "}
                <span className="text-[#0052cc]">Compensation Policy</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-8 leading-relaxed">
                A ghost workers compensation policy provides legitimate proof of coverage for sole proprietors
                and owner-operators with no employees. Satisfy licensing boards, general contractor COI
                requirements, and client demands — without paying for coverage you don't need.
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
                src="/images/ghost-employee.jpg"
                alt="Ghost workers compensation policy — sole proprietor contractor"
                width={600}
                height={450}
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1e2d3d]">Same-Day COI</p>
                  <p className="text-xs text-gray-500">Certificate issued at binding</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What Is a Ghost Policy ── */}
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
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-6">
                What Is a Ghost Workers Comp Policy?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                A <strong>ghost workers compensation policy</strong> — sometimes called a ghost employee
                policy or owner-only policy — is a legitimate, carrier-issued workers compensation
                insurance policy that lists the business owner as the insured but carries no employee
                payroll. The "ghost" refers to the absence of employees, not any misrepresentation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                These policies are designed specifically for sole proprietors, single-member LLCs, and
                owner-operators who operate without W-2 employees but must produce a certificate of
                insurance (COI) to satisfy clients, general contractors, licensing boards, or state
                regulatory agencies.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Because workers comp premiums are calculated on payroll, and ghost policies have zero
                payroll, the carrier charges the minimum premium for the applicable class code. Premiums
                are flat, predictable, and not subject to year-end payroll audits — a significant
                advantage for sole proprietors managing cash flow.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4">
              {[
                { label: "Satisfies Certificate of Insurance requirements", detail: "Name clients, GCs, or licensing boards as certificate holders" },
                { label: "No payroll audit at year-end", detail: "Flat minimum premium — no surprise bills after the policy period" },
                { label: "Covers owner injury on the job", detail: "If elected, the owner can be covered for on-the-job injuries" },
                { label: "Issued in all competitive states", detail: "Available in 46 states — not available in ND, OH, WA, WY" },
                { label: "Available for high-hazard trades", detail: "Construction, roofing, electrical, plumbing, landscaping and more" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#f8fafc] border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-[#0052cc] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1e2d3d] text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Who Needs a Ghost Policy ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">
              Who Needs a Ghost Policy?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ghost policies serve a broad range of self-employed professionals across industries
              where proof of workers comp is a prerequisite for doing business.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whoNeedsItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#0052cc]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#0052cc]" />
                </div>
                <h3 className="text-lg font-bold text-[#1e2d3d] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How Ghost Policies Work ── */}
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
              How Ghost Policies Work
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
              The process is straightforward — from application to certificate issuance, ghost policies are
              designed for speed and simplicity.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {howSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative p-6 rounded-2xl bg-[#f8fafc] border border-gray-100"
              >
                <div className="text-5xl font-extrabold text-[#0052cc]/10 mb-3">{step.num}</div>
                <h3 className="text-base font-bold text-[#1e2d3d] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── States & Requirements ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-6">
                States & Availability
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ghost workers compensation policies are available in <strong>46 competitive states</strong> where
                private insurance carriers are permitted to write workers comp coverage. Each state has its own
                minimum premium floors, class code rules, and eligibility criteria.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ghost policy pricing is driven primarily by the applicable NCCI class code (or state-bureau
                equivalent). A roofing contractor carries a substantially higher rate than a landscaper or
                clerical worker — the risk profile of the trade determines the minimum premium.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">Monopolistic State Exception</h3>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Ghost policies are <strong>not available</strong> in the four monopolistic workers comp
                      states: <strong>North Dakota, Ohio, Washington,</strong> and <strong>Wyoming</strong>.
                      In these states, all employers — including sole proprietors — must purchase coverage
                      directly from the state-operated fund. Private carriers are prohibited from issuing
                      workers comp policies for work performed within these states.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-4">
              <h3 className="text-xl font-bold text-[#1e2d3d] mb-4">Cost Factors at a Glance</h3>
              {[
                { factor: "State of Operation", detail: "Each state sets its own rate tables and minimum premiums." },
                { factor: "NCCI Class Code", detail: "Your trade classification determines the base rate per $100 of payroll." },
                { factor: "Carrier Underwriting", detail: "Carriers may apply credits or surcharges based on loss history." },
                { factor: "Policy Limits", detail: "Standard Part A limits are statutory; Part B employer liability limits are elected." },
                { factor: "Annual vs. Installment", detail: "Some carriers offer monthly payment options; annual pay often earns a discount." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <p className="font-semibold text-[#1e2d3d] text-sm">{item.factor}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.detail}</p>
                </div>
              ))}
              <div className="bg-[#0052cc] rounded-xl p-5 text-white">
                <p className="font-bold mb-1">Typical Annual Range</p>
                <p className="text-3xl font-extrabold mb-1">$800 – $2,500</p>
                <p className="text-blue-200 text-sm">Flat premium — no year-end audit surprises</p>
              </div>
            </motion.div>
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
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#1e2d3d] mb-4">
              Why Contractors Choose CCA
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
              Contractors Choice Agency is a specialty workers compensation broker focused exclusively
              on hard-to-place and niche WC risks — including ghost policies across all competitive states.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "Ghost Policy Specialists", desc: "We've placed thousands of ghost policies across dozens of trade classes and states. We know the carriers, the class codes, and the fastest paths to a bound policy." },
              { title: "Same-Day Binding Available", desc: "Most ghost policy applications can be bound and certified the same business day — so you never lose a contract over an insurance delay." },
              { title: "Multi-Carrier Access", desc: "We work with multiple admitted and surplus lines carriers, giving us the flexibility to find the right rate and terms for your specific trade and state." },
              { title: "COI Management", desc: "We handle certificate of insurance requests on your behalf — add certificate holders, update job-specific COIs, and manage renewals without hassle." },
              { title: "Audit-Free Premium", desc: "Ghost policies carry no year-end payroll audit. What you pay at inception is what you pay — period. No retroactive bills, no surprises." },
              { title: "Expert Compliance Guidance", desc: "State rules around ghost policies, owner exclusions, and sole proprietor coverage elections vary. Our specialists keep you compliant in every state you work." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-[#0052cc]/30 hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 bg-[#0052cc] rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-[#1e2d3d] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-[#1e2d3d] mb-4">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600">
              Everything you need to know about ghost workers compensation policies.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-3"
          >
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-[#1e2d3d] pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0052cc] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
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
              Get Your Ghost Policy Today
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
              Don't lose another contract over missing insurance. Our specialists will bind your ghost workers
              comp policy and deliver your certificate of insurance — often the same day you apply.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0052cc] px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:844-967-5247"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" /> 844-967-5247
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── JSON-LD ── */}
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
