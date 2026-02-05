"use client"

import React, { createContext, useContext, useEffect } from "react"
import { useAuth } from "@/features/auth/hooks"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
    user: any | null
    isLoading: boolean
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const isPublicPath = pathname === "/login" || pathname === "/signup" || pathname === "/verify-email" || pathname === "/forgot-password" || pathname === "/reset-password" || pathname === "/"

    useEffect(() => {
        if (!isLoading && !data?.user && !isPublicPath) {
            router.push("/login")
        }
        if (!isLoading && data?.user && isPublicPath) {
            router.push("/")
        }
    }, [data, isLoading, isPublicPath, router])

    const value = {
        user: data?.user || null,
        isLoading,
        isAuthenticated: !!data?.user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useUser must be used within an AuthProvider")
    }
    return context
}
