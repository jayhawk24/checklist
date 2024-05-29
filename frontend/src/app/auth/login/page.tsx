import Login from "@/components/login";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function LoginPage() {

    return (
        <>

            <h1 className="text-5xl mb-20 text-center">Login</h1>
            <Login />
            <Link href={'/auth/signup'} className="w-full">
                <Button variant={"secondary"} className="mt-3 w-full">Create an Account</Button>
            </Link>
        </>
    );
}
