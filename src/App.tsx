import Game from './components/Game';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt';

const App = () => {
  return (
    <div className="container px-3 py-1 min-h-screen min-w-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Game />
      <PWAInstallPrompt />
      <PWAUpdatePrompt />
    </div>
  );
};

export default App;
