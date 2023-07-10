import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './utils/redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
//import { getSchools, getTopics } from './utils/firebase/firestore/firestore.ts'

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: twentyFourHoursInMs,
    }
  }
});

// queryClient.prefetchQuery({
//   queryKey: ['topics'],
//   queryFn: getTopics,
// });

// queryClient.prefetchQuery({
//   queryKey: ['schools'],
//   queryFn: getSchools,
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className='fixed w-full h-screen bg-background-dark text-text font-quicksand'><App /></div>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
