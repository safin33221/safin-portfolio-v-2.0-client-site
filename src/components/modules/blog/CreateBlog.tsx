"use client";

import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";
import { handleImageUpload } from "@/utils";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z
    .union([z.string().url("Must be a valid image URL"), z.string().length(0)])
    .optional(),
  category: z.string().min(2, "Category is required"),
  tags: z.string().min(2, "Add at least one tag (comma separated)"),
});

export default function CreateBlogForm() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      category: "",
      tags: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (image) {
        const url = await handleImageUpload(image as File);
        data.thumbnail = url;
      }

      const payload = {
        ...data,
        tags: data.tags.split(",").map((t) => t.trim()),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create blog");
      toast.success("✅ Blog created successfully!");
      form.reset();
      router.push("/dashboard/all-blog")
    } catch {
      toast.error("❌ Something went wrong while creating the blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 py-10">
      <div className="rounded-2xl px-6 py-8 md:py-14 bg-gray-900/60">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Create New Blog
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="text-gray-100 text-base sm:text-lg grid grid-cols-1 gap-10"
          >
            {/* Two Column Layout on Large Screens */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* LEFT SIDE — FORM FIELDS */}
              <div className="flex-1 space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-300">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-gray-500 text-lg sm:text-xl py-4 rounded-lg"
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
                      <FormLabel className="text-lg font-semibold text-gray-300">
                        Category
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-gray-500 text-lg sm:text-xl py-4 rounded-lg"
                          placeholder="e.g. Web Development"
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
                      <FormLabel className="text-lg font-semibold text-gray-300">
                        Tags
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-gray-500 text-lg sm:text-xl py-4 rounded-lg"
                          placeholder="Next.js, React, UI"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-400 mt-1">
                        Separate tags with commas.
                      </p>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-300">
                        Content
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={15}
                          className="bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-gray-500 text-lg sm:text-xl rounded-lg p-4"
                          placeholder="Write your blog content..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {/* RIGHT SIDE — IMAGE UPLOADER */}
              <div className="flex-1 bg-purple-500/10 border border-gray-700 hover:border-purple-400 transition-all rounded-xl flex items-center justify-center p-6 sm:p-10">
                <ImageUploader onChange={(file) => setImage(file)} />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-90 text-white font-semibold py-4 sm:py-5 rounded-xl transition text-xl"
              >
                {loading ? (
                  <>
                    <TbFidgetSpinner className="animate-spin text-2xl" />
                    Creating...
                  </>
                ) : (
                  "Create Blog"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
