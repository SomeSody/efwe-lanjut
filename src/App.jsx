import { useState } from 'react'
import './App.css'
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import Customer from "./pages/Customer";
import NotFound from "./pages/NotFound";
import Error400 from "./pages/Error400";
import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="app-container" className="bg-gray-100 min-h-screen flex">
        <div id="layout-wrapper" className="flex flex-row flex-1">
          <Sidebar />
          <div className="flex-1 p-4">
            <Header />

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/400" element={<Error400 />} />
              <Route path="/401" element={<Error401 />} />
              <Route path="/403" element={<Error403 />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
