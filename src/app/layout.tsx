import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ghost Workers Compensation Insurance | Audit Protection for Employers",
    template: "%s | Ghost Workers Comp Insurance",
  },
  description:
    "Specialized ghost policy workers compensation insurance for employers facing audit risk, ghost employee liability, and payroll misclassification. Licensed in all 50 states. Contractors Choice Agency.",
  keywords: [
    "ghost workers comp insurance",
    "ghost policy workers compensation",
    "workers comp audit protection",
    "employer liability insurance",
    "ghost employee insurance",
    "payroll fraud workers compensation",
  ],
  openGraph: {
    title: "Ghost Workers Compensation Insurance | Audit Protection",
    description:
      "Protect your business from ghost employee audits and employer liability with specialized workers comp coverage. Licensed in all 50 states.",
    url: "https://ghostworkerscompensationinsurance.com",
    siteName: "Ghost Workers Compensation Insurance",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ghost Workers Compensation Insurance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghost Workers Compensation Insurance | Audit Protection",
    description:
      "Protect your business from ghost employee audits and employer liability with specialized workers comp coverage.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://ghostworkerscompensationinsurance.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
