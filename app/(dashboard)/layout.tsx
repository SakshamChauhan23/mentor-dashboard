import { Sidebar } from '@/components/Sidebar'
import { Search, Bell, Mail } from 'lucide-react'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
            <Sidebar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Top Header */}
                <header style={{
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                    borderBottom: '1px solid transparent', // Kept generic for now, can be specific if needed
                }}>
                    {/* Search Bar */}
                    <div id="search-bar" style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'var(--surface)',
                        padding: '0.625rem 1rem',
                        borderRadius: 'var(--radius-full)', // Rounded pill shape
                        width: '320px',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid var(--border)'
                    }}>
                        <Search size={18} color="var(--text-tertiary)" />
                        <input
                            type="text"
                            placeholder="Search task..."
                            style={{
                                border: 'none',
                                background: 'transparent',
                                outline: 'none',
                                padding: '0 0.75rem',
                                color: 'var(--foreground)',
                                width: '100%',
                                fontSize: '0.9rem'
                            }}
                        />
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-tertiary)',
                            border: '1px solid var(--border)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '4px'
                        }}>
                            ⌘F
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--surface)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)'
                            }}>
                                <Mail size={18} />
                            </button>
                            <button style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--surface)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                position: 'relative'
                            }}>
                                <Bell size={18} />
                                <span style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '10px',
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: 'var(--destructive)',
                                    borderRadius: '50%',
                                    border: '1px solid var(--surface)'
                                }}></span>
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--secondary)', // Using brand secondary
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 700
                            }}>
                                TM
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Totok Michael</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>tmichael20@mail.com</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1, padding: '1rem 2rem 2rem 2rem', overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
        </div>
    )
}
