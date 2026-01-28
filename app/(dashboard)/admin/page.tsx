'use client'

import { useState } from 'react'
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react'
import { MetricCard } from '@/components/ui/MetricCard'
import { Table } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Switch } from '@/components/ui/Switch'
import styles from './admin.module.css'

import { Walkthrough } from '@/components/ui/Walkthrough'

export default function AdminPage() {
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
    const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false)
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false) // Added
    const [isAddMentorModalOpen, setIsAddMentorModalOpen] = useState(false) // Added

    // Mock Data for Story 2.1
    const metrics = [
        { title: 'Total Students', value: 124, icon: Users, change: '+12%', trend: 'up' as const },
        { title: 'Active Mentors', value: 18, icon: BookOpen, change: '+2', trend: 'up' as const },
        { title: 'Sessions This Week', value: 45, icon: Calendar, change: '-5%', trend: 'down' as const },
        { title: 'Completion Rate', value: '92%', icon: TrendingUp, change: '+1%', trend: 'up' as const },
    ]

    return (
        <div className={styles.container}>
            <Walkthrough
                pageKey="admin_dashboard"
                steps={[
                    {
                        target: '#menu-admin',
                        title: 'Admin Dashboard',
                        content: 'Overview of all platform activity and management tools.',
                        position: 'right'
                    },
                    {
                        target: '#platform-metrics',
                        title: 'Key Metrics',
                        content: 'Real-time overview of users, sessions, and platform health.',
                        position: 'bottom'
                    },
                    {
                        target: '#student-management',
                        title: 'User Management',
                        content: 'Manage student enrollments and mentor assignments from here.',
                        position: 'top'
                    },
                    {
                        target: '#course-management',
                        title: 'Courses & Content',
                        content: 'Create and update course materials and assessments.',
                        position: 'top'
                    }
                ]}
            />
            <header className={styles.header}>
                <h1 className="title">Admin Dashboard</h1>
                <p className={styles.subtitle}>Overview of platform activity and performance.</p>
            </header>

            <div id="platform-metrics" className={styles.grid}>
                {metrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>

            <div id="student-management" className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className={styles.sectionTitle}>Student Management</h2>
                    <button className="btn btn-primary" onClick={() => setIsAddStudentModalOpen(true)}>Add Student</button>
                </div>

                <StudentListTable />
            </div>

            <div className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className={styles.sectionTitle}>Mentor Management</h2>
                    <button className="btn btn-primary" onClick={() => setIsAddMentorModalOpen(true)}>Add Mentor</button>
                </div>

                <MentorListTable />
            </div>

            <div id="course-management" className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className={styles.sectionTitle}>Course & Assessment Management (Story 2.5)</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-primary" onClick={() => setIsCourseModalOpen(true)}>Add Course</button>
                        <button className="btn btn-primary" onClick={() => setIsAssessmentModalOpen(true)}>Create Assessment</button>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className="card" style={{ gridColumn: 'span 2' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Active Courses</h3>
                        <CourseListTable />
                    </div>
                    <div className="card" style={{ gridColumn: 'span 2' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Upcoming Assessments</h3>
                        <AssessmentListTable />
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className={styles.sectionTitle}>Platform Sessions (Story 2.6)</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn" style={{ border: '1px solid var(--border)' }}>Filter Date</button>
                        <button className="btn" style={{ border: '1px solid var(--border)' }}>Filter Mentor</button>
                    </div>
                </div>

                <SessionListTable />
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Availability Management (Story 2.4)</h2>
                <div className="card">
                    <p style={{ padding: '1rem', color: 'var(--foreground)', opacity: 0.6 }}>
                        Calendar view for managing mentor slots will be implemented here. Admin can block/unblock slots and override availability.
                    </p>
                    <div style={{ padding: '0 1rem 1rem' }}>
                        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Quick Actions</h4>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn" style={{ border: '1px solid var(--border)' }}>View Master Calendar</button>
                            <button className="btn" style={{ border: '1px solid var(--border)' }}>Block Holiday</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isCourseModalOpen}
                onClose={() => setIsCourseModalOpen(false)}
                title="Add New Course"
                footer={
                    <>
                        <button className="btn" style={{ border: '1px solid var(--border)' }} onClick={() => setIsCourseModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => setIsCourseModalOpen(false)}>Create Course</button>
                    </>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Course Name</label>
                        <input type="text" className="input" placeholder="e.g. Full Stack Development" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
                        <textarea className="input" rows={3} placeholder="Course description..." style={{ resize: 'vertical' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Assign to Cohort</label>
                        <select className="input">
                            <option>Cohort A (Oct 2023)</option>
                            <option>Cohort B (Nov 2023)</option>
                        </select>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isAssessmentModalOpen}
                onClose={() => setIsAssessmentModalOpen(false)}
                title="Create Assessment"
                footer={
                    <>
                        <button className="btn" style={{ border: '1px solid var(--border)' }} onClick={() => setIsAssessmentModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => setIsAssessmentModalOpen(false)}>Create Assessment</button>
                    </>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Assessment Title</label>
                        <input type="text" className="input" placeholder="e.g. React Fundamentals" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Type</label>
                        <select className="input">
                            <option value="baseline">Baseline</option>
                            <option value="advanced">Advanced</option>
                            <option value="final">Final</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Due Date</label>
                        <input type="date" className="input" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Related Course</label>
                        <select className="input">
                            <option>Full Stack Development</option>
                            <option>UI/UX Design</option>
                        </select>
                    </div>
                </div>
            </Modal>

            <div className={styles.section} style={{ paddingBottom: '2rem' }}>
                <h2 className={styles.sectionTitle}>Notification Configuration (Story 2.7)</h2>
                <div className="card">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <NotificationSetting
                            title="Session Booking Confirmation"
                            description="Send email to student and mentor when a session is booked."
                            defaultChecked={true}
                        />
                        <NotificationSetting
                            title="Session Reminders (24h)"
                            description="Send reminder 24 hours before the session starts."
                            defaultChecked={true}
                        />
                        <NotificationSetting
                            title="Assessment Alerts"
                            description="Notify students 2 days before assessment due date."
                            defaultChecked={false}
                        />
                        <NotificationSetting
                            title="Missed Session Alerts"
                            description="Notify admin when a session is marked as missing."
                            defaultChecked={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function NotificationSetting({ title, description, defaultChecked }: { title: string, description: string, defaultChecked: boolean }) {
    // Local state for demo purposes
    const [enabled, setEnabled] = useState(defaultChecked)

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--foreground)', opacity: 0.7 }}>{description}</p>
            </div>
            <Switch checked={enabled} onChange={setEnabled} />
        </div>
    )
}

function CourseListTable() {
    const courses = [
        { id: 1, name: 'Full Stack Development', students: 45, status: 'active', startDate: '2023-10-01' },
        { id: 2, name: 'UI/UX Design', students: 32, status: 'active', startDate: '2023-10-15' },
        { id: 3, name: 'Data Science Fundamentals', students: 28, status: 'upcoming', startDate: '2023-11-01' },
    ]

    return (
        <Table
            data={courses}
            columns={[
                { header: 'Course Name', accessor: 'name' },
                { header: 'Enrolled', accessor: 'students' },
                { header: 'Start Date', accessor: 'startDate' },
                {
                    header: 'Status',
                    accessor: (course: any) => (
                        <Badge variant={course.status === 'active' ? 'success' : 'neutral'}>
                            {course.status.toUpperCase()}
                        </Badge>
                    )
                },
            ]}
        />
    )
}

function AssessmentListTable() {
    const assessments = [
        { id: 1, title: 'React Basics', type: 'Baseline', course: 'Full Stack Dev', dueDate: '2023-10-30', status: 'published' },
        { id: 2, title: 'User Research Persona', type: 'Advanced', course: 'UI/UX Design', dueDate: '2023-11-05', status: 'draft' },
    ]

    return (
        <Table
            data={assessments}
            columns={[
                { header: 'Title', accessor: 'title' },
                { header: 'Type', accessor: 'type' },
                { header: 'Course', accessor: 'course' },
                { header: 'Due Date', accessor: 'dueDate' },
                {
                    header: 'Status',
                    accessor: (item: any) => (
                        <Badge variant={item.status === 'published' ? 'success' : 'warning'}>
                            {item.status.toUpperCase()}
                        </Badge>
                    )
                },
            ]}
        />
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
        <Table
            data={sessions}
            columns={[
                { header: 'Mentor', accessor: 'mentor' },
                { header: 'Student', accessor: 'student' },
                { header: 'Date & Time', accessor: 'date' },
                { header: 'Type', accessor: 'type' },
                {
                    header: 'Status',
                    accessor: (session: any) => (
                        <Badge variant={session.status === 'scheduled' ? 'info' : session.status === 'completed' ? 'success' : 'error'}>
                            {session.status.toUpperCase()}
                        </Badge>
                    )
                },
            ]}
        />
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
        <Table
            data={students}
            columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Email', accessor: 'email' },
                { header: 'Course', accessor: 'course' },
                {
                    header: 'Status',
                    accessor: (student: any) => (
                        <Badge variant={student.status === 'active' ? 'success' : student.status === 'inactive' ? 'neutral' : 'warning'}>
                            {student.status.toUpperCase()}
                        </Badge>
                    )
                },
                { header: 'Progress', accessor: 'progress' },
            ]}
        />
    )
}

function MentorListTable() {
    const mentors = [
        { id: 1, name: 'Dr. Sarah Lee', expertise: 'Machine Learning', sessions: 12, status: 'active' },
        { id: 2, name: 'James Carter', expertise: 'Frontend Architecture', sessions: 8, status: 'active' },
        { id: 3, name: 'Emily Chen', expertise: 'Product Design', sessions: 0, status: 'pending' },
    ]

    return (
        <Table
            data={mentors}
            columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Expertise', accessor: 'expertise' },
                { header: 'Sessions', accessor: 'sessions' },
                {
                    header: 'Status',
                    accessor: (mentor: any) => (
                        <Badge variant={mentor.status === 'active' ? 'success' : 'neutral'}>
                            {mentor.status.toUpperCase()}
                        </Badge>
                    )
                },
            ]}
        />
    )
}
