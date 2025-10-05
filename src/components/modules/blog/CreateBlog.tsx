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

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z.string().url("Must be a valid image URL"),
  category: z.string().min(2, "Category is required"),
  tags: z.string().min(2, "Add at least one tag (comma separated)"),
})

export default function CreateBlogForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      category: "",
      tags: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const payload = {
        ...data,
        tags: data.tags.split(",").map((t) => t.trim()),
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to create blog")
      toast.success("Blog created successfully")
      form.reset()
    } catch {
      toast.error("Something went wrong while creating the blog")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-[2px] rounded-2xl shadow-2xl mt-10">
      <div className="bg-gray-950 rounded-2xl px-10 py-8 md:py-12">
        <h1 className="text-4xl text-center font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
          ✍️ Create New Blog
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="text-gray-100 space-y-8 text-lg">
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-300">Title</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-gray-500 text-lg py-3"
                        placeholder="Enter blog title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-300">Category</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-gray-500 text-lg py-3"
                        placeholder="e.g. Database"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-300">Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-gray-500 text-lg py-3"
                        placeholder="https://example.com/image.png"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-300">Tags</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-gray-500 text-lg py-3"
                        placeholder="MongoDB, Database, NoSQL"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-sm text-gray-400 mt-1">Separate tags with commas.</p>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 3 */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-300">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={7}
                      className="bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-gray-500 text-lg"
                      placeholder="Write your blog content..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-90 text-white font-semibold py-4 rounded-xl transition text-lg"
            >
              {loading ? (
                <>
                  <TbFidgetSpinner className="animate-spin text-xl" />
                  Creating...
                </>
              ) : (
                "Create Blog"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
