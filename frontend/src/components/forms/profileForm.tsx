"use client";

import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateProfile, useUserProfile } from "@/service/profile-service";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
        dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
}

const ProfileFormSchema = z.object({
    image: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).optional(),
    name: z.string().min(1, 'Title is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters').optional(),
    old_password: z.string().min(8, 'Old password must be at least 8 characters').optional(),
})

const ProfileForm = () => {
    const { data: user } = useUserProfile()
    const [preview, setPreview] = useState("");
    const updateProfileMutation = useUpdateProfile()
    const queryClient = useQueryClient()

    const profileForm = useForm<z.infer<typeof ProfileFormSchema>>({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            password: '',
            old_password: '',
        }
    });

    function handleSubmit(data: z.infer<typeof ProfileFormSchema>) {
        const updatedData = { ...user, ...data }
        toast.promise(updateProfileMutation.mutateAsync(updatedData), {
            loading: 'Updating...',
            success: 'Profile updated successfully',
            error: 'Error updating profile',
        }).then(() => queryClient.invalidateQueries({ queryKey: ['userProfile'] }))

    }

    return (
        <Form {...profileForm}>
            <form
                className="flex w-full space-x-4"
                onSubmit={profileForm.handleSubmit(handleSubmit)}
            >
                <Avatar className="w-24 h-24 group">
                    <AvatarImage src={preview} className="group-hover:hidden" />
                    <AvatarFallback className="group-hover:hidden"> {user?.name[0]} </AvatarFallback>
                    <FormField
                        control={profileForm.control}
                        name="image"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="hidden group-hover:flex rounded-full p-5 h-full"
                                        type="file"
                                        {...rest}
                                        onChange={(event) => {
                                            const { files, displayUrl } = getImageData(event)
                                            setPreview(displayUrl);
                                            onChange(files);
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </Avatar>
                <div className='flex flex-col space-y-4'>
                    <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl">Title</FormLabel>
                                <FormControl>
                                    <Input className="text-xl" type="text" placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl">Email</FormLabel>
                                <FormControl>
                                    <Input className="text-xl" type="email" placeholder="enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl">Password</FormLabel>
                                <FormControl>
                                    <Input className="text-xl" type="password" placeholder="enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="old_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl">Old Password</FormLabel>
                                <FormControl>
                                    <Input className="text-xl" type="password" placeholder="enter your old password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Form>
    );
}

export default ProfileForm