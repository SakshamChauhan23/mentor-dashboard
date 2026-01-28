'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Video, RefreshCw, BookOpen, Star, Plus, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ProgressBar } from '@/components/ui/ProgressBar'

import { Walkthrough } from '@/components/ui/Walkthrough'

export default function MentorPage() {
    const [selectedStudent, setSelectedStudent] = useState<{ name: string, course: string, progress: number, email: string } | null>(null)
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false)
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
    const [selectedSession, setSelectedSession] = useState<{ student: string, date: string, purpose: string } | null>(null)
    const [rating, setRating] = useState(0)
    const [feedbackText, setFeedbackText] = useState('')
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)
    const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
    const [newSlotDay, setNewSlotDay] = useState('Monday')
    const [newSlotTime, setNewSlotTime] = useState('')

    // ... existing handlers ...

    const handleReschedule = () => {
        setIsRescheduleModalOpen(true)
    }

    // ... existing handlers continue ...


    // Mock Availability Data in State
    const [availability, setAvailability] = useState<{ day: string; time: string; id: string }[]>([
        { id: '1', day: 'Monday', time: '9:00 AM - 10:00 AM' },
        { id: '2', day: 'Monday', time: '2:00 PM - 3:00 PM' },
        { id: '3', day: 'Wednesday', time: '10:00 AM - 11:00 AM' },
        { id: '4', day: 'Wednesday', time: '3:00 PM - 4:00 PM' },
        { id: '5', day: 'Friday', time: '1:00 PM - 2:00 PM' },
    ])

    const handleViewStudent = (name: string, course: string, progress: number, email: string) => {
        setSelectedStudent({ name, course, progress, email })
        setIsStudentModalOpen(true)
    }

    const handleOpenFeedback = (student: string, date: string, purpose: string) => {
        setSelectedSession({ student, date, purpose })
        setIsFeedbackModalOpen(true)
        setRating(0)
        setFeedbackText('')
        setFeedbackSubmitted(false)
    }

    const handleSubmitFeedback = () => {
        setFeedbackSubmitted(true)
        setTimeout(() => {
            setIsFeedbackModalOpen(false)
        }, 2000)
    }

    const handleJoinMeeting = () => {
        setIsMeetingModalOpen(true)
    }

    const handleAddSlot = () => {
        if (!newSlotTime) return
        const newSlot = {
            id: Date.now().toString(),
            day: newSlotDay,
            time: newSlotTime
        }
        setAvailability([...availability, newSlot])
        setNewSlotTime('')
        setIsAvailabilityModalOpen(false)
    }

    const handleRemoveSlot = (id: string) => {
        setAvailability(availability.filter(slot => slot.id !== id))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Walkthrough
                pageKey="mentor_dashboard"
                steps={[
                    {
                        target: '#menu-mentor',
                        title: 'Mentor Dashboard',
                        content: 'This is your dedicated workspace for managing sessions and students.',
                        position: 'right'
                    },
                    {
                        target: '#upcoming-sessions',
                        title: 'Upcoming Sessions',
                        content: 'View specific details for your sessions scheduled for today and this week.',
                        position: 'bottom'
                    },
                    {
                        target: '#manage-availability',
                        title: 'Availability',
                        content: 'Set your weekly availability slots so students can book sessions with you.',
                        position: 'top'
                    },
                    {
                        target: '#completed-sessions',
                        title: 'Completed Sessions',
                        content: 'Review past sessions and submit feedback for your students.',
                        position: 'top'
                    }
                ]}
            />
            <header>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="title">Mentor Dashboard</h1>
                        <p style={{ color: 'var(--foreground)', opacity: 0.7 }}>Welcome back, Dr. Sarah! Here are your upcoming sessions.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Next Session</div>
                            <div style={{ fontWeight: 600, color: 'var(--primary)' }}>In 15 mins</div>
                        </div>
                        <button className="btn btn-primary" onClick={handleJoinMeeting}>
                            <Video size={18} />
                            Join Meeting
                        </button>
                    </div>
                </div>
            </header>

            <div id="upcoming-sessions" className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={22} color="var(--color-primary)" />
                    Upcoming Sessions (Story 4.1)
                </h2>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-primary)' }}>Today's Sessions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <UpcomingSessionCard
                            student="Alice Johnson"
                            course="Full Stack Web Development"
                            date="Oct 24, 2023"
                            time="2:00 PM"
                            duration="60 min"
                            purpose="Concept Clarification"
                            status="confirmed"
                            isToday={true}
                            onJoin={handleJoinMeeting}
                            onViewProfile={() => handleViewStudent('Alice Johnson', 'Full Stack Web Development', 45, 'alice.j@email.com')}
                            onReschedule={handleReschedule}
                        />
                        <UpcomingSessionCard
                            student="Bob Smith"
                            course="Machine Learning Basics"
                            date="Oct 24, 2023"
                            time="4:00 PM"
                            duration="45 min"
                            purpose="Assessment Preparation"
                            status="confirmed"
                            isToday={true}
                            onJoin={handleJoinMeeting}
                            onViewProfile={() => handleViewStudent('Bob Smith', 'Machine Learning Basics', 30, 'bob.s@email.com')}
                            onReschedule={handleReschedule}
                        />
                    </div>
                </div >

                <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>This Week</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <UpcomingSessionCard
                            student="Carol Martinez"
                            course="UI/UX Design Fundamentals"
                            date="Oct 25, 2023"
                            time="10:00 AM"
                            duration="60 min"
                            purpose="Career Guidance"
                            status="confirmed"
                            onViewProfile={() => handleViewStudent('Carol Martinez', 'UI/UX Design Fundamentals', 78, 'carol.m@email.com')}
                            onReschedule={handleReschedule}
                        />
                        <UpcomingSessionCard
                            student="David Chen"
                            course="Full Stack Web Development"
                            date="Oct 26, 2023"
                            time="3:00 PM"
                            duration="45 min"
                            purpose="Project Help"
                            status="pending"
                            onViewProfile={() => handleViewStudent('David Chen', 'Full Stack Web Development', 33, 'david.c@email.com')}
                            onReschedule={handleReschedule}
                        />
                    </div>
                </div>
            </div >

            <div id="my-students" className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={22} color="var(--color-primary)" />
                    My Students (Story 4.2)
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <StudentCard
                        name="Alice Johnson"
                        course="Full Stack Web Development"
                        progress={45}
                        email="alice.j@email.com"
                        onViewProfile={() => handleViewStudent('Alice Johnson', 'Full Stack Web Development', 45, 'alice.j@email.com')}
                    />
                    <StudentCard
                        name="Bob Smith"
                        course="Machine Learning Basics"
                        progress={30}
                        email="bob.s@email.com"
                        onViewProfile={() => handleViewStudent('Bob Smith', 'Machine Learning Basics', 30, 'bob.s@email.com')}
                    />
                </div>
            </div>


            <Modal
                isOpen={isStudentModalOpen}
                onClose={() => setIsStudentModalOpen(false)}
                title="Student Profile"
            >
                {selectedStudent && (
                    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
                                {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{selectedStudent.name}</h3>
                            <p style={{ opacity: 0.7 }}>{selectedStudent.course}</p>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Course Progress</h4>
                            <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.875rem' }}>{selectedStudent.course}</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{selectedStudent.progress}%</span>
                            </div>
                            <ProgressBar value={selectedStudent.progress} />
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Past Sessions</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Oct 20, 2023 - Concept Clarification</span>
                                        <div style={{ display: 'flex', gap: '0.125rem' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} color="var(--warning)" fill="var(--warning)" />
                                            ))}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: 0 }}>Great progress on React concepts!</p>
                                </div>
                                <div style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Oct 15, 2023 - Assessment Preparation</span>
                                        <div style={{ display: 'flex', gap: '0.125rem' }}>
                                            {[...Array(4)].map((_, i) => (
                                                <Star key={i} size={12} color="var(--warning)" fill="var(--warning)" />
                                            ))}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: 0 }}>Needs more practice with hooks.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Mentor Notes</h4>
                            <textarea
                                className="input"
                                placeholder="Add notes about this student..."
                                rows={4}
                                style={{ width: '100%', resize: 'vertical' }}
                            />
                        </div>
                    </div>
                )}
            </Modal>

            <div id="manage-availability" className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={22} color="var(--color-primary)" />
                    Manage Availability (Story 4.3)
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                        <div key={day} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                                {day}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {availability.filter(slot => slot.day === day).map(slot => (
                                    <AvailabilitySlot
                                        key={slot.id}
                                        time={slot.time}
                                        onRemove={() => handleRemoveSlot(slot.id)}
                                    />
                                ))}
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setNewSlotDay(day)
                                        setIsAvailabilityModalOpen(true)
                                    }}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', padding: '0.4rem', fontSize: '0.75rem', border: '1px dashed var(--border)', color: 'var(--color-primary)'
                                    }}
                                >
                                    <Plus size={14} />
                                    Add Slot
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="completed-sessions" className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={22} color="var(--color-primary)" />
                    Completed Sessions (Story 4.4)
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <CompletedSessionCard
                        student="Emily Watson"
                        course="Full Stack Web Development"
                        date="Oct 20, 2023"
                        time="3:00 PM"
                        purpose="Concept Clarification"
                        hasFeedback={false}
                        onSubmitFeedback={() => handleOpenFeedback('Emily Watson', 'Oct 20, 2023', 'Concept Clarification')}
                    />
                    <CompletedSessionCard
                        student="Michael Brown"
                        course="Machine Learning Basics"
                        date="Oct 18, 2023"
                        time="1:00 PM"
                        purpose="Project Help"
                        hasFeedback={true}
                    />
                </div>
            </div>

            <Modal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
                title={feedbackSubmitted ? "Feedback Submitted! ✅" : "Submit Session Feedback"}
                footer={
                    !feedbackSubmitted && (
                        <>
                            <button className="btn" style={{ border: '1px solid var(--border)' }} onClick={() => setIsFeedbackModalOpen(false)}>Cancel</button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmitFeedback}
                                disabled={rating === 0}
                            >
                                Submit Feedback
                            </button>
                        </>
                    )
                }
            >
                {!feedbackSubmitted ? (
                    <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {selectedSession && (
                            <div style={{ padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{selectedSession.student}</div>
                                <div>{selectedSession.date}</div>
                            </div>
                        )}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>Rating</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={24} fill={star <= rating ? 'gold' : 'none'} onClick={() => setRating(star)} style={{ cursor: 'pointer' }} />
                                ))}
                            </div>
                        </div>
                        <textarea
                            className="input"
                            rows={4}
                            placeholder="Constructive feedback..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSubmitFeedback}>Submit</button>
                    </div>
                ) : (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Feedback Sent!</div>
                )}
            </Modal>

            <Modal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} title="Video Session">
                <div style={{ width: '600px', height: '400px', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem' }}>📷</div>
                        <p>Camera and Microphone Active</p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Connecting to secure server...</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <button className="btn" style={{ backgroundColor: 'var(--destructive)', color: 'white' }} onClick={() => setIsMeetingModalOpen(false)}>End Call</button>
                    <button className="btn btn-secondary">Mute</button>
                </div>
            </Modal>

            <Modal isOpen={isAvailabilityModalOpen} onClose={() => setIsAvailabilityModalOpen(false)} title={`Add Slot: ${newSlotDay}`}>
                <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Select Time Slot</label>
                    <select className="input" value={newSlotTime} onChange={(e) => setNewSlotTime(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                        <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                        <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                        <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    </select>
                    <button className="btn btn-primary" onClick={handleAddSlot} disabled={!newSlotTime}>Add Slot</button>
                </div>
            </Modal>
        </div >
    )
}

function AvailabilitySlot({ time, onRemove }: { time: string, onRemove: () => void }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem',
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem'
        }}>
            <span>{time}</span>
            <button
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--error)',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center'
                }}
                onClick={onRemove}
            >
                <X size={12} />
            </button>
        </div>
    )
}

function CompletedSessionCard({ student, course, date, time, purpose, hasFeedback, onSubmitFeedback }: {
    student: string,
    course: string,
    date: string,
    time: string,
    purpose: string,
    hasFeedback: boolean,
    onSubmitFeedback?: () => void
}) {
    return (
        <div style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            gap: '1.25rem'
        }}>
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
                fontSize: '1.2rem',
                flexShrink: 0
            }}>
                {student.split(' ').map(n => n[0]).join('')}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{student}</h4>
                        <div style={{ fontSize: '0.875rem', color: 'var(--foreground)', opacity: 0.7 }}>
                            {course}
                        </div>
                    </div>
                    {hasFeedback && (
                        <Badge variant="success">Feedback Submitted</Badge>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--foreground)', opacity: 0.8, marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} />
                        {date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        {time}
                    </div>
                </div>

                <div style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                    <strong>Purpose:</strong> {purpose}
                </div>

                {!hasFeedback && (
                    <button
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        onClick={onSubmitFeedback}
                    >
                        Submit Feedback
                    </button>
                )}
            </div>
        </div>
    )
}

function StudentCard({ name, course, progress, email, onViewProfile }: {
    name: string,
    course: string,
    progress: number,
    email: string,
    onViewProfile: () => void
}) {
    return (
import styles from './mentor.module.css'

    // ... existing imports

    // ... inside StudentCard
    <div className={styles.studentCard}
        onClick={onViewProfile}
    >
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
            fontSize: '1.2rem',
            marginBottom: '1rem'
        }}>
            {name.split(' ').map(n => n[0]).join('')}
        </div>

        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{name}</h4>
        <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '1rem' }}>{course}</p>

        <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>Progress</span>
                <span style={{ fontWeight: 600 }}>{progress}%</span>
            </div>
            <ProgressBar value={progress} />
        </div>

        <button
            className="btn"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', fontSize: '0.875rem', border: '1px solid var(--border)' }}
            onClick={(e) => {
                e.stopPropagation()
                onViewProfile()
            }}
        >
            View Profile
        </button>
    </div>
    )
}

function UpcomingSessionCard({ student, course, date, time, duration, purpose, status, isToday, onJoin, onViewProfile, onReschedule }: {
    student: string,
    course: string,
    date: string,
    time: string,
    duration: string,
    purpose: string,
    status: 'confirmed' | 'pending',
    isToday?: boolean,
    onJoin?: () => void,
    onViewProfile?: () => void,
    onReschedule?: () => void
}) {
    return (
        <div style={{
            border: isToday ? '2px solid var(--color-primary)' : '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            backgroundColor: isToday ? 'var(--surface)' : 'transparent',
            display: 'flex',
            gap: '1.25rem'
        }}>
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
                fontSize: '1.2rem',
                flexShrink: 0
            }}>
                {student.split(' ').map(n => n[0]).join('')}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{student}</h4>
                        <div style={{ fontSize: '0.875rem', color: 'var(--foreground)', opacity: 0.7 }}>
                            {course}
                        </div>
                    </div>
                    <Badge variant={status === 'confirmed' ? 'success' : 'warning'}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--foreground)', opacity: 0.8, marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} />
                        {date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} />
                        {time} ({duration})
                    </div>
                </div>

                <div style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                    <strong>Purpose:</strong> {purpose}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button onClick={onViewProfile} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid var(--border)' }}>
                        <User size={16} />
                        View Profile
                    </button>
                    {isToday && (
                        <button onClick={onJoin} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                            <Video size={16} />
                            Start Session
                        </button>
                    )}
                    <button onClick={onReschedule} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid var(--border)' }}>
                        <RefreshCw size={16} />
                        Reschedule
                    </button>
                </div>
            </div>
        </div>
    )
}
