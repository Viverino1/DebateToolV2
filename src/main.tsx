import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './utils/redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { getSchools, getTopics } from './utils/firebase/firestore/firestore.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: Infinity,
      staleTime: Infinity
    }
  }
});

queryClient.prefetchQuery({
  queryKey: 'topics',
  queryFn: getTopics,
});

queryClient.prefetchQuery({
  queryKey: 'schools',
  queryFn: getSchools,
});

// const localStoragePersistor = createWebStoragePersistor({
//   storage: window.localStorage,
// })

// persistQueryClient({
//   queryClient,
//   persistor: localStoragePersistor,
//   maxAge: Infinity,
//   hydrateOptions: {},
//   dehydrateOptions: {},
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

export{ queryClient }