import { useStore } from '../../store/useStore';
import type { PortfolioModule } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export function OverlayManager() {
  const appState = useStore((state) => state.appState);
  const activeModule = useStore((state) => state.activeModule);
  const setAppState = useStore((state) => state.setAppState);
  const setActiveModule = useStore((state) => state.setActiveModule);

  const handleHomeClick = () => {
    setActiveModule(null);
    setAppState('IDLE');
  };

  const renderModuleContent = (module: PortfolioModule) => {
    switch (module) {
      case 'ABOUT':
        return (
          <>
            <h2 className="text-heading-m neon-border" style={{ padding: '8px 16px', borderRadius: 8, display: 'inline-block' }}>About Me</h2>
            <p className="text-body-m" style={{ marginTop: 16 }}>
              I am a Full-Stack Architect specialized in building immersive web experiences and scalable backend architectures.
            </p>
            <button className="glow-hover" style={{ marginTop: 24, padding: '12px 24px', background: 'var(--color-nebula-pink)', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', font: 'var(--font-heading-s)' }}>
              ❤️ Meet the Human Behind the Code
            </button>
          </>
        );
      case 'SKILLS':
        return (
          <>
            <h2 className="text-heading-m" style={{ color: 'var(--color-nebula-blue)' }}>Frontend Stack</h2>
            <ul className="text-body-m" style={{ marginTop: 16, lineHeight: '2' }}>
              <li><strong>Roots:</strong> JavaScript, TypeScript</li>
              <li><strong>Trunk:</strong> React, Next.js</li>
              <li><strong>Leaves:</strong> Zustand, GSAP, R3F, Vanilla CSS</li>
            </ul>
          </>
        );
      case 'PROJECTS':
        return (
          <>
            <h2 className="text-heading-m" style={{ color: 'var(--color-solar-gold)' }}>Project Solar System</h2>
            <p className="text-body-m" style={{ marginTop: 16 }}>
              A collection of architectural designs and full-stack solutions.
            </p>
            <div style={{ marginTop: 24 }}>
              <a href="#" style={{ color: 'var(--color-nebula-blue)', textDecoration: 'none' }} className="text-code glow-hover">[ View GitHub Repository ]</a>
            </div>
          </>
        );
      case 'EDUCATION':
        return (
          <>
            <h2 className="text-heading-m" style={{ color: 'var(--color-cosmic-purple)' }}>Education Constellation</h2>
            <ul className="text-body-m" style={{ marginTop: 16, lineHeight: '2' }}>
              <li>B.S. Computer Science</li>
              <li>AWS Certified Solutions Architect</li>
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
      {/* Loading Overlay */}
      <AnimatePresence>
        {appState === 'LOADING' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0F', pointerEvents: 'all' }}
          >
            <h1 className="text-display-xl" style={{ color: 'var(--color-star-white)' }}>LOADING...</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle Overlay */}
      <AnimatePresence>
        {appState === 'IDLE' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => setAppState('TRANSITION')}
            style={{ 
              position: 'absolute', 
              top: '5%', 
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              background: 'rgba(10, 10, 15, 0.65)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '30px',
              padding: '16px 32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              pointerEvents: 'all',
              cursor: 'pointer'
            }}
          >
            <h1 className="text-heading-m" style={{ margin: 0, color: 'var(--color-star-white)', letterSpacing: '1px' }}>The Architect - Full-Stack Developer</h1>
            <p className="text-body-s" style={{ color: 'var(--color-nebula-blue)', marginTop: 6, letterSpacing: '2px', textTransform: 'uppercase' }}>[ Click Here to Explore Portfolio ]</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent UI (Portfolio Mode) */}
      <AnimatePresence>
        {appState === 'PORTFOLIO' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            {/* Top Left: Home Button */}
            <button 
              className="glow-hover text-heading-s"
              onClick={handleHomeClick}
              style={{ position: 'absolute', top: 32, left: 32, padding: '12px 24px', background: 'transparent', border: '1px solid var(--color-star-white)', borderRadius: 8, color: 'var(--color-star-white)', pointerEvents: 'all' }}
            >
              HOME
            </button>

            {/* Top Right: CV & Toggle */}
            <div style={{ position: 'absolute', top: 32, right: 32, display: 'flex', flexDirection: 'column', gap: 16, pointerEvents: 'all' }}>
              <button 
                className="glow-hover text-heading-s"
                style={{ padding: '12px 24px', background: 'var(--color-solar-gold)', border: 'none', borderRadius: 8, color: '#000', fontWeight: 'bold' }}
              >
                Download CV
              </button>
              <button 
                className="glow-hover text-body-s"
                style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--color-meteor-gray)', borderRadius: 8, color: 'var(--color-meteor-gray)' }}
              >
                Switch to 2D Mode
              </button>
            </div>

            {/* Information Panel (Right side) */}
            <AnimatePresence>
              {activeModule && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="hologram-panel scan-line-container"
                  style={{ position: 'absolute', top: '20%', right: '5%', width: 400, padding: 32, pointerEvents: 'all' }}
                >
                  <div className="scan-line" />
                  
                  {/* Close button */}
                  <button 
                    onClick={() => setActiveModule(null)}
                    style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: 'var(--color-meteor-gray)', cursor: 'pointer', fontSize: 24 }}
                  >
                    ×
                  </button>
                  
                  {renderModuleContent(activeModule)}
                  
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
