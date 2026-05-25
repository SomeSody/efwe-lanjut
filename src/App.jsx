import React, { Component, Suspense, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'

const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))

const Dashboard = React.lazy(() => import("./pages/main/Dashboard"))
const Orders = React.lazy(() => import("./pages/main/Orders"))
const Customer = React.lazy(() => import("./pages/main/Customer"))
const Produk = React.lazy(() => import("./pages/main/Produk"))
const ProductDetail = React.lazy(() => import("./pages/main/ProductDetail"))
const CustomerDetail = React.lazy(() => import("./pages/main/CustomerDetail"))
const OrderDetail = React.lazy(() => import("./components/OrderDetail"))
const FiturXyx = React.lazy(() => import("./pages/main/FiturXyz"))

const NotFound = React.lazy(() => import("./pages/main/NotFound"))
const Error400 = React.lazy(() => import("./pages/main/Error400"))
const Error401 = React.lazy(() => import("./pages/main/Error401"))
const Error403 = React.lazy(() => import("./pages/main/Error403"))

const Login = React.lazy(() => import("./pages/Auth/Login"))
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"))
const Register = React.lazy(() => import("./pages/Auth/Register"))
const Components = React.lazy(() => import("./pages/main/Components"))

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
            <Route path="/customer/:id" element={<CustomerDetail />} />
            <Route path="/orders/:id" element={<OrderDetail />} /> 
            <Route path="/produk" element={<Produk />} />
            <Route path="/products/:id" element={<ProductDetail />} /> 
            <Route path="/components" element={<Components />} />
            <Route path="/fitur-xyz" element={<FiturXyx />} />

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
