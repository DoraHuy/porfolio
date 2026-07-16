import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export function OverlayManager() {
  const appState = useStore((state) => state.appState);

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

      {/* Idle Overlay removed as requested by user (clickable anywhere on screen) */}

      {/* Portfolio UI is now handled by PortfolioPage component */}
    </div>
  );
}
