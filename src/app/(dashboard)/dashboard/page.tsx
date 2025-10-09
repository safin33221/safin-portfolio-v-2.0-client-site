"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PenTool, Eye, FileText } from "lucide-react"
import { motion } from "framer-motion"

export default function Page() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    drafts: 0,
    views: 0,
  })

  useEffect(() => {
    // 🔹 Replace with API call later
    setStats({
      totalBlogs: 12,
      drafts: 3,
      views: 450,
    })
  }, [])

  const cards = [
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      title: "Draft Blogs",
      value: stats.drafts,
      icon: <PenTool className="w-6 h-6 text-pink-400" />,
      gradient: "from-pink-600 to-rose-600",
    },
    {
      title: "Total Views",
      value: stats.views,
      icon: <Eye className="w-6 h-6 text-blue-400" />,
      gradient: "from-blue-600 to-cyan-600",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white px-6 py-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          Welcome Back, Admin 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your blogs, drafts, and track performance insights.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card className="relative overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all duration-300 group max-w-xl w-full p-20">
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${card.gradient} transition-all duration-300`}
              />
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-gray-300 text-lg">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <motion.p
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-bold text-white"
                >
                  {card.value}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
