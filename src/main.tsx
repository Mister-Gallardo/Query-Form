import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({defaultOptions: {
  queries: {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  }
}});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  </React.StrictMode>,
)
