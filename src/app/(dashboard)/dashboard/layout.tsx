"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/shared/Sidebar"
import React from "react"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "unauthenticated") {
    router.push("/")
    return null
  }

  return (
    <div className="max-w-[1920px] flex mx-auto min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0d001a] text-white">
        <div className="md:pt-0 pt-14 px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
