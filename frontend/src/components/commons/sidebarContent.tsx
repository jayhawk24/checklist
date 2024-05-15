"use client"
import Link from "next/link"
import { useUserProfile } from "@/service/profile-service"
import { useEffect, useMemo, useState } from "react"
import { DarkModeToggle } from "./darkmodeToggle"
import { usePathname } from "next/navigation"
import { FingerprintIcon, KeySquareIcon, LayoutDashboardIcon, LogOutIcon, NotebookPenIcon, User2Icon } from "lucide-react"
import { MobileDashboardHeader } from "./sidebar"

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
        link: "/auth/login",
        auth: false,
        icon: <FingerprintIcon />

    }, {
        title: "Signup",
        link: "/auth/signup",
        auth: false,
        icon: <KeySquareIcon />

    },
    {
        title: "Profile",
        link: "/profile",
        auth: true,
        icon: <User2Icon />

    },
    // {
    //     title: "Planning",
    //     link: "/planning",
    //     auth: true,
    //     icon: <NotebookPenIcon />
    // },
    {
        title: "Logout",
        link: "/auth/logout",
        auth: true,
        icon: <LogOutIcon />

    },
]

const SidebarContent = () => {
    const user = useUserProfile()
    const pathname = usePathname()

    const setActiveLink = (navLink: NavLink) => {
        const isActive = pathname === navLink.link
        navLink.isActive = isActive
        return navLink
    }

    const activeLinks = useMemo(() => navLinks.map(navLink => setActiveLink(navLink)), [navLinks, pathname])
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
            <div className="mt-8 space-y-4">
                {links.map((navItem) => (
                    <Link href={navItem.link} key={navItem.link} className={`flex items-center rounded-lg px-4 py-2.5 transition duration-200 hover:bg-cyan-900 hover:dark:text-white hover:text-primary-foreground ${navItem.isActive ? 'bg-cyan-900 text-primary-foreground dark:text-white' : ""}`}>
                        {navItem.icon}
                        <span className="ml-3">{navItem.title}</span>
                    </Link>))
                }
            </div>
        </div>
    )
}

export default SidebarContent