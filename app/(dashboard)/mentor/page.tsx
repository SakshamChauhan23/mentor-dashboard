'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Video, RefreshCw, BookOpen, Star, Plus, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog'
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
        setTimeout(() => setIsFeedbackModalOpen(false), 2000)
    }

    const handleAddSlot = () => {
        if (!newSlotTime) return
        setAvailability([...availability, { id: Date.now().toString(), day: newSlotDay, time: newSlotTime }])
        setNewSlotTime('')
        setIsAvailabilityModalOpen(false)
    }

    const handleRemoveSlot = (id: string) => {
        setAvailability(availability.filter(slot => slot.id !== id))
    }

    return (
        <div className="flex flex-col gap-8">
            <Walkthrough
                pageKey="mentor_dashboard"
                steps={[
                    { target: '#menu-mentor', title: 'Mentor Dashboard', content: 'This is your dedicated workspace for managing sessions and students.', position: 'right' },
                    { target: '#upcoming-sessions', title: 'Upcoming Sessions', content: 'View specific details for your sessions scheduled for today and this week.', position: 'bottom' },
                    { target: '#manage-availability', title: 'Availability', content: 'Set your weekly availability slots so students can book sessions with you.', position: 'top' },
                    { target: '#completed-sessions', title: 'Completed Sessions', content: 'Review past sessions and submit feedback for your students.', position: 'top' },
                ]}
            />

            <header className="flex justify-between items-center">
                <div>
                    <h1 className="title">Mentor Dashboard</h1>
                    <p className="text-foreground/70">Welcome back, Dr. Sarah! Here are your upcoming sessions.</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-sm opacity-70">Next Session</div>
                        <div className="font-semibold text-primary">In 15 mins</div>
                    </div>
                    <button className="btn btn-primary" onClick={() => setIsMeetingModalOpen(true)}>
                        <Video size={18} />
                        Join Meeting
                    </button>
                </div>
            </header>

            {/* Upcoming Sessions */}
            <div id="upcoming-sessions" className="card">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Calendar size={22} className="text-primary" />
                    Upcoming Sessions (Story 4.1)
                </h2>
                <div className="mb-8">
                    <h3 className="text-base font-semibold mb-4 text-primary">Today&apos;s Sessions</h3>
                    <div className="flex flex-col gap-4">
                        <UpcomingSessionCard
                            student="Alice Johnson" course="Full Stack Web Development"
                            date="Oct 24, 2023" time="2:00 PM" duration="60 min"
                            purpose="Concept Clarification" status="confirmed" isToday
                            onJoin={() => setIsMeetingModalOpen(true)}
                            onViewProfile={() => handleViewStudent('Alice Johnson', 'Full Stack Web Development', 45, 'alice.j@email.com')}
                            onReschedule={() => setIsRescheduleModalOpen(true)}
                        />
                        <UpcomingSessionCard
                            student="Bob Smith" course="Machine Learning Basics"
                            date="Oct 24, 2023" time="4:00 PM" duration="45 min"
                            purpose="Assessment Preparation" status="confirmed" isToday
                            onJoin={() => setIsMeetingModalOpen(true)}
                            onViewProfile={() => handleViewStudent('Bob Smith', 'Machine Learning Basics', 30, 'bob.s@email.com')}
                            onReschedule={() => setIsRescheduleModalOpen(true)}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-base font-semibold mb-4">This Week</h3>
                    <div className="flex flex-col gap-4">
                        <UpcomingSessionCard
                            student="Carol Martinez" course="UI/UX Design Fundamentals"
                            date="Oct 25, 2023" time="10:00 AM" duration="60 min"
                            purpose="Career Guidance" status="confirmed"
                            onViewProfile={() => handleViewStudent('Carol Martinez', 'UI/UX Design Fundamentals', 78, 'carol.m@email.com')}
                            onReschedule={() => setIsRescheduleModalOpen(true)}
                        />
                        <UpcomingSessionCard
                            student="David Chen" course="Full Stack Web Development"
                            date="Oct 26, 2023" time="3:00 PM" duration="45 min"
                            purpose="Project Help" status="pending"
                            onViewProfile={() => handleViewStudent('David Chen', 'Full Stack Web Development', 33, 'david.c@email.com')}
                            onReschedule={() => setIsRescheduleModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            {/* My Students */}
            <div id="my-students" className="card">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <User size={22} className="text-primary" />
                    My Students (Story 4.2)
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                    <StudentCard
                        name="Alice Johnson" course="Full Stack Web Development" progress={45} email="alice.j@email.com"
                        onViewProfile={() => handleViewStudent('Alice Johnson', 'Full Stack Web Development', 45, 'alice.j@email.com')}
                    />
                    <StudentCard
                        name="Bob Smith" course="Machine Learning Basics" progress={30} email="bob.s@email.com"
                        onViewProfile={() => handleViewStudent('Bob Smith', 'Machine Learning Basics', 30, 'bob.s@email.com')}
                    />
                </div>
            </div>

            {/* Manage Availability */}
            <div id="manage-availability" className="card">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Clock size={22} className="text-primary" />
                    Manage Availability (Story 4.3)
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                        <div key={day} className="border border-border rounded-md p-4">
                            <h4 className="text-sm font-semibold mb-3 text-primary">{day}</h4>
                            <div className="flex flex-col gap-2">
                                {availability.filter(slot => slot.day === day).map(slot => (
                                    <AvailabilitySlot key={slot.id} time={slot.time} onRemove={() => handleRemoveSlot(slot.id)} />
                                ))}
                                <button
                                    className="btn flex items-center justify-center gap-1 py-1 px-2 text-xs border border-dashed border-border text-primary"
                                    onClick={() => { setNewSlotDay(day); setIsAvailabilityModalOpen(true) }}
                                >
                                    <Plus size={14} />Add Slot
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Completed Sessions */}
            <div id="completed-sessions" className="card">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <BookOpen size={22} className="text-primary" />
                    Completed Sessions (Story 4.4)
                </h2>
                <div className="flex flex-col gap-4">
                    <CompletedSessionCard
                        student="Emily Watson" course="Full Stack Web Development"
                        date="Oct 20, 2023" time="3:00 PM" purpose="Concept Clarification" hasFeedback={false}
                        onSubmitFeedback={() => handleOpenFeedback('Emily Watson', 'Oct 20, 2023', 'Concept Clarification')}
                    />
                    <CompletedSessionCard
                        student="Michael Brown" course="Machine Learning Basics"
                        date="Oct 18, 2023" time="1:00 PM" purpose="Project Help" hasFeedback={true}
                    />
                </div>
            </div>

            {/* Dialogs */}
            <Dialog open={isStudentModalOpen} onOpenChange={setIsStudentModalOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Student Profile</DialogTitle></DialogHeader>
                    {selectedStudent && (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center mb-2">
                                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-semibold mb-4">
                                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="text-2xl font-semibold">{selectedStudent.name}</h3>
                                <p className="opacity-70">{selectedStudent.course}</p>
                            </div>
                            <div>
                                <h4 className="text-base font-semibold mb-3">Course Progress</h4>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>{selectedStudent.course}</span>
                                    <span className="font-semibold">{selectedStudent.progress}%</span>
                                </div>
                                <Progress value={selectedStudent.progress} className="h-2" />
                            </div>
                            <div>
                                <h4 className="text-base font-semibold mb-3">Past Sessions</h4>
                                <div className="flex flex-col gap-3">
                                    <div className="p-3 border border-border rounded-sm">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium">Oct 20, 2023 - Concept Clarification</span>
                                            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-warning fill-warning" />)}</div>
                                        </div>
                                        <p className="text-[0.8rem] opacity-70">Great progress on React concepts!</p>
                                    </div>
                                    <div className="p-3 border border-border rounded-sm">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium">Oct 15, 2023 - Assessment Preparation</span>
                                            <div className="flex gap-0.5">{[...Array(4)].map((_, i) => <Star key={i} size={12} className="text-warning fill-warning" />)}</div>
                                        </div>
                                        <p className="text-[0.8rem] opacity-70">Needs more practice with hooks.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-base font-semibold mb-3">Mentor Notes</h4>
                                <textarea className="input resize-y w-full" placeholder="Add notes about this student..." rows={4} />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{feedbackSubmitted ? 'Feedback Submitted! ✅' : 'Submit Session Feedback'}</DialogTitle>
                    </DialogHeader>
                    {!feedbackSubmitted ? (
                        <div className="flex flex-col gap-6">
                            {selectedSession && (
                                <div className="p-4 bg-surface rounded-md">
                                    <div className="text-lg font-semibold">{selectedSession.student}</div>
                                    <div>{selectedSession.date}</div>
                                </div>
                            )}
                            <div>
                                <label className="block mb-3 font-medium">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star} size={24}
                                            className={`cursor-pointer transition-colors ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <textarea
                                className="input resize-y" rows={4} placeholder="Constructive feedback..."
                                value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="py-8 text-center">Feedback Sent!</div>
                    )}
                    {!feedbackSubmitted && (
                        <DialogFooter>
                            <button className="btn border border-border" onClick={() => setIsFeedbackModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSubmitFeedback} disabled={rating === 0}>Submit Feedback</button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isMeetingModalOpen} onOpenChange={setIsMeetingModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader><DialogTitle>Video Session</DialogTitle></DialogHeader>
                    <div className="w-full h-[400px] bg-black flex items-center justify-center text-white rounded-md">
                        <div className="text-center">
                            <div className="mb-4 text-4xl">📷</div>
                            <p>Camera and Microphone Active</p>
                            <p className="text-sm opacity-70">Connecting to secure server...</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <button className="btn bg-destructive text-white" onClick={() => setIsMeetingModalOpen(false)}>End Call</button>
                        <button className="btn border border-border">Mute</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isAvailabilityModalOpen} onOpenChange={setIsAvailabilityModalOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader><DialogTitle>Add Slot: {newSlotDay}</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <label className="block text-sm">Select Time Slot</label>
                        <select className="input" value={newSlotTime} onChange={(e) => setNewSlotTime(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                            <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                            <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                            <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                        </select>
                    </div>
                    <DialogFooter>
                        <button className="btn btn-primary w-full" onClick={handleAddSlot} disabled={!newSlotTime}>Add Slot</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isRescheduleModalOpen} onOpenChange={setIsRescheduleModalOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader><DialogTitle>Reschedule Session</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div><label className="block mb-2 text-sm">New Date</label><input type="date" className="input" /></div>
                        <div>
                            <label className="block mb-2 text-sm">New Time Slot</label>
                            <select className="input">
                                <option>9:00 AM - 10:00 AM</option>
                                <option>10:00 AM - 11:00 AM</option>
                                <option>2:00 PM - 3:00 PM</option>
                            </select>
                        </div>
                    </div>
                    <DialogFooter>
                        <button className="btn border border-border" onClick={() => setIsRescheduleModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => setIsRescheduleModalOpen(false)}>Confirm Reschedule</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function AvailabilitySlot({ time, onRemove }: { time: string; onRemove: () => void }) {
    return (
        <div className="flex items-center justify-between p-2 bg-surface rounded-sm text-xs">
            <span>{time}</span>
            <button className="bg-transparent border-none cursor-pointer text-destructive flex items-center p-1 hover:opacity-70 transition-opacity" onClick={onRemove}>
                <X size={12} />
            </button>
        </div>
    )
}

function CompletedSessionCard({ student, course, date, time, purpose, hasFeedback, onSubmitFeedback }: {
    student: string; course: string; date: string; time: string; purpose: string; hasFeedback: boolean; onSubmitFeedback?: () => void
}) {
    return (
        <div className="border border-border rounded-lg p-5 flex gap-5">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xl shrink-0">
                {student.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="text-lg font-semibold mb-1">{student}</h4>
                        <div className="text-sm text-foreground/70">{course}</div>
                    </div>
                    {hasFeedback && <Badge variant="success">Feedback Submitted</Badge>}
                </div>
                <div className="flex gap-6 text-sm text-foreground/80 mb-3">
                    <div className="flex items-center gap-1"><Calendar size={14} />{date}</div>
                    <div className="flex items-center gap-1"><Clock size={14} />{time}</div>
                </div>
                <div className="text-sm mb-4"><strong>Purpose:</strong> {purpose}</div>
                {!hasFeedback && (
                    <button className="btn btn-primary py-2 px-4 text-sm" onClick={onSubmitFeedback}>Submit Feedback</button>
                )}
            </div>
        </div>
    )
}

function StudentCard({ name, course, progress, onViewProfile }: {
    name: string; course: string; progress: number; email: string; onViewProfile: () => void
}) {
    return (
        <div className="border border-border rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={onViewProfile}>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xl mb-4">
                {name.split(' ').map(n => n[0]).join('')}
            </div>
            <h4 className="text-base font-semibold mb-1">{name}</h4>
            <p className="text-sm opacity-70 mb-4">{course}</p>
            <div className="mb-2">
                <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-semibold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>
            <button className="btn border border-border w-full mt-3 py-2 text-sm" onClick={(e) => { e.stopPropagation(); onViewProfile() }}>
                View Profile
            </button>
        </div>
    )
}

function UpcomingSessionCard({ student, course, date, time, duration, purpose, status, isToday, onJoin, onViewProfile, onReschedule }: {
    student: string; course: string; date: string; time: string; duration: string; purpose: string;
    status: 'confirmed' | 'pending'; isToday?: boolean; onJoin?: () => void; onViewProfile?: () => void; onReschedule?: () => void
}) {
    return (
        <div className={`border rounded-lg p-5 flex gap-5 ${isToday ? 'border-2 border-primary bg-surface' : 'border-border'}`}>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xl shrink-0">
                {student.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="text-lg font-semibold mb-1">{student}</h4>
                        <div className="text-sm text-foreground/70">{course}</div>
                    </div>
                    <Badge variant={status === 'confirmed' ? 'success' : 'warning'}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                </div>
                <div className="flex gap-6 text-sm text-foreground/80 mb-3">
                    <div className="flex items-center gap-1"><Calendar size={14} />{date}</div>
                    <div className="flex items-center gap-1"><Clock size={14} />{time} ({duration})</div>
                </div>
                <div className="text-sm mb-4"><strong>Purpose:</strong> {purpose}</div>
                <div className="flex gap-3 flex-wrap">
                    <button onClick={onViewProfile} className="btn border border-border flex items-center gap-2 py-2 px-4 text-sm">
                        <User size={16} />View Profile
                    </button>
                    {isToday && (
                        <button onClick={onJoin} className="btn btn-primary flex items-center gap-2 py-2 px-4 text-sm">
                            <Video size={16} />Start Session
                        </button>
                    )}
                    <button onClick={onReschedule} className="btn border border-border flex items-center gap-2 py-2 px-4 text-sm">
                        <RefreshCw size={16} />Reschedule
                    </button>
                </div>
            </div>
        </div>
    )
}
