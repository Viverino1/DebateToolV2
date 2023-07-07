import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='fixed w-full h-screen'>
      <div className='relative w-full h-full'>
        <div className='absolute -z-50 w-full h-full bg-background flex justify-center items-center'>
          <div className='w-96 h-32 bg-primary rounded-full animate-background'></div>
        </div>
        <div className='absolute -z-40 w-full h-full backdrop-blur-3xl'><App /></div>
      </div>
    </div>
  </React.StrictMode>,
)
