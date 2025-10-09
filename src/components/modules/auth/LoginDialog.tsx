import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import LoginForm from "./LoginForm"
import { LogInIcon } from "lucide-react"

export function LoginDialog() {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <LogInIcon size={14} /> Login
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border xl:max-w-xl ">

                <AlertDialogHeader>
                    {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> */}
                    <AlertDialogDescription>
                        <LoginForm />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
