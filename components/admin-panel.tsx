"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface VerificationLog {
  id: string
  timestamp: string
  type: "Recovery Phrase" | "Private Key"
  result: "Success" | "Failure"
}

export function AdminPanel() {
  const [logs, setLogs] = useState<VerificationLog[]>([])
  const [stats, setStats] = useState({
    totalAttempts: 0,
    successRate: 0,
    phraseAttempts: 0,
    keyAttempts: 0,
  })

  useEffect(() => {
    // In a real application, this would be an API call to fetch logs from a secure server
    const storedLogs = localStorage.getItem("verificationLogs")
    if (storedLogs) {
      const parsedLogs = JSON.parse(storedLogs)
      setLogs(parsedLogs)

      // Calculate stats
      const totalAttempts = parsedLogs.length
      const successfulAttempts = parsedLogs.filter((log: VerificationLog) => log.result === "Success").length
      const phraseAttempts = parsedLogs.filter((log: VerificationLog) => log.type === "Recovery Phrase").length
      const keyAttempts = parsedLogs.filter((log: VerificationLog) => log.type === "Private Key").length

      setStats({
        totalAttempts,
        successRate: totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0,
        phraseAttempts,
        keyAttempts,
      })
    }
  }, [])

  const clearLogs = () => {
    localStorage.removeItem("verificationLogs")
    setLogs([])
    setStats({
      totalAttempts: 0,
      successRate: 0,
      phraseAttempts: 0,
      keyAttempts: 0,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAttempts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate.toFixed(2)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phrase Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.phraseAttempts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Key Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.keyAttempts}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Verification Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.slice(0, 10).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.type}</TableCell>
                  <TableCell className={log.result === "Success" ? "text-green-500" : "text-red-500"}>
                    {log.result}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Button variant="destructive" onClick={clearLogs}>
        Clear All Logs
      </Button>
    </motion.div>
  )
}

