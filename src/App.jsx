import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
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
const Note = React.lazy(() => import("./pages/main/Note"))

const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"))
const Checkout = React.lazy(() => import("./pages/member/Checkout"))
const MemberOrders = React.lazy(() => import("./pages/member/MemberOrders"))

const NotFound = React.lazy(() => import("./pages/main/NotFound"))
const Error400 = React.lazy(() => import("./pages/main/Error400"))
const Error401 = React.lazy(() => import("./pages/main/Error401"))
const Error403 = React.lazy(() => import("./pages/main/Error403"))

const Login = React.lazy(() => import("./pages/Auth/Login"))
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"))
const Register = React.lazy(() => import("./pages/Auth/Register"))
const Components = React.lazy(() => import("./pages/main/Components"))

const Loading = React.lazy(() => import("./components/Loading"))
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"))

function App() {

return (
    <Suspense fallback={<Loading />}>
    <Routes>
        {/* Admin Routes - kept under MainLayout with admin role guard */}
        <Route element={<MainLayout/>}>
            <Route path="/" element={
                <ProtectedRoute requiredRole="admin">
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/orders" element={
                <ProtectedRoute requiredRole="admin">
                    <Orders />
                </ProtectedRoute>
            } />
            <Route path="/customer" element={
                <ProtectedRoute requiredRole="admin">
                    <Customer />
                </ProtectedRoute>
            } />
            <Route path="/customer/:id" element={
                <ProtectedRoute requiredRole="admin">
                    <CustomerDetail />
                </ProtectedRoute>
            } />
            <Route path="/orders/:id" element={
                <ProtectedRoute requiredRole="admin">
                    <OrderDetail />
                </ProtectedRoute>
            } /> 
            <Route path="/produk" element={
                <ProtectedRoute requiredRole="admin">
                    <Produk />
                </ProtectedRoute>
            } />
            <Route path="/products/:id" element={
                <ProtectedRoute requiredRole="admin">
                    <ProductDetail />
                </ProtectedRoute>
            } /> 
            <Route path="/components" element={
                <ProtectedRoute requiredRole="admin">
                    <Components />
                </ProtectedRoute>
            } />
            <Route path="/fitur-xyz" element={
                <ProtectedRoute requiredRole="admin">
                    <FiturXyx />
                </ProtectedRoute>
            } />
            <Route path="/note" element={
                <ProtectedRoute requiredRole="admin">
                    <Note />
                </ProtectedRoute>
            } />

            {/* Member Routes - under MainLayout with member role guard */}
            <Route path="/member/dashboard" element={
                <ProtectedRoute requiredRole="member">
                    <MemberDashboard />
                </ProtectedRoute>
            } />
            <Route path="/member/checkout" element={
                <ProtectedRoute requiredRole="member">
                    <Checkout />
                </ProtectedRoute>
            } />
            <Route path="/member/orders" element={
                <ProtectedRoute requiredRole="member">
                    <MemberOrders />
                </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
            <Route path="/400" element={<Error400 />} />
            <Route path="/401" element={<Error401 />} />
            <Route path="/403" element={<Error403 />} />
        </Route>

        {/* Auth Routes - public */}
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
