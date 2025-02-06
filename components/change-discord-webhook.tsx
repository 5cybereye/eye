"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle2 } from "lucide-react"
import type React from "react" // Added import for React

export function ChangeDiscordWebhook() {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    const storedUrl = localStorage.getItem("discordWebhookUrl")
    if (storedUrl) {
      setWebhookUrl(storedUrl)
    }
  }, [])

  const handleChangeWebhook = (e: React.FormEvent) => {
    e.preventDefault()
    if (!webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
      toast({
        title: "Error",
        description: "Please enter a valid Discord webhook URL.",
        variant: "destructive",
      })
      return
    }
    localStorage.setItem("discordWebhookUrl", webhookUrl)
    toast({
      title: "Success",
      description: "Discord webhook URL has been updated successfully.",
    })
    setIsUpdated(true)
    // Trigger a custom event to notify other components of the change
    window.dispatchEvent(new Event("webhookUpdated"))
    setTimeout(() => setIsUpdated(false), 3000) // Hide OK sign after 3 seconds
  }

  return (
    <Card className="bg-black/90 border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Change Discord Webhook URL
          {isUpdated && <CheckCircle2 className="text-green-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleChangeWebhook} className="space-y-4">
          <Input
            type="url"
            placeholder="Enter Discord webhook URL"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="bg-zinc-900/50 border-orange-500/30 text-white"
          />
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Update Webhook URL
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

