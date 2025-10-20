"use server"

import { getBlog } from "@/app/actions/blog";
import BlogCard from "@/components/modules/blog/blogCard";
import { IBlog } from "@/types/blog";
import Link from "next/link";


export default async function Blog() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    //     next: { tags:['blog'] } //use isr
    // })
    const blogs = await getBlog()

    return (
        <div className="md:px-16 lg:px-24 py-16">
            <div className="md:hidden px-5 fixed top-25 z-50">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all duration-300 bg-transparent backdrop-blur-2xl"
                >
                    ← Home 
                </Link>
            </div>
            <div className="grid grid-cols-1  gap-6 px-3 ">
                {
                    blogs?.data?.map((blog: IBlog) => (<BlogCard key={blog.id} {...blog} />))
                }
            </div>
        </div>
    );
};

