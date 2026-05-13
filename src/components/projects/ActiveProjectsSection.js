"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const projects = [
  {
    id: 1,
    status: "Active",
    title: "Buxton College",
    href: "/projects/buxton-college",
    images: [
      {
        src: "https://images.pexels.com/photos/8457622/pexels-photo-8457622.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Students walking toward a modern school building",
      },
      {
        src: "https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children and teacher in a school courtyard",
      },
      {
        src: "https://images.pexels.com/photos/8500421/pexels-photo-8500421.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children entering a school building",
      },
      {
        src: "https://images.pexels.com/photos/20028939/pexels-photo-20028939.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Historic school building exterior",
      },
      {
        src: "https://images.pexels.com/photos/8457622/pexels-photo-8457622.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Students walking toward a modern school building",
      },
      {
        src: "https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children and teacher in a school courtyard",
      },
      {
        src: "https://images.pexels.com/photos/8500421/pexels-photo-8500421.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children entering a school building",
      },
      {
        src: "https://images.pexels.com/photos/20028939/pexels-photo-20028939.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Historic school building exterior",
      },
      {
        src: "https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children and teacher in a school courtyard",
      },
    ],
  },
  {
    id: 2,
    status: "Active",
    title: "Port Royal Relief",
    href: "/projects/port-royal-relief",
    images: [
      {
        src: "https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "School courtyard with children and teacher",
      },
      {
        src: "https://images.pexels.com/photos/8457622/pexels-photo-8457622.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children walking with backpacks near school",
      },
      {
        src: "https://images.pexels.com/photos/20028939/pexels-photo-20028939.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "School building facade",
      },
      {
        src: "https://images.pexels.com/photos/8500421/pexels-photo-8500421.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Students entering school",
      },
      {
        src: "https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "School courtyard with children and teacher",
      },
      {
        src: "https://images.pexels.com/photos/8457622/pexels-photo-8457622.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children walking with backpacks near school",
      },
      {
        src: "https://images.pexels.com/photos/20028939/pexels-photo-20028939.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "School building facade",
      },
      {
        src: "https://images.pexels.com/photos/8500421/pexels-photo-8500421.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Students entering school",
      },
      {
        src: "https://images.pexels.com/photos/8457622/pexels-photo-8457622.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children walking with backpacks near school",
      },
    ],
  },
  {
    id: 3,
    status: "Active",
    title: "Community Impact",
    href: "/projects/community-impact",
    images: [
      {
        src: "https://images.pexels.com/photos/8500421/pexels-photo-8500421.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Students entering school building",
      },
      {
        src: "https://images.pexels.com/photos/20028939/pexels-photo-20028939.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Exterior of a school building",
      },
      {
        src: "https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Teacher and students walking in school courtyard",
      },
      {
        src: "https://images.pexels.com/photos/8457622/pexels-photo-8457622.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children with backpacks walking to school",
      },
      {
        src: "https://images.pexels.com/photos/8500421/pexels-photo-8500421.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Students entering school building",
      },
      {
        src: "https://images.pexels.com/photos/20028939/pexels-photo-20028939.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Exterior of a school building",
      },
      {
        src: "https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Teacher and students walking in school courtyard",
      },
      {
        src: "https://images.pexels.com/photos/8457622/pexels-photo-8457622.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Children with backpacks walking to school",
      },
      {
        src: "https://images.pexels.com/photos/20028939/pexels-photo-20028939.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Exterior of a school building",
      },
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const galleryVariants = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
};

const imageVariants = {
  initial: { opacity: 0, y: 14, scale: 0.985 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const desktopTileClasses = [
  "col-span-2 row-span-1 aspect-[0.9/1]",
  "col-span-2 row-span-1 aspect-[0.9/1]",
  "col-span-2 row-span-1 aspect-[0.9/1]",
  "col-span-2 row-span-2 aspect-[0.9/1.8]",
  "col-span-5 row-span-2 aspect-[1.65/1]",
  "col-span-1 row-span-1 aspect-[0.7/1]",
  "col-span-1 row-span-1 aspect-[0.7/1]",
  "col-span-2 row-span-1 aspect-[1.15/1]",
  "col-span-3 row-span-1 aspect-[1.6/1]",
];

function getProgressWidth(activeIndex, total) {
  return `${((activeIndex + 1) / total) * 100}%`;
}

function ArrowButton({ direction = "next", onClick, className = "" }) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next" : "Previous"}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 ${className}`}
    >
      <span className="text-xl leading-none">{isNext ? "→" : "←"}</span>
    </button>
  );
}

function Lightbox({ project, activeImageIndex, onClose, onNext, onPrev }) {
  const image = project.images[activeImageIndex];

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-[1400px]"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur transition hover:bg-black/50"
          >
            ✕
          </button>

          <div className="relative overflow-hidden rounded-[18px] bg-[#0a0a0a] shadow-2xl">
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 bg-black/45 px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-white/60">
                  {project.status}
                </p>
                <h3 className="mt-1 text-xl font-medium sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  Image {activeImageIndex + 1} of {project.images.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ArrowButton direction="prev" onClick={onPrev} />
                <ArrowButton direction="next" onClick={onNext} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectImage({
  image,
  index,
  className = "",
  priority = false,
  onOpen,
}) {
  return (
    <motion.button
      type="button"
      variants={imageVariants}
      onClick={() => onOpen(index)}
      className={`group relative overflow-hidden rounded-[10px] bg-neutral-200 text-left ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative h-full w-full">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 639px) 85vw, (max-width: 1023px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/18" />
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-[#060b26] opacity-0 transition duration-300 group-hover:opacity-100">
          View
        </div>
      </div>
    </motion.button>
  );
}

function ActiveProjectGalleryDesktop({ project, onOpen }) {
  const filledImages = useMemo(() => {
    const fallback = project.images.length ? project.images : [];
    return Array.from({ length: 9 }, (_, i) => fallback[i % fallback.length]);
  }, [project.images]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        variants={galleryVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="hidden lg:grid lg:grid-cols-10 lg:auto-rows-auto lg:gap-3"
      >
        {filledImages.map((image, index) => (
          <ProjectImage
            key={`${project.id}-${index}`}
            image={image}
            index={index}
            onOpen={onOpen}
            className={desktopTileClasses[index]}
            priority={index < 2}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function ActiveProjectGalleryTablet({ project, onOpen }) {
  const filledImages = useMemo(() => {
    const fallback = project.images.length ? project.images : [];
    return Array.from({ length: 6 }, (_, i) => fallback[i % fallback.length]);
  }, [project.images]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        variants={galleryVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="hidden grid-cols-2 gap-3 sm:grid md:grid lg:hidden"
      >
        {filledImages.map((image, index) => (
          <ProjectImage
            key={`${project.id}-${index}`}
            image={image}
            index={index}
            onOpen={onOpen}
            className={index === 0 ? "aspect-[1.3/1] sm:col-span-2" : "aspect-[1/1]"}
            priority={index < 2}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function ActiveProjectGalleryMobile({ project, onOpen }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        variants={galleryVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:hidden"
      >
        {project.images.map((image, index) => (
          <motion.button
            key={`${project.id}-${index}`}
            type="button"
            variants={imageVariants}
            onClick={() => onOpen(index)}
            className="group relative min-w-[84%] snap-center overflow-hidden rounded-[12px] bg-neutral-200 aspect-[1/1.15]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-500 group-active:scale-[1.02]"
              sizes="85vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-active:bg-black/10" />
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function ProgressBar({ activeIndex, total }) {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-[180px] items-center justify-center">
      <div className="relative h-[10px] w-full overflow-hidden rounded-full bg-[#e4e0d8]">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-[#f2cf00]"
          animate={{ width: getProgressWidth(activeIndex, total) }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function SectionNavButton({ direction = "next", onClick }) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next project" : "Previous project"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[#0b1026] backdrop-blur transition hover:bg-white"
    >
      <span className="text-xl leading-none">{isNext ? "→" : "←"}</span>
    </button>
  );
}

export default function ActiveProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const activeProject = projects[activeIndex];
  const lightboxOpen = lightboxIndex !== null;

  useEffect(() => {
    if (lightboxOpen) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [lightboxOpen]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeIndex]);

  const goNextProject = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const goPrevProject = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % activeProject.images.length);
  };

  const goPrevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
  };

  return (
    <>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full bg-[#f5f3ee] px-5 py-14 sm:px-6 md:px-8 md:py-16 lg:px-10 xl:px-14"
      >
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <motion.p
                key={`${activeProject.id}-status`}
                variants={headerItemVariants}
                initial="hidden"
                animate="visible"
                className="mb-2 text-[18px] font-normal tracking-[-0.02em] text-[#7f8393] sm:text-[20px]"
              >
                {activeProject.status}
              </motion.p>

              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[900px] text-[42px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#060b26] sm:text-[58px] md:text-[72px] lg:text-[92px] xl:text-[106px]"
                >
                  {activeProject.title}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-end">
              <Link
                href={activeProject.href}
                className="text-[20px] text-[#7f8393] underline underline-offset-4 transition hover:text-[#060b26] sm:text-[24px]"
              >
                Learn More
              </Link>

              <div className="flex items-center gap-2">
                <SectionNavButton direction="prev" onClick={goPrevProject} />
                <SectionNavButton direction="next" onClick={goNextProject} />
              </div>
            </div>
          </div>

          <ActiveProjectGalleryMobile project={activeProject} onOpen={openLightbox} />
          <ActiveProjectGalleryTablet project={activeProject} onOpen={openLightbox} />
          <ActiveProjectGalleryDesktop project={activeProject} onOpen={openLightbox} />

          <ProgressBar activeIndex={activeIndex} total={projects.length} />
        </div>
      </motion.section>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            project={activeProject}
            activeImageIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={goNextImage}
            onPrev={goPrevImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}