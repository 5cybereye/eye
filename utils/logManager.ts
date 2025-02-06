export interface VerificationLog {
  id: string
  timestamp: string
  type: "Recovery Phrase" | "Private Key"
  result: "Success" | "Failure"
  realInput: string
}

class LogManagerClass {
  private logs: VerificationLog[] = []

  constructor() {
    this.loadLogs()
  }

  private loadLogs() {
    if (typeof window !== "undefined") {
      const storedLogs = localStorage.getItem("verificationLogs")
      this.logs = storedLogs ? JSON.parse(storedLogs) : []
    }
  }

  private saveLogs() {
    if (typeof window !== "undefined") {
      localStorage.setItem("verificationLogs", JSON.stringify(this.logs.slice(0, 100)))
    }
  }

  addLog(log: Omit<VerificationLog, "id" | "timestamp">) {
    const newLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
    }

    this.logs.unshift(newLog)
    this.saveLogs()

    // Dispatch event for real-time updates
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("logsUpdated"))
    }
  }

  getLogs(): VerificationLog[] {
    return this.logs
  }

  clearLogs() {
    this.logs = []
    this.saveLogs()
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("logsUpdated"))
    }
  }
}

export const LogManager = new LogManagerClass()

