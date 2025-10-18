import { IBlog } from "@/types/blog"
import Link from "next/link"
import Image from "next/image"

const BlogCard = (blog: IBlog) => {
  return (
    <div className="bg-zinc-900 text-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 p-5">
      {/* Thumbnail */}
      {blog.thumbnail && (
        <div className="relative w-full md:max-w-sm min-h-72 max-h-72 md:h-auto rounded-xl border overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            width={400}
            height={400}
            className="object-center mx-auto bg-cover w-full h-full hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <span className="text-sm text-gray-400">{blog.category}</span>
          <h2 className="text-2xl font-semibold mt-2 mb-3 line-clamp-2">
            {blog.title}
          </h2>
          <p className="text-gray-300 text-sm line-clamp-4 line mb-4 ">
            {blog.content}
          </p>
        </div>

        <div className="border-t border-zinc-800 pt-3 flex flex-wrap items-center justify-between gap-2">
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
            <span className="text-lg text-gray-300">{blog.views} views</span>
          )}
        </div>

        <Link
          href={`/blogs/${blog.id}`}
          className="mt-4 text-purple-400 text-sm font-medium hover:text-purple-300 transition self-start"
        >
          Read more →
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
