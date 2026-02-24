'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tabs = [
    { label: 'Course Studio', href: '/eval' },
    { label: 'Question Bank', href: '/eval/question-bank' },
    { label: 'Roles and Permissions', href: '/eval/roles' },
]

export default function EvalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Top navigation bar */}
            <header className="h-14 bg-surface border-b border-border flex items-center px-6 gap-4 shrink-0 shadow-sm">
                {/* Zuvy Logo */}
                <Link href="/student" className="flex items-center gap-2 mr-4 no-underline">
                    <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center text-primary font-bold text-lg">
                        Z
                    </div>
                    <span className="font-bold text-foreground text-lg">zuvy</span>
                </Link>

                {/* Tabs */}
                <nav className="flex gap-1">
                    {tabs.map(tab => {
                        const isActive = pathname === tab.href
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={cn(
                                    'px-4 py-1.5 rounded-full text-sm font-medium no-underline transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                )}
                            >
                                {tab.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Avatar */}
                <div className="ml-auto w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                    SA
                </div>
            </header>

            {/* Page content */}
            <div className="flex-1 flex overflow-hidden">
                {children}
            </div>
        </div>
    )
}
