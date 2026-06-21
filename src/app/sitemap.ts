import { MetadataRoute } from "next";

const BASE_URL = "https://ghostworkerscompensationinsurance.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/about`, priority: 0.8 },
    { url: `${BASE_URL}/contact`, priority: 0.8 },
    { url: `${BASE_URL}/quote`, priority: 0.9 },
    { url: `${BASE_URL}/blog`, priority: 0.7 },
    { url: `${BASE_URL}/privacy`, priority: 0.3 },
    { url: `${BASE_URL}/terms`, priority: 0.3 },
  ];

  const servicePages = [
    "ghost-workers-compensation",
    "audit-protection",
    "employer-liability",
    "payroll-fraud",
    "independent-contractor",
    "multi-state-coverage",
  ].map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    priority: 0.9,
  }));

  const blogPosts = [
    "ghost-workers-comp-policy-explained",
    "workers-comp-audit-guide",
    "employee-vs-contractor-workers-comp",
    "ghost-policy-by-state",
  ].map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPosts].map((page) => ({
    url: page.url,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));
}
