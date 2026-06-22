import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetch profile from database for the current user
    const fetchProfile = async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (!error && data) {
            setProfile(data)
        }
        return data
    }

    // On mount: check existing session and subscribe to auth changes
    useEffect(() => {
        const initAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) {
                setUser(session.user)
                await fetchProfile(session.user.id)
            }
            setLoading(false)
        }

        initAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setUser(session.user)
                    await fetchProfile(session.user.id)
                } else {
                    setUser(null)
                    setProfile(null)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    // Login with email and password
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error

        if (data.user) {
            setUser(data.user)
            const prof = await fetchProfile(data.user.id)
            return prof
        }
        return null
    }

    // Register with email, password, and full_name
    const register = async (email, password, fullName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: 'member',
                },
            },
        })

        if (error) throw error
        return data
    }

    // Logout
    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        setUser(null)
        setProfile(null)
    }

    // Refresh profile (useful after points/tier update)
    const refreshProfile = async () => {
        if (user) {
            await fetchProfile(user.id)
        }
    }

    const value = {
        user,
        profile,
        loading,
        login,
        register,
        logout,
        refreshProfile,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext
