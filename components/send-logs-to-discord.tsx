"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Send } from "lucide-react"
import { LogManager } from "@/utils/logManager"

export function SendLogsToDiscord() {
  const [isSending, setIsSending] = useState(false)

  const formatLogs = (logs: any[]) => {
    return logs
      .map(
        (log) =>
          `**${log.type} Verification**
` +
          `Timestamp: ${log.timestamp}
` +
          `Result: ${log.result}
` +
          `Input: ${log.realInput}
`,
      )
      .join("\n")
  }

  const sendLogs = async () => {
    setIsSending(true)
    const webhookUrl = localStorage.getItem("discordWebhookUrl")

    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Discord webhook URL is not set. Please set it in the admin panel.",
        variant: "destructive",
      })
      setIsSending(false)
      return
    }

    const logs = LogManager.getLogs()

    if (logs.length === 0) {
      toast({
        title: "No Logs",
        description: "There are no logs to send.",
        variant: "default",
      })
      setIsSending(false)
      return
    }

    const formattedLogs = formatLogs(logs)

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "**Verification Logs**",
          embeds: [
            {
              title: "Logs",
              description: formattedLogs,
              color: 3447003, // Discord blue color
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast({
        title: "Success",
        description: "Logs sent to Discord successfully.",
        variant: "default",
      })
    } catch (error) {
      console.error("Failed to send logs to Discord:", error)
      toast({
        title: "Error",
        description: "Failed to send logs to Discord. Please check the webhook URL and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Logs to Discord</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={sendLogs} disabled={isSending} className="w-full">
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Logs
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

