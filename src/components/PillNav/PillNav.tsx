import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu } from 'lucide-react';
import { Logo } from '../Logo';
import './PillNav.css';

export interface NavItem {
  label: string;
  href: string;
}

export interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: NavItem[];
  activeHref?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
  className?: string;
  onItemClick?: (href: string) => void;
  onEnterDashboard?: () => void;
  onOpenSignIn?: () => void;
  onToggleMobileMenu?: () => void;
}

export const PillNav: React.FC<PillNavProps> = ({
  items,
  activeHref = '/sources',
  ease = 'power3.easeOut',
  baseColor = '#192837',
  pillColor = '#7342E2',
  pillTextColor = '#ffffff',
  className = '',
  onItemClick,
  onEnterDashboard,
  onOpenSignIn,
  onToggleMobileMenu
}) => {
  const [currentHref, setCurrentHref] = useState(activeHref);
  const pillRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentHref(activeHref);
  }, [activeHref]);

  useEffect(() => {
    if (!navContainerRef.current || !pillRef.current) return;

    const activeItem = navContainerRef.current.querySelector<HTMLElement>(`[data-href="${currentHref}"]`);
    if (activeItem) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      const left = itemRect.left - containerRect.left;
      const width = itemRect.width;

      gsap.to(pillRef.current, {
        left: `${left}px`,
        width: `${width}px`,
        duration: 0.45,
        ease: ease,
        backgroundColor: pillColor
      });
    }
  }, [currentHref, ease, pillColor]);

  const handleLinkClick = (href: string) => {
    setCurrentHref(href);
    if (onItemClick) {
      onItemClick(href);
    }
  };

  return (
    <div className={`pill-nav-container ${className}`}>
      {/* Brand Logo & Mobile-Visible Title */}
      <div
        className="flex items-center gap-2.5 cursor-pointer select-none"
        onClick={() => handleLinkClick('/sources')}
      >
        <Logo size={32} />
        <div>
          <span className="font-heading text-sm sm:text-[16px] tracking-tight text-[#192837] block leading-none font-bold">
            TD Water Grid
          </span>
          <span className="hidden sm:block text-[10px] font-bold text-[#4B5563] tracking-wider uppercase mt-0.5">
            Talegaon Dabhade
          </span>
        </div>
      </div>

      {/* Pill Navigation Links (Desktop) */}
      <div
        ref={navContainerRef}
        className="pill-nav-links-wrapper hidden md:flex"
        style={{ color: baseColor }}
      >
        {/* Animated Active Pill Indicator */}
        <div ref={pillRef} className="pill-active-bg" />

        {items.map((item) => {
          const isActive = currentHref === item.href;
          return (
            <button
              key={item.href}
              data-href={item.href}
              onClick={() => handleLinkClick(item.href)}
              className="pill-nav-link"
              style={{
                color: isActive ? pillTextColor : baseColor,
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right Actions & Pill Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={onEnterDashboard}
          className="bg-[#7342E2] hover:bg-[#7342E2]/90 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all border-none cursor-pointer"
        >
          Enter Dashboard
        </button>

        <button
          onClick={onOpenSignIn}
          className="bg-[#F2F2EE] hover:bg-white text-[#192837] text-xs font-semibold px-5 py-2.5 rounded-full border border-[rgba(25,40,55,0.12)] transition-all cursor-pointer"
        >
          Sign In
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-full bg-[rgba(25,40,55,0.08)] text-[#192837] border-none cursor-pointer active:scale-95 transition-transform"
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={22} />
        </button>
      </div>
    </div>
  );
};

export default PillNav;
