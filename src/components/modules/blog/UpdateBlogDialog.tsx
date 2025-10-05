import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import UpdateBlogForm from "./UpdateBlogForm"
import { IBlog } from "@/types/blog"
import { Pencil } from "lucide-react"
import { useState } from "react"

export function UpdateBlogDialog(blog: IBlog) {
    const [open, setOpen] = useState(false)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}  >
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <Pencil size={16} /> Edit
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-none">
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <UpdateBlogForm initialData={blog} onSuccess={() => setOpen(false)} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
