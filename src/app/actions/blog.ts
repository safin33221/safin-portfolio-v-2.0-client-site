"use server"

import { IBlog } from "@/types/blog"
import { revalidateTag } from "next/cache"

const BASE_API = process.env.NEXT_PUBLIC_BASE_API

// Fetch all blogs
export const getBlog = async () => {
  const res = await fetch(`${BASE_API}/blog`, {
    next: { tags: ["blog"] },
  })
  if (!res.ok) throw new Error("Failed to fetch blogs")
  return await res.json()
}

// Fetch blog by ID
export const getBlogById = async (slug: number) => {
  const res = await fetch(`${BASE_API}/blog/${slug}`, {
    next: { tags: ["blog"] },
  })
  if (!res.ok) throw new Error("Failed to fetch blog")
  return await res.json()
}

// Create new blog
export const createBlog = async (data: IBlog) => {
  const res = await fetch(`${BASE_API}/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create blog")
  await revalidateTag("blog")
  return await res.json()
}

// Update existing blog
export const updateBlog = async (data: IBlog, id: number) => {
  const res = await fetch(`${BASE_API}/blog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update blog")
  await revalidateTag("blog")
  return await res.json()
}

// Delete blog
export const deleteBlog = async (id: number) => {
  const res = await fetch(`${BASE_API}/blog/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete blog")
  await revalidateTag("blog")
  return await res.json()
}
