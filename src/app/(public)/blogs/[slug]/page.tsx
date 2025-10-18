import { IBlog } from "@/types/blog"
import Image from "next/image"
import Link from "next/link"

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`)
  const { data: blogs } = await res.json()
  return blogs.map((blog: IBlog) => ({
    slug: String(blog.id),
  }))
}

export default async function BlogDetails({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${params.slug}`, {
    next: { revalidate: 60 },
  })
  const data = await res.json()
  const blog = data?.data

  return (
    <section className="min-h-screen bg-dark text-gray-200 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all duration-300"
          >
            ← Back to Blogs
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
          {blog?.title}
        </h1>

        {/* Meta */}
        <div className="text-center text-sm text-gray-400 mb-10">
          <span>
            By{" "}
            <span className="text-purple-400 font-medium">
              {blog?.author || "Safin"}
            </span>
          </span>
          <span className="mx-2">•</span>
          <span>{new Date(blog?.createdAt || "").toLocaleDateString()}</span>
        </div>

        {/* Thumbnail with fixed aspect ratio */}
        {blog?.thumbnail && (
          <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-video relative w-full">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-center bg-cover transition-transform duration-700 scale-80"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
          </div>
        )}

        {/* Blog Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-gray-300 tracking-wide">
          <div className="space-y-6 text-[17px]">
            {blog?.content?.split("\n").map((para: string, idx: number) => (
              <p key={idx} className="hover:text-gray-100 transition-colors duration-200">
                {para}
              </p>
            ))}
          </div>
        </article>

        {/* Divider */}
        <div className="my-14 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-700/50 to-transparent" />

        {/* Footer CTA */}
        <div className="flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center px-7 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-pink-700/30 transition-all duration-300"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </section>
  )
}
