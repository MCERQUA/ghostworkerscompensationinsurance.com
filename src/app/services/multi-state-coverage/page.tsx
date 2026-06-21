"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, CheckCircle, ArrowRight, Phone, ChevronDown, Globe, FileText, MapPin, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const faqs = [
  {
    q: "How does workers compensation work when employees work in multiple states?",
    a: "Workers compensation is a state-regulated system, so coverage that's valid in one state doesn't automatically apply in another. When your employees work across state lines, you need either a separate policy in each state, or a policy with an 'all-states' endorsement that extends coverage to any state where work is performed. For monopolistic states (ND, OH, WA, WY), you must purchase coverage directly from the state fund—you cannot use a private carrier's policy there, even with an all-states endorsement.",
  },
  {
    q: "What are the monopolistic states and how do ghost policies work there?",
    a: "North Dakota, Ohio, Washington, and Wyoming require employers to purchase workers compensation through the state-run fund rather than private carriers. This changes how ghost policies work: in these states, you must register with the state fund and purchase their minimum coverage (or an exemption certificate) rather than getting a ghost policy from a private carrier. CCA navigates this complexity and ensures your multi-state operations have valid proof of coverage in every jurisdiction, including monopolistic states.",
  },
  {
    q: "What is an all-states endorsement on a workers comp policy?",
    a: "An all-states endorsement (or 'other states' endorsement) extends your workers comp policy to cover work performed in any state not specifically excluded. Without this endorsement, your policy only covers the specific states listed on the declarations page. If an employee travels to an unlisted state and is injured, coverage could be denied. For employers with mobile workforces—construction, trucking, staffing—the all-states endorsement is essential.",
  },
  {
    q: "Can one policy cover all 50 states for workers comp?",
    a: "A single private-carrier policy with an all-states endorsement can cover work in most states. However, monopolistic states (ND, OH, WA, WY) always require separate state fund coverage—there's no workaround for this. Some states also have unique requirements or approved-only carriers. CCA manages all of this for you: one broker handling your coverage in every state, coordinating between private carrier and state funds where necessary.",
  },
  {
    q: "How much do rates vary between states for workers comp?",
    a: "Workers comp rates vary enormously by state—by both the regulatory environment and the classification codes for specific jobs. California, New York, and New Jersey typically have among the highest rates; states like Indiana and Texas (where WC is not mandatory for most employers) can be significantly lower. For ghost policies, the minimum premium requirement also varies by state. CCA shops rates across multiple carriers in every state to ensure you're getting competitive pricing regardless of where your work takes you.",
  },
];

export default function MultiStateCoveragePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#1a6bff]/10 rounded-full blur-[128px]" />
          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#0052cc]/10 rounded-full blur-[128px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,82,204,0.08)] border border-[rgba(0,82,204,0.2)] mb-6">
                <Globe className="w-4 h-4 text-[#0052cc]" />
                <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider">All 50 States</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e2d3d] leading-[1.05] mb-5">
                Multi-State Ghost Workers Comp <span className="blue-gradient-text">Coverage</span>
              </h1>
              <p className="text-lg text-[#475569] mb-8 leading-relaxed">
                Workers compensation doesn&apos;t follow your employees across state lines automatically. Employers with multi-state operations need coverage specifically structured for every jurisdiction—including the four monopolistic states with unique requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote" className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0052cc] to-[#1a6bff] text-white font-bold rounded-xl shadow-xl shadow-[rgba(0,82,204,0.35)] text-lg hover:-translate-y-0.5 transition-all">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+18449675247" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0052cc] font-bold rounded-xl border-2 border-[rgba(0,82,204,0.3)] text-lg">
                  <Phone className="w-5 h-5" /> 844-967-5247
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <Image src="/images/cta-background.jpg" alt="Multi-state ghost workers comp coverage for all 50 states" width={600} height={450} className="w-full h-[420px] object-cover rounded-3xl shadow-2xl shadow-[rgba(0,82,204,0.12)]" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-[#1e2d3d] mb-4">What Multi-State Coverage Includes</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "All-States Endorsement", desc: "Extends your base WC policy to cover any state where work is performed—not just the specific states listed on your declarations page." },
              { icon: MapPin, title: "Interstate Worker Protection", desc: "Employees who travel between states or work on projects in multiple jurisdictions remain continuously covered under one unified policy structure." },
              { icon: AlertTriangle, title: "Monopolistic State Compliance", desc: "ND, OH, WA, and WY require state fund coverage. We manage enrollment and compliance in all four, coordinated with your private policy." },
              { icon: FileText, title: "USL&H Maritime Coverage", desc: "For employers with workers on navigable waters, piers, or docks, the USL&H Act requires separate federal coverage—we write it alongside your state WC." },
              { icon: Shield, title: "State-Specific Filing Compliance", desc: "Some states require policy filing, affidavits of coverage, or specific carrier licensing. We handle all compliance paperwork across every jurisdiction." },
              { icon: Globe, title: "Multi-State Ghost Policy", desc: "Need proof of WC coverage in multiple states for licensing or contract purposes? A single brokered program provides certificates for all required states." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-hover bg-white rounded-2xl border border-[rgba(0,82,204,0.12)] p-7 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(0,82,204,0.08)] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0052cc]" />
                  </div>
                  <h3 className="text-lg font-black text-[#1e2d3d] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black text-[#1e2d3d] mb-6">Who Needs Multi-State Coverage</h2>
              <div className="space-y-4">
                {[
                  { title: "Construction with Interstate Projects", desc: "General contractors with projects in multiple states need valid WC in each jurisdiction where their employees perform work." },
                  { title: "Trucking & Logistics Companies", desc: "Drivers crossing state lines trigger WC compliance requirements in every state they regularly operate in—not just the domicile state." },
                  { title: "Staffing Agencies", desc: "Agencies that place workers with client businesses in multiple states need coverage that follows those placements." },
                  { title: "Remote Work Employers", desc: "Companies with employees working from home in states where the company isn't physically located still have WC obligations in those states." },
                  { title: "Trade Show & Event Companies", desc: "Setup, installation, and event companies that work nationally face WC exposure in every state where their crew performs labor." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-5 bg-white rounded-2xl border border-[rgba(0,82,204,0.1)] shadow-sm">
                    <CheckCircle className="w-5 h-5 text-[#0052cc] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#1e2d3d] mb-1">{item.title}</p>
                      <p className="text-sm text-[#475569]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-[#0052cc] to-[#1a6bff] rounded-3xl p-10 text-white">
                <h3 className="text-2xl font-black mb-6">Why CCA for Multi-State Coverage</h3>
                <div className="space-y-5">
                  {[
                    { title: "Licensed in All 50 States", desc: "CCA can place WC coverage—ghost policies or standard—in every state from one brokerage relationship. No state-by-state referrals." },
                    { title: "Monopolistic State Fund Experience", desc: "ND, OH, WA, and WY each have unique enrollment procedures. We manage the paperwork and compliance in all four simultaneously." },
                    { title: "Unified Certificate Management", desc: "When you need certificates of insurance showing WC coverage in multiple states, we manage all policy documentation from one point of contact." },
                    { title: "Rate Optimization by State", desc: "WC rates vary dramatically by state. We shop carriers in each jurisdiction to ensure you&apos;re not overpaying in any market." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-200 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white mb-0.5">{item.title}</p>
                        <p className="text-sm text-blue-100">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <Link href="/quote" className="block text-center py-3 px-6 bg-white text-[#0052cc] font-bold rounded-xl hover:bg-blue-50 transition-colors">Get Multi-State Coverage Quote</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#1e2d3d] mb-4">Multi-State WC <span className="blue-gradient-text">FAQs</span></h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#f8fafc] rounded-2xl border border-[rgba(0,82,204,0.1)] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-[rgba(0,82,204,0.03)] transition-colors">
                  <p className="font-bold text-[#1e2d3d]">{faq.q}</p>
                  <ChevronDown className={`w-5 h-5 text-[#0052cc] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-[#475569] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#0052cc] to-[#1a6bff]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Operating in Multiple States?</h2>
          <p className="text-blue-100 mb-8">Let us build you a unified multi-state WC program—one broker, all 50 states, full compliance.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="px-8 py-4 bg-white text-[#0052cc] font-bold rounded-xl text-lg hover:bg-blue-50 transition-colors">Get a Quote</Link>
            <a href="tel:+18449675247" className="flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-xl border-2 border-white/40 text-lg hover:border-white transition-colors">
              <Phone className="w-5 h-5" /> 844-967-5247
            </a>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      })}} />
      <Footer />
    </div>
  );
}
