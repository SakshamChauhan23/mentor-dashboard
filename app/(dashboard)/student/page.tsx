'use client'

import { useState } from 'react'
import { BookOpen, Clock, AlertCircle, Bell, CheckCircle, Calendar, User, Star, Video, X } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog'
import { Walkthrough } from '@/components/ui/Walkthrough'

export default function StudentPage() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
    const [isMentorProfileOpen, setIsMentorProfileOpen] = useState(false)
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
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

    const handleConfirmBooking = () => {
        setBookingConfirmed(true)
        if (selectedMentor && selectedSlot) {
            setNotifications(prev => [{
                id: Date.now(), type: 'success',
                message: `Session booked with ${selectedMentor.name} on ${selectedSlot}. You will receive a reminder 1 hour before the session.`,
                time: 'Just now'
            }, ...prev])
        }
    }

    const triggerReminder = () => setNotifications(prev => [{
        id: Date.now(), type: 'reminder',
        message: 'Reminder: Upcoming session with Dr. Sarah Lee in 15 minutes. Please join via the link in your email.',
        time: 'Just now'
    }, ...prev])

    const triggerFeedbackNotification = () => setNotifications(prev => [{
        id: Date.now(), type: 'success',
        message: 'New feedback received from Dr. Sarah Lee for your session on Oct 24. Check your session history.',
        time: 'Just now'
    }, ...prev])

    const triggerAssessmentAlert = () => setNotifications(prev => [{
        id: Date.now(), type: 'alert',
        message: "Alert: Assessment 'React Fundamentals' is due in 24 hours.",
        time: 'Just now'
    }, ...prev])

    const triggerMissedSessionAlert = () => setNotifications(prev => [{
        id: Date.now(), type: 'alert',
        message: "Missed Session: You missed your session with Michael Rodriguez today. Please reschedule.",
        time: 'Just now'
    }, ...prev])

    return (
        <div className="flex flex-col gap-8">
            <Walkthrough
                pageKey="student_dashboard"
                steps={[
                    { target: '#menu-student', title: 'Student Dashboard', content: 'This is your main hub. Access your courses, progress, and finding mentors here.', position: 'right' },
                    { target: '#learning-progress', title: 'Track Progress', content: 'See your current course completion status and active modules at a glance.', position: 'bottom' },
                    { target: '#mentor-section', title: 'Find Mentors', content: 'Browse available mentors and book 1:1 sessions to get help with your studies.', position: 'bottom' },
                    { target: '#search-bar', title: 'Global Search', content: 'Quickly find specific courses, mentors, or resources.', position: 'bottom' },
                ]}
            />

            <header>
                <h1 className="title">Student Dashboard</h1>
                <p className="text-foreground/70">Welcome back, Alice! Here is your learning progress.</p>
            </header>

            {/* Learning Journey + Sidebar */}
            <div id="learning-progress" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card">
                    <h2 className="text-xl font-semibold mb-6">My Learning Journey (Story 3.1)</h2>
                    <div className="flex flex-col gap-6">
                        <CourseCard title="Full Stack Web Development" progress={45} nextLesson="React Hooks Deep Dive" totalModules={12} completedModules={5} />
                        <CourseCard title="UI/UX Design Fundamentals" progress={12} nextLesson="Color Theory" totalModules={8} completedModules={1} />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="card">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <AlertCircle size={20} className="text-warning" />
                            Upcoming Assessments
                        </h2>
                        <div className="flex flex-col gap-4">
                            <AssessmentItem title="React Basics Quiz" date="Oct 30, 2023" type="Baseline" />
                            <AssessmentItem title="UI Design Mockup" date="Nov 05, 2023" type="Project" />
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-info" />
                            Recent Activity
                        </h2>
                        <ul className="list-none flex flex-col gap-3 text-sm">
                            <li>Completed <strong>Module 5: State Management</strong></li>
                            <li>Submitted <strong>CSS Layouts Assignment</strong></li>
                            <li>Booked session with <strong>Dr. Sarah Lee</strong></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Bell size={22} className="text-primary" />
                        Notifications (Story 3.2)
                    </h2>
                    <div className="flex gap-2">
                        <button className="btn border border-border text-xs px-2 py-1" onClick={triggerReminder}>Demo: Reminder</button>
                        <button className="btn border border-border text-xs px-2 py-1" onClick={triggerFeedbackNotification}>Demo: Feedback</button>
                        <button className="btn border border-border text-xs px-2 py-1" onClick={triggerAssessmentAlert}>Demo: Alert</button>
                        <button className="btn border border-border text-xs px-2 py-1" onClick={triggerMissedSessionAlert}>Demo: Missed</button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            icon={
                                notification.type === 'success' || notification.type === 'confirmation'
                                    ? <CheckCircle size={20} className="text-success" />
                                    : notification.type === 'reminder'
                                        ? <Calendar size={20} className="text-info" />
                                        : notification.type === 'alert'
                                            ? <AlertCircle size={20} className="text-warning" />
                                            : <Bell size={20} className="text-primary" />
                            }
                            message={notification.message}
                            time={notification.time}
                        />
                    ))}
                </div>
            </div>

            {/* Browse Mentors */}
            <div id="mentor-section" className="card">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <User size={22} className="text-primary" />
                        Browse Mentors (Story 3.3)
                    </h2>
                    <div className="flex gap-3">
                        <select className="input w-auto px-3 py-1.5 text-sm">
                            <option>All Expertise</option>
                            <option>Machine Learning</option>
                            <option>Frontend</option>
                            <option>Product Design</option>
                        </select>
                        <select className="input w-auto px-3 py-1.5 text-sm">
                            <option>Available This Week</option>
                            <option>Available Today</option>
                            <option>All Mentors</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                    <MentorCard name="Dr. Sarah Lee" expertise="Machine Learning" experience="10+ years in AI/ML, Former Google Research" availableSlots={5} rating={4.9}
                        onBookSession={() => handleBookSession("Dr. Sarah Lee", "Machine Learning")}
                        onViewProfile={() => handleViewMentorProfile("Dr. Sarah Lee", "Machine Learning")} />
                    <MentorCard name="James Carter" expertise="Frontend Architecture" experience="8 years building scalable web apps" availableSlots={3} rating={4.8}
                        onBookSession={() => handleBookSession("James Carter", "Frontend Architecture")}
                        onViewProfile={() => handleViewMentorProfile("James Carter", "Frontend Architecture")} />
                    <MentorCard name="Emily Chen" expertise="Product Design" experience="6 years at top design agencies" availableSlots={7} rating={4.7}
                        onBookSession={() => handleBookSession("Emily Chen", "Product Design")}
                        onViewProfile={() => handleViewMentorProfile("Emily Chen", "Product Design")} />
                    <MentorCard name="Michael Rodriguez" expertise="Backend Development" experience="12 years in distributed systems" availableSlots={2} rating={5.0}
                        onBookSession={() => handleBookSession("Michael Rodriguez", "Backend Development")}
                        onViewProfile={() => handleViewMentorProfile("Michael Rodriguez", "Backend Development")} />
                </div>
            </div>

            {/* My Sessions */}
            <div className="card">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Calendar size={22} className="text-primary" />
                    My Sessions (Story 3.5)
                </h2>
                <div className="mb-6 border-b border-border">
                    <div className="flex gap-8">
                        {(['upcoming', 'past'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setSessionTab(tab)}
                                className={`bg-transparent border-none py-3 cursor-pointer capitalize transition-all border-b-2 -mb-px ${sessionTab === tab ? 'font-semibold border-primary text-primary' : 'font-normal border-transparent text-foreground'}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {sessionTab === 'upcoming' ? (
                        <>
                            <SessionHistoryItem mentor="Dr. Sarah Lee" expertise="Machine Learning" date="Oct 24, 2023" time="2:00 PM" purpose="Concept Clarification" status="scheduled" onJoin={() => setIsVideoModalOpen(true)} />
                            <SessionHistoryItem mentor="James Carter" expertise="Frontend Architecture" date="Oct 25, 2023" time="10:00 AM" purpose="Career Guidance" status="scheduled" onJoin={() => setIsVideoModalOpen(true)} />
                        </>
                    ) : (
                        <>
                            <SessionHistoryItem mentor="Emily Chen" expertise="Product Design" date="Oct 20, 2023" time="3:00 PM" purpose="Project Help" status="completed" feedback="Great session! Emily provided excellent insights on user flow design." rating={5} />
                            <SessionHistoryItem mentor="Dr. Sarah Lee" expertise="Machine Learning" date="Oct 15, 2023" time="1:00 PM" purpose="Assessment Preparation" status="completed" feedback="Very helpful for understanding neural networks. Clear explanations." rating={5} />
                            <SessionHistoryItem mentor="James Carter" expertise="Frontend Architecture" date="Oct 10, 2023" time="4:00 PM" purpose="Concept Clarification" status="completed" feedback="Good overview of React optimization techniques." rating={4} />
                        </>
                    )}
                </div>
            </div>

            {/* Book Session Dialog */}
            <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{bookingConfirmed ? 'Booking Confirmed! 🎉' : 'Book Mentoring Session'}</DialogTitle>
                    </DialogHeader>
                    {!bookingConfirmed ? (
                        <div className="flex flex-col gap-6">
                            <div className="p-4 bg-surface rounded-md">
                                <div className="text-sm opacity-70 mb-1">Booking with</div>
                                <div className="text-lg font-semibold">{selectedMentor?.name}</div>
                                <div className="mt-2">
                                    <Badge variant="info">{selectedMentor?.expertise}</Badge>
                                </div>
                            </div>
                            <div>
                                <label className="block mb-3 font-medium">Select Time Slot (Story 3.4)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Oct 24, 2:00 PM', 'Oct 24, 4:00 PM', 'Oct 25, 10:00 AM', 'Oct 25, 2:00 PM'].map((slot) => (
                                        <button
                                            key={slot}
                                            className={`btn p-3 ${selectedSlot === slot ? 'border-2 border-primary bg-surface' : 'border border-border'}`}
                                            onClick={() => setSelectedSlot(slot)}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm">Session Purpose</label>
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
                        <div className="text-center py-8 px-4">
                            <div className="text-5xl mb-4">✅</div>
                            <h3 className="text-xl font-semibold mb-2">Session Booked Successfully!</h3>
                            <p className="opacity-70 mb-6">You will receive a confirmation email shortly.</p>
                            <div className="bg-surface p-4 rounded-md text-left">
                                <div className="grid gap-2 text-sm">
                                    <div><strong>Mentor:</strong> {selectedMentor?.name}</div>
                                    <div><strong>Time:</strong> {selectedSlot}</div>
                                    <div><strong>Purpose:</strong> {
                                        sessionPurpose === 'concept' ? 'Concept Clarification'
                                            : sessionPurpose === 'assessment' ? 'Assessment Preparation'
                                                : sessionPurpose === 'career' ? 'Career Guidance'
                                                    : 'Project Help'
                                    }</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        {!bookingConfirmed ? (
                            <>
                                <button className="btn border border-border" onClick={() => setIsBookingModalOpen(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleConfirmBooking} disabled={!selectedSlot || !sessionPurpose}>Confirm Booking</button>
                            </>
                        ) : (
                            <button className="btn btn-primary" onClick={() => setIsBookingModalOpen(false)}>Close</button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Mentor Profile Dialog */}
            <Dialog open={isMentorProfileOpen} onOpenChange={setIsMentorProfileOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Mentor Profile</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-6 items-center text-center p-4">
                        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-semibold">
                            {selectedMentor?.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">{selectedMentor?.name}</h2>
                            <Badge variant="info">{selectedMentor?.expertise}</Badge>
                        </div>
                        <p className="opacity-80 max-w-md">
                            Expert in {selectedMentor?.expertise} with over 10 years of industry experience. Passionate about helping students master complex concepts and build real-world applications.
                        </p>
                        <div className="flex gap-8 w-full justify-center border-t border-border pt-6">
                            <div><div className="font-semibold text-lg">4.9/5.0</div><div className="text-sm opacity-70">Rating</div></div>
                            <div><div className="font-semibold text-lg">120+</div><div className="text-sm opacity-70">Sessions</div></div>
                            <div><div className="font-semibold text-lg">15</div><div className="text-sm opacity-70">Students</div></div>
                        </div>
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => { setIsMentorProfileOpen(false); handleBookSession(selectedMentor?.name || '', selectedMentor?.expertise || '') }}
                        >
                            Book a Session
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Video Session Dialog */}
            <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader><DialogTitle>Google Meet Session</DialogTitle></DialogHeader>
                    <div className="h-[400px] bg-[#202124] rounded-lg flex flex-col items-center justify-center text-white relative">
                        <div className="w-[100px] h-[100px] rounded-full bg-[#5f6368] mb-6 flex items-center justify-center text-3xl">
                            {selectedMentor ? selectedMentor.name.split(' ').map(n => n[0]).join('') : 'SL'}
                        </div>
                        <div className="text-xl font-medium mb-2">Waiting for host to join...</div>
                        <div className="text-sm opacity-70">Correcting Logic vs Styling Errors</div>
                        <div className="absolute bottom-8 flex gap-4">
                            <div className="w-[50px] h-[50px] rounded-full bg-[#3c4043] flex items-center justify-center cursor-pointer">
                                <div className="w-6 h-6 bg-white rounded-full opacity-80" />
                            </div>
                            <div className="w-[50px] h-[50px] rounded-full bg-[#ea4335] flex items-center justify-center cursor-pointer" onClick={() => setIsVideoModalOpen(false)}>
                                <X color="white" />
                            </div>
                            <div className="w-[50px] h-[50px] rounded-full bg-[#3c4043] flex items-center justify-center cursor-pointer">
                                <div className="w-6 h-6 bg-white rounded-full opacity-80" />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function SessionHistoryItem({ mentor, expertise, date, time, purpose, status, feedback, rating, onJoin }: {
    mentor: string; expertise: string; date: string; time: string; purpose: string;
    status: 'scheduled' | 'completed' | 'cancelled'; feedback?: string; rating?: number; onJoin?: () => void
}) {
    return (
        <div className="border border-border rounded-md p-5 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold shrink-0">
                {mentor.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="text-base font-semibold mb-1">{mentor}</h4>
                        <div className="text-sm text-foreground/70">{expertise}</div>
                    </div>
                    <Badge variant={status === 'completed' ? 'success' : status === 'scheduled' ? 'info' : 'neutral'}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                </div>
                <div className="flex gap-6 text-sm text-foreground/80 mb-2">
                    <div className="flex items-center gap-1"><Calendar size={14} />{date}</div>
                    <div className="flex items-center gap-1"><Clock size={14} />{time}</div>
                </div>
                <div className="text-sm mb-2"><strong>Purpose:</strong> {purpose}</div>
                {status === 'scheduled' && onJoin && (
                    <button onClick={onJoin} className="btn btn-primary inline-flex items-center gap-2 py-1.5 px-3 text-[0.8rem] mt-2">
                        <Video size={14} />Join Meeting
                    </button>
                )}
                {feedback && (
                    <div className="bg-surface p-3 rounded-sm mt-3 text-sm">
                        <div className="flex justify-between items-center mb-2">
                            <strong>Feedback:</strong>
                            {rating && (
                                <div className="flex items-center gap-0.5">
                                    {[...Array(rating)].map((_, i) => (
                                        <Star key={i} size={14} className="text-warning fill-warning" />
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="opacity-80">{feedback}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

function MentorCard({ name, expertise, experience, availableSlots, rating, onBookSession, onViewProfile }: {
    name: string; expertise: string; experience: string; availableSlots: number; rating: number;
    onBookSession?: () => void; onViewProfile?: () => void
}) {
    return (
        <div onClick={onViewProfile} className="border border-border rounded-lg p-6 flex flex-col gap-4 cursor-pointer transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xl">
                    {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex items-center gap-1">
                    <Star size={16} className="text-warning fill-warning" />
                    <span className="text-sm font-semibold">{rating}</span>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-1">{name}</h3>
                <Badge variant="info">{expertise}</Badge>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">{experience}</p>
            <div className="flex justify-between items-center mt-auto pt-2 border-t border-border">
                <span className="text-[0.85rem] text-foreground/80">{availableSlots} slots available</span>
                <button
                    className="btn btn-primary py-1.5 px-4 text-sm"
                    onClick={(e) => { e.stopPropagation(); onBookSession?.() }}
                >
                    Book Session
                </button>
            </div>
        </div>
    )
}

function NotificationItem({ icon, message, time }: { icon: React.ReactNode; message: string; time: string }) {
    return (
        <div className="flex gap-4 p-4 rounded-md border border-border bg-surface transition-all duration-200">
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1">
                <p className="text-[0.95rem] mb-1">{message}</p>
                <span className="text-[0.8rem] opacity-60">{time}</span>
            </div>
        </div>
    )
}

function CourseCard({ title, progress, nextLesson, totalModules, completedModules }: {
    title: string; progress: number; nextLesson: string; totalModules: number; completedModules: number
}) {
    return (
        <div className="border border-border rounded-md p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    <div className="text-sm text-foreground/70">{completedModules}/{totalModules} Modules Completed</div>
                </div>
                <Badge variant={progress >= 100 ? 'success' : 'info'}>{progress}%</Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-sm flex gap-2 items-center mt-auto">
                <BookOpen size={16} />
                <span>Next: <strong>{nextLesson}</strong></span>
                <button className="btn btn-primary ml-auto py-1 px-3 text-sm">Continue</button>
            </div>
        </div>
    )
}

function AssessmentItem({ title, date, type }: { title: string; date: string; type: string }) {
    return (
        <div className="flex justify-between items-center pb-3 border-b border-border">
            <div>
                <div className="font-medium text-[0.95rem]">{title}</div>
                <div className="text-[0.8rem] opacity-70">Due: {date}</div>
            </div>
            <Badge variant="warning">{type}</Badge>
        </div>
    )
}
