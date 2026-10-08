import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Activity, ShieldCheck, ArrowRightCircle } from 'lucide-react';
import GlassSurface from './GlassSurface/GlassSurface';

interface HeroProps {
  onEnterDashboard: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterDashboard }) => {
  // Shared Animation Variant
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-20px)] flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 bg-[#F4F5F7]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4"
          type="video/mp4"
        />
      </video>

      {/* Light Overlay for Legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#F4F5F7]/85 via-[#F4F5F7]/75 to-[#F4F5F7]/95 backdrop-blur-[1px]" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-8 pt-4 sm:pt-10 pb-8 sm:pb-12 flex-1 flex flex-col justify-center items-center">
        <div className="max-w-[680px] w-full mx-auto text-center flex flex-col items-center">
          
          {/* Responsive Mobile-Optimized Heading <h1> */}
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-heading text-2xl sm:text-4xl md:text-5xl leading-tight sm:leading-none tracking-tight text-[#192837] text-center mb-4 sm:mb-6 font-bold"
          >
            <span className="block text-xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">
              Monitor <Droplets className="inline w-5 h-5 sm:w-7 sm:h-7 text-[#192837] relative -top-[2px] mx-0.5" /> Manage <Activity className="inline w-5 h-5 sm:w-7 sm:h-7 text-[#192837] relative -top-[2px] mx-0.5" /> Sustain
            </span>
            <span className="block text-2xl sm:text-4xl md:text-5xl text-[#192837]">
              Talegaon Dabhade Water Grid <ShieldCheck className="inline w-5 h-5 sm:w-8 sm:h-8 text-[#7342E2] relative -top-[2px] ml-1" />
            </span>
          </motion.h1>

          {/* Subtext <p> */}
          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-body text-xs sm:text-base md:text-lg text-[#4B5563] font-medium max-w-[560px] leading-relaxed text-center mb-6 sm:mb-8 px-2"
          >
            Real-time telemetry, reservoir levels, and operational intelligence for municipal water supply. Built for authorized operators.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.96 }}
              onClick={onEnterDashboard}
              className="w-full sm:w-auto bg-[#7342E2] text-white font-semibold rounded-[50px] px-6 py-4 min-w-[210px] text-sm sm:text-base shadow-[0_4px_24px_rgba(115,66,226,0.32)] flex items-center justify-between gap-6 border-none cursor-pointer transition-shadow"
            >
              <span>Enter Dashboard</span>
              <ArrowRightCircle className="w-5 h-5 text-white flex-shrink-0" />
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Hero Bottom Key Metrics Strip: Mobile-Optimized 2x2 Grid */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-8 pb-6 sm:pb-8">
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={24}
          brightness={95}
          opacity={0.98}
          blur={16}
          backgroundOpacity={0.8}
          className="p-4 sm:p-6 shadow-md border border-[rgba(25,40,55,0.08)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white/60 p-3 sm:p-4 rounded-xl border border-[rgba(25,40,55,0.06)]">
              <div className="text-[10px] sm:text-xs font-bold text-[#4B5563] uppercase tracking-wider">
                Operational Stations
              </div>
              <div className="text-base sm:text-2xl font-heading text-[#192837] font-bold mt-1">
                5 Intake Nodes
              </div>
            </div>

            <div className="bg-white/60 p-3 sm:p-4 rounded-xl border border-[rgba(25,40,55,0.06)]">
              <div className="text-[10px] sm:text-xs font-bold text-[#4B5563] uppercase tracking-wider">
                Total Water Reserve
              </div>
              <div className="text-base sm:text-2xl font-heading text-[#7342E2] font-bold mt-1">
                63,400 Litres
              </div>
            </div>

            <div className="bg-white/60 p-3 sm:p-4 rounded-xl border border-[rgba(25,40,55,0.06)]">
              <div className="text-[10px] sm:text-xs font-bold text-[#4B5563] uppercase tracking-wider">
                Grid Reserve Ratio
              </div>
              <div className="text-base sm:text-2xl font-heading text-[#192837] font-bold mt-1">
                66.7% Optimal
              </div>
            </div>

            <div className="bg-white/60 p-3 sm:p-4 rounded-xl border border-[rgba(25,40,55,0.06)]">
              <div className="text-[10px] sm:text-xs font-bold text-[#4B5563] uppercase tracking-wider">
                Telemetry Link
              </div>
              <div className="text-base sm:text-2xl font-heading text-[#059669] font-bold mt-1 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
                Active SCADA
              </div>
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
};
