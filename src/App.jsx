import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './AppLayout/AppLayout'
import { Navbar } from './components/Navbar'
import { Dashboard } from './pages/Dashboard'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css';
import Client from './pages/Client'
import Warehouse from './pages/Warehouse'
import  Flight  from './pages/Flight'
import  Airport  from './pages/Airport'
import Order from './pages/Order'
import Admin from './pages/Admin'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path='' element={<AppLayout/>} />
        <Route element={<AppLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path='clients' element={<Client/>} />
          <Route path='warehouse' element={<Warehouse/>} />
          <Route path='flights' element={<Flight/>}/>
          <Route path='airports' element={<Airport/>}/>
          <Route path='orders' element={<Order/>}/>
          <Route path='admin' element={<Admin/>}/>
          </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
