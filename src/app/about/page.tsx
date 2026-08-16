"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  MapPin,
  Phone,
  Users,
  CheckCircle,
  Star,
  FileText,
  Globe,
  Lock,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const credentials = [
  {
    icon: Globe,
    title: "Licensed in All 50 States",
    description:
      "Our agents hold active surplus and admitted lines licenses across every U.S. jurisdiction, so we can place coverage wherever your contracts take you.",
  },
  {
    icon: Shield,
    title: "Ghost Policy Specialists",
    description:
      "We've structured thousands of ghost workers comp policies for contractors navigating certificate requirements, payroll audits, and misclassification risk.",
  },
  {
    icon: Award,
    title: "20+ Years of Experience",
    description:
      "Two decades working exclusively with contractors and small business owners gives our team practical insight that generalist agencies simply don't have.",
  },
  {
    icon: Lock,
    title: "A-Rated Admitted Carriers",
    description:
      "We place coverage exclusively with financially stable, A-rated admitted carriers — never surplus or non-admitted markets for standard ghost WC needs.",
  },
  {
    icon: FileText,
    title: "Audit Defense Expertise",
    description:
      "When a WC audit surfaces unexpected liability, our specialists guide you through documentation, reclassification arguments, and resolution strategies.",
  },
  {
    icon: TrendingUp,
    title: "Ongoing Policy Management",
    description:
      "We don't just bind coverage and disappear. Our team monitors policy terms, renewal windows, and audit cycles on your behalf year-round.",
  },
];

const whySpecialists = [
  {
    icon: Briefcase,
    heading: "We Built in the Field First",
    body: "Our founders spent years as general contractors before pivoting to insurance. That hands-on background means we understand exactly what certificate holders demand — and how to satisfy those demands without overpaying.",
  },
  {
    icon: Users,
    heading: "Deep Knowledge of Contractor Classifications",
    body: "Ghost WC policies hinge on payroll classification codes. A misclassified code can void a certificate or trigger a five-figure audit bill. We get the codes right the first time.",
  },
  {
    icon: Star,
    heading: "Relationships With the Right Carriers",
    body: "Not every carrier writes ghost policies cleanly. We've built long-standing relationships with A-rated admitted carriers that understand contractor certificate requirements and write clean, auditable ghost policies.",
  },
  {
    icon: CheckCircle,
    heading: "No Employee? No Problem.",
    body: "Most general agencies stumble when a business has zero reported employees. Ghost WC is our core product — we underwrite it efficiently and issue certificates quickly.",
  },
];

const carriers = [
  "A-Rated Admitted Carriers",
  "Financially Stable Underwriters",
  "Contractor-Experienced Markets",
  "Fast Certificate Issuance",
  "Clean Audit Track Records",
  "Multi-State Writing Capability",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#2a211c]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-gradient-to-br from-[#9a3412] via-[#8a3410] to-[#7c2d12] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/20 blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-amber-200" />
              <span className="text-amber-200 text-sm font-medium tracking-wide uppercase">
                Contractors Choice Agency
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Former Contractors.
              <br />
              <span className="text-amber-200">Insurance Specialists.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl text-amber-100 leading-relaxed mb-8"
            >
              Contractors Choice Agency was built by people who worked in the trades
              before they worked in insurance. We understand certificate requirements,
              payroll audits, and the gap that ghost workers comp policies are designed
              to fill — because we lived it.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-white text-[#9a3412] px-8 py-4 rounded-xl font-bold text-sm hover:bg-amber-50 transition-colors shadow-lg"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:8449675247"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold text-sm hover:border-white hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                844-967-5247
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust badges row */}
      <section className="bg-[#fdf6ec] border-b border-[rgba(154,52,18,0.12)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-semibold text-[#2a211c]">
            {[
              { icon: Globe, label: "Licensed All 50 States" },
              { icon: Award, label: "20+ Years Experience" },
              { icon: Shield, label: "Ghost Policy Specialists" },
              { icon: Star, label: "A-Rated Carriers Only" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-[#9a3412]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1 bg-[#9a3412] rounded-full" />
                <span className="text-[#9a3412] text-sm font-semibold uppercase tracking-wide">
                  Our Story
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-extrabold text-[#2a211c] mb-6"
              >
                Built on a Problem We Experienced Firsthand
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-[#57493f] leading-relaxed">
                <p>
                  The founders of Contractors Choice Agency didn't start in insurance —
                  they started in the trades. General contracting, subcontracting,
                  residential construction, and commercial build-out were the daily
                  reality before insurance became the focus.
                </p>
                <p>
                  The frustration was the same one every contractor knows: you're a
                  sole operator, you have no employees on payroll right now, but the
                  general contractor won't let you on site without a workers comp
                  certificate. Standard WC carriers won't write a policy with zero
                  employees. You're stuck.
                </p>
                <p>
                  Ghost workers compensation policies solve that problem — but finding
                  an agency that actually understood them, placed them quickly, and
                  didn't overcharge was nearly impossible. So we became that agency.
                </p>
                <p>
                  Over 20 years later, Contractors Choice Agency has helped thousands
                  of contractors, sole proprietors, and small business owners secure
                  the coverage they need — cleanly, affordably, and with certificates
                  that hold up to scrutiny.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/images/about-team.jpg"
                  alt="Contractors Choice Agency team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9a3412]/30 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#9a3412] text-white rounded-xl px-6 py-4 shadow-xl">
                <div className="text-3xl font-extrabold">20+</div>
                <div className="text-sm text-amber-200 font-medium">Years in business</div>
              </div>
              <div className="absolute -top-5 -right-5 bg-white border border-[rgba(154,52,18,0.15)] rounded-xl px-6 py-4 shadow-xl">
                <div className="text-3xl font-extrabold text-[#9a3412]">50</div>
                <div className="text-sm text-[#57493f] font-medium">States licensed</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-[#fdfaf5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#9a3412] rounded-full" />
              <span className="text-[#9a3412] text-sm font-semibold uppercase tracking-wide">
                Credentials & Trust
              </span>
              <div className="w-8 h-1 bg-[#9a3412] rounded-full" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-[#2a211c] mb-4"
            >
              Why Contractors Trust Us
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-[#57493f] max-w-2xl mx-auto"
            >
              Our credentials aren't just bullet points — they're the result of two
              decades of specialization in a product most agencies don't understand.
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-[rgba(154,52,18,0.1)] hover:border-[rgba(154,52,18,0.3)] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-[#fdf6ec] rounded-xl flex items-center justify-center mb-4">
                  <cred.icon className="w-6 h-6 text-[#9a3412]" />
                </div>
                <h3 className="text-lg font-bold text-[#2a211c] mb-2">{cred.title}</h3>
                <p className="text-sm text-[#57493f] leading-relaxed">{cred.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ghost WC Specialists */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#9a3412] rounded-full" />
              <span className="text-[#9a3412] text-sm font-semibold uppercase tracking-wide">
                Specialization Matters
              </span>
              <div className="w-8 h-1 bg-[#9a3412] rounded-full" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-[#2a211c] mb-4"
            >
              Why Work With a Ghost WC Specialist?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-[#57493f] max-w-2xl mx-auto"
            >
              Ghost workers comp is a niche product. Getting it wrong has real
              consequences — voided certificates, failed audits, unexpected liability.
              Specialization isn't optional.
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-8">
            {whySpecialists.map((item, i) => (
              <motion.div
                key={item.heading}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#9a3412] rounded-xl flex items-center justify-center shadow-md">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2a211c] mb-2">{item.heading}</h3>
                  <p className="text-[#57493f] leading-relaxed text-sm">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carriers We Work With */}
      <section className="py-20 bg-gradient-to-br from-[#9a3412] to-[#7c2d12]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-amber-300 rounded-full" />
              <span className="text-amber-200 text-sm font-semibold uppercase tracking-wide">
                Our Carriers
              </span>
              <div className="w-8 h-1 bg-amber-300 rounded-full" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
            >
              Carriers We Work With
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-amber-100 text-lg max-w-2xl mx-auto"
            >
              We maintain relationships with A-rated admitted carriers that specialize
              in contractor and ghost WC products — the markets that understand your
              business and write clean, certificate-ready policies.
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {carriers.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-4"
              >
                <CheckCircle className="w-5 h-5 text-amber-300 flex-shrink-0" />
                <span className="text-white font-medium text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-amber-200 text-sm mt-8 max-w-xl mx-auto"
          >
            We don't publish specific carrier names publicly. Contact us for a quote
            and we'll match you with the right market for your state and situation.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#9a3412] rounded-full" />
              <span className="text-[#9a3412] text-sm font-semibold uppercase tracking-wide">
                Ready to Get Started?
              </span>
              <div className="w-8 h-1 bg-[#9a3412] rounded-full" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-extrabold text-[#2a211c] mb-4"
            >
              Talk to a Ghost WC Specialist Today
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-[#57493f] mb-8 max-w-xl mx-auto"
            >
              Whether you need a ghost policy for an upcoming contract or you're
              facing a WC audit, our specialists can help. Free consultation, no
              pressure, straight answers.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-[#9a3412] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#8a3410] transition-colors shadow-lg shadow-[#9a3412]/20"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-[#9a3412] text-[#9a3412] px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#fdf6ec] transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="tel:8449675247"
                className="inline-flex items-center gap-2 bg-[#fdfaf5] border border-[rgba(154,52,18,0.2)] text-[#2a211c] px-8 py-4 rounded-xl font-bold text-sm hover:border-[#9a3412] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#9a3412]" />
                844-967-5247
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
