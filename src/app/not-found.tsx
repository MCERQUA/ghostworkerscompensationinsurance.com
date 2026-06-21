import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-40 pb-24 hero-gradient">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0052cc] to-[#1a6bff] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[rgba(0,82,204,0.3)]">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-black text-[#1e2d3d] mb-4">404</h1>
          <h2 className="text-2xl font-bold text-[#1e2d3d] mb-4">Page Not Found</h2>
          <p className="text-[#475569] mb-8">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0052cc] to-[#1a6bff] text-white font-bold rounded-xl shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/quote"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0052cc] font-bold rounded-xl border-2 border-[rgba(0,82,204,0.3)]"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
