"use server"

import { revalidateTag } from "next/cache"
import { IProject } from "@/types/project"

export const updateProject = async (data: Partial<IProject>, id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error("Failed to update project")

    await revalidateTag("project")
    return res.json()
}
