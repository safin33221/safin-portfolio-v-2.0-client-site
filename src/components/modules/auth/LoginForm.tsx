"use client";

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
import { useState } from "react";


const formSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})
export default function LoginForm() {
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

        try {
            const res = await signIn("credentials", {
                ...data,
                redirect: false,
                callbackUrl: "/dashboard"
            })

            if (res && !res.ok) {
                toast.error("Invalid Credential")
            } else if (res?.ok) {
                toast.success("Login successful");
                window.location.href = res.url || "/dashboard";
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong!", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="shadow-lg  ">
            <h1 className="text-3xl text-center font-bold bg-gradient-to-r from-purple-300 to-purple-600 text-transparent bg-clip-text">
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
                                    <Input placeholder="shadcn@example.com"  {...field} value={field.value || ""} />
                                </FormControl>
                                <FormDescription className="sr-only">
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your password"  {...field} value={field.value || ""} />
                                </FormControl>
                                <FormDescription className="sr-only">
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
            <p className="text-center text-lg text-red-400 mt-6">
                Only authorized admins can access this area.
            </p>
        </div>
    );
};
