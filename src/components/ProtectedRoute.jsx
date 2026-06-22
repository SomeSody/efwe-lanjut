import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loading from './Loading'

export default function ProtectedRoute({ children, requiredRole }) {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (requiredRole && profile?.role !== requiredRole) {
        // Redirect to appropriate dashboard based on role
        if (profile?.role === 'member') {
            return <Navigate to="/member/dashboard" replace />
        }
        return <Navigate to="/" replace />
    }

    return children
}
