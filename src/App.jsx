import { useState } from 'react'
import './App.css'
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/main/Dashboard";
import { Routes, Route } from "react-router-dom";
import Orders from "./pages/main/Orders";
import Customer from "./pages/main/Customer";
import NotFound from "./pages/main/NotFound";
import Error400 from "./pages/main/Error400";
import Error401 from "./pages/main/Error401";
import Error403 from "./pages/main/Error403";
import { MainLayout } from './layouts/MainLayout';
import Login from './pages/Auth/Login';
import Forgot from './pages/Auth/Forgot';
import Register from './pages/Auth/Register';
import AuthLayout from './layouts/AuthLayout';

function App() {
  const [count, setCount] = useState(0)

return (
    <Routes>
        <Route element={<MainLayout/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/400" element={<Error400 />} />
            <Route path="/401" element={<Error401 />} />
            <Route path="/403" element={<Error403 />} />
        </Route>
        <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>
  )
}

export default App
