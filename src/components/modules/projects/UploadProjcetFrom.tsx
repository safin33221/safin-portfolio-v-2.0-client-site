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

const formSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    tags: z.string().min(2, "Add at least one tag (comma separated)"),
    challenges_faced: z.string().min(5, "List at least one challenge"),
    potential_improvements: z
        .string()
        .min(5, "List at least one potential improvement"),
    source_code_link: z.string().url("Must be a valid URL"),
    live_page_link: z.string().url("Must be a valid URL"),
});

export default function UploadProjectForm() {
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    console.log(image);

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
       console.log(data);
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-[2px] rounded-2xl shadow-2xl mt-10">
            <div className="bg-gray-950 rounded-2xl px-8 py-10 md:py-14">
                <h1 className="text-4xl text-center font-extrabold mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text">
                    🚀 Upload New Project
                </h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="text-gray-100 text-lg grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >

                        <div className="w-full bg-blue-500/10 border border-gray-700 hover:border-blue-400 duration-300 rounded-xl p-6 flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                                Upload Project Thumbnail
                            </h2>
                            <ImageUploader onChange={(file) => setImage(file)} />
                        </div>
                        {/* LEFT SIDE — FORM FIELDS */}
                        <div className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Global Thought – AI-Powered Blogging"
                                                className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-white py-3"
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
                                                rows={5}
                                                placeholder="Briefly describe your project..."
                                                className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-white"
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
                                                placeholder="Next.js, TypeScript, MongoDB"
                                                className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-white py-3"
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
                                name="challenges_faced"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Challenges Faced</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={5}
                                                placeholder="Each challenge in a new line..."
                                                className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-white"
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
                                                rows={5}
                                                placeholder="Each improvement in a new line..."
                                                className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="source_code_link"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Source Code (GitHub)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://github.com/..."
                                                    className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-white py-3"
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
                                                    placeholder="https://yourproject.vercel.app/"
                                                    className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-white py-3"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* RIGHT SIDE — IMAGE UPLOADER */}

                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:opacity-90 text-white font-semibold py-4 rounded-xl transition text-lg"
                            >
                                {loading ? (
                                    <>
                                        <TbFidgetSpinner className="animate-spin text-xl" />
                                        Uploading...
                                    </>
                                ) : (
                                    "Upload Project"
                                )}
                            </Button>
                        </div>


                    </form>
                </Form>
            </div>
        </div>
    );
}
