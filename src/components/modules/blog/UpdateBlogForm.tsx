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
import { IBlog } from "@/types/blog"
import { handleImageUpload } from "@/utils"; // same util as create form
import { updateBlog } from "@/app/actions/blog"

const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    thumbnail: z.string().url("Please upload a valid image"),
    category: z.string().min(2, "Category is required"),
    tags: z.string().min(2, "Add at least one tag (comma separated)"),
})

export default function UpdateBlogForm({
    initialData,
    onSuccess,
}: {
    initialData: IBlog
    onSuccess?: () => void
}) {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail || "")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            content: initialData?.content || "",
            thumbnail: initialData?.thumbnail || "",
            category: initialData?.category || "",
            tags: initialData?.tags?.join(", ") || "",
        },
    })

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        try {
            setUploading(true)
            const url = await handleImageUpload(file)
            if (url) {
                setThumbnailUrl(url)
                form.setValue("thumbnail", url)
                toast.success("Image uploaded successfully")
            } else {
                toast.error("Image upload failed")
            }
        } catch (error) {
            console.error(error)
            toast.error("Error uploading image")
        } finally {
            setUploading(false)
        }
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true)
        try {
            const payload = {
                ...data,
                tags: data.tags.split(",").map((t) => t.trim()),
                thumbnail: thumbnailUrl,
            }

            await updateBlog(payload, Number(initialData.id))

            toast.success("Blog updated successfully 🎉")
            onSuccess?.()
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Error updating blog")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-[2px] rounded-2xl shadow-2xl mt-10">
            <div className="bg-gray-950 rounded-2xl px-5 sm:px-8 md:px-10 py-8 md:py-12">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="text-gray-100 space-y-8 text-base sm:text-lg"
                    >
                        {/* Responsive Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter blog title"
                                                    className="bg-gray-800 border-gray-700 focus:ring-pink-500 w-full"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. Frontend Development"
                                                    className="bg-gray-800 border-gray-700 focus:ring-pink-500 w-full"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="React, UI, Web Design"
                                                    className="bg-gray-800 border-gray-700 focus:ring-pink-500 w-full"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Separate tags with commas.
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Content</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={7}
                                                    placeholder="Update your blog content..."
                                                    className="bg-gray-800 border-gray-700 focus:ring-pink-500 w-full"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Thumbnail upload */}
                            <div className="flex flex-col items-center md:items-start">
                                {thumbnailUrl && (
                                    <img
                                        src={thumbnailUrl}
                                        alt="Thumbnail Preview"
                                        className="mt-2 w-full max-w-xs sm:max-w-sm rounded-lg border border-gray-700 object-cover"
                                    />
                                )}
                                <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
                                    <FormLabel>Change Thumbnail:</FormLabel>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="text-sm sm:text-base text-gray-400"
                                    />
                                    {uploading && (
                                        <TbFidgetSpinner className="animate-spin text-pink-500 text-xl" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-4 rounded-xl"
                        >
                            {loading ? (
                                <>
                                    <TbFidgetSpinner className="animate-spin text-xl" />
                                    Updating...
                                </>
                            ) : (
                                "Update Blog"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>

    )
}
