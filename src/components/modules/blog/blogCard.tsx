import { IBlog } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";


const BlogCard = (blog: IBlog) => {
    return (

        <div className="bg-zinc-900 text-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition p-4 flex flex-col">
            {blog.thumbnail && (
                <div className="relative w-full h-48 mb-3 rounded-xl overflow-hidden">
                    <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        width={300}
                        height={300}

                        className="object-cover hover:scale-105 transition"
                    />
                </div>
            )}

            <div className="flex-1 flex flex-col">
                <span className="text-sm text-gray-400 mb-1">{blog.category}</span>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
                <p className="text-gray-300 text-sm flex-1 line-clamp-3">{blog.content}</p>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between border-t border-zinc-700 pt-3">
                <div className="flex gap-2 flex-wrap text-xs text-gray-400">
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
                    <span className="text-xs text-gray-400">{blog.views} views</span>
                )}
            </div>
            <Link href={`/blogs/${blog.id}`} passHref className="mt-4 inline-block self-end">
                <span className="text-lg text-purple-400 underline cursor-pointer">Read more</span>
            </Link>
        </div>

    );
};

export default BlogCard;
