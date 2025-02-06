"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SecurePanel } from "@/components/secure-panel"
import { ChangeAccessKey } from "@/components/change-access-key"
import { ChangeDiscordWebhook } from "@/components/change-discord-webhook"
import { SendLogsToDiscord } from "@/components/send-logs-to-discord"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const handleLogin = () => {
    if (password === "123ooo") {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
        <Card className="w-[350px] bg-black/90 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-white">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-900/50 border-orange-500/30 text-white"
              />
              <Button onClick={handleLogin} className="bg-orange-500 hover:bg-orange-600 text-white">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        <ChangeAccessKey />
        <ChangeDiscordWebhook />
        <SendLogsToDiscord />
        <SecurePanel />
      </div>
    </div>
  )
}

