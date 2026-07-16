import './App.css';
import { SceneManager } from './components/scene/SceneManager';
import { OverlayManager } from './components/ui/OverlayManager';
import { PortfolioPage } from './components/ui/PortfolioPage';

function App() {
  return (
    <>
      <SceneManager />
      <OverlayManager />
      <PortfolioPage />
    </>
  );
}

export default App;
