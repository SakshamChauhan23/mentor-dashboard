'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Shield, Settings, FlaskConical } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { name: 'Student Dashboard', href: '/student', icon: LayoutDashboard },
    { name: 'Mentor Dashboard', href: '/mentor', icon: Users },
    { name: 'Admin Dashboard', href: '/admin', icon: Shield },
    { name: 'Zuvy Eval', href: '/eval', icon: FlaskConical },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-[260px] bg-surface border-r border-border flex flex-col h-screen sticky top-0 p-6 shrink-0">
            <div className="mb-10 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-light rounded-[10px] flex items-center justify-center text-primary font-bold text-2xl">
                    Z
                </div>
                <span className="text-2xl font-bold text-foreground">Zuvy</span>
            </div>

            <nav className="flex-1 flex flex-col gap-2">
                <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-[0.05em]">
                    Menu
                </div>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    const itemId = `menu-${item.name.split(' ')[0].toLowerCase()}`
                    return (
                        <Link
                            id={itemId}
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all duration-200 no-underline text-sm',
                                isActive
                                    ? 'text-primary-dark bg-primary-light font-semibold'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-border pt-6">
                <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-[0.05em]">
                    General
                </div>
                <button className="flex items-center gap-3 px-4 py-3 w-full border-none bg-transparent text-muted-foreground text-[0.95rem] font-medium cursor-pointer rounded-md text-left hover:bg-muted hover:text-foreground transition-all duration-200">
                    <Settings size={20} />
                    Settings
                </button>
            </div>
        </aside>
    )
}
