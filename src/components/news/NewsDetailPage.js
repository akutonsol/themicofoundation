"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { client, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticNewsItems = [
  {
    id: 1,
    slug: "lady-mico-charity-breaks-historical-barrier",
    title: "The Lady Mico Charity – Breaks Its Historical Barrier",
    excerpt: "The Lady Mico Charity made a significant historical change in 1984 when it invited a Jamaican citizen into the membership of its 300 year old Charity.",
    content: `The Lady Mico Charity, now the Lady Mico Trust, made a significant historical change in 1984 when it invited to the membership of its 300 year old Charity a Jamaican citizen and Principal of its only surviving Caribbean education institution, Professor, the Honourable Errol Lawrence Miller.\n\nThis appointment made by the then chairman Mr. Henry Buxton was unprecedented as no member other than the descendants of Sir Thomas Fowell Buxton, the first chair of the Charity or persons external to the United Kingdom, were made trustees of the Lady Mico Charity.`,
    date: "04 July 2025",
    location: "Jamaica, Kingston",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=80",
  },
];

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[-4%] top-[120px] h-[1200px] w-[680px] opacity-[0.16]">
        <div className="grid h-full w-full grid-cols-6 grid-rows-10">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
      <div className="absolute left-[-2%] bottom-[80px] h-[260px] w-[260px] opacity-[0.14]">
        <div className="grid h-full w-full grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-black/[0.05]" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// FIX: accept slug as prop, removed useSearchParams
export default function NewsDetailPage({ slug }) {
  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const [articleData, articlesData] = await Promise.all([
          client.fetch(queries.newsArticleBySlug(slug)),
          client.fetch(queries.allNewsArticles)
        ]);

        if (articleData) {
          setArticle({
            ...articleData,
            date: new Date(articleData.date).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'long', year: 'numeric'
            }),
          });
          console.log('✅ Loaded article from CMS:', articleData.title);
        } else {
          setArticle(staticNewsItems[0]);
          console.log('ℹ️ Using static article data');
        }

        if (articlesData && articlesData.length > 0) {
          setAllArticles(articlesData);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(staticNewsItems[0]);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchArticle();
    } else {
      setArticle(staticNewsItems[0]);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-14 flex items-center justify-center min-h-screen">
        <p className="text-[24px] text-[#040617]" style={inter}>Loading article...</p>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-14 flex items-center justify-center min-h-screen">
        <p className="text-[24px] text-[#040617]" style={inter}>Article not found</p>
      </section>
    );
  }

  const currentSlug = article.slug;
  const currentIndex = allArticles.findIndex(a => a.slug === currentSlug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : allArticles[allArticles.length - 1];
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : allArticles[0];

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-14 sm:px-10 lg:px-16">
      <BackgroundGrid />

      <div className="relative mx-auto max-w-[1540px]">
        {/* Top Meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[22px] text-[#8A8E9D]" style={inter}>{article.date}</p>
          {article.location && (
            <div className="inline-flex items-center gap-2 text-[18px] text-[#040617]" style={inter}>
              <MapPin className="h-5 w-5" />
              {article.location}
            </div>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-[1450px] text-[54px] font-semibold leading-[0.92] tracking-[-0.07em] text-[#040617] sm:text-[82px] lg:text-[118px]"
          style={inter}
        >
          {article.title}
        </motion.h1>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="mt-14 overflow-hidden rounded-[32px] shadow-[var(--shadow-3)]"
        >
          <img src={article.image} alt={article.title} className="h-[320px] w-full object-cover sm:h-[520px] lg:h-[720px]" />
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mx-auto mt-16 max-w-[1380px]"
        >
          <div className="space-y-10 text-[24px] leading-[1.7] tracking-[-0.03em] text-[#1A1D28] sm:text-[28px] lg:text-[32px]" style={inter}>
            {(article.content || article.excerpt || "Content coming soon.")
              .trim()
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </motion.div>

        {/* Navigation — FIX: dynamic routes */}
        {allArticles.length > 1 && (
          <div className="mt-24 grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-2">
            <Link
              href={`/newsdetail/${prevArticle.slug}`}
              className="group rounded-[28px] border border-black/10 bg-white p-8 shadow-[var(--shadow-2)] transition-[transform,box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-emphasized)] hover:-translate-y-[5px] hover:border-black/20 hover:shadow-[var(--shadow-4)]"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-[#ECECF1] transition group-hover:bg-[#FFD900]">
                  <ArrowLeft className="h-7 w-7 text-[#040617]" />
                </div>
                <div>
                  <p className="text-[18px] text-[#8A8E9D]" style={inter}>Previous News</p>
                  <h3 className="mt-2 max-w-[520px] text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#040617]" style={inter}>
                    {prevArticle.title}
                  </h3>
                </div>
              </div>
            </Link>

            <Link
              href={`/newsdetail/${nextArticle.slug}`}
              className="group rounded-[28px] border border-black/10 bg-white p-8 shadow-[var(--shadow-2)] transition-[transform,box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-emphasized)] hover:-translate-y-[5px] hover:border-black/20 hover:shadow-[var(--shadow-4)]"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[18px] text-[#8A8E9D]" style={inter}>Next News</p>
                  <h3 className="mt-2 max-w-[520px] text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#040617]" style={inter}>
                    {nextArticle.title}
                  </h3>
                </div>
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[18px] bg-[#ECECF1] transition group-hover:bg-[#FFD900]">
                  <ArrowRight className="h-7 w-7 text-[#040617]" />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}