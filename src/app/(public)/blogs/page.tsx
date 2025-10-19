"use server"

import { getBlog } from "@/app/actions/blog";
import BlogCard from "@/components/modules/blog/blogCard";
import { IBlog } from "@/types/blog";

export default async function Blog() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    //     next: { tags:['blog'] } //use isr
    // })
    const blogs = await getBlog()

    return (
        <div>
            <div className="grid grid-cols-1  gap-6 px-3 md:px-16 lg:px-24 py-16">
                {
                    blogs?.data?.map((blog: IBlog) => (<BlogCard key={blog.id} {...blog} />))
                }
            </div>
        </div>
    );
};

