"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Animated Gradient Text Component
const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2, startAnimation = false }: { value: string; suffix?: string; duration?: number; startAnimation?: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      if (value.includes("-")) {
        const parts = value.split("-");
        const start = parseFloat(parts[0]);
        const end = parseFloat(parts[1].replace("%", ""));
        setCount(start + (end - start) * progress);
      } else if (value.includes("+")) {
        const num = parseFloat(value.replace("+", ""));
        setCount(progress * num);
      } else if (value.includes("×")) {
        setCount(progress * 2);
      } else {
        const num = parseFloat(value.replace(/[^0-9.]/g, ""));
        setCount(progress * num);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration, startAnimation]);

  const displayValue = value.includes("-") 
    ? `${Math.round(count)}-${value.split("-")[1]}` 
    : value.includes("+")
    ? `${Math.round(count)}+`
    : value.includes("×")
    ? `${count.toFixed(1)}×`
    : `${Math.round(count)}${suffix}`;

  return <span>{startAnimation ? displayValue : value}</span>;
};

// Background Grid Component
const BackgroundGrid = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-30 dark:opacity-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
    </div>
  );
};

// Animated Background Orbs Component
const AnimatedBackground = () => {
  // Generate random values once using lazy initializer
  const [particles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      randomX: Math.random() * 100,
      randomY: Math.random() * 100,
      randomDelay: Math.random() * 5,
      randomDuration: 15 + Math.random() * 10,
    }))
  );

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Large gradient orbs */}
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-1/4 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-500/15 blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40 blur-sm"
          initial={{
            x: `${particle.randomX}%`,
            y: `${particle.randomY}%`,
          }}
          animate={{
            x: [
              `${particle.randomX}%`,
              `${(particle.randomX + 30) % 100}%`,
              `${particle.randomX}%`,
            ],
            y: [
              `${particle.randomY}%`,
              `${(particle.randomY + 20) % 100}%`,
              `${particle.randomY}%`,
            ],
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.randomDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.randomDelay,
          }}
        />
      ))}
      
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};


// Expandable Experience Card Component
const ExperienceCard = ({ 
  title,
  company,
  period,
  location,
  description,
  projects,
  gradientFrom = "from-blue-500",
  gradientTo = "to-purple-500"
}: { 
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  projects: Array<{
    name: string;
    highlights: string[];
    tech: string[];
  }>;
  gradientFrom?: string;
  gradientTo?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-xl border border-zinc-200 bg-white shadow-lg overflow-hidden transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Gradient accent bar */}
      <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${gradientFrom} ${gradientTo}`} />
      
      <div className="p-8 pl-10">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-zinc-50">{title}</h3>
              <p className="text-lg font-semibold text-zinc-600 dark:text-zinc-400 mt-1">{company}</p>
            </div>
            <span className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {period}
            </span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">{location}</p>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>

        {/* Key Projects Preview */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {projects.slice(0, 2).map((project, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <h4 className="mb-2 font-semibold text-black dark:text-zinc-50">{project.name}</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {project.highlights[0]}
              </p>
            </div>
          ))}
        </div>

        {/* Expandable Content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            {projects.map((project, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-lg font-semibold text-black dark:text-zinc-50">{project.name}</h4>
                <ul className="ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
                  {project.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>{highlight}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-white transition-all hover:from-blue-600 hover:to-purple-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{isExpanded ? "Show Less" : "View Full Details"}</span>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      <BackgroundGrid />
      
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="flex min-h-screen flex-col items-center justify-center px-6 py-20 relative z-10 overflow-hidden"
      >
        <AnimatedBackground />
        <div className="max-w-4xl text-center relative z-10">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="h-full w-full rounded-full bg-white dark:bg-black" />
              </motion.div>
              
              {/* Profile Image */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40 bg-gradient-to-br from-blue-500 to-purple-500">
                <Image
                  src="https://media.licdn.com/dms/image/v2/D4D03AQFsDP33WteWpA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1673023144261?e=1765411200&v=beta&t=JWGkUzNq6zBRdPYyHqwkC9FfrMpb_3XG_vJYVEXsF_A"
                  alt="Imran Ansari"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            <GradientText className="text-6xl sm:text-7xl md:text-8xl">Imran Ansari</GradientText>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-xl text-zinc-600 dark:text-zinc-400 sm:text-2xl"
          >
            Senior Full-Stack Engineer
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-4 max-w-2xl text-base text-zinc-500 dark:text-zinc-500"
          >
            4+ Years Experience | React 19 • TypeScript • Python FastAPI • Deck.gl • Google BigQuery • GCP
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mb-4 text-sm text-zinc-500 dark:text-zinc-500"
          >
            📍 Gurgaon, India, 122018 | 📞 +91 8797005465
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mb-8 max-w-2xl"
          >
            <p className="mb-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Building real-time traffic & geospatial platforms with 3D maps, congestion analytics & automated CI/CD.
            </p>
            <p className="text-base font-semibold text-black dark:text-zinc-50">
              Proven impact: <GradientText>30–60% gains</GradientText> in performance & deployment speed
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative rounded-full bg-black px-8 py-3 text-white overflow-hidden dark:bg-white dark:text-black"
            >
              <span className="relative z-10">Get in Touch</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-black px-8 py-3 text-black transition-all hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              View Experience
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-50 px-6 py-20 dark:bg-zinc-950 relative z-10"
      >
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center text-3xl font-bold sm:text-4xl"
          >
            <GradientText>About Me</GradientText>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            <p>
              Senior Full-Stack Engineer with 4+ years of experience building scalable web applications and 
              geospatial intelligence platforms. Specialized in React 19, TypeScript, Python FastAPI, Deck.gl, 
              and Google Cloud Platform. Currently working on Google RMI (Roads Management Insights) and 
              SmartMarket.ai, delivering 30–60% performance improvements and faster deployment cycles.
            </p>
            <p>
              Passionate about creating innovative solutions that solve real-world problems. Experienced in 
              leading cross-functional teams, architecting complex systems, and optimizing performance at scale. 
              Strong background in full-stack development, cloud infrastructure, and geospatial data visualization.
            </p>
            <p className="font-semibold text-black dark:text-zinc-50">
              Open to Senior Full-Stack / Geospatial roles
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Achievements Section */}
      <motion.section
        id="achievements"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="px-6 py-20 relative z-10"
      >
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          >
            <GradientText>Key Achievements</GradientText>
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { value: "30-60%", label: "Performance & Deployment Speed Improvements" },
              { value: "10+", label: "Major Features Shipped at SmartMarket.ai" },
              { value: "40%", label: "Faster Project/User Management with RBAC" },
              { value: "35%", label: "Reduction in Crashes & 30% Faster Page Load" },
              { value: "2×", label: "Faster Releases with Automated Deployments" },
              { value: "15+", label: "Modules Integrated in ShipStation Platform" },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative rounded-lg border border-zinc-200 bg-zinc-50 p-6 shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-zinc-900"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative">
                  <div className="mb-2 text-3xl font-bold">
                    <GradientText>
                      <AnimatedCounter value={achievement.value} startAnimation={true} />
                    </GradientText>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">{achievement.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="px-6 py-20 relative z-10"
      >
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          >
            <GradientText>Technologies & Skills</GradientText>
          </motion.h2>
          
          <div className="space-y-8">
            {[
              { title: "Programming Languages", skills: ["JavaScript", "TypeScript", "Python", "HTML/CSS"] },
              { title: "Frontend", skills: ["React 19", "Redux", "Zustand", "TanStack Query", "Next.js", "Vite", "Deck.gl", "MUI v7", "Tailwind CSS"] },
              { title: "Databases & Data", skills: ["Google BigQuery", "PostgreSQL", "Supabase"] },
              { title: "Cloud & DevOps", skills: ["Google Cloud Platform", "Cloud Run", "Docker", "Ansible", "Apache Airflow", "Traefik", "CI/CD", "Cloud Build"] },
              { title: "Testing & Monitoring", skills: ["Playwright", "Jest", "Mocha", "Google Analytics", "Firebase Cloud Messaging"] },
              { title: "Other Tools", skills: ["Git", "Poetry", "Brotli", "Ionic", "Salesforce", "Azure DevOps"] },
            ].map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">{category.title}</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="group relative rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-center text-sm font-medium text-black transition-all cursor-pointer overflow-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work Experience Section */}
      <motion.section
        id="experience"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-50 px-6 py-20 dark:bg-zinc-950 relative z-10"
      >
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          >
            <GradientText>Work Experience</GradientText>
          </motion.h2>
          <div className="space-y-8">
            {/* Lepton Software */}
            <ExperienceCard
              title="SDE-2 (Software Development Engineer - 2)"
              company="Lepton Software"
              period="June 2024 - Present"
              location="Gurgaon, India"
              description="Full-time • Building real-time traffic & geospatial platforms with 3D maps, congestion analytics & automated CI/CD"
              gradientFrom="from-blue-500"
              gradientTo="to-purple-500"
              projects={[
                {
                  name: "Google RMI (Roads Management Insights) Demo – Traffic Intelligence Platform",
                  highlights: [
                    "Built production-grade full-stack platform using React 19 + TypeScript, FastAPI (Python), Google BigQuery & Deck.gl",
                    "Created interactive 3D maps with Google Maps Platform + Deck.gl featuring dual-map comparison (weekday vs weekend, period-over-period), time-replay autoplay & color-coded congestion layers",
                    "Implemented route reliability metrics (Planning Time Index, Travel Time Index, 95th percentile travel times) using GeoPandas, Shapely & Turf.js",
                    "Developed grid & polygon-based urban congestion heatmaps with boundary analysis (postal codes, localities, admin areas)",
                    "Optimized frontend with lazy loading, code splitting, TanStack Query & Zustand → sub-second interactions even on large datasets",
                    "Containerised with multi-stage Docker & deployed to Google Cloud Run with zero-downtime blue-green releases",
                    "Integrated Google Roads Management Insights API, Geocoding API & BigQuery Storage API for live + historical insights"
                  ],
                  tech: ["React 19", "TypeScript", "FastAPI", "Deck.gl", "Google BigQuery", "GCP", "Docker", "TanStack Query", "Zustand"]
                },
                {
                  name: "SmartMarket.ai – SaaS Geospatial Intelligence Platform",
                  highlights: [
                    "Shipped 10+ major features; built scalable RBAC → 40% faster project/user management",
                    "Reduced crashes 35% and page load time 30%; automated deployments (Docker + Ansible) → 2× faster releases",
                    "Pioneered visual regression testing with Playwright"
                  ],
                  tech: ["React", "TypeScript", "Docker", "Ansible", "Playwright", "RBAC"]
                }
              ]}
            />

            {/* Innostax */}
            <ExperienceCard
              title="Project Lead"
              company="Innostax Software Labs Pvt Ltd"
              period="August 2021 - June 2024"
              location="Gurgaon, India"
              description="Full-time • Led cross-functional teams on full-stack mobile and web application development"
              gradientFrom="from-purple-500"
              gradientTo="to-pink-500"
              projects={[
                {
                  name: "Morehands Mobile Application",
                  highlights: [
                    "Led a team of four on full-stack iOS/Android development",
                    "Designed a responsive UI, cutting load times by 30% and boosting engagement 50%",
                    "Reduced crash reports by 15% through bug fixes",
                    "Integrated Google Analytics, Gladly, and FCM for insights and user engagement",
                    "Streamlined updates with AppFlow (CodePush)"
                  ],
                  tech: ["Ionic", "Salesforce", "Firebase", "Google Analytics", "FCM"]
                },
                {
                  name: "PlentiExchange | 1031 Exchange Report Generator",
                  highlights: [
                    "Built a React frontend with Node.js & .NET backend, cutting report time by 25%",
                    "Designed scalable signup flow (–40% setup time)",
                    "Integrated referral links (+30% engagement, +20% business)",
                    "Streamlined deployments via Azure, reducing resource errors by 15%"
                  ],
                  tech: ["React.js", "Node.js", "MongoDB", "Azure DevOps", "HubSpot CRM"]
                },
                {
                  name: "ShipStation | Web-Based Shipping Platform",
                  highlights: [
                    "Integrated 15+ modules with optimized APIs, boosting performance 40%",
                    "Enhanced client satisfaction (+15%) and cut iteration cycles (–20%) via effective communication",
                    "Reduced defects 20% with Jest & Mocha tests",
                    "Led a team of 7; onboarded 5+ members to improve team efficiency"
                  ],
                  tech: ["Node.js", "SOAP APIs", "REST APIs", "Jest", "Mocha"]
                }
              ]}
            />
          </div>
        </div>
      </motion.section>

      {/* Notable Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="px-6 py-20 relative z-10"
      >
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          >
            <GradientText>Notable Projects</GradientText>
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Google RMI Demo",
                badge: "Current",
                badgeColor: "blue",
                description: "Traffic Intelligence Platform",
                details: "Production-grade full-stack platform with interactive 3D maps, route reliability metrics, and congestion analytics. Built with React 19, TypeScript, FastAPI, Deck.gl, and Google BigQuery.",
                tech: ["React 19", "TypeScript", "FastAPI", "Deck.gl", "Google BigQuery", "GCP", "Docker"],
              },
              {
                title: "SmartMarket.ai",
                badge: "SaaS Platform",
                badgeColor: "green",
                description: "Geospatial Intelligence Platform",
                details: "SaaS platform with scalable RBAC, automated deployments, and visual regression testing. Achieved 40% faster project management and 2× faster releases.",
                tech: ["React", "TypeScript", "Docker", "Ansible", "Playwright", "RBAC"],
              },
              {
                title: "Morehands Mobile App",
                description: "iOS/Android Application",
                details: "Led team of 4 on full-stack mobile development. Reduced load times by 30%, boosted engagement 50%, and cut crashes by 15%. Integrated analytics and push notifications.",
                tech: ["Ionic", "Salesforce", "Firebase", "Google Analytics", "FCM"],
              },
              {
                title: "ShipStation Integration",
                description: "Web-Based Shipping Platform",
                details: "Integrated 15+ modules with optimized APIs, boosting performance 40%. Led team of 7, reduced defects 20% with comprehensive testing, and improved client satisfaction 15%.",
                tech: ["Node.js", "SOAP APIs", "REST APIs", "Jest", "Mocha"],
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -10 }}
                className="group relative rounded-lg border border-zinc-200 bg-white p-6 shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-black"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-black dark:text-zinc-50">{project.title}</h3>
                    {project.badge && (
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        project.badgeColor === "blue" 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}>
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
                  <p className="mb-4 text-zinc-600 dark:text-zinc-400">{project.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.1 }}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="px-6 py-20 relative z-10"
      >
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          >
            <GradientText>Education</GradientText>
          </motion.h2>
          <div className="space-y-6">
            {[
              { degree: "Bachelor of Technology", school: "University College of Engineering and Technology (VBU)", location: "Hazaribagh, Jharkhand", year: "2021 - CGPA 7.59" },
              { degree: "Higher Secondary School", school: "DAV School, Bhaga", location: "Jharkhand", year: "2017 - Percentage 68" },
              { degree: "Senior Secondary School", school: "Lions Public School, Sindri", location: "Jharkhand", year: "2014 - CGPA 10" },
            ].map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 0 }}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-black dark:text-zinc-50">{edu.degree}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{edu.school}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">{edu.location}</p>
                  </div>
                  <p className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:mt-0">{edu.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Languages Section */}
      <motion.section
        id="languages"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-50 px-6 py-20 dark:bg-zinc-950 relative z-10"
      >
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center text-3xl font-bold sm:text-4xl"
          >
            <GradientText>Languages</GradientText>
          </motion.h2>
          <div className="flex justify-center gap-8">
            {["English", "Hindi"].map((lang, index) => (
              <motion.div
                key={lang}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring" }}
                whileHover={{ scale: 1.2 }}
                className="text-center"
              >
                <p className="text-lg font-semibold text-black dark:text-zinc-50">{lang}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="px-6 py-20 relative z-10"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-3xl font-bold sm:text-4xl"
          >
            <GradientText>Let&apos;s Connect</GradientText>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-lg text-zinc-600 dark:text-zinc-400"
          >
            I&apos;m always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology. Open to Senior Full-Stack / Geospatial roles.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { href: "mailto:m.imran.ansari.2020@gmail.com", label: "📧 Email" },
              { href: "https://www.linkedin.com/in/imran-ansari-a4b178199/", label: "💼 LinkedIn", external: true },
              { href: "tel:+918797005465", label: "📞 +91 8797005465" },
            ].map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="rounded-lg border-2 border-zinc-200 bg-white px-6 py-3 text-zinc-600 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-400 cursor-pointer"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-sm text-zinc-500 dark:text-zinc-500"
          >
            📍 Gurgaon, India, 122018
          </motion.p>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-zinc-200 px-6 py-8 dark:border-zinc-800 relative z-10"
      >
        <div className="mx-auto max-w-4xl text-center text-sm text-zinc-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} Imran Ansari. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
