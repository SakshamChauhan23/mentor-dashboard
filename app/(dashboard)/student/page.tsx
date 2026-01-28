'use client'

import { useState } from 'react'
import { BookOpen, Clock, AlertCircle, Bell, CheckCircle, Calendar, User, Star, Video, X } from 'lucide-react'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Table } from '@/components/ui/Table'
import { Walkthrough } from '@/components/ui/Walkthrough'

export default function StudentPage() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
    const [isMentorProfileOpen, setIsMentorProfileOpen] = useState(false) // Added
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false) // Added
    const [selectedMentor, setSelectedMentor] = useState<{ name: string, expertise: string } | null>(null)
    const [selectedSlot, setSelectedSlot] = useState('')
    const [sessionPurpose, setSessionPurpose] = useState('')
    const [bookingConfirmed, setBookingConfirmed] = useState(false)
    const [sessionTab, setSessionTab] = useState<'upcoming' | 'past'>('upcoming')
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'info', message: 'Welcome to Zuvy! Complete your profile to get started.', time: '2 hours ago' },
        { id: 2, type: 'success', message: 'You have successfully enrolled in Full Stack Web Development.', time: '1 day ago' }
    ])

    const handleBookSession = (mentorName: string, mentorExpertise: string) => {
        setSelectedMentor({ name: mentorName, expertise: mentorExpertise })
        setIsBookingModalOpen(true)
        setBookingConfirmed(false)
        setSelectedSlot('')
        setSessionPurpose('')
    }

    const handleViewMentorProfile = (mentorName: string, mentorExpertise: string) => {
        setSelectedMentor({ name: mentorName, expertise: mentorExpertise })
        setIsMentorProfileOpen(true)
    }

    const handleJoinMeeting = () => {
        setIsVideoModalOpen(true)
    }

    const handleConfirmBooking = () => {
        setBookingConfirmed(true)

        // Create booking notification (Story 5.1)
        if (selectedMentor && selectedSlot) {
            const newNotification = {
                id: Date.now(),
                type: 'success',
                message: `Session booked with ${selectedMentor.name} on ${selectedSlot}. You will receive a reminder 1 hour before the session.`,
                time: 'Just now'
            }
            setNotifications(prev => [newNotification, ...prev])
        }
    }

    const triggerReminder = () => {
        // Trigger session reminder (Story 5.2)
        const newNotification = {
            id: Date.now(),
            type: 'reminder',
            message: 'Reminder: Upcoming session with Dr. Sarah Lee in 15 minutes. Please join via the link in your email.',
            time: 'Just now'
        }
        setNotifications(prev => [newNotification, ...prev])
    }

    const triggerFeedbackNotification = () => {
        // Trigger feedback notification (Story 5.3)
        const newNotification = {
            id: Date.now(),
            type: 'success',
            message: 'New feedback received from Dr. Sarah Lee for your session on Oct 24. Check your session history.',
            time: 'Just now'
        }
        setNotifications(prev => [newNotification, ...prev])
    }

    const triggerAssessmentAlert = () => {
        // Trigger assessment alert (Story 5.4)
        const newNotification = {
            id: Date.now(),
            type: 'alert',
            message: "Alert: Assessment 'React Fundamentals' is due in 24 hours.",
            time: 'Just now'
        }
        setNotifications(prev => [newNotification, ...prev])
    }

    const triggerMissedSessionAlert = () => {
        // Trigger missed session alert (Story 5.5)
        const newNotification = {
            id: Date.now(),
            type: 'alert',
            message: "Missed Session: You missed your session with Michael Rodriguez today. Please reschedule.",
            time: 'Just now'
        }
        setNotifications(prev => [newNotification, ...prev])
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <Walkthrough
                pageKey="student_dashboard"
                steps={[
                    {
                        target: '#menu-student',
                        title: 'Student Dashboard',
                        content: 'This is your main hub. Access your courses, progress, and finding mentors here.',
                        position: 'right'
                    },
                    {
                        target: '#learning-progress',
                        title: 'Track Progress',
                        content: 'See your current course completion status and active modules at a glance.',
                        position: 'bottom'
                    },
                    {
                        target: '#mentor-section',
                        title: 'Find Mentors',
                        content: 'Browse available mentors and book 1:1 sessions to get help with your studies.',
                        position: 'bottom'
                    },
                    {
                        target: '#search-bar',
                        title: 'Global Search', // From layout
                        content: 'Quickly find specific courses, mentors, or resources.',
                        position: 'bottom'
                    }
                ]}
            />
            <header>
                <h1 className="title">Student Dashboard</h1>
                <p style={{ color: 'var(--foreground)', opacity: 0.7 }}>Welcome back, Alice! Here is your learning progress.</p>
            </header>

            <div id="learning-progress" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>My Learning Journey (Story 3.1)</h2>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <CourseCard
                            title="Full Stack Web Development"
                            progress={45}
                            nextLesson="React Hooks Deep Dive"
                            totalModules={12}
                            completedModules={5}
                        />
                        <CourseCard
                            title="UI/UX Design Fundamentals"
                            progress={12}
                            nextLesson="Color Theory"
                            totalModules={8}
                            completedModules={1}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card">
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={20} color="var(--warning)" />
                            Upcoming Assessments
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <AssessmentItem title="React Basics Quiz" date="Oct 30, 2023" type="Baseline" />
                            <AssessmentItem title="UI Design Mockup" date="Nov 05, 2023" type="Project" />
                        </div>
                    </div>

                    <div className="card">
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={20} color="var(--info)" />
                            Recent Activity
                        </h2>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li style={{ fontSize: '0.9rem' }}>Completed <strong>Module 5: State Management</strong></li>
                            <li style={{ fontSize: '0.9rem' }}>Submitted <strong>CSS Layouts Assignment</strong></li>
                            <li style={{ fontSize: '0.9rem' }}>Booked session with <strong>Dr. Sarah Lee</strong></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                        <Bell size={22} color="var(--color-primary)" />
                        Notifications (Story 3.2)
                    </h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            className="btn"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--border)' }}
                            onClick={triggerReminder}
                        >
                            Demo: Reminder
                        </button>
                        <button
                            className="btn"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--border)' }}
                            onClick={triggerFeedbackNotification}
                        >
                            Demo: Feedback
                        </button>
                        <button
                            className="btn"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--border)' }}
                            onClick={triggerAssessmentAlert}
                        >
                            Demo: Alert
                        </button>
                        <button
                            className="btn"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid var(--border)' }}
                            onClick={triggerMissedSessionAlert}
                        >
                            Demo: Missed
                        </button>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            icon={
                                notification.type === 'success' || notification.type === 'confirmation' ? <CheckCircle size={20} color="var(--success)" /> :
                                    notification.type === 'reminder' ? <Calendar size={20} color="var(--info)" /> :
                                        notification.type === 'alert' ? <AlertCircle size={20} color="var(--warning)" /> :
                                            <Bell size={20} color="var(--primary)" />
                            }
                            message={notification.message}
                            time={notification.time}
                            type={notification.type as any}
                        />
                    ))}
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={22} color="var(--color-primary)" />
                        Browse Mentors (Story 3.3)
                    </h2>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <select className="input" style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}>
                            <option>All Expertise</option>
                            <option>Machine Learning</option>
                            <option>Frontend</option>
                            <option>Product Design</option>
                        </select>
                        <select className="input" style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}>
                            <option>Available This Week</option>
                            <option>Available Today</option>
                            <option>All Mentors</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <MentorCard
                        name="Dr. Sarah Lee"
                        expertise="Machine Learning"
                        experience="10+ years in AI/ML, Former Google Research"
                        availableSlots={5}
                        rating={4.9}
                        onBookSession={() => handleBookSession("Dr. Sarah Lee", "Machine Learning")}
                        onViewProfile={() => handleViewMentorProfile("Dr. Sarah Lee", "Machine Learning")}
                    />
                    <MentorCard
                        name="James Carter"
                        expertise="Frontend Architecture"
                        experience="8 years building scalable web apps"
                        availableSlots={3}
                        rating={4.8}
                        onBookSession={() => handleBookSession("James Carter", "Frontend Architecture")}
                        onViewProfile={() => handleViewMentorProfile("James Carter", "Frontend Architecture")}
                    />
                    <MentorCard
                        name="Emily Chen"
                        expertise="Product Design"
                        experience="6 years at top design agencies"
                        availableSlots={7}
                        rating={4.7}
                        onBookSession={() => handleBookSession("Emily Chen", "Product Design")}
                        onViewProfile={() => handleViewMentorProfile("Emily Chen", "Product Design")}
                    />
                    <MentorCard
                        name="Michael Rodriguez"
                        expertise="Backend Development"
                        experience="12 years in distributed systems"
                        availableSlots={2}
                        rating={5.0}
                        onBookSession={() => handleBookSession("Michael Rodriguez", "Backend Development")}
                        onViewProfile={() => handleViewMentorProfile("Michael Rodriguez", "Backend Development")}
                    />
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={22} color="var(--color-primary)" />
                    My Sessions (Story 3.5)
                </h2>

                <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <button
                            onClick={() => setSessionTab('upcoming')}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '0.75rem 0',
                                cursor: 'pointer',
                                fontWeight: sessionTab === 'upcoming' ? 600 : 400,
                                borderBottom: sessionTab === 'upcoming' ? '2px solid var(--color-primary)' : '2px solid transparent',
                                color: sessionTab === 'upcoming' ? 'var(--color-primary)' : 'var(--foreground)'
                            }}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setSessionTab('past')}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '0.75rem 0',
                                cursor: 'pointer',
                                fontWeight: sessionTab === 'past' ? 600 : 400,
                                borderBottom: sessionTab === 'past' ? '2px solid var(--color-primary)' : '2px solid transparent',
                                color: sessionTab === 'past' ? 'var(--color-primary)' : 'var(--foreground)'
                            }}
                        >
                            Past
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {sessionTab === 'upcoming' ? (
                        <>
                            <SessionHistoryItem
                                mentor="Dr. Sarah Lee"
                                expertise="Machine Learning"
                                date="Oct 24, 2023"
                                time="2:00 PM"
                                purpose="Concept Clarification"
                                status="scheduled"
                                onJoin={handleJoinMeeting}
                            />
                            <SessionHistoryItem
                                mentor="James Carter"
                                expertise="Frontend Architecture"
                                date="Oct 25, 2023"
                                time="10:00 AM"
                                purpose="Career Guidance"
                                status="scheduled"
                                onJoin={handleJoinMeeting}
                            />
                        </>
                    ) : (
                        <>
                            <SessionHistoryItem
                                mentor="Emily Chen"
                                expertise="Product Design"
                                date="Oct 20, 2023"
                                time="3:00 PM"
                                purpose="Project Help"
                                status="completed"
                                feedback="Great session! Emily provided excellent insights on user flow design."
                                rating={5}
                            />
                            <SessionHistoryItem
                                mentor="Dr. Sarah Lee"
                                expertise="Machine Learning"
                                date="Oct 15, 2023"
                                time="1:00 PM"
                                purpose="Assessment Preparation"
                                status="completed"
                                feedback="Very helpful for understanding neural networks. Clear explanations."
                                rating={5}
                            />
                            <SessionHistoryItem
                                mentor="James Carter"
                                expertise="Frontend Architecture"
                                date="Oct 10, 2023"
                                time="4:00 PM"
                                purpose="Concept Clarification"
                                status="completed"
                                feedback="Good overview of React optimization techniques."
                                rating={4}
                            />
                        </>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                title={bookingConfirmed ? "Booking Confirmed! 🎉" : "Book Mentoring Session"}
                footer={
                    !bookingConfirmed ? (
                        <>
                            <button className="btn" style={{ border: '1px solid var(--border)' }} onClick={() => setIsBookingModalOpen(false)}>Cancel</button>
                            <button
                                className="btn btn-primary"
                                onClick={handleConfirmBooking}
                                disabled={!selectedSlot || !sessionPurpose}
                            >
                                Confirm Booking
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setIsBookingModalOpen(false)}>Close</button>
                    )
                }
            >
                {!bookingConfirmed ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.25rem' }}>Booking with</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{selectedMentor?.name}</div>
                            <div style={{ marginTop: '0.5rem' }}>
                                <Badge variant="info">{selectedMentor?.expertise}</Badge>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>Select Time Slot (Story 3.4)</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                {['Oct 24, 2:00 PM', 'Oct 24, 4:00 PM', 'Oct 25, 10:00 AM', 'Oct 25, 2:00 PM'].map((slot) => (
                                    <button
                                        key={slot}
                                        className="btn"
                                        onClick={() => setSelectedSlot(slot)}
                                        style={{
                                            border: selectedSlot === slot ? '2px solid var(--color-primary)' : '1px solid var(--border)',
                                            backgroundColor: selectedSlot === slot ? 'var(--surface)' : 'transparent',
                                            padding: '0.75rem'
                                        }}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Session Purpose</label>
                            <select className="input" value={sessionPurpose} onChange={(e) => setSessionPurpose(e.target.value)}>
                                <option value="">Select purpose...</option>
                                <option value="concept">Concept Clarification</option>
                                <option value="assessment">Assessment Preparation</option>
                                <option value="career">Career Guidance</option>
                                <option value="project">Project Help</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Session Booked Successfully!</h3>
                        <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>You will receive a confirmation email shortly.</p>
                        <div style={{ backgroundColor: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
                            <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <div><strong>Mentor:</strong> {selectedMentor?.name}</div>
                                <div><strong>Time:</strong> {selectedSlot}</div>
                                <div><strong>Purpose:</strong> {sessionPurpose === 'concept' ? 'Concept Clarification' : sessionPurpose === 'assessment' ? 'Assessment Preparation' : sessionPurpose === 'career' ? 'Career Guidance' : 'Project Help'}</div>
                            </div>
                        </div>
                    </div>
                )}
                {/* ... Booking Modal ... */}
            </Modal>

            <Modal
                isOpen={isMentorProfileOpen}
                onClose={() => setIsMentorProfileOpen(false)}
                title="Mentor Profile"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center', padding: '1rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 600 }}>
                        {selectedMentor?.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{selectedMentor?.name}</h2>
                        <Badge variant="info">{selectedMentor?.expertise}</Badge>
                    </div>
                    <p style={{ opacity: 0.8, maxWidth: '400px' }}>
                        Expert in {selectedMentor?.expertise} with over 10 years of industry experience. Passionate about helping students master complex concepts and build real-world applications.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', width: '100%', justifyContent: 'center', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>4.9/5.0</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Rating</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>120+</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Sessions</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>15</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Students</div>
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { setIsMentorProfileOpen(false); handleBookSession(selectedMentor?.name || '', selectedMentor?.expertise || ''); }}>
                        Book a Session
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                title="Google Meet Session"
            >
                <div style={{ height: '400px', backgroundColor: '#202124', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#5f6368', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                        {selectedMentor ? selectedMentor.name.split(' ').map(n => n[0]).join('') : 'SL'}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>Waiting for host to join...</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Correcting Logic vs Styling Errors</div>

                    <div style={{ position: 'absolute', bottom: '2rem', display: 'flex', gap: '1rem' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#3c4043', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <div style={{ width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%', opacity: 0.8 }}></div>
                        </div>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ea4335', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setIsVideoModalOpen(false)}>
                            <X color="white" />
                        </div>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#3c4043', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <div style={{ width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%', opacity: 0.8 }}></div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

function SessionHistoryItem({ mentor, expertise, date, time, purpose, status, feedback, rating, onJoin }: {
    mentor: string,
    expertise: string,
    date: string,
    time: string,
    purpose: string,
    status: 'scheduled' | 'completed' | 'cancelled',
    feedback?: string,
    rating?: number,
    onJoin?: () => void
}) {
    return (
        <div style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            gap: '1rem'
        }}>
            {/* ... same avatar ... */}
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                flexShrink: 0
            }}>
                {mentor.split(' ').map(n => n[0]).join('')}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{mentor}</h4>
                        <div style={{ fontSize: '0.875rem', color: 'var(--foreground)', opacity: 0.7 }}>
                            {expertise}
                        </div>
                    </div>
                    <Badge variant={status === 'completed' ? 'success' : status === 'scheduled' ? 'info' : 'neutral'}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                </div>

                {/* ... date/time ... */}
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--foreground)', opacity: 0.8, marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} />
                        {date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        {time}
                    </div>
                </div>

                <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <strong>Purpose:</strong> {purpose}
                </div>

                {status === 'scheduled' && onJoin && (
                    <button onClick={onJoin} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        <Video size={14} />
                        Join Meeting
                    </button>
                )}

                {/* ... feedback ... */}
                {feedback && (
                    <div style={{
                        backgroundColor: 'var(--surface)',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        marginTop: '0.75rem',
                        fontSize: '0.875rem'
                    }}>
                        {/* ... same feedback content ... */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <strong>Feedback:</strong>
                            {rating && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    {[...Array(rating)].map((_, i) => (
                                        <Star key={i} size={14} color="var(--warning)" fill="var(--warning)" />
                                    ))}
                                </div>
                            )}
                        </div>
                        <p style={{ margin: 0, opacity: 0.8 }}>{feedback}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

function MentorCard({ name, expertise, experience, availableSlots, rating, onBookSession, onViewProfile }: {
    name: string,
    expertise: string,
    experience: string,
    availableSlots: number,
    rating: number,
    onBookSession?: () => void,
    onViewProfile?: () => void
}) {
    return (
        <div onClick={onViewProfile} style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transition: 'all 0.2s',
            cursor: 'pointer'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.2rem'
                }}>
                    {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={16} color="var(--warning)" fill="var(--warning)" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{rating}</span>
                </div>
            </div>

            <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{name}</h3>
                <Badge variant="info">{expertise}</Badge>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--foreground)', opacity: 0.7, lineHeight: 1.5 }}>
                {experience}
            </p>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '0.5rem',
                borderTop: '1px solid var(--border)'
            }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--foreground)', opacity: 0.8 }}>
                    {availableSlots} slots available
                </span>
                <button
                    className="btn btn-primary"
                    style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click (view profile)
                        onBookSession?.();
                    }}
                >
                    Book Session
                </button>
            </div>
        </div>
    )
}

function NotificationItem({ icon, message, time, type }: { icon: React.ReactNode, message: string, time: string, type: 'confirmation' | 'reminder' | 'alert' }) {
    return (
        <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            transition: 'all 0.2s'
        }}>
            <div style={{ flexShrink: 0, marginTop: '0.125rem' }}>
                {icon}
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{message}</p>
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{time}</span>
            </div>
        </div>
    )
}

function CourseCard({ title, progress, nextLesson, totalModules, completedModules }: { title: string, progress: number, nextLesson: string, totalModules: number, completedModules: number }) {
    return (
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h3>
                    <div style={{ fontSize: '0.875rem', color: 'var(--foreground)', opacity: 0.7 }}>
                        {completedModules}/{totalModules} Modules Completed
                    </div>
                </div>
                <Badge variant={progress >= 100 ? 'success' : 'info'}>{progress}%</Badge>
            </div>

            <ProgressBar value={progress} />

            <div style={{ fontSize: '0.875rem', display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: 'auto' }}>
                <BookOpen size={16} />
                <span>Next: <strong>{nextLesson}</strong></span>
                <button className="btn btn-primary" style={{ marginLeft: 'auto', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Continue</button>
            </div>
        </div>
    )
}

function AssessmentItem({ title, date, type }: { title: string, date: string, type: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
            <div>
                <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{title}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Due: {date}</div>
            </div>
            <Badge variant="warning">{type}</Badge>
        </div>
    )
}
