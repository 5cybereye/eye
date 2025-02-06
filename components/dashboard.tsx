"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RecoveryPhraseInput } from "@/components/recovery-phrase-input"
import { PrivateKeyInput } from "@/components/private-key-input"
import { Wallet, LifeBuoy, Settings, Menu, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"phrase" | "key">("phrase")
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white"
    >
      <div className="lg:grid lg:grid-cols-[280px_1fr]">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="fixed top-4 left-4 z-50 md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 bg-zinc-900/95 border-r border-zinc-800">
            <Sidebar setActiveTab={setActiveTab} handleLogout={handleLogout} />
          </SheetContent>
        </Sheet>
        <aside className="hidden lg:block border-r border-zinc-800 bg-zinc-900/95 backdrop-blur">
          <Sidebar setActiveTab={setActiveTab} handleLogout={handleLogout} />
        </aside>
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center justify-between"
          >
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white">spacerpc</h1>
              <div className="text-sm text-zinc-400">Secure access to your recovery tools</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mt-6 p-6 bg-zinc-900/50 border-zinc-800">
              <div className="mb-4 flex items-center justify-start space-x-2">
                <Button
                  size="sm"
                  variant={activeTab === "phrase" ? "default" : "ghost"}
                  onClick={() => setActiveTab("phrase")}
                  className={
                    activeTab === "phrase"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }
                >
                  Recovery Phrase
                </Button>
                <Button
                  size="sm"
                  variant={activeTab === "key" ? "default" : "ghost"}
                  onClick={() => setActiveTab("key")}
                  className={
                    activeTab === "key"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }
                >
                  Private Key
                </Button>
              </div>
              {activeTab === "phrase" ? <RecoveryPhraseInput /> : <PrivateKeyInput />}
            </Card>
          </motion.div>
        </main>
      </div>
    </motion.div>
  )
}

function Sidebar({
  setActiveTab,
  handleLogout,
}: {
  setActiveTab: (tab: "phrase" | "key") => void
  handleLogout: () => void
}) {
  return (
    <>
      <div className="flex h-16 items-center gap-2 border-b border-zinc-800 px-6">
        <Wallet className="h-6 w-6 text-orange-500" />
        <span className="font-bold text-white">spacerpc</span>
      </div>
      <div className="px-4 py-4">
        <Input
          placeholder="Search"
          className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus-visible:ring-orange-500"
        />
      </div>
      <nav className="space-y-2 px-2">
        <Button variant="ghost" className="w-full justify-start gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
          <LifeBuoy className="h-4 w-4" />
          Support
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </nav>
    </>
  )
}

