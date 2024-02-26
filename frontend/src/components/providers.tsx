"use client"

import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"



const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
        }
    }
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

function Providers({ children }: { children: React.ReactNode }) {
    return (

        <QueryClientProvider client={client}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default Providers