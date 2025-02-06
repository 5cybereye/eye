"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Loader2 } from "lucide-react"

interface SecurityCheckProcessProps {
  onComplete: () => void
}

const steps = [
  "Initializing security protocols...",
  "Verifying input integrity...",
  "Checking against known patterns...",
  "Performing cryptographic validation...",
  "Finalizing security assessment...",
]

export function SecurityCheckProcess({ onComplete }: SecurityCheckProcessProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        // Simulation complete
        onComplete()
      }
    }, 2000) // Each step takes 2 seconds

    return () => clearTimeout(timer)
  }, [currentStep, onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Security Check in Progress</h2>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: index <= currentStep ? 1 : 0.5, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          {index < currentStep ? (
            <CheckCircle2 className="text-green-500" />
          ) : index === currentStep ? (
            <Loader2 className="animate-spin text-primary" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
          )}
          <span className={index <= currentStep ? "text-primary" : "text-muted-foreground"}>{step}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

