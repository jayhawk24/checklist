"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import SidebarContent from "./sidebarContent"


export const MobileDashboardHeader = () => {
    return (
        <div className="flex px-4">
            <span className="text-2xl font-extrabold">✅ TickList</span>
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