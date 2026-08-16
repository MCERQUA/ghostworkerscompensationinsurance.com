"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  AlertCircle,
  Phone,
  Lock,
  Clock,
  Send,
  Star,
  FileText,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const COVERAGE_OPTIONS = [
  "Ghost Workers Comp Policy",
  "Audit Protection",
  "Employer Liability",
  "Payroll Fraud Coverage",
  "Independent Contractor Coverage",
  "Multi-State Coverage",
  "Not Sure / Need Advice",
];

const PAYROLL_RANGES = [
  "Under $50K",
  "$50K-$200K",
  "$200K-$500K",
  "$500K-$1M",
  "Over $1M",
];

const CURRENT_SITUATION_OPTIONS = [
  "Need ghost policy for contract",
  "Facing WC audit",
  "Employee misclassification concern",
  "Unreported payroll situation",
  "Just exploring coverage options",
];

interface FormData {
  "bot-field": string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  state: string;
  coverageNeeded: string;
  numberOfEmployees: string;
  annualPayroll: string;
  currentSituation: string;
  message: string;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[rgba(154,52,18,0.2)] bg-white/80 text-[#2a211c] placeholder-[#a89a8c] focus:outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/20 transition-all text-sm";

const labelClass = "block text-sm font-semibold text-[#2a211c] mb-1.5";

const trustItems = [
  {
    icon: Globe,
    title: "Licensed All 50 States",
    desc: "We place coverage nationwide.",
  },
  {
    icon: Shield,
    title: "Ghost Policy Experts",
    desc: "20+ years of specialization.",
  },
  {
    icon: Star,
    title: "A-Rated Carriers",
    desc: "Admitted, financially stable markets.",
  },
  {
    icon: Clock,
    title: "Same-Day Response",
    desc: "We respond within hours.",
  },
  {
    icon: Lock,
    title: "No Obligation",
    desc: "Free quotes, no pressure.",
  },
  {
    icon: FileText,
    title: "Fast Certificates",
    desc: "Quick turnaround on COIs.",
  },
];

export default function QuotePage() {
  const [formData, setFormData] = useState<FormData>({
    "bot-field": "",
    name: "",
    businessName: "",
    email: "",
    phone: "",
    state: "",
    coverageNeeded: "",
    numberOfEmployees: "",
    annualPayroll: "",
    currentSituation: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData["bot-field"]) return;
    setSubmitting(true);
    setError("");
    try {
      await fetch(
        "https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=ghostworkerscompensationinsurance.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            form_name: "quote",
            source: "ghostworkerscompensationinsurance.com",
            ...formData,
          }),
        }
      );
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at 844-967-5247.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#2a211c]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-[#9a3412] via-[#8a3410] to-[#7c2d12] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-amber-200" />
              <span className="text-amber-200 text-sm font-medium tracking-wide uppercase">
                Free Ghost WC Quote
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            >
              Get Your Ghost Policy Quote
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-amber-100 text-lg max-w-xl mx-auto"
            >
              Tell us about your situation and we'll match you with the right
              coverage from an A-rated admitted carrier. No obligation, no pressure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#fdf6ec] border border-[rgba(154,52,18,0.2)] rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 bg-[#9a3412] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#2a211c] mb-3">
                    Quote Request Received!
                  </h2>
                  <p className="text-[#57493f] max-w-md mx-auto mb-6">
                    Thank you! A ghost WC specialist from Contractors Choice Agency
                    will review your request and contact you within one business day —
                    usually much sooner. For urgent needs, call us directly.
                  </p>
                  <a
                    href="tel:8449675247"
                    className="inline-flex items-center gap-2 bg-[#9a3412] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#8a3410] transition-colors shadow-lg"
                  >
                    <Phone className="w-4 h-4" />
                    844-967-5247
                  </a>
                </motion.div>
              ) : (
                <motion.div initial="hidden" animate="visible" variants={stagger}>
                  <motion.div variants={fadeUp} className="mb-6">
                    <h2 className="text-2xl font-extrabold text-[#2a211c] mb-2">
                      Request a Free Quote
                    </h2>
                    <p className="text-[#57493f] text-sm">
                      Complete the form below. The more detail you provide, the faster
                      we can build an accurate quote for your situation.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <form
                      data-netlify="true"
                      name="quote"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <input type="hidden" name="form-name" value="quote" />
                      {/* Honeypot */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          name="bot-field"
                          value={formData["bot-field"]}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {/* Personal info */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className={labelClass}>
                            Your Name <span className="text-[#9a3412]">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Jane Smith"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="businessName" className={labelClass}>
                            Business Name
                          </label>
                          <input
                            id="businessName"
                            name="businessName"
                            type="text"
                            placeholder="Smith Contracting LLC"
                            value={formData.businessName}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="email" className={labelClass}>
                            Email Address <span className="text-[#9a3412]">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="jane@smithcontracting.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className={labelClass}>
                            Phone Number <span className="text-[#9a3412]">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="(555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="state" className={labelClass}>
                          State of Coverage <span className="text-[#9a3412]">*</span>
                        </label>
                        <select
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select your state...</option>
                          {US_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {/* Coverage details */}
                      <div className="pt-2 pb-1">
                        <div className="border-t border-[rgba(154,52,18,0.1)]" />
                        <p className="text-xs font-bold text-[#9a3412] uppercase tracking-wider mt-4 mb-1">
                          Coverage Details
                        </p>
                      </div>

                      <div>
                        <label htmlFor="coverageNeeded" className={labelClass}>
                          Coverage Needed <span className="text-[#9a3412]">*</span>
                        </label>
                        <select
                          id="coverageNeeded"
                          name="coverageNeeded"
                          required
                          value={formData.coverageNeeded}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select coverage type...</option>
                          {COVERAGE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="numberOfEmployees" className={labelClass}>
                            Number of Employees
                          </label>
                          <input
                            id="numberOfEmployees"
                            name="numberOfEmployees"
                            type="text"
                            placeholder="0 (sole operator)"
                            value={formData.numberOfEmployees}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="annualPayroll" className={labelClass}>
                            Annual Payroll (Estimated)
                          </label>
                          <select
                            id="annualPayroll"
                            name="annualPayroll"
                            value={formData.annualPayroll}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            <option value="">Select range...</option>
                            {PAYROLL_RANGES.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="currentSituation" className={labelClass}>
                          Your Current Situation
                        </label>
                        <select
                          id="currentSituation"
                          name="currentSituation"
                          value={formData.currentSituation}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select what applies best...</option>
                          {CURRENT_SITUATION_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass}>
                          Additional Details
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Any additional context about your situation, timeline, or specific requirements..."
                          value={formData.message}
                          onChange={handleChange}
                          className={inputClass + " resize-none"}
                        />
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#9a3412] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#8a3410] active:bg-[#7c2d12] transition-colors shadow-lg shadow-[#9a3412]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Request My Free Quote
                          </>
                        )}
                      </button>

                      <p className="text-xs text-[#a89a8c] text-center">
                        By submitting this form you consent to be contacted by
                        Contractors Choice Agency regarding your insurance inquiry.
                        We never sell your information to third parties.
                      </p>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Trust Sidebar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-5"
            >
              {/* Call CTA */}
              <motion.div
                variants={fadeUp}
                className="bg-[#9a3412] rounded-2xl p-6 text-white shadow-lg shadow-[#9a3412]/20"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1">Prefer to Call?</h3>
                <p className="text-amber-100 text-sm mb-3">
                  Speak with a specialist right now. We pick up.
                </p>
                <a
                  href="tel:8449675247"
                  className="text-2xl font-extrabold hover:text-amber-200 transition-colors block"
                >
                  844-967-5247
                </a>
              </motion.div>

              {/* Trust grid */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-[rgba(154,52,18,0.15)] shadow-sm"
              >
                <h3 className="font-bold text-[#2a211c] text-base mb-4">
                  Why Contractors Choose Us
                </h3>
                <div className="space-y-4">
                  {trustItems.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#fdf6ec] rounded-lg flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-[#9a3412]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2a211c]">{item.title}</p>
                        <p className="text-xs text-[#a89a8c]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What happens next */}
              <motion.div
                variants={fadeUp}
                className="bg-[#fdfaf5] rounded-2xl p-6 border border-[rgba(154,52,18,0.1)]"
              >
                <h3 className="font-bold text-[#2a211c] text-base mb-4">
                  What Happens Next?
                </h3>
                <ol className="space-y-3">
                  {[
                    "We review your quote request (usually within hours).",
                    "A specialist contacts you to confirm details and answer questions.",
                    "We shop A-rated carriers and present your best options.",
                    "You choose. We bind coverage and issue your certificate.",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#57493f]">
                      <span className="flex-shrink-0 w-5 h-5 bg-[#9a3412] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
