'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    BookOpen, Clock, CheckCircle, Calendar, User,
    Star, Video, X, Users, ChevronDown, ChevronUp, ArrowLeft
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog'

export default function CoursePage() {
    // Session booking state
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
    const [isMentorProfileOpen, setIsMentorProfileOpen] = useState(false)
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [selectedMentor, setSelectedMentor] = useState<{ name: string; expertise: string } | null>(null)
    const [selectedSlot, setSelectedSlot] = useState('')
    const [sessionPurpose, setSessionPurpose] = useState('')
    const [bookingConfirmed, setBookingConfirmed] = useState(false)
    const [sessionTab, setSessionTab] = useState<'upcoming' | 'past'>('upcoming')

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
    }

    return (
        <div className="flex flex-col gap-8">
            {/* Back navigation */}
            <Link
                href="/student"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline w-fit"
            >
                <ArrowLeft size={16} />
                Back to My Courses
            </Link>

            {/* Course Header */}
            <div className="card flex items-start justify-between gap-6">
                <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                        <BookOpen size={32} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Environment Studies</h1>
                        <p className="text-foreground/70 max-w-xl leading-relaxed">
                            A multidisciplinary academic field that systematically analyses the complex interactions
                            between humans and their natural and built environments to find solutions to environmental
                            problems
                        </p>
                        <p className="mt-3 text-sm text-foreground/80">
                            <span className="font-medium">Instructor:-</span> Zuvy Team
                        </p>
                    </div>
                </div>
                <div className="text-right text-sm text-muted-foreground shrink-0">
                    <span>In Collaboration With</span>
                    <div className="font-semibold text-foreground mt-0.5">Telangana Government</div>
                </div>
            </div>

            {/* Progress + Stats */}
            <div className="card flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <Progress value={14} className="flex-1 h-2" />
                    <span className="text-sm font-semibold text-foreground/80 w-10 text-right">14%</span>
                </div>
                <div className="flex gap-10 text-sm">
                    <div className="flex items-center gap-2 text-foreground/80">
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                            <BookOpen size={18} className="text-foreground/60" />
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Batch</div>
                            <div className="font-semibold">Alpha</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/80">
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                            <Users size={18} className="text-foreground/60" />
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Students</div>
                            <div className="font-semibold">5 enrolled</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/80">
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                            <Clock size={18} className="text-foreground/60" />
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                            <div className="font-semibold">12 weeks</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Course Content */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Course Content</h2>
                    <ModuleCard
                        number={1}
                        title="Super Senses"
                        description="Students explore how living beings perceive the world through senses, and how the body processes food."
                        progress={25}
                        status="continue"
                    />
                    <ModuleCard
                        number={2}
                        title="Our Environment and Us"
                        description="This module delves into the relationship between humans and their environment, emphasizing the importance of understanding and preserving our surroundings."
                        progress={0}
                        status="start"
                    />
                    <ModuleCard
                        number={3}
                        title="Plants and Animals"
                        description="This module focuses on the diversity of plant and animal life, their habitats, and the interdependence within ecosystems. It encourages students to appreciate and protect biodiversity."
                        progress={34}
                        status="continue"
                        isCurrent
                    />
                </div>

                {/* Right: What's Next + Attendance */}
                <div className="flex flex-col gap-4">
                    {/* What's Next */}
                    <div className="card">
                        <h3 className="text-lg font-semibold mb-4">What&apos;s Next?</h3>
                        <div className="flex flex-col items-center text-center py-6 gap-3">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                                <Users size={28} className="text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">No Upcoming Events</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Stay tuned! Your upcoming assignments, live sessions, and deadlines will appear here to help you stay on track.
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <CheckCircle size={14} />
                                Check back later for updates
                            </div>
                        </div>
                    </div>

                    {/* Attendance */}
                    <div className="card">
                        <h3 className="text-lg font-semibold mb-4">Attendance</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center shrink-0">
                                <span className="text-base font-bold text-primary">85%</span>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Good standing</p>
                                <p className="text-sm text-muted-foreground mt-0.5">17 of 20 sessions attended</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Progress value={85} className="h-2" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Browse Mentors */}
            <div id="mentor-section" className="card">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <User size={22} className="text-primary" />
                        Browse Mentors
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
                    My Sessions
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
                                <label className="block mb-3 font-medium">Select Time Slot</label>
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

// ─── Sub-components ──────────────────────────────────────────────────────────

function ModuleCard({
    number, title, description, progress, status, isCurrent = false
}: {
    number: number; title: string; description: string
    progress: number; status: 'continue' | 'start'; isCurrent?: boolean
}) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={`rounded-xl border p-6 transition-all duration-200 ${isCurrent
            ? 'border-primary/30 bg-primary-light/30'
            : 'border-border bg-surface'
            }`}>
            {isCurrent && (
                <div className="mb-3">
                    <Badge variant="success" className="text-xs">Current Module</Badge>
                </div>
            )}
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-2">
                        Module {number}: {title}
                    </h3>
                    <p className={`text-sm text-foreground/70 leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}>
                        {description}
                    </p>
                    <button
                        onClick={() => setExpanded(e => !e)}
                        className="mt-2 flex items-center gap-1 text-sm text-primary font-medium bg-transparent border-none cursor-pointer p-0"
                    >
                        {expanded ? (
                            <><ChevronUp size={14} />View Less</>
                        ) : (
                            <><ChevronDown size={14} />View More</>
                        )}
                    </button>
                </div>
                <button
                    className={`btn shrink-0 py-2 px-4 text-sm ${status === 'continue' ? 'btn-primary' : 'border border-border text-foreground'}`}
                >
                    {status === 'continue' ? 'Continue Learning' : 'Start Learning'}
                </button>
            </div>
            <div className="mt-4">
                <div className="flex items-center gap-2">
                    <Progress value={progress} className="flex-1 h-1.5" />
                    <span className="text-xs text-muted-foreground w-8 text-right">{progress}%</span>
                </div>
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
