import { Sidebar } from '@/components/Sidebar'
import { Search, Bell, Mail } from 'lucide-react'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="h-20 flex items-center justify-between px-8 border-b border-transparent">
                    {/* Search Bar */}
                    <div
                        id="search-bar"
                        className="flex items-center bg-surface px-4 py-[0.625rem] rounded-full w-80 shadow-sm border border-border"
                    >
                        <Search size={18} className="text-muted-foreground shrink-0" />
                        <input
                            type="text"
                            placeholder="Search task..."
                            className="border-none bg-transparent outline-none px-3 text-foreground w-full text-[0.9rem]"
                        />
                        <div className="text-xs text-muted-foreground border border-border px-1 py-0.5 rounded">
                            ⌘F
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                                <Mail size={18} />
                            </button>
                            <button className="relative w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                                <Bell size={18} />
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-destructive rounded-full border border-surface" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                                TM
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[0.95rem] font-semibold">Totok Michael</span>
                                <span className="text-[0.8rem] text-muted-foreground">tmichael20@mail.com</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 px-8 pb-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
