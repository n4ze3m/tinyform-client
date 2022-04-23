import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeBody from './components/Home/HomeBody'
import LoginBody from './components/Login/LoginBody'
import RegisterBody from './components/Register/RegisterBody'
import DasboardBody from './components/Dashboard/DasboardBody'
import DetailsBody from './components/Details/DetailsBody'
import CreateBody from './components/Create/CreateBody'
import Layout from './components/Common/Layout'
import Protect from './components/Common/Protect'

function App() {

  return (

    <Routes>
      <Route path="/" element={<Layout />} >

        <Route path="/" element={<HomeBody />} />
        <Route path="login" element={<LoginBody />} />
        <Route path="register" element={<RegisterBody />} />

        <Route path="dashboard" element={
          <Protect>
            <DasboardBody />
          </Protect>

        } />
        <Route path="dashboard/form/create" element={
          <Protect>
            <CreateBody />
          </Protect>

        } />
        <Route path="dashboard/form/details/:id" element={
          <Protect>
            <DetailsBody />
          </Protect>

        } />
      </Route>
    </Routes>
  )
}

export default App
