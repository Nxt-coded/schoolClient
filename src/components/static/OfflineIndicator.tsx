import React, { useEffect, useState } from 'react';

const OfflineIndicator: React.FC = () => {
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-4 z-50">
      <div className="bg-red-600 text-white px-4 py-2 rounded shadow-lg text-sm">
        You are offline — some features may be unavailable.
      </div>
    </div>
  );
};

export default OfflineIndicator;
