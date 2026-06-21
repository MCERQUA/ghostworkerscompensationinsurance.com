"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  Shield,
  MapPin,
  CheckCircle,
  AlertCircle,
  Send,
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

interface FormData {
  "bot-field": string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  state: string;
  message: string;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[rgba(0,82,204,0.2)] bg-white/80 text-[#1e2d3d] placeholder-[#94a3b8] focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 transition-all text-sm";

const labelClass = "block text-sm font-semibold text-[#1e2d3d] mb-1.5";

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    "bot-field": "",
    name: "",
    businessName: "",
    email: "",
    phone: "",
    state: "",
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
            form_name: "contact",
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
    <div className="min-h-screen bg-white text-[#1e2d3d]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-[#0052cc] via-[#0047b3] to-[#003d99] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl -translate-y-1/2 translate-x-1/4" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-200" />
              <span className="text-blue-200 text-sm font-medium tracking-wide uppercase">
                Contractors Choice Agency
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-blue-100 text-lg max-w-xl mx-auto"
            >
              Reach our ghost WC specialists by phone, email, or the form below.
              We respond same business day.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Sidebar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6 lg:order-2"
            >
              {/* Phone */}
              <motion.div
                variants={fadeUp}
                className="bg-[#0052cc] rounded-2xl p-6 text-white shadow-lg shadow-[#0052cc]/20"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1">Call Us Directly</h3>
                <p className="text-blue-100 text-sm mb-3">
                  Speak with a specialist immediately.
                </p>
                <a
                  href="tel:8449675247"
                  className="text-2xl font-extrabold hover:text-blue-200 transition-colors"
                >
                  844-967-5247
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-[rgba(0,82,204,0.15)] shadow-sm"
              >
                <div className="w-10 h-10 bg-[#f0f6ff] rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-[#0052cc]" />
                </div>
                <h3 className="font-bold text-lg text-[#1e2d3d] mb-1">Email Us</h3>
                <p className="text-[#4a5568] text-sm mb-3">
                  We respond to all emails within one business day.
                </p>
                <a
                  href="mailto:info@contractorschoiceagency.com"
                  className="text-[#0052cc] font-semibold text-sm hover:underline break-all"
                >
                  info@contractorschoiceagency.com
                </a>
              </motion.div>

              {/* Hours */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-[rgba(0,82,204,0.15)] shadow-sm"
              >
                <div className="w-10 h-10 bg-[#f0f6ff] rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-[#0052cc]" />
                </div>
                <h3 className="font-bold text-lg text-[#1e2d3d] mb-3">Business Hours</h3>
                <ul className="space-y-2 text-sm text-[#4a5568]">
                  {[
                    { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM MT" },
                    { day: "Saturday", hours: "9:00 AM – 2:00 PM MT" },
                    { day: "Sunday", hours: "Closed" },
                  ].map(({ day, hours }) => (
                    <li key={day} className="flex justify-between">
                      <span className="font-medium text-[#1e2d3d]">{day}</span>
                      <span>{hours}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Location */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-[rgba(0,82,204,0.15)] shadow-sm"
              >
                <div className="w-10 h-10 bg-[#f0f6ff] rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-[#0052cc]" />
                </div>
                <h3 className="font-bold text-lg text-[#1e2d3d] mb-2">Licensed Nationwide</h3>
                <p className="text-sm text-[#4a5568]">
                  Contractors Choice Agency holds active insurance licenses in all 50
                  states. Wherever your contracts take you, we can help.
                </p>
              </motion.div>
            </motion.div>

            {/* Form */}
            <div className="lg:col-span-2 lg:order-1">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#f0f6ff] border border-[rgba(0,82,204,0.2)] rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 bg-[#0052cc] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#1e2d3d] mb-3">
                    Message Received!
                  </h2>
                  <p className="text-[#4a5568] mb-6">
                    Thank you for contacting Contractors Choice Agency. A specialist
                    will reach out to you within one business day. For urgent needs,
                    call us directly at{" "}
                    <a href="tel:8449675247" className="text-[#0052cc] font-bold">
                      844-967-5247
                    </a>
                    .
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                >
                  <motion.div variants={fadeUp} className="mb-6">
                    <h2 className="text-2xl font-extrabold text-[#1e2d3d] mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-[#4a5568] text-sm">
                      Fill out the form below and a ghost WC specialist will contact
                      you within one business day.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <form
                      data-netlify="true"
                      name="contact"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <input type="hidden" name="form-name" value="contact" />
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

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className={labelClass}>
                            Your Name <span className="text-[#0052cc]">*</span>
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
                            Email Address <span className="text-[#0052cc]">*</span>
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
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="(555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="state" className={labelClass}>
                          State <span className="text-[#0052cc]">*</span>
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
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass}>
                          Message <span className="text-[#0052cc]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Tell us about your coverage needs, questions, or situation..."
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
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#0052cc] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#0047b3] active:bg-[#003d99] transition-colors shadow-lg shadow-[#0052cc]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-[#94a3b8] text-center">
                        By submitting this form you consent to be contacted by Contractors
                        Choice Agency regarding your insurance inquiry.
                      </p>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
