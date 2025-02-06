import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface VerificationLog {
  id: string
  timestamp: string
  type: "Recovery Phrase" | "Private Key"
  result: "Success" | "Failure"
}

export function VerificationLogs() {
  const [logs, setLogs] = useState<VerificationLog[]>([])

  useEffect(() => {
    const storedLogs = localStorage.getItem("verificationLogs")
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs))
    }
  }, [])

  const clearLogs = () => {
    localStorage.removeItem("verificationLogs")
    setLogs([])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Verification Logs</h2>
        <Button variant="destructive" onClick={clearLogs}>
          Clear Logs
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
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
    </motion.div>
  )
}

