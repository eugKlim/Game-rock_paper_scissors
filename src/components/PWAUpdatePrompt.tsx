import { useState, useEffect } from 'react';

export const PWAUpdatePrompt = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [updateServiceWorker, setUpdateServiceWorker] = useState<
    (() => void) | null
  >(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker зарегистрирован:', registration);

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  setShowUpdatePrompt(true);
                  setUpdateServiceWorker(() => () => {
                    newWorker.postMessage({ action: 'skipWaiting' });
                    window.location.reload();
                  });
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('Ошибка регистрации Service Worker:', error);
        });

      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          setShowUpdatePrompt(true);
          setUpdateServiceWorker(() => () => {
            window.location.reload();
          });
        }
      });
    }
  }, []);

  const handleUpdate = () => {
    if (updateServiceWorker) {
      updateServiceWorker();
    }
    setShowUpdatePrompt(false);
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-50 bg-green-600 text-white rounded-lg shadow-lg p-4 max-w-sm border border-white">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🔄</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium">Update available</h3>
          <p className="mt-1 text-sm opacity-90">
            The new version of the application is ready for installation.
          </p>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-white text-green-500 px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={handleDismiss}
              className="bg-white bg-opacity-20 text-black px-3 py-1.5 rounded text-sm font-medium hover:bg-opacity-30 transition-colors"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-red-500 bg-white opacity-70 hover:opacity-100"
        >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
