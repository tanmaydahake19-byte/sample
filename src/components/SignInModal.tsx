import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import { Logo } from './Logo';
import GlassSurface from './GlassSurface/GlassSurface';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [empId, setEmpId] = useState('ENG-TALEGAON-01');
  const [password, setPassword] = useState('••••••••••••');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[rgba(25,40,55,0.45)] backdrop-blur-[4px]"
          />

          {/* Modal Content wrapped in GlassSurface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={28}
              brightness={80}
              opacity={1}
              blur={16}
              backgroundOpacity={0.9}
              className="max-w-[420px] p-6 sm:p-8 pointer-events-auto relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[rgba(25,40,55,0.06)] flex items-center justify-center text-[#192837] hover:bg-[rgba(25,40,55,0.12)] transition-colors border-none cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <Logo size={40} />
                </div>
                <h2 className="font-heading text-xl text-[#192837]">
                  Authorized Access
                </h2>
                <p className="text-xs text-[#192837]/60 font-medium mt-1">
                  Talegaon Dabhade Municipal SCADA Operations
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#192837] mb-1.5">
                    Employee ID / Operator Code
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#192837]/40" />
                    <input
                      type="text"
                      required
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F2F2EE] border border-[rgba(25,40,55,0.12)] rounded-xl text-sm text-[#192837] outline-none focus:border-[#7342E2] focus:ring-2 focus:ring-[#7342E2]/20 transition-all"
                      placeholder="e.g. MUNC-8842"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#192837] mb-1.5">
                    Security Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#192837]/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-[#F2F2EE] border border-[rgba(25,40,55,0.12)] rounded-xl text-sm text-[#192837] outline-none focus:border-[#7342E2] focus:ring-2 focus:ring-[#7342E2]/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#192837]/50 hover:text-[#192837] border-none bg-transparent cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#192837] mb-1.5">
                    2FA Telemetry OTP Code (Optional)
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#192837]/40" />
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit SCADA OTP"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F2F2EE] border border-[rgba(25,40,55,0.12)] rounded-xl text-sm text-[#192837] font-mono outline-none focus:border-[#7342E2] focus:ring-2 focus:ring-[#7342E2]/20 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#7342E2] text-white text-sm font-semibold py-3 rounded-full shadow-md hover:bg-[#7342E2]/95 transition-all mt-2 border-none cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? 'Authenticating SCADA Link...' : 'Sign In to Control Grid'}
                </button>
              </form>

              {/* Legal Notice */}
              <p className="text-[11px] text-[#192837]/50 text-center mt-6 pt-4 border-t border-[rgba(25,40,55,0.12)] leading-relaxed">
                This system is for authorized municipal personnel only. Unauthorized access attempts are monitored and logged.
              </p>
            </GlassSurface>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
