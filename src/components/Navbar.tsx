import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PillNav, { NavItem } from './PillNav/PillNav';
import GlassSurface from './GlassSurface/GlassSurface';
import { Logo } from './Logo';

interface NavbarProps {
  onEnterDashboard: () => void;
  onOpenSignIn: () => void;
  onNavigateSection?: (section: string) => void;
  currentScreen?: 'hero' | 'dashboard';
}

export const Navbar: React.FC<NavbarProps> = ({
  onEnterDashboard,
  onOpenSignIn,
  onNavigateSection,
}) => {
  const [activeHref, setActiveHref] = useState('/sources');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Sources', href: '/sources' },
    { label: 'Operations', href: '/operations' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Reports', href: '/reports' },
    { label: 'Access', href: '/access' }
  ];

  const handleItemClick = (href: string) => {
    setActiveHref(href);
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      if (href === '/sources') onNavigateSection('hero');
      else onNavigateSection('dashboard');
    }
  };

  return (
    <>
      {/* Floating GlassSurface Container for PillNav */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={50}
          brightness={70}
          opacity={0.95}
          blur={16}
          backgroundOpacity={0.55}
          saturation={1.2}
          className="shadow-lg !p-0"
          style={{ minWidth: 'min(96vw, 920px)' }}
        >
          <PillNav
            logoAlt="TD Water Grid"
            items={navItems}
            activeHref={activeHref}
            ease="power3.easeOut"
            baseColor="#192837"
            pillColor="#7342E2"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#ffffff"
            initialLoadAnimation={true}
            className="!bg-transparent"
            onItemClick={handleItemClick}
            onEnterDashboard={onEnterDashboard}
            onOpenSignIn={onOpenSignIn}
            onToggleMobileMenu={() => setMobileMenuOpen(true)}
          />
        </GlassSurface>
      </div>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-[rgba(25,40,55,0.4)] backdrop-blur-[6px]"
            />

            {/* Slide-in Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-0 right-0 z-50 w-[min(88vw,360px)] h-[100dvh] p-2"
            >
              <GlassSurface
                width="100%"
                height="100%"
                borderRadius={28}
                brightness={85}
                opacity={0.98}
                blur={20}
                backgroundOpacity={0.9}
                className="flex flex-col justify-between py-6 px-4 shadow-2xl"
              >
                <div>
                  {/* Sheet Header */}
                  <div className="px-2 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Logo size={32} />
                      <span className="font-heading text-base text-[#192837]">
                        TDWG Mobile
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-10 h-10 rounded-full bg-[rgba(25,40,55,0.08)] flex items-center justify-center text-[#192837] border-none cursor-pointer"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>

                  {/* Sheet Divider */}
                  <div className="h-[1px] bg-[rgba(25,40,55,0.12)] mx-2 mb-6" />

                  {/* Sheet Nav Links */}
                  <div className="flex flex-col gap-2">
                    {navItems.map((item, i) => (
                      <motion.button
                        key={item.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.18 + i * 0.07,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onClick={() => handleItemClick(item.href)}
                        className="text-left text-[1.1rem] font-medium text-[#192837] px-4 py-3 rounded-xl hover:bg-black/10 transition-colors border-none bg-transparent cursor-pointer"
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Sheet CTA Buttons */}
                <div className="flex flex-col gap-3 mt-8">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onEnterDashboard();
                    }}
                    className="w-full bg-[#7342E2] text-white text-[0.95rem] font-semibold py-3.5 rounded-full shadow-md text-center border-none cursor-pointer"
                  >
                    Enter Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSignIn();
                    }}
                    className="w-full bg-[#F2F2EE] text-[#192837] text-[0.95rem] font-semibold py-3.5 rounded-full border border-[rgba(25,40,55,0.12)] text-center cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </GlassSurface>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
