// HPI 1.7-V
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ChevronRight, 
  Trophy, 
  Calendar, 
  Users, 
  Flag, 
  Activity, 
  Timer, 
  Zap, 
  ArrowUpRight,
  Gauge
} from 'lucide-react';

// --- Utility Components ---

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-red/50 to-transparent opacity-30 my-0" />
);

const GridOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" 
       style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
  />
);

const MarqueeItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-8 mx-8">
    <span className="text-4xl md:text-6xl font-heading font-black text-transparent stroke-text opacity-30 uppercase tracking-tighter" 
          style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.5)' }}>
      {text}
    </span>
    <Zap className="w-6 h-6 text-accent-red opacity-50" />
  </div>
);

// --- Main Component ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-dark-charcoal text-foreground overflow-clip selection:bg-accent-red selection:text-white">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-dark-charcoal z-10" />
          <div className="absolute inset-0 bg-dark-charcoal/20 z-10 mix-blend-multiply" />
          <Image
            src="https://static.wixstatic.com/media/7747cb_4c6010662a8046c3b7e05ae010de3320~mv2.png?originWidth=1920&originHeight=1024"
            alt="F1 Hero Car"
            className="w-full h-full object-cover scale-105"
            width={1920}
          />
        </motion.div>

        {/* Grid & Tech Overlays */}
        <GridOverlay />
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-32 left-8 md:left-16 w-px h-32 bg-gradient-to-b from-accent-red to-transparent" />
          <div className="absolute bottom-32 right-8 md:right-16 w-px h-32 bg-gradient-to-t from-accent-red to-transparent" />
          <div className="absolute top-1/2 left-8 md:left-16 w-12 h-1 bg-white/20" />
          <div className="absolute top-1/2 right-8 md:right-16 w-12 h-1 bg-white/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-[120rem] mx-auto px-6 md:px-12 flex flex-col justify-end h-full pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 border border-accent-red/50 text-accent-red font-paragraph text-xs tracking-widest uppercase bg-accent-red/5 backdrop-blur-sm">
                Season 2024
              </span>
              <span className="h-px w-12 bg-white/20" />
              <span className="text-light-grey/60 font-paragraph text-xs tracking-widest uppercase">
                Live Telemetry Active
              </span>
            </div>

            <h1 className="font-heading text-7xl md:text-9xl lg:text-[10rem] leading-[0.85] font-black text-white tracking-tighter mb-8 mix-blend-overlay">
              THE CIRCUIT'S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-white">EDGE</span>
            </h1>

            <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16 max-w-4xl">
              <p className="font-paragraph text-light-grey/80 text-lg md:text-xl leading-relaxed max-w-xl border-l-2 border-accent-red pl-6">
                Precision engineering meets raw adrenaline. The ultimate digital command center for the modern Formula 1 enthusiast.
              </p>
              
              <div className="flex gap-4">
                <Link to="/drivers">
                  <button className="group relative px-8 py-4 bg-accent-red text-white font-paragraph font-bold uppercase tracking-wider overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Enter Paddock <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 mix-blend-difference" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-[10px] font-paragraph uppercase tracking-[0.2em] text-white/50">Scroll to Start</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent-red to-transparent" />
        </motion.div>
      </section>

      {/* --- INFINITE MARQUEE --- */}
      <section className="w-full bg-accent-red py-4 overflow-hidden relative z-30 transform -skew-y-1 origin-left border-y-4 border-black">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <MarqueeItem text="SPEED" />
              <MarqueeItem text="PRECISION" />
              <MarqueeItem text="ADRENALINE" />
              <MarqueeItem text="TECHNOLOGY" />
            </React.Fragment>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>

      {/* --- COMMAND CENTER (BENTO GRID) --- */}
      <section className="relative w-full max-w-[120rem] mx-auto px-6 md:px-12 py-32 bg-dark-charcoal z-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
          <div>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4">
              COMMAND <span className="text-accent-red">CENTER</span>
            </h2>
            <p className="font-paragraph text-light-grey/60 max-w-md">
              Access real-time data streams, driver profiles, and technical analysis from the pit wall.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-accent-red font-paragraph text-sm">
            <div className="w-2 h-2 bg-accent-red rounded-full animate-pulse" />
            SYSTEM ONLINE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* Drivers Card - Large */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 row-span-2 group relative overflow-hidden bg-medium-grey rounded-none border border-white/5 hover:border-accent-red/50 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <Image 
              src="https://static.wixstatic.com/media/7747cb_4ea89f256b51429a844be0e2f333e877~mv2.png?originWidth=1152&originHeight=576" 
              alt="Drivers" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-accent-red font-paragraph text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4" />
                    Grid Lineup
                  </div>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">DRIVERS</h3>
                  <p className="font-paragraph text-light-grey/70 max-w-sm text-sm">
                    Detailed telemetry and career statistics for the 20 fastest drivers on the planet.
                  </p>
                </div>
                <Link to="/drivers">
                  <button className="w-12 h-12 bg-accent-red flex items-center justify-center text-white hover:bg-white hover:text-accent-red transition-colors duration-300">
                    <ArrowUpRight className="w-6 h-6" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Standings Card - Tall */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-1 row-span-2 bg-dark-charcoal border border-white/10 p-8 flex flex-col justify-between group hover:bg-white/5 transition-colors duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Trophy className="w-24 h-24 text-white stroke-1" />
            </div>
            <div>
              <div className="w-12 h-1 bg-accent-red mb-6" />
              <h3 className="font-heading text-3xl font-bold text-white mb-4">STANDINGS</h3>
              <ul className="space-y-4 font-paragraph text-sm text-light-grey/60">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>01. VERSTAPPEN</span>
                  <span className="text-white">PTS</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>02. PEREZ</span>
                  <span className="text-white">PTS</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>03. HAMILTON</span>
                  <span className="text-white">PTS</span>
                </li>
              </ul>
            </div>
            <Link to="/standings" className="mt-8 inline-flex items-center gap-2 text-accent-red font-bold uppercase text-sm tracking-wider hover:gap-4 transition-all">
              View Full Table <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Teams Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 bg-medium-grey border border-white/5 p-8 group hover:border-accent-red/50 transition-all duration-300"
          >
            <Flag className="w-8 h-8 text-accent-red mb-4" />
            <h3 className="font-heading text-2xl font-bold text-white mb-2">CONSTRUCTORS</h3>
            <p className="font-paragraph text-sm text-light-grey/60 mb-6">
              Engineering excellence and team heritage.
            </p>
            <Link to="/teams" className="text-white text-sm font-bold uppercase border-b border-accent-red pb-1 hover:text-accent-red transition-colors">
              Inspect Teams
            </Link>
          </motion.div>

          {/* Calendar Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1 bg-medium-grey border border-white/5 p-8 group hover:border-accent-red/50 transition-all duration-300"
          >
            <Calendar className="w-8 h-8 text-accent-red mb-4" />
            <h3 className="font-heading text-2xl font-bold text-white mb-2">RACE CALENDAR</h3>
            <p className="font-paragraph text-sm text-light-grey/60 mb-6">
              Global circuit schedule and track data.
            </p>
            <Link to="/calendar" className="text-white text-sm font-bold uppercase border-b border-accent-red pb-1 hover:text-accent-red transition-colors">
              View Schedule
            </Link>
          </motion.div>

        </div>
      </section>

      {/* --- IMMERSIVE STATS SECTION --- */}
      <section className="relative w-full py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <Image 
              src="https://static.wixstatic.com/media/7747cb_0c9a7beca44842188948345ed931dace~mv2.png?originWidth=1152&originHeight=576" 
              alt="Background Texture" 
              className="w-full h-full object-cover grayscale"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        
        <div className="relative z-20 max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Drivers", value: "20", icon: Users, suffix: "+" },
              { label: "Constructors", value: "10", icon: Flag, suffix: "" },
              { label: "Grand Prix", value: "23", icon: Flag, suffix: "" },
              { label: "Top Speed", value: "370", icon: Gauge, suffix: "KM/H" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border-l border-accent-red/30 pl-8"
              >
                <div className="flex items-center gap-3 mb-2 text-light-grey/50 font-paragraph text-sm uppercase tracking-widest">
                  <stat.icon className="w-4 h-4" />
                  {stat.label}
                </div>
                <div className="font-heading text-6xl md:text-7xl font-black text-white flex items-baseline">
                  {stat.value}
                  <span className="text-2xl text-accent-red ml-1">{stat.suffix}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED HIGHLIGHT (Sticky Scroll) --- */}
      <section className="relative w-full bg-dark-charcoal py-32">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Content */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                  ENGINEERED FOR <br />
                  <span className="text-accent-red">PERFORMANCE</span>
                </h2>
                <p className="font-paragraph text-light-grey/70 text-lg mb-8 leading-relaxed">
                  Formula 1 is the pinnacle of motorsport. Every millimeter counts. Every millisecond matters. Explore the technical marvels that power the grid.
                </p>
                <div className="flex flex-col gap-4">
                  {['Aerodynamics', 'Power Units', 'Strategy', 'Telemetry'].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-12 h-px bg-white/20 group-hover:bg-accent-red group-hover:w-16 transition-all duration-300" />
                      <span className="font-paragraph text-sm uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable Visuals */}
            <div className="lg:w-2/3 flex flex-col gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[16/9] bg-medium-grey overflow-hidden group"
              >
                <div className="absolute inset-0 bg-accent-red/10 mix-blend-overlay z-10" />
                <Image 
                  src="https://static.wixstatic.com/media/7747cb_975a8c5837524123a3da15b172bd9a76~mv2.png?originWidth=2048&originHeight=1152" 
                  alt="Technical Analysis 1" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 bg-black/80 backdrop-blur-md p-6 border-t border-accent-red z-20">
                  <h4 className="text-white font-heading font-bold text-xl">AERODYNAMIC EFFICIENCY</h4>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[16/9] bg-medium-grey overflow-hidden group"
              >
                 <div className="absolute inset-0 bg-accent-red/10 mix-blend-overlay z-10" />
                <Image 
                  src="https://static.wixstatic.com/media/7747cb_3244278549974b359be6a498f780bf47~mv2.png?originWidth=2048&originHeight=1152" 
                  alt="Technical Analysis 2" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 bg-black/80 backdrop-blur-md p-6 border-t border-accent-red z-20">
                  <h4 className="text-white font-heading font-bold text-xl">HYBRID POWER UNITS</h4>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative w-full py-32 bg-accent-red overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent-red via-accent-red to-black/50" />
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              LIGHTS OUT <br />
              AND AWAY WE GO
            </h2>
            <p className="font-paragraph text-white/90 text-xl mb-12 max-w-2xl mx-auto">
              Don't miss a single overtake. Join the ultimate F1 community and track the championship battle live.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link to="/drivers">
                <button className="px-10 py-5 bg-white text-accent-red font-heading font-bold text-xl uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Your Engines
                </button>
              </Link>
              <Link to="/calendar">
                <button className="px-10 py-5 bg-transparent border-2 border-white text-white font-heading font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-accent-red transition-all duration-300">
                  View Calendar
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}