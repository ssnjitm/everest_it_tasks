import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMapData, useServerTime } from './hooks/useTrafficData';
import Sidebar from './components/Sidebar';
import TrafficMap from './components/TrafficMap';

const queryClient = new QueryClient();

const Dashboard: React.FC = () => {
  const { data: points, isLoading, isError } = useMapData();
  const { data: timeData } = useServerTime();

  if (isError) return (
    <div className="h-screen flex items-center justify-center bg-red-50 text-red-600 font-medium">
      Failed to connect to backend API.
    </div>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar data={points} serverTime={timeData?.time} />
      
      <main className="flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 z-50 bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <span className="text-slate-500 font-medium animate-pulse">Loading Map Assets...</span>
            </div>
          </div>
        ) : (
          <TrafficMap data={points || []} />
        )}
      </main>
    </div>
  );
};

// Root wrapper for TanStack Query
const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Dashboard />
  </QueryClientProvider>
);

export default App;