import DashboardBlogCard from "@/components/modules/blog/DahsboardBlogCard";
import { IBlog } from "@/types/blog";
import { PenTool } from "lucide-react";
import Link from "next/link";

export default async function AllBlog() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`,
        { next: { tags: ["blog"] } }
    )
    const blogs = await res.json()
    return (
        <div>
            {
                blogs.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-screen gap-8 text-center bg-gradient-to-b from-gray-950 via-black to-gray-950">
                        <h1 className="text-4xl md:text-5xl font-extrabold">
                            📝
                            <span className=" bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
                                No Blog Found
                            </span>
                        </h1>

                        <p className="text-gray-400 text-lg max-w-md">
                            It looks like you haven’t created any blogs yet. Start writing and share your thoughts with the world.
                        </p>

                        <Link
                            href="/dashboard/create-blog"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
                        >
                            <PenTool size={18} />
                            Create Your First Blog
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 md:px-16 lg:px-24 py-16">
                        {
                            blogs?.data?.map((blog: IBlog) => (<DashboardBlogCard key={blog.id} {...blog} />))
                        }
                    </div >
                )
            }
        </div >
    );
};
