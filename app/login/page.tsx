"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react" // Added import for React

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [accessKey, setAccessKey] = useState("123ooo")
  const router = useRouter()

  useEffect(() => {
    const storedKey = localStorage.getItem("loginAccessKey")
    if (storedKey) {
      setAccessKey(storedKey)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === accessKey) {
      localStorage.setItem("isLoggedIn", "true")
      router.push("/")
    } else {
      alert("Incorrect password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="absolute inset-0 bg-black/20"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10"
      >
        <Card className="w-[400px] bg-black/90 border-orange-500/30">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-16 w-16 text-orange-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-center text-white">spacerpc</CardTitle>
            <CardDescription className="text-center text-zinc-400">
              Secure access to your recovery tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter master password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900/50 border-orange-500/30 text-white pl-10 pr-10 focus-visible:ring-orange-500"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                Unlock Vault
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <div className="absolute bottom-4 text-zinc-400 text-sm">© 2025 spacerpc. All rights reserved.</div>
    </div>
  )
}

