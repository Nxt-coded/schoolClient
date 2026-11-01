import React, { useEffect, useState } from 'react';
import { getAllQueued, removeQueued, updateQueued, processQueue, defaultProcessor } from '@/lib/offlineQueue';

const QueueAdmin: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const all = await getAllQueued();
    setItems(all || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleRetry = async (id: number) => {
    setLoading(true);
    try {
      // bump nextAttemptAt to now and process queue
      await updateQueued(id, { nextAttemptAt: Date.now() });
      await processQueue(defaultProcessor);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    await removeQueued(id);
    await load();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-[90%] max-w-2xl">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Queued Requests</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded" onClick={() => { processQueue(defaultProcessor).then(load); }}>
              Process Now
            </button>
            <button className="px-3 py-1 border rounded" onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="mt-4 max-h-96 overflow-auto">
          {items.length === 0 && <div>No queued items</div>}
          {items.map((it) => (
            <div className="border p-2 rounded mb-2" key={it.id}>
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{it.url}</div>
                  <div className="text-xs text-slate-500">Method: {it.method} • Retries: {it.retryCount || 0}</div>
                  {it.lastError && <div className="text-xs text-red-500">Last Error: {it.lastError}</div>}
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleRetry(it.id)} className="px-2 py-1 bg-blue-500 text-white rounded">Retry</button>
                  <button onClick={() => handleCancel(it.id)} className="px-2 py-1 bg-red-500 text-white rounded">Cancel</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueueAdmin;
