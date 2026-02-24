'use client'

import Link from 'next/link'
import { BookOpen, RotateCcw, Bot } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Walkthrough } from '@/components/ui/Walkthrough'

export default function StudentPage() {
    return (
        <div className="flex flex-col gap-8">
            <Walkthrough
                pageKey="student_dashboard"
                steps={[
                    { target: '#menu-student', title: 'Student Dashboard', content: 'This is your main hub. Access your courses, progress, and finding mentors here.', position: 'right' },
                    { target: '#my-courses', title: 'My Courses', content: 'View all your enrolled courses and resume learning from where you left off.', position: 'bottom' },
                    { target: '#zoe-banner', title: 'Meet Zoe', content: 'Zoe is your AI-powered learning assistant. Practice interviews and get personalised guidance.', position: 'bottom' },
                    { target: '#search-bar', title: 'Global Search', content: 'Quickly find specific courses, mentors, or resources.', position: 'bottom' },
                ]}
            />

            {/* Header */}
            <header>
                <h1 className="title">Welcome Alice!</h1>
                <p className="text-foreground/70 mt-1">What will you be learning today?</p>
            </header>

            {/* Zoe AI Banner */}
            <div
                id="zoe-banner"
                className="bg-primary-light rounded-xl p-6 flex items-center gap-6 border border-primary/10"
            >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot size={32} className="text-primary" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">I am Zoe, your learning assistant</span>
                        <Badge variant="success" className="text-xs">New</Badge>
                    </div>
                    <p className="text-sm text-foreground/70">
                        I will help you get job ready by practicing interviews and learning activities
                    </p>
                </div>
                <button className="btn btn-primary shrink-0">Learn with Zoe</button>
            </div>

            {/* My Courses */}
            <section id="my-courses">
                <h2 className="text-xl font-semibold mb-5">My Courses</h2>

                {/* Tabs */}
                <div className="flex gap-3 mb-6">
                    <button className="bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-semibold border-none cursor-pointer">
                        Enrolled
                    </button>
                    <button className="bg-transparent text-muted-foreground rounded-full px-5 py-2 text-sm font-medium border-none cursor-pointer hover:text-foreground transition-colors">
                        Completed
                    </button>
                </div>

                {/* Course Card */}
                <div className="card flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                        <BookOpen size={28} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1">Environment Studies</h3>
                        <p className="text-sm text-foreground/70 line-clamp-2">
                            A multidisciplinary academic field that systematically analyses the complex interactions
                            between humans and their natural and built environments to fi...
                        </p>
                    </div>
                    <Link href="/student/course" className="shrink-0">
                        <button className="btn btn-primary flex items-center gap-2">
                            <RotateCcw size={16} />
                            Resume Learning
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
