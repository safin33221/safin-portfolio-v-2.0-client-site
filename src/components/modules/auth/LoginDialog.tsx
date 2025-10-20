"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import LoginForm from "./LoginForm";

export function LoginDialog() {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 border-purple-400 text-purple-600 hover:bg-purple-50 hover:text-purple-700 transition"
                >
                    <LogInIcon size={16} />
                    Login
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="md:w-fit max-w-4xl border-none">
                <AlertDialogHeader className=" sr-only">
                
                </AlertDialogHeader>

                <AlertDialogDescription className="">
                    <LoginForm />
                </AlertDialogDescription>

                <AlertDialogFooter className="pb-6 w-full ">
                    <AlertDialogCancel className="w-full border-purple-500 ">
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
