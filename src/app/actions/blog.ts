"use server"
import { IBlog } from "@/types/blog"
import { revalidateTag } from "next/cache"

export const updateBlog = async (data: IBlog, id: number) => {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    )

    if (!res.ok) throw new Error("Failed to update blog")
    await revalidateTag("project")
    return res.json()
}


export const deleteBlog = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
        method: "DELETE",
    })

    if (!res.ok) throw new Error("Failed to Delete blog")
    await revalidateTag("blog")
    return res.json()
}

