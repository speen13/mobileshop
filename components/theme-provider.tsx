// components/theme-provider.tsx
'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

interface Props {
    children: ReactNode
    attribute?: 'class' | 'data-theme'
    defaultTheme?: string
    enableSystem?: boolean
}

export function ThemeProvider({ children, ...props }: Props) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}