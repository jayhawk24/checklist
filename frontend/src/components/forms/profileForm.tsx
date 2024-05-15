"use client";

import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateAvatar, useUpdateProfile, useUserProfile } from "@/service/profile-service";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getImageData } from "@/lib/utils";

const ProfileFormSchema = z.object({
    image: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).optional(),
    name: z.string().min(1, 'Title is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().optional(),
    old_password: z.string().optional(),
})

const ProfileForm = () => {
    const { data: user } = useUserProfile()
    const [preview, setPreview] = useState(user?.avatar);


    const updateProfileMutation = useUpdateProfile()
    const updateAvatarMutation = useUpdateAvatar()
    const queryClient = useQueryClient()

    useEffect(() => {
        setPreview(user?.avatar)
    }, [user])

    const profileForm = useForm<z.infer<typeof ProfileFormSchema>>({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        }
    });

    function handleSubmit(data: z.infer<typeof ProfileFormSchema>) {
        const updatedData = data
        if (!data.password) {
            delete updatedData.password
            delete updatedData.old_password
        }

        toast.promise(updateProfileMutation.mutateAsync(updatedData), {
            loading: 'Updating...',
            success: 'Profile updated successfully',
            error: 'Error updating profile',
        }).then(() => queryClient.invalidateQueries({ queryKey: ['userProfile'] }))

        if (data.image) {
            const formData = new FormData();
            formData.append('image', data.image.item(0) as File);
            toast.promise(updateAvatarMutation.mutateAsync(formData), {
                loading: 'Uploading image...',
                success: 'Picture updated successfully',
                error: 'Error updating picture',
            }).then(() => queryClient.invalidateQueries({ queryKey: ['userProfile'] }))
        }
    }

    return (
        <Form {...profileForm}>
            <form
                className="flex flex-col md:flex-row w-full space-x-4 items-center"
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
                                <FormLabel className="md:text-xl text-lg">Title</FormLabel>
                                <FormControl>
                                    <Input className="md:text-xl text-lg" type="text" placeholder="Your Name" {...field} />
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
                                <FormLabel className="md:text-xl text-lg">Email</FormLabel>
                                <FormControl>
                                    <Input className="md:text-xl text-lg" type="email" placeholder="enter your email" {...field} />
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
                                <FormLabel className="md:text-xl text-lg">Password</FormLabel>
                                <FormControl>
                                    <Input className="md:text-xl text-lg" type="password" placeholder="enter your password" {...field} />
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
                                <FormLabel className="md:text-xl text-lg">Old Password</FormLabel>
                                <FormControl>
                                    <Input className="md:text-xl text-lg" type="password" placeholder="enter your old password" {...field} />
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