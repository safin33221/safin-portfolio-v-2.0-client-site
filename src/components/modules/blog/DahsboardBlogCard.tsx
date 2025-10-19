"use client"

import { IBlog } from "@/types/blog"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { UpdateBlogDialog } from "./UpdateBlogDialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteBlog } from "@/app/actions/blog"

const DashboardBlogCard = (blog: IBlog) => {

  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const res = await deleteBlog(Number(blog.id))
      if (!res.ok) return toast.error("Failed to delete blog")
      toast.success("Blog deleted successfully")
    } catch {
      toast.error("Failed to delete blog")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-zinc-900 to-gray-950 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-700/20 transition-all border border-zinc-800 flex flex-col ">
      {blog.thumbnail && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            width={600}
            height={400}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <span className="text-sm text-gray-400 mb-1 uppercase tracking-wide">
          {blog.category}
        </span>
        <h2 className="text-xl font-bold mb-2 text-gray-100 line-clamp-2">{blog.title}</h2>
        <p className="text-gray-400 text-sm flex-1 line-clamp-3">{blog.content}</p>

        <div className="mt-4 flex justify-between items-center border-t border-zinc-800 pt-3">
          <div className="flex gap-2 flex-wrap text-xs">
            {blog.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-zinc-800 px-2 py-1 rounded-lg text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
          {blog.views !== undefined && (
            <span className="text-xs text-gray-500">{blog.views} views</span>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <UpdateBlogDialog {...blog} />

          {/* 🔥 Replace old confirm() with shadcn AlertDialog */}
          <AlertDialog >
            <AlertDialogTrigger asChild>
              <button
                disabled={deleting}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 transition text-sm font-medium"
              >
                <Trash2 size={16} />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-950 border border-zinc-800 xl:max-w-xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-lg text-red-400">
                  <span className="text-2xl font-bold text-purple-400 py-4">Title: {blog.title}</span> <br />
                  Note: This action cannot be undone. This will permanently delete your blog post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>


      </div>
    </div>
  )
}

export default DashboardBlogCard
