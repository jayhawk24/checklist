"use client"
import { useSigninMutation } from "../service/login-services"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/service/profile-service';
import LoginForm from './forms/loginForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";

export default function Login() {
    const router = useRouter()
    const userProfile = useUserProfile()
    const [openDialog, setOpenDialog] = useState(true)

    if (userProfile.data) {
        router.push("/ticklist")
    }

    const signinMutation = useSigninMutation()

    const handleSubmit = ({ email, password }: { email: string, password: string }) => {
        toast.promise(signinMutation.mutateAsync({ email, password }), {
            loading: "Logging in...",
            success: "Login successful.",
            error: "Invalid email or password."
        }).then(() => router.push("/ticklist"))

    }
    useEffect(() => {
        const isFirstVisit = localStorage.getItem("isFirstVisit")
        if (!isFirstVisit) {
            return setOpenDialog(true)
        }
        localStorage.setItem("isFirstVisit", "true")

    }, [])

    return <>
        <Dialog open={openDialog} onOpenChange={setOpenDialog} modal={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4 text-xl">Hola Amigo!</DialogTitle>
                    <DialogDescription className="text-lg">
                        This app is running on free tier. Please allow backend service to start it may take 1-2 minutes.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        <LoginForm onSubmit={handleSubmit} />
    </>

}