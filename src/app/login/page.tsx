"use client";

import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})

export default function LoginPage() {
    const [loading, setLoading] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "admin@safinportfolio.com",
            password: "yourStrongPassword",
        },
    })



    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true)
        console.log(data);

        try {
            signIn("credentials", {
                ...data,
                callbackUrl: "/"
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong!", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-card w-full max-w-md p-8 rounded-2xl shadow-lg border ">
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    Admin Login
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn@example.com" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your password" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition"
                        >
                            {loading ? (
                                <>
                                    <TbFidgetSpinner className="animate-spin text-lg" />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </Form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Only authorized admins can access this area.
                </p>
            </div>
        </section>
    );
}
