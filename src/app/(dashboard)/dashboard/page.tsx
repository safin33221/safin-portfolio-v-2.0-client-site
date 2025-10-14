

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Eye, FileText, PcCase } from "lucide-react";
import { motion } from "framer-motion";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/stat`, {
    next: { revalidate: 60 }
  });
  const data = await res.json();
  const stats = data.data
  console.log(stats);
  const cards = [
    {
      title: "Total Blogs",
      value: stats?.totalBlog,
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      title: "Total Project",
      value: stats.totalProject,
      icon: <PenTool className="w-6 h-6 text-pink-400" />,
      gradient: "from-pink-600 to-rose-600",
    },
    {
      title: "Total Blog Views",
      value: stats.totalBlogView,
      icon: <Eye className="w-6 h-6 text-blue-400" />,
      gradient: "from-blue-600 to-cyan-600",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white px-6 py-10 w-full">
      <div

        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          Welcome Back, Admin 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your blogs, drafts, and track performance insights.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {cards.map((card, index) => (
          <div>
            <Card className="relative overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all duration-300 group max-w-xl w-full  p-20">
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${card.gradient} transition-all duration-300`}
              />
              <CardHeader className="flex items-center justify-between min-w-xl">
                <CardTitle className="text-gray-300 text-lg">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <p className="text-3xl mx-auto text-center"
                >
                  {card.value}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
