"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function ChangeAccessKey() {
  const [newKey, setNewKey] = useState("")

  const handleChangeKey = (e: React.FormEvent) => {
    e.preventDefault()
    if (newKey.length < 6) {
      toast({
        title: "Error",
        description: "Access key must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }
    localStorage.setItem("loginAccessKey", newKey)
    toast({
      title: "Success",
      description: "Access key has been updated successfully.",
    })
    setNewKey("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Access Key</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleChangeKey} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter new access key"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="bg-zinc-900/50 border-orange-500/30 text-white"
          />
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Update Access Key
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

