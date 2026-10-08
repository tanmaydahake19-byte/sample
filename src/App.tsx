import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { SignInModal } from './components/SignInModal';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'hero' | 'dashboard'>('hero');
  const [signInOpen, setSignInOpen] = useState(false);

  const handleNavigateSection = (section: string) => {
    if (section === 'hero') {
      setCurrentScreen('hero');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#192837] flex flex-col font-body selection:bg-[#7342E2] selection:text-white">
      {/* Vercel Analytics */}
      <Analytics />

      {/* Shared Navbar */}
      <Navbar
        onEnterDashboard={() => setCurrentScreen('dashboard')}
        onOpenSignIn={() => setSignInOpen(true)}
        onNavigateSection={handleNavigateSection}
        currentScreen={currentScreen}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentScreen === 'hero' ? (
          <Hero onEnterDashboard={() => setCurrentScreen('dashboard')} />
        ) : (
          <Dashboard onBackToHero={() => setCurrentScreen('hero')} />
        )}
      </main>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSuccess={() => setCurrentScreen('dashboard')}
      />
    </div>
  );
};

export default App;
