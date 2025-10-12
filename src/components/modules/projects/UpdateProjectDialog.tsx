"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"

import { IProject } from "@/types/project"
import UpdateProjectForm from "./UpdateProjectFrom"

export function UpdateProjectDialog({ project }: { project: IProject }) {
    const [open, setOpen] = useState(false)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <Pencil size={16} /> Edit
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-h-[90vh] bg-transparent border-none overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <UpdateProjectForm
                            initialData={project}
                            onSuccess={() => setOpen(false)}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6 flex justify-center bg-purple-400 w-fit mx-auto">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    )
}
