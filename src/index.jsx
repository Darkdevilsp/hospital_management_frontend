import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClient and QueryClientProvider
import App from './App';

const queryClient = new QueryClient(); // Initialize QueryClient

const Index = () => {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>       
        </Router>
    );
};

export default Index;
