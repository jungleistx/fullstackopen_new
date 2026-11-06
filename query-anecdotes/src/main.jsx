import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'
import { NotifyContextProvider } from './components/NotifyContext.jsx'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotifyContextProvider>
      <App />
    </NotifyContextProvider>
  </QueryClientProvider>
)