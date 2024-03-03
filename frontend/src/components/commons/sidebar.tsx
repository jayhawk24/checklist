"use client"
import { FingerprintIcon, LayoutDashboardIcon, LogOutIcon, MenuIcon, NotebookPenIcon, User2Icon, UserRoundMinusIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useUserProfile } from "@/service/profile-service"
import { useEffect, useMemo, useState } from "react"
import { DarkModeToggle } from "./darkmodeToggle"
import { usePathname } from "next/navigation"

export type NavLink = {
    title: string
    link: string
    auth: boolean
    icon: JSX.Element
    isActive?: boolean
}

const navLinks: NavLink[] = [
    {
        title: "Dashboard",
        link: "/ticklist",
        auth: true,
        icon: <LayoutDashboardIcon />

    },
    {
        title: "Login",
        link: "/login",
        auth: false,
        icon: <FingerprintIcon />

    },
    {
        title: "Profile",
        link: "/profile",
        auth: true,
        icon: <User2Icon />

    },
    {
        title: "Planning",
        link: "/planning",
        auth: true,
        icon: <NotebookPenIcon />

    },
    {
        title: "Logout",
        link: "/logout",
        auth: true,
        icon: <LogOutIcon />

    },
]

const MobileDashboardHeader = () => {
    return (
        <div className="flex px-4">
            <span className="text-2xl font-extrabold">TickList</span>
        </div>
    )
}
const SidebarContent = () => {
    const user = useUserProfile()
    const pathname = usePathname()

    const setActiveLink = (navLink: NavLink) => {
        const isActive = pathname === navLink.link
        navLink.isActive = isActive
        return navLink
    }

    const activeLinks = useMemo(() => navLinks.map(navLink => setActiveLink(navLink)), [navLinks])
    const [links, setLinks] = useState(activeLinks)

    useEffect(() => {
        if (user.data?.id) {
            setLinks(navLinks.filter(navLink => navLink.auth))
        }
        else {
            setLinks(navLinks.filter(navLink => !navLink.auth))
        }
    }, [user.data])

    return (
        <div>
            <MobileDashboardHeader />
            <DarkModeToggle />
            <div className="mt-6 space-y-4">
                {links.map((navItem) => (
                    <Link href={navItem.link} key={navItem.link} className={`flex items-center rounded-lg px-4 py-2.5 transition duration-200 hover:bg-cyan-900 ${navItem.isActive ? 'bg-cyan-900' : ""}`}>
                        {navItem.icon}
                        <span className="ml-3">{navItem.title}</span>
                    </Link>))
                }
            </div>
        </div>
    )
}

export const WithMobileSidebar = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Sheet>
                <div className="mt-5 flex md:hidden">
                    <div className="flex flex-1">
                        <MobileDashboardHeader />
                    </div>
                    <SheetTrigger>
                        <MenuIcon size={24} />
                    </SheetTrigger>
                </div>
                <SheetContent side="left">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
            {children}
        </>
    )
}

// ─────────────────────────────────────────────────────────────────────────────

const WithDesktopSidebar = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        // style used from here -> https://github.com/shadcn-ui/ui/blob/1cf5fad881b1da8f96923b7ad81d22d0aa3574b9/apps/www/app/docs/layout.tsx#L12
        <div className="container h-screen flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-screen w-full shrink-0 border-r md:sticky md:block">
                <div className="h-full py-6 pl-8 pr-6 lg:py-8">
                    <SidebarContent />
                </div>
            </aside>
            {children}
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────

export const Sidebar = ({
    children,
    ...props
}: {
    children: React.ReactNode
}) => {
    return (
        <WithDesktopSidebar {...props}>
            <WithMobileSidebar {...props}>{children}</WithMobileSidebar>
        </WithDesktopSidebar>
    )
}