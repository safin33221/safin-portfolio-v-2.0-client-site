/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { TbFidgetSpinner } from "react-icons/tb"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { IProject } from "@/types/project"

const formSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    image: z.string().url("Must be a valid image URL"),
    tags: z.string().min(2, "Add at least one tag (comma separated)"),
    challenges_faced: z.string().optional(),
    potential_improvements: z.string().optional(),
    source_code_link: z.string().url("Enter a valid GitHub or source link").optional(),
    live_page_link: z.string().url("Enter a valid live site link").optional(),
})

export default function UpdateProjectForm({
    initialData,
    onSuccess,
}: {
    initialData: IProject
    onSuccess?: () => void
}) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            image: initialData?.image || "",
            tags: initialData?.tags?.join(", ") || "",
            challenges_faced: initialData?.challenges_faced?.join("\n") || "",
            potential_improvements: initialData?.potential_improvements?.join("\n") || "",
            source_code_link: initialData?.source_code_link || "",
            live_page_link: initialData?.live_page_link || "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true)
        try {
            const payload = {
                ...data,
                tags: data.tags.split(",").map((t) => t.trim()),
                challenges_faced: data.challenges_faced
                    ?.split("\n")
                    .map((c) => c.trim())
                    .filter(Boolean),
                potential_improvements: data.potential_improvements
                    ?.split("\n")
                    .map((p) => p.trim())
                    .filter(Boolean),
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${initialData.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error("Failed to update project")

            toast.success("Project updated successfully 🎉")
            onSuccess?.()
        } catch (error: any) {
            console.error(error)
            toast.error("Something went wrong while updating the project")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mx-auto max-w-4xl  min-md:p-[2px] rounded-2xl shadow-2xl mt-10">
            <div className="bg-gray-950 rounded-2xl px-10 py-8 md:py-12">
                <h1 className="text-4xl text-center font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
                    🚀 Update Project
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="text-gray-100 space-y-8 text-lg">
                        {/* Row 1 */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-gray-300">Project Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 text-white placeholder:text-gray-500 text-lg py-3"
                                                placeholder="Enter project name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-gray-300">Project Image URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 text-white placeholder:text-gray-500 text-lg py-3"
                                                placeholder="https://example.com/image.jpg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Row 2 */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-300">Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={6}
                                            className="bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 text-white placeholder:text-gray-500 text-lg"
                                            placeholder="Update your project description..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-sm" />
                                </FormItem>
                            )}
                        />

                        {/* Row 3 */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-gray-300">Tags</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 text-white placeholder:text-gray-500 text-lg py-3"
                                                placeholder="React, Tailwind, Node.js"
                                                {...field}
                                            />
                                        </FormControl>
                                        <p className="text-sm text-gray-400 mt-1">Separate tags with commas.</p>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="source_code_link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-gray-300">Source Code Link</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 text-white placeholder:text-gray-500 text-lg py-3"
                                                placeholder="https://github.com/username/project"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <FormField
                            control={form.control}
                            name="live_page_link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-300">Live Page Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 text-white placeholder:text-gray-500 text-lg py-3"
                                            placeholder="https://yourproject.vercel.app/"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-sm" />
                                </FormItem>
                            )}
                        />
                        {/* Row 4 */}
                        <div className="grid md:grid-cols-2 gap-6 items-center h-full">

                            <FormField
                                control={form.control}
                                name="challenges_faced"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-gray-300">Challenges Faced</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={5}
                                                className="bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 text-white placeholder:text-gray-500 text-lg"
                                                placeholder="List your challenges, one per line..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />
                            {/* Row 5 */}
                            <FormField
                                control={form.control}
                                name="potential_improvements"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-gray-300">Potential Improvements</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={5}
                                                className="bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 text-white placeholder:text-gray-500 text-lg"
                                                placeholder="Ideas for future improvements..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>



                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold py-4 rounded-xl transition text-lg"
                        >
                            {loading ? (
                                <>
                                    <TbFidgetSpinner className="animate-spin text-xl" />
                                    Updating...
                                </>
                            ) : (
                                "Update Project"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
