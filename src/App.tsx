import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeBody from './components/Home/HomeBody'
import LoginBody from './components/Login/LoginBody'
import RegisterBody from './components/Register/RegisterBody'
import DasboardBody from './components/Dashboard/DasboardBody'
import DetailsBody from './components/Details/DetailsBody'
import { MantineProvider } from '@mantine/core'

function App() {

  return (
    <MantineProvider withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeBody />} />
          <Route path="login" element={<LoginBody />} />
          <Route path="register" element={<RegisterBody />} />
          <Route path="dashboard" element={<DasboardBody />} />
          <Route path="form/:id" element={<DetailsBody />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
