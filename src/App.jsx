import React, { Suspense, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Dashboard from "./pages/main/Dashboard";
// import Orders from "./pages/main/Orders";
// import Customer from "./pages/main/Customer";
// import NotFound from "./pages/main/NotFound";
// import Error400 from "./pages/main/Error400";
// import Error401 from "./pages/main/Error401";
// import Error403 from "./pages/main/Error403";
// import { MainLayout } from './layouts/MainLayout';
// import AuthLayout from './layouts/AuthLayout';
// import Login from './pages/Auth/Login';
// import Forgot from './pages/Auth/Forgot';
// import Register from './pages/Auth/Register';

const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))

const Dashboard = React.lazy(() => import("./pages/main/Dashboard"))
const Orders = React.lazy(() => import("./pages/main/Orders"))
const Customer = React.lazy(() => import("./pages/main/Customer"))

const NotFound = React.lazy(() => import("./pages/main/NotFound"))
const Error400 = React.lazy(() => import("./pages/main/Error400"))
const Error401 = React.lazy(() => import("./pages/main/Error401"))
const Error403 = React.lazy(() => import("./pages/main/Error403"))

const Login = React.lazy(() => import("./pages/Auth/Login"))
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"))
const Register = React.lazy(() => import("./pages/Auth/Register"))

const Loading = React.lazy(() => import("./components/Loading"))



function App() {
  const [count, setCount] = useState(0)

return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  )
}

export default App
