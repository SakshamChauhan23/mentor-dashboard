'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, BookOpen, Calendar, Settings, LogOut, Shield } from 'lucide-react'

const navItems = [
    { name: 'Student Dashboard', href: '/student', icon: LayoutDashboard },
    { name: 'Mentor Dashboard', href: '/mentor', icon: Users },
    { name: 'Admin Dashboard', href: '/admin', icon: Shield },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside style={{
            width: '260px',
            backgroundColor: 'var(--surface)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'sticky',
            top: 0,
            padding: '1.5rem',
            flexShrink: 0
        }}>
            <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--primary-light)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                }}>
                    Z
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>Zuvy</span>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Menu
                </div>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    const itemId = `menu-${item.name.split(' ')[0].toLowerCase()}` // e.g., menu-student
                    return (
                        <Link
                            id={itemId}
                            key={item.href}
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                color: isActive ? 'var(--primary-dark)' : 'var(--text-secondary)',
                                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                                fontWeight: isActive ? 600 : 500,
                                transition: 'all 0.2s',
                                textDecoration: 'none'
                            }}
                        >
                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    General
                </div>
                <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'left'
                    }}
                >
                    <Settings size={20} />
                    Settings
                </button>
                <form action="/auth/signout" method="post" style={{ marginTop: '0.5rem' }}>
                    <button
                        type="submit"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            width: '100%',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--destructive)',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'left'
                        }}
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </form>
            </div>
        </aside>
    )
}
