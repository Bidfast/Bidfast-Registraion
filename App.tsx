import React from 'react';
import { WaitlistForm } from './components/WaitlistForm';
import { Features } from './components/Features';
import { LogoIcon } from './components/ui/Icons';

export default function App() {
  return (
    <div className="min-h-screen w-full relative bg-navy-950 text-white selection:bg-flash-400 selection:text-black font-sans">
      <div className="bg-noise"></div>
      
      <div className="lg:flex min-h-screen">
        
        {/* LEFT COLUMN: BRAND & VISION (Sticky on Desktop) */}
        <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 relative p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden bg-navy-950">
          {/* Ambient Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-navy-800/20 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-flash-400/5 rounded-full blur-[100px]"></div>
             
             {/* Abstract Grid Lines */}
             <div className="absolute inset-0 opacity-10" 
                  style={{
                    backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                  }}>
             </div>
          </div>

          <header className="relative z-10 flex items-center gap-4 pt-4">
             <LogoIcon className="h-10 w-auto text-white" />
          </header>

          <main className="relative z-10 mt-16 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-flash-400/30 rounded-full bg-flash-400/5 mb-8">
              <span className="w-2 h-2 bg-flash-400 rounded-full animate-pulse"></span>
              <span className="text-xs font-mono font-medium text-flash-400 tracking-wider">SYSTEM STATUS: PRE-RELEASE</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-white italic">
              STOP <br/>
              COUNTING.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-flash-400 to-white/80 not-italic">START BIDDING.</span>
            </h1>
            
            <p className="text-lg text-white/60 max-w-md font-light leading-relaxed">
              The first AI-native takeoff engine designed purely for Canadian electricians. We detect the symbols. You win the bids.
            </p>

            <div className="mt-12 hidden lg:block">
              <div className="flex gap-12 font-mono text-xs text-white/40">
                 <div>
                   <p className="text-white mb-1">RELEASE</p>
                   <p>Q1 2026</p>
                 </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 hidden lg:flex justify-between items-end text-xs text-white/30 font-mono">
            <p>© 2025 BIDFAST SYSTEMS INC.</p>
            <p>VANCOUVER, CA</p>
          </footer>
        </div>

        {/* RIGHT COLUMN: ACTION & FEATURES (Scrollable) */}
        <div className="lg:w-1/2 relative z-10 bg-navy-950">
           
           <div className="p-8 md:p-12 lg:p-24 flex flex-col justify-center min-h-screen">
             
             {/* Mobile Release Info (Visible only on mobile) */}
             <div className="lg:hidden mb-12 flex gap-8 font-mono text-xs text-white/40 border-b border-white/10 pb-8">
                 <div>
                   <p className="text-white mb-1">RELEASE</p>
                   <p>Q1 2026</p>
                 </div>
                 <div>
                   <p className="text-white mb-1">PHASE 1</p>
                   <p>SYMBOL DETECTION</p>
                 </div>
              </div>

             <div className="mb-12">
               <h3 className="text-2xl font-bold tracking-tight mb-2 text-white">Secure Early Access</h3>
               <p className="text-white/50">Join the waitlist.</p>
             </div>

             <WaitlistForm />

             <div className="my-16 border-t border-white/10"></div>

             <h3 className="font-mono text-sm tracking-widest text-white/40 mb-8 uppercase">Core Capabilities</h3>
             <Features />

             <footer className="mt-24 lg:hidden text-center text-xs text-white/30 font-mono pb-8">
                <p>© 2025 BIDFAST SYSTEMS INC.</p>
             </footer>
           </div>
        </div>

      </div>
    </div>
  );
}