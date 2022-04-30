import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Montserrat',
      }}
    >
      <NotificationsProvider>
        <HashRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </HashRouter>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
)
