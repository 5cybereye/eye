"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import type React from "react" // Added import for React

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login")
    } else if (isLoggedIn && pathname === "/login") {
      router.push("/")
    }
    setIsLoading(false)
  }, [pathname, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

