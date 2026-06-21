import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Calendar, User, Tag, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Workers Comp Insurance Blog | Ghost Policy Guides & Resources",
  description:
    "Expert guides on ghost workers comp policies, audit protection, worker classification, and state-specific requirements. From Contractors Choice Agency specialists.",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[rgba(0,82,204,0.04)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,82,204,0.08)] border border-[rgba(0,82,204,0.15)] mb-6">
            <BookOpen className="w-4 h-4 text-[#0052cc]" />
            <span className="text-sm font-semibold text-[#0052cc]">Resources & Guides</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1e2d3d] mb-5 leading-tight">
            Workers Comp Insurance
            <span className="block text-[#0052cc]">Knowledge Base</span>
          </h1>
          <p className="text-lg text-[#64748b] max-w-2xl mx-auto leading-relaxed">
            Expert guides on ghost workers comp policies, audit survival, worker classification risks,
            and state-specific requirements — written by specialists who work these issues every day.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-[#64748b]">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`group flex flex-col bg-white rounded-2xl border border-[rgba(0,82,204,0.1)] shadow-sm hover:shadow-xl hover:shadow-[rgba(0,82,204,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative w-full overflow-hidden bg-gradient-to-br from-[rgba(0,82,204,0.08)] to-[rgba(26,107,255,0.04)] ${index === 0 ? "h-64 md:h-80" : "h-52"}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes={index === 0 ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,45,61,0.4)] to-transparent" />
                    {/* Tags overlay */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-[#0052cc] text-xs font-semibold backdrop-blur-sm"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#94a3b8] mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className={`font-black text-[#1e2d3d] mb-3 group-hover:text-[#0052cc] transition-colors leading-tight ${index === 0 ? "text-2xl md:text-3xl" : "text-xl"}`}>
                      <Link href={`/blog/${post.slug}`} className="stretched-link">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-[#64748b] text-sm leading-relaxed mb-6 flex-1">
                      {post.description}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0052cc] hover:gap-3 transition-all"
                    >
                      Read the Full Guide
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-gradient-to-b from-white to-[rgba(0,82,204,0.03)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#1e2d3d] mb-4">
            Have Questions? Talk to a Specialist.
          </h2>
          <p className="text-lg text-[#64748b] mb-8 max-w-2xl mx-auto">
            Our guides cover the most common scenarios, but your situation may have specific details
            that affect your coverage needs. Call us for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18449675247"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0052cc] to-[#1a6bff] text-white font-bold rounded-xl shadow-lg shadow-[rgba(0,82,204,0.3)] hover:shadow-[rgba(0,82,204,0.5)] hover:-translate-y-0.5 transition-all"
            >
              Call 844-967-5247
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0052cc] font-bold rounded-xl border-2 border-[#0052cc] hover:bg-[rgba(0,82,204,0.04)] transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
