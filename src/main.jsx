import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './Index.css';
import Index from './index';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Wrap your application with QueryClientProvider
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Index />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
