
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Eye, FileText } from "lucide-react";


export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/stat`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  const stats = data.data;

  const cards = [
    {
      title: "Total Blogs",
      value: stats?.totalBlog,
      icon: <FileText className="w-8 h-8 text-purple-400" />,
      gradient: "from-purple-600 via-violet-500 to-indigo-600",
    },
    {
      title: "Total Projects",
      value: stats.totalProject,
      icon: <PenTool className="w-8 h-8 text-pink-400" />,
      gradient: "from-pink-600 via-rose-500 to-red-500",
    },
    {
      title: "Total Blog Views",
      value: stats.totalBlogView,
      icon: <Eye className="w-8 h-8 text-cyan-400" />,
      gradient: "from-blue-600 via-cyan-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white px-6 py-14">
      {/* Header */}
      <div
      
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
          Welcome Back, Admin 👋
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Manage your content and track insights in one glance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {cards.map((card, index) => (
          <div
            key={index}
    

          >
            <Card className="relative overflow-hidden border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 group-hover:opacity-20 transition-all duration-500`}
              />

              <CardHeader className="flex items-center justify-between relative z-10">
                <CardTitle className="text-gray-300 text-lg font-semibold">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>

              <CardContent className="relative z-10 flex justify-center items-center py-6">
                <p className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                  {card.value}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
