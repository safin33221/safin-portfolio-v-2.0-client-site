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
import { CreateProject } from "@/app/actions/project";

const formSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tags: z.string().min(2, "Add at least one tag (comma separated)"),
  challenges_faced: z.string().min(5, "List at least one challenge"),
  potential_improvements: z.string().min(5, "List at least one improvement"),
  source_code_link: z.string().url("Must be a valid URL"),
  live_page_link: z.string().url("Must be a valid URL"),
});

export default function UploadProjectForm() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: "",
      challenges_faced: "",
      potential_improvements: "",
      source_code_link: "",
      live_page_link: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (image) imageUrl = await handleImageUpload(image);

      const payload = {
        ...data,
        tags: data.tags.split(",").map((t) => t.trim()),
        challenges_faced: data.challenges_faced.split("\n").filter(Boolean),
        potential_improvements: data.potential_improvements
          .split("\n")
          .filter(Boolean),
        image: imageUrl,
      };

      const res = await CreateProject(payload);
      if (!res.success) throw new Error("Failed to upload project");

      toast.success("✅ Project uploaded successfully!");
      form.reset();
      setImage(null);
      router.push("/dashboard/all-project");
    } catch {
      toast.error("❌ Error while uploading project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto bg-gray-950 border border-gray-800 rounded-2xl shadow-lg p-8 sm:p-10 mt-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Upload New Project
      </h1>

      {/* Grid layout (12 cols, responsive order) */}
      <div className="grid grid-cols-12 gap-8">
        {/* Image uploader first on mobile, right side on desktop */}
        <div className="col-span-12 md:col-span-4 md:order-2 order-1 flex flex-col items-center justify-start bg-gray-900 border border-gray-700 rounded-xl p-5">
          <h2 className="text-purple-400 mb-3 font-semibold text-lg">
            Project Thumbnail
          </h2>
          <ImageUploader onChange={(file) => setImage(file)} />
        </div>

        {/* Form fields second on mobile, left side on desktop */}
        <div className="col-span-12 md:col-span-8 md:order-1 order-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 sm:space-y-8 text-gray-100"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your project name"
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white"
                        {...field}
                      />
                    </FormControl>
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
                        rows={3}
                        placeholder="Briefly describe your project..."
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white"
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
                        placeholder="React, Next.js, MongoDB"
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white"
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

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="source_code_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/..."
                          className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white"
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
                      <FormLabel>Live Page</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://project.vercel.app/"
                          className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="challenges_faced"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenges Faced</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Each challenge in a new line..."
                          className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white"
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
                          rows={3}
                          placeholder="Each improvement in a new line..."
                          className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-90 text-white font-semibold py-3 rounded-lg"
              >
                {loading ? (
                  <>
                    <TbFidgetSpinner className="animate-spin mr-2" /> Uploading...
                  </>
                ) : (
                  "Upload Project"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
