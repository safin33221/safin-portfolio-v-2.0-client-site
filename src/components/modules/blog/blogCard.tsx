import { IBlog } from "@/types/blog"
import Link from "next/link"
import Image from "next/image"

const BlogCard = (blog: IBlog) => {
  return (
    <div className="bg-gradient-to-b from-zinc-950 to-zinc-900 text-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-stretch gap-6 p-5 max-h-80">
      {/* Thumbnail */}
      {blog.thumbnail && (
        <div className="relative w-full md:w-1/3  md:h-auto rounded-xl overflow-hidden border border-zinc-800">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            width={500}
            height={400}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <span className="text-xs text-purple-400 uppercase tracking-wide">
            {blog.category}
          </span>
          <h2 className="text-xl font-semibold mt-2 mb-3 line-clamp-2">
            {blog.title}
          </h2>
          <p className="text-gray-300 text-sm line-clamp-3 mb-4">
            {blog.content}
          </p>
        </div>

        <div className="border-t border-zinc-800 pt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            {blog.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-zinc-800 px-2 py-1 rounded-md text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {blog.views !== undefined && (
            <span className="text-sm text-gray-400">{blog.views} views</span>
          )}
        </div>

        <Link
          href={`/blogs/${blog.id}`}
          className="mt-4 text-purple-400 text-sm font-medium hover:text-purple-300 transition"
        >
          Read more →
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
