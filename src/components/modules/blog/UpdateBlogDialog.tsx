import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import UpdateBlogForm from "./UpdateBlogForm"
import { IBlog } from "@/types/blog"
import { Pencil } from "lucide-react"
import { useState } from "react"

export function UpdateBlogDialog(blog: IBlog) {
    const [open, setOpen] = useState(false)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Pencil size={16} /> Edit
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent
                className="max-w-7xl"
            >
                <AlertDialogHeader className="mb-4">
                    <AlertDialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                        Update Blog
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        Make changes and save to update the blog post.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="overflow-y-auto max-h-[70vh] pr-2">
                    <UpdateBlogForm initialData={blog} onSuccess={() => setOpen(false)} />
                </div>

                <AlertDialogFooter className="flex justify-end mt-6">
                    <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    )
}
