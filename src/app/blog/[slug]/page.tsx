import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Calendar, User, Tag, ArrowLeft, Phone, Shield, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://ghostworkerscompensationinsurance.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Contractors Choice Agency",
      url: "https://ghostworkerscompensationinsurance.com",
      logo: {
        "@type": "ImageObject",
        url: "https://ghostworkerscompensationinsurance.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ghostworkerscompensationinsurance.com/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero image */}
      <div className="relative w-full h-72 md:h-96 mt-20 overflow-hidden bg-gradient-to-br from-[rgba(0,82,204,0.1)] to-[rgba(26,107,255,0.05)]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,45,61,0.7)] via-[rgba(30,45,61,0.3)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[rgba(0,82,204,0.03)] border-b border-[rgba(0,82,204,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#0052cc] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-[#0052cc] transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1e2d3d] font-medium truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0052cc] hover:gap-3 transition-all mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to All Articles
            </Link>

            {/* Title & meta */}
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2d3d] leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#64748b] pb-6 border-b border-[rgba(0,82,204,0.1)]">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0052cc]" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0052cc]" />
                  {post.author}
                </span>
              </div>
            </header>

            {/* MDX Content */}
            <div className="prose prose-lg max-w-none
              prose-headings:text-[#1e2d3d] prose-headings:font-black
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-[#1e2d3d] prose-h2:border-b prose-h2:border-[rgba(0,82,204,0.1)] prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#1e2d3d]
              prose-p:text-[#475569] prose-p:leading-relaxed prose-p:mb-5
              prose-strong:text-[#1e2d3d] prose-strong:font-bold
              prose-a:text-[#0052cc] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-ul:text-[#475569] prose-ol:text-[#475569]
              prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-[#0052cc] prose-blockquote:bg-[rgba(0,82,204,0.04)] prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:text-[#1e2d3d] prose-blockquote:not-italic
            ">
              <MDXRemote source={post.content} />
            </div>

            {/* Tags footer */}
            <div className="mt-12 pt-8 border-t border-[rgba(0,82,204,0.1)]">
              <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-3">Topics</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[rgba(0,82,204,0.07)] text-[#0052cc] text-sm font-semibold"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-28 space-y-6">

              {/* CTA Card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#0052cc] to-[#1a6bff] p-6 text-white shadow-xl shadow-[rgba(0,82,204,0.25)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Free Consultation</p>
                    <p className="text-sm font-bold text-white">Ghost WC Specialists</p>
                  </div>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed mb-5">
                  Have questions about your specific situation? Our specialists answer ghost policy and
                  workers comp questions every day. No obligation.
                </p>
                <a
                  href="tel:+18449675247"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white text-[#0052cc] font-bold text-sm hover:bg-blue-50 transition-colors mb-3"
                >
                  <Phone className="w-4 h-4" />
                  Call 844-967-5247
                </a>
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors border border-white/20"
                >
                  Get a Free Quote
                </Link>
              </div>

              {/* Trust badges */}
              <div className="rounded-2xl border border-[rgba(0,82,204,0.1)] bg-white p-6">
                <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-4">Why Contractors Choose CCA</p>
                <ul className="space-y-3">
                  {[
                    "Licensed in all 50 states",
                    "20+ years specializing in contractor WC",
                    "A+ rated carrier partners",
                    "Ghost policies issued in 24–48 hours",
                    "Former contractor team — we know the trades",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#475569]">
                      <div className="w-5 h-5 rounded-full bg-[rgba(0,82,204,0.1)] flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#0052cc]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="rounded-2xl border border-[rgba(0,82,204,0.1)] bg-white p-6">
                  <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-4">More Resources</p>
                  <div className="space-y-4">
                    {relatedPosts.map(related => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="group flex items-start gap-3 hover:bg-[rgba(0,82,204,0.03)] rounded-xl p-2 -mx-2 transition-colors"
                      >
                        <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-[rgba(0,82,204,0.06)]">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#94a3b8] mb-1">{formatDate(related.date)}</p>
                          <p className="text-sm font-semibold text-[#1e2d3d] group-hover:text-[#0052cc] transition-colors leading-snug line-clamp-2">
                            {related.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
