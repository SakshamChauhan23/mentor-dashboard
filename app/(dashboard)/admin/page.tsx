'use client'

import { useState } from 'react'
import { Users, BookOpen, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog'
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Walkthrough } from '@/components/ui/Walkthrough'

export default function AdminPage() {
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
    const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
    const [isAddMentorModalOpen, setIsAddMentorModalOpen] = useState(false)

    const metrics = [
        { title: 'Total Students', value: 124, icon: Users, change: '+12%', trend: 'up' as const },
        { title: 'Active Mentors', value: 18, icon: BookOpen, change: '+2', trend: 'up' as const },
        { title: 'Sessions This Week', value: 45, icon: Calendar, change: '-5%', trend: 'down' as const },
        { title: 'Completion Rate', value: '92%', icon: TrendingUp, change: '+1%', trend: 'up' as const },
    ]

    return (
        <div className="flex flex-col gap-8">
            <Walkthrough
                pageKey="admin_dashboard"
                steps={[
                    { target: '#menu-admin', title: 'Admin Dashboard', content: 'Overview of all platform activity and management tools.', position: 'right' },
                    { target: '#platform-metrics', title: 'Key Metrics', content: 'Real-time overview of users, sessions, and platform health.', position: 'bottom' },
                    { target: '#student-management', title: 'User Management', content: 'Manage student enrollments and mentor assignments from here.', position: 'top' },
                    { target: '#course-management', title: 'Courses & Content', content: 'Create and update course materials and assessments.', position: 'top' },
                ]}
            />

            <header>
                <h1 className="title">Admin Dashboard</h1>
                <p className="text-foreground/70">Overview of platform activity and performance.</p>
            </header>

            {/* Platform Metrics */}
            <div id="platform-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>

            {/* Student Management */}
            <div id="student-management" className="card flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Student Management</h2>
                    <button className="btn btn-primary" onClick={() => setIsAddStudentModalOpen(true)}>Add Student</button>
                </div>
                <StudentListTable />
            </div>

            {/* Mentor Management */}
            <div className="card flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Mentor Management</h2>
                    <button className="btn btn-primary" onClick={() => setIsAddMentorModalOpen(true)}>Add Mentor</button>
                </div>
                <MentorListTable />
            </div>

            {/* Course & Assessment Management */}
            <div id="course-management" className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Course & Assessment Management (Story 2.5)</h2>
                    <div className="flex gap-2">
                        <button className="btn btn-primary" onClick={() => setIsCourseModalOpen(true)}>Add Course</button>
                        <button className="btn btn-primary" onClick={() => setIsAssessmentModalOpen(true)}>Create Assessment</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="card">
                        <h3 className="mb-4 text-base font-semibold">Active Courses</h3>
                        <CourseListTable />
                    </div>
                    <div className="card">
                        <h3 className="mb-4 text-base font-semibold">Upcoming Assessments</h3>
                        <AssessmentListTable />
                    </div>
                </div>
            </div>

            {/* Platform Sessions */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Platform Sessions (Story 2.6)</h2>
                    <div className="flex gap-2">
                        <button className="btn border border-border">Filter Date</button>
                        <button className="btn border border-border">Filter Mentor</button>
                    </div>
                </div>
                <div className="card">
                    <SessionListTable />
                </div>
            </div>

            {/* Availability Management */}
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Availability Management (Story 2.4)</h2>
                <div className="card">
                    <p className="p-4 text-foreground/60">
                        Calendar view for managing mentor slots will be implemented here. Admin can block/unblock slots and override availability.
                    </p>
                    <div className="px-4 pb-4">
                        <h4 className="mb-2 text-sm font-medium">Quick Actions</h4>
                        <div className="flex gap-2">
                            <button className="btn border border-border">View Master Calendar</button>
                            <button className="btn border border-border">Block Holiday</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Configuration */}
            <div className="flex flex-col gap-4 pb-8">
                <h2 className="text-xl font-semibold">Notification Configuration (Story 2.7)</h2>
                <div className="card flex flex-col gap-6">
                    <NotificationSetting title="Session Booking Confirmation" description="Send email to student and mentor when a session is booked." defaultChecked={true} />
                    <NotificationSetting title="Session Reminders (24h)" description="Send reminder 24 hours before the session starts." defaultChecked={true} />
                    <NotificationSetting title="Assessment Alerts" description="Notify students 2 days before assessment due date." defaultChecked={false} />
                    <NotificationSetting title="Missed Session Alerts" description="Notify admin when a session is marked as missing." defaultChecked={true} />
                </div>
            </div>

            {/* Dialogs */}
            <Dialog open={isCourseModalOpen} onOpenChange={setIsCourseModalOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Add New Course</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div><label className="block mb-2 text-sm">Course Name</label><input type="text" className="input" placeholder="e.g. Full Stack Development" /></div>
                        <div><label className="block mb-2 text-sm">Description</label><textarea className="input resize-y" rows={3} placeholder="Course description..." /></div>
                        <div>
                            <label className="block mb-2 text-sm">Assign to Cohort</label>
                            <select className="input"><option>Cohort A (Oct 2023)</option><option>Cohort B (Nov 2023)</option></select>
                        </div>
                    </div>
                    <DialogFooter>
                        <button className="btn border border-border" onClick={() => setIsCourseModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => setIsCourseModalOpen(false)}>Create Course</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isAssessmentModalOpen} onOpenChange={setIsAssessmentModalOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Create Assessment</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div><label className="block mb-2 text-sm">Assessment Title</label><input type="text" className="input" placeholder="e.g. React Fundamentals" /></div>
                        <div><label className="block mb-2 text-sm">Type</label><select className="input"><option value="baseline">Baseline</option><option value="advanced">Advanced</option><option value="final">Final</option></select></div>
                        <div><label className="block mb-2 text-sm">Due Date</label><input type="date" className="input" /></div>
                        <div><label className="block mb-2 text-sm">Related Course</label><select className="input"><option>Full Stack Development</option><option>UI/UX Design</option></select></div>
                    </div>
                    <DialogFooter>
                        <button className="btn border border-border" onClick={() => setIsAssessmentModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => setIsAssessmentModalOpen(false)}>Create Assessment</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isAddStudentModalOpen} onOpenChange={setIsAddStudentModalOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Add Student</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div><label className="block mb-2 text-sm">Name</label><input type="text" className="input" placeholder="Student name" /></div>
                        <div><label className="block mb-2 text-sm">Email</label><input type="email" className="input" placeholder="student@example.com" /></div>
                        <div><label className="block mb-2 text-sm">Course</label><select className="input"><option>Full Stack Development</option><option>UI/UX Design</option><option>Data Science</option></select></div>
                    </div>
                    <DialogFooter>
                        <button className="btn border border-border" onClick={() => setIsAddStudentModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => setIsAddStudentModalOpen(false)}>Add Student</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isAddMentorModalOpen} onOpenChange={setIsAddMentorModalOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Add Mentor</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div><label className="block mb-2 text-sm">Name</label><input type="text" className="input" placeholder="Mentor name" /></div>
                        <div><label className="block mb-2 text-sm">Expertise</label><input type="text" className="input" placeholder="e.g. Machine Learning" /></div>
                    </div>
                    <DialogFooter>
                        <button className="btn border border-border" onClick={() => setIsAddMentorModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => setIsAddMentorModalOpen(false)}>Add Mentor</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function MetricCard({ title, value, icon: Icon, change, trend }: {
    title: string
    value: string | number
    icon: React.ElementType
    change: string
    trend: 'up' | 'down' | 'neutral'
}) {
    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
    return (
        <Card className="hover:-translate-y-0.5 transition-transform duration-200">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon size={18} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold mb-1">{value}</div>
                <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                    <TrendIcon size={12} />
                    {change} from last month
                </div>
            </CardContent>
        </Card>
    )
}

function NotificationSetting({ title, description, defaultChecked }: { title: string; description: string; defaultChecked: boolean }) {
    const [enabled, setEnabled] = useState(defaultChecked)
    return (
        <div className="flex justify-between items-center">
            <div>
                <h4 className="text-[0.9rem] font-semibold mb-1">{title}</h4>
                <p className="text-[0.8rem] text-foreground/70">{description}</p>
            </div>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
    )
}

function StudentListTable() {
    const students = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', course: 'Full Stack Dev', status: 'active', progress: '45%' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', course: 'UI/UX Design', status: 'inactive', progress: '12%' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', course: 'Data Science', status: 'active', progress: '78%' },
        { id: 4, name: 'Diana Ross', email: 'diana@example.com', course: 'Product Mgmt', status: 'active', progress: '30%' },
        { id: 5, name: 'Evan Wright', email: 'evan@example.com', course: 'Full Stack Dev', status: 'warning', progress: '0%' },
    ]
    return (
        <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Course</TableHead><TableHead>Status</TableHead><TableHead>Progress</TableHead></TableRow></TableHeader>
            <TableBody>
                {students.map(s => (
                    <TableRow key={s.id}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.email}</TableCell>
                        <TableCell>{s.course}</TableCell>
                        <TableCell><Badge variant={s.status === 'active' ? 'success' : s.status === 'inactive' ? 'neutral' : 'warning'}>{s.status.toUpperCase()}</Badge></TableCell>
                        <TableCell>{s.progress}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function MentorListTable() {
    const mentors = [
        { id: 1, name: 'Dr. Sarah Lee', expertise: 'Machine Learning', sessions: 12, status: 'active' },
        { id: 2, name: 'James Carter', expertise: 'Frontend Architecture', sessions: 8, status: 'active' },
        { id: 3, name: 'Emily Chen', expertise: 'Product Design', sessions: 0, status: 'pending' },
    ]
    return (
        <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Expertise</TableHead><TableHead>Sessions</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
                {mentors.map(m => (
                    <TableRow key={m.id}>
                        <TableCell>{m.name}</TableCell>
                        <TableCell>{m.expertise}</TableCell>
                        <TableCell>{m.sessions}</TableCell>
                        <TableCell><Badge variant={m.status === 'active' ? 'success' : 'neutral'}>{m.status.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function CourseListTable() {
    const courses = [
        { id: 1, name: 'Full Stack Development', students: 45, status: 'active', startDate: '2023-10-01' },
        { id: 2, name: 'UI/UX Design', students: 32, status: 'active', startDate: '2023-10-15' },
        { id: 3, name: 'Data Science Fundamentals', students: 28, status: 'upcoming', startDate: '2023-11-01' },
    ]
    return (
        <Table>
            <TableHeader><TableRow><TableHead>Course Name</TableHead><TableHead>Enrolled</TableHead><TableHead>Start Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
                {courses.map(c => (
                    <TableRow key={c.id}>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.students}</TableCell>
                        <TableCell>{c.startDate}</TableCell>
                        <TableCell><Badge variant={c.status === 'active' ? 'success' : 'neutral'}>{c.status.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function AssessmentListTable() {
    const assessments = [
        { id: 1, title: 'React Basics', type: 'Baseline', course: 'Full Stack Dev', dueDate: '2023-10-30', status: 'published' },
        { id: 2, title: 'User Research Persona', type: 'Advanced', course: 'UI/UX Design', dueDate: '2023-11-05', status: 'draft' },
    ]
    return (
        <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Type</TableHead><TableHead>Course</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
                {assessments.map(a => (
                    <TableRow key={a.id}>
                        <TableCell>{a.title}</TableCell>
                        <TableCell>{a.type}</TableCell>
                        <TableCell>{a.course}</TableCell>
                        <TableCell>{a.dueDate}</TableCell>
                        <TableCell><Badge variant={a.status === 'published' ? 'success' : 'warning'}>{a.status.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function SessionListTable() {
    const sessions = [
        { id: 1, mentor: 'Dr. Sarah Lee', student: 'Alice Johnson', date: 'Oct 24, 2:00 PM', type: 'Concept Review', status: 'scheduled' },
        { id: 2, mentor: 'James Carter', student: 'Bob Smith', date: 'Oct 25, 10:00 AM', type: 'Project Help', status: 'completed' },
        { id: 3, mentor: 'Dr. Sarah Lee', student: 'Charlie Brown', date: 'Oct 26, 4:00 PM', type: 'Career Guidance', status: 'cancelled' },
        { id: 4, mentor: 'Emily Chen', student: 'Diana Ross', date: 'Oct 27, 11:30 AM', type: 'Introduction', status: 'scheduled' },
    ]
    return (
        <Table>
            <TableHeader><TableRow><TableHead>Mentor</TableHead><TableHead>Student</TableHead><TableHead>Date & Time</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
                {sessions.map(s => (
                    <TableRow key={s.id}>
                        <TableCell>{s.mentor}</TableCell>
                        <TableCell>{s.student}</TableCell>
                        <TableCell>{s.date}</TableCell>
                        <TableCell>{s.type}</TableCell>
                        <TableCell><Badge variant={s.status === 'scheduled' ? 'info' : s.status === 'completed' ? 'success' : 'error'}>{s.status.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
