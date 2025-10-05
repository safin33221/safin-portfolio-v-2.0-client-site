"use client"

import { IBlog } from "@/types/blog"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

const DashboardBlogCard = ({ id, title, content, thumbnail, category, tags, views }: IBlog) => {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return
    setDeleting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete blog")
      toast.success("Blog deleted successfully")
      router.refresh()
    } catch {
      toast.error("Failed to delete blog")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-zinc-900 to-gray-950 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-700/20 transition-all border border-zinc-800 flex flex-col">
      {thumbnail && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            width={600}
            height={400}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <span className="text-sm text-gray-400 mb-1 uppercase tracking-wide">
          {category}
        </span>
        <h2 className="text-xl font-bold mb-2 text-gray-100 line-clamp-2">{title}</h2>
        <p className="text-gray-400 text-sm flex-1 line-clamp-3">{content}</p>

        <div className="mt-4 flex justify-between items-center border-t border-zinc-800 pt-3">
          <div className="flex gap-2 flex-wrap text-xs">
            {tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-zinc-800 px-2 py-1 rounded-lg text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
          {views !== undefined && (
            <span className="text-xs text-gray-500">{views} views</span>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            href={`/dashboard/blogs/${id}`}
            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition text-sm font-medium"
          >
            <Pencil size={16} /> Edit
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 transition text-sm font-medium"
          >
            <Trash2 size={16} />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        <Link
          href={`/blogs/${id}`}
          className="mt-5 inline-block text-center text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 py-2 rounded-lg transition"
        >
          Read Full Blog
        </Link>
      </div>
    </div>
  )
}

export default DashboardBlogCard
