import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import HomeBody from './components/Home/HomeBody'
import LoginBody from './components/Login/LoginBody'
import RegisterBody from './components/Register/RegisterBody'
import DasboardBody from './components/Dashboard/DasboardBody'
import DetailsBody from './components/Details/DetailsBody'
import { MantineProvider } from '@mantine/core'
import CreateBody from './components/Create/CreateBody'

function App() {

  return (
    <MantineProvider withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeBody />} />
          <Route path="login" element={<LoginBody />} />
          <Route path="register" element={<RegisterBody />} />
          <Route path="dashboard" element={<DasboardBody />} />
          <Route path="dashboard/form/create" element={<CreateBody />} />
          <Route path="dashboard/form/details/:id" element={<DetailsBody />} />
        </Routes>
      </HashRouter>
    </MantineProvider>
  )
}

export default App
