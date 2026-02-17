'use client';

import { useEffect, useState } from 'react';
import { fetchBackendHealth } from '@/lib/api';

interface HealthStatus {
  status: string;
  error?: string;
  data?: {
    status: string;
    timestamp: string;
  };
}

export function HealthCheck() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      setLoading(true);
      const result = await fetchBackendHealth();
      setHealth(result as HealthStatus);
      setLoading(false);
    };

    checkHealth();
    // Recheck every 10 seconds
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        <span className="text-sm text-gray-600">Checking backend...</span>
      </div>
    );
  }

  if (health?.status === 'connected') {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg border border-green-300">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span className="text-sm text-green-700">
          Backend Connected
          {health.data?.timestamp && (
            <span className="text-xs text-green-600 ml-2">
              ({new Date(health.data.timestamp).toLocaleTimeString()})
            </span>
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg border border-red-300">
      <div className="w-2 h-2 bg-red-500 rounded-full" />
      <span className="text-sm text-red-700">
        Backend Error: {health?.error || 'Unknown error'}
      </span>
    </div>
  );
}
