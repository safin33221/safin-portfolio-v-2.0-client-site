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
import { handleImageUpload } from "@/utils"
import { updateProject } from "@/app/actions/project"

const formSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please upload a valid image"),
  tags: z.string().min(2, "Add at least one tag (comma separated)"),
  challenges_faced: z.string().optional(),
  potential_improvements: z.string().optional(),
  source_code_link: z.string().url("Enter a valid source link").optional(),
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
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(initialData?.image || "")

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setUploading(true)
      const url = await handleImageUpload(file)
      if (url) {
        setImageUrl(url)
        form.setValue("image", url)
        toast.success("Image uploaded successfully")
      } else toast.error("Image upload failed")
    } catch {
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
        image: imageUrl,
        tags: data.tags.split(",").map((t) => t.trim()),
        challenges_faced: data.challenges_faced
          ? data.challenges_faced.split("\n").map((c) => c.trim()).filter(Boolean)
          : [],
        potential_improvements: data.potential_improvements
          ? data.potential_improvements.split("\n").map((p) => p.trim()).filter(Boolean)
          : [],
      }

      await updateProject(payload as IProject, Number(initialData.id))
      toast.success("Project updated successfully 🎉")
      onSuccess?.()
    } catch (err: any) {
      toast.error(err.message || "Error updating project")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-[2px] rounded-2xl shadow-2xl">
      <div className="bg-gray-950 rounded-2xl px-5 sm:px-8 md:px-10 py-8 md:py-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-gray-100 text-base sm:text-lg"
          >
            {/* Responsive layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left section */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter project name"
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
                          placeholder="React, Node, Tailwind"
                          className="bg-gray-800 border-gray-700 focus:ring-pink-500 w-full"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-400 mt-1">Separate tags with commas.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Describe your project..."
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
                  name="source_code_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source Code Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username/project"
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
                  name="live_page_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live Page Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourproject.vercel.app/"
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
                  name="challenges_faced"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenges Faced</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="List your challenges, one per line..."
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
                  name="potential_improvements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potential Improvements</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Ideas for future improvements..."
                          className="bg-gray-800 border-gray-700 focus:ring-pink-500 w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right section */}
              <div className="flex flex-col items-center md:items-start space-y-5">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Project Preview"
                    className="w-full max-w-xs sm:max-w-sm rounded-lg border border-gray-700 object-cover"
                  />
                )}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <FormLabel>Change Image:</FormLabel>
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
                "Update Project"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
