import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './Index.css';
import Index from './index';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Create a root with createRoot
const root = createRoot(document.getElementById('root'));

// Wrap your application with QueryClientProvider
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Index />
    </QueryClientProvider>
  </React.StrictMode>
);
