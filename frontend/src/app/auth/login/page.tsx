import Login from "@/components/login";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center md:p-24 p-5">
            <h1 className="text-5xl mb-20">Login</h1>
            <Login />
        </main>
    );
}
