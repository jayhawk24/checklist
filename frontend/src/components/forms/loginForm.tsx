"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type LoginFormProps = {
    onSubmit: (data: { email: string, password: string }) => void
}

const FormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
})

const LoginForm = (props: LoginFormProps) => {
    const [parent] = useAutoAnimate({ duration: 1000 })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        props.onSubmit(data)
    }

    return (
        <Form {...form}>
            <div ref={parent}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <p className="text-xl">
                                        Email
                                    </p>
                                </FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="enter your email" {...field} className="text-xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <p className="text-lg">
                                        Password
                                    </p>
                                </FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="enter your password" {...field} className="text-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="text-lg m-auto w-full" >Submit</Button>
                </form>

            </div>
        </Form>
    )
}

export default LoginForm