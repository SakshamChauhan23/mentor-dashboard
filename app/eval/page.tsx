'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowLeft, Plus, Video, FileText, Code2, HelpCircle,
    PenLine, ClipboardList, ClipboardCheck, Radio,
    GripVertical, Trash2, X, Search, ChevronRight, ChevronLeft,
    Bold, Italic, Underline, Strikethrough, List,
    ListOrdered, Code, Link2, Image, Table2, Calendar, Pencil
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

// ─── Types ───────────────────────────────────────────────────────────────────

type Difficulty = 'Hard' | 'Medium' | 'Easy'

type ChapterType = 'article' | 'video' | 'coding' | 'quiz' | 'assignment' | 'assessment' | 'form' | 'live'

interface Chapter {
    id: string
    name: string
    type: ChapterType
}

interface MCQQuestion {
    id: number
    topic: string
    difficulty: Difficulty
    question: string
    options: string[]   // always length 4
    correctIndex: number
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const INITIAL_CHAPTERS: Chapter[] = [
    { id: '1', name: 'Hypothesis', type: 'article' },
    { id: '2', name: 'How? Pedagogy?', type: 'article' },
    { id: '3', name: '(What?) Content : 4 Major Milestones', type: 'article' },
    { id: '4', name: 'Implementation Systems', type: 'article' },
]

const CHAPTER_TYPES: { id: ChapterType; label: string; icon: React.ElementType }[] = [
    { id: 'video', label: 'Video', icon: Video },
    { id: 'article', label: 'Article', icon: FileText },
    { id: 'coding', label: 'Coding Problem', icon: Code2 },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'assignment', label: 'Assignment', icon: PenLine },
    { id: 'assessment', label: 'Assessment', icon: ClipboardList },
    { id: 'form', label: 'Form', icon: ClipboardCheck },
    { id: 'live', label: 'Live Classes', icon: Radio },
]

const CHAPTER_TYPE_NAMES: Record<ChapterType, string> = {
    article: 'New Article',
    video: 'New Video',
    coding: 'New Coding Problem',
    quiz: 'New Quiz',
    assignment: 'New Assignment',
    assessment: 'Chapter',
    form: 'New Form',
    live: 'New Live Class',
}

const CODING_PROBLEMS = [
    { id: 1, title: 'Longest Word in Sentence', language: 'Javascript', difficulty: 'Hard' as Difficulty, description: 'Given a sentence, return the longest word...' },
    { id: 2, title: 'Move Zeros to End', language: 'Javascript', difficulty: 'Medium' as Difficulty, description: 'Given an array, move all zeros to the end...' },
    { id: 3, title: 'Count Characters Frequency', language: 'Javascript', difficulty: 'Medium' as Difficulty, description: 'Given a string, return the frequency of ea...' },
    { id: 4, title: 'Even Odd Difference', language: 'Javascript', difficulty: 'Easy' as Difficulty, description: 'Given an array, return the difference between the sum of even and odd...' },
    { id: 5, title: 'Reverse Words in String', language: 'Javascript', difficulty: 'Easy' as Difficulty, description: 'Given a string, reverse the order of words...' },
]

const TOPICS = ['Arrays', 'Strings', 'Dynamic Programming', 'Trees', 'Graphs', 'Sorting', 'Recursion', 'Linked Lists']
const BOOTCAMPS = ['Placement Bootcamp', 'Web Dev Bootcamp', 'Data Science Bootcamp', 'DSA Bootcamp']

const SAMPLE_MCQ_QUESTIONS: MCQQuestion[] = [
    {
        id: 1,
        topic: 'Arrays',
        difficulty: 'Easy',
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctIndex: 0,
    },
    {
        id: 2,
        topic: 'Arrays',
        difficulty: 'Medium',
        question: 'Which of the following sorting algorithms is NOT an in-place algorithm?',
        options: ['Bubble Sort', 'Merge Sort', 'Insertion Sort', 'Selection Sort'],
        correctIndex: 1,
    },
    {
        id: 3,
        topic: 'Strings',
        difficulty: 'Easy',
        question: 'What does the indexOf() method return when the substring is not found?',
        options: ['0', 'null', '-1', 'undefined'],
        correctIndex: 2,
    },
    {
        id: 4,
        topic: 'Arrays',
        difficulty: 'Hard',
        question: 'What is the auxiliary space complexity of merge sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctIndex: 2,
    },
    {
        id: 5,
        topic: 'Strings',
        difficulty: 'Medium',
        question: 'Which method can be used to convert a string to an array of characters in JavaScript?',
        options: ['split("")', 'Array.from(str)', '[...str] spread operator', 'All of the above'],
        correctIndex: 3,
    },
]

// ─── Shared difficulty colours ────────────────────────────────────────────────

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
    Hard: 'bg-destructive/10 text-destructive',
    Medium: 'bg-warning/10 text-warning',
    Easy: 'bg-success/10 text-success',
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EvalPage() {
    const [chapters, setChapters] = useState<Chapter[]>(INITIAL_CHAPTERS)
    const [activeChapterId, setActiveChapterId] = useState('1')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [assessmentTab, setAssessmentTab] = useState<'coding' | 'mcq' | 'openended'>('coding')
    const [selectedProblemIds, setSelectedProblemIds] = useState<number[]>([])

    const activeChapter = chapters.find(c => c.id === activeChapterId) ?? chapters[0]

    const addChapter = (type: ChapterType) => {
        const name = type === 'assessment'
            ? `Chapter ${chapters.length + 1}`
            : CHAPTER_TYPE_NAMES[type]
        const newChapter: Chapter = { id: Date.now().toString(), name, type }
        setChapters(prev => [...prev, newChapter])
        setActiveChapterId(newChapter.id)
        setIsModalOpen(false)
    }

    const deleteChapter = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setChapters(prev => prev.filter(c => c.id !== id))
        if (activeChapterId === id) {
            setActiveChapterId(chapters[0]?.id ?? '')
        }
    }

    const toggleProblem = (id: number) => {
        setSelectedProblemIds(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        )
    }

    return (
        <>
            {/* ── Left Panel ── */}
            <aside className="w-[260px] bg-surface border-r border-border flex flex-col shrink-0 h-[calc(100vh-3.5rem)]">
                <Link
                    href="/student"
                    className="flex items-center gap-1.5 px-5 py-4 text-sm text-muted-foreground no-underline hover:text-foreground transition-colors border-b border-border"
                >
                    <ArrowLeft size={15} />
                    Back to Curriculum
                </Link>

                <div className="px-5 pt-4 pb-3">
                    <h2 className="text-base font-bold text-foreground">Module Content</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">ef Iwebs</p>
                </div>

                <div className="px-4 pb-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-primary font-medium bg-transparent border border-dashed border-primary/40 rounded-md cursor-pointer hover:bg-primary-light/50 transition-colors"
                    >
                        <Plus size={16} />
                        Add Chapter
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 flex flex-col gap-1 pb-4">
                    {chapters.map(chapter => {
                        const isActive = chapter.id === activeChapterId
                        return (
                            <button
                                key={chapter.id}
                                onClick={() => setActiveChapterId(chapter.id)}
                                className={cn(
                                    'w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-left cursor-pointer border-none transition-all duration-150 group',
                                    isActive
                                        ? 'bg-primary-light text-primary-dark font-semibold'
                                        : 'bg-transparent text-foreground hover:bg-muted'
                                )}
                            >
                                <FileText size={15} className="shrink-0 text-muted-foreground" />
                                <span className="flex-1 truncate">{chapter.name}</span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2
                                        size={14}
                                        className="text-muted-foreground hover:text-destructive transition-colors"
                                        onClick={(e) => deleteChapter(chapter.id, e)}
                                    />
                                    <GripVertical size={14} className="text-muted-foreground cursor-grab" />
                                </div>
                            </button>
                        )
                    })}
                </nav>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 overflow-y-auto">
                {activeChapter?.type === 'assessment' ? (
                    <AssessmentView
                        chapterName={activeChapter.name}
                        tab={assessmentTab}
                        onTabChange={setAssessmentTab}
                        problems={CODING_PROBLEMS}
                        selectedIds={selectedProblemIds}
                        onToggle={toggleProblem}
                    />
                ) : (
                    <ArticleView chapterName={activeChapter?.name ?? 'Chapter'} />
                )}
            </main>

            {/* ── Add Chapter Modal ── */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-surface rounded-xl shadow-lg w-[480px] p-6 z-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold">New Chapter</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-7 h-7 rounded-full border border-border flex items-center justify-center bg-transparent cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {CHAPTER_TYPES.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => addChapter(id)}
                                    className="flex items-center gap-3 p-4 rounded-lg border border-border bg-transparent cursor-pointer text-left hover:bg-primary-light/40 hover:border-primary/30 transition-all group"
                                >
                                    <Icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                                    <span className="text-sm font-medium text-foreground">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

// ─── Article View ─────────────────────────────────────────────────────────────

function ArticleView({ chapterName }: { chapterName: string }) {
    const [mode, setMode] = useState<'editor' | 'pdf'>('editor')

    return (
        <div className="p-8 max-w-4xl">
            <h1 className="text-2xl font-bold mb-3">{chapterName}</h1>

            <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-3 py-1 border border-border rounded-md text-sm text-muted-foreground bg-muted/40">
                    <Table2 size={14} />
                    Article
                </div>
            </div>

            <div className="flex items-center gap-6 mb-6 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="mode" checked={mode === 'editor'} onChange={() => setMode('editor')} className="accent-primary" />
                    <span className={mode === 'editor' ? 'font-medium text-foreground' : 'text-muted-foreground'}>Editor</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="mode" checked={mode === 'pdf'} onChange={() => setMode('pdf')} className="accent-primary" />
                    <span className={mode === 'pdf' ? 'font-medium text-foreground' : 'text-muted-foreground'}>Upload PDF</span>
                </label>
            </div>

            <div className="border border-border rounded-xl overflow-hidden">
                <div className="px-4 py-2 border-b border-border bg-muted/30">
                    <span className="text-sm font-medium text-foreground">Article Details</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-2 border-b border-border flex-wrap">
                    <ToolbarGroup>
                        <ToolbarBtn icon={Bold} label="Bold" />
                        <ToolbarBtn icon={Italic} label="Italic" />
                        <ToolbarBtn icon={Underline} label="Underline" />
                        <ToolbarBtn icon={Strikethrough} label="Strikethrough" />
                    </ToolbarGroup>
                    <ToolbarDivider />
                    <ToolbarGroup>
                        {(['H1', 'H2', 'H3', 'H4'] as const).map(h => (
                            <button key={h} className="px-1.5 py-1 text-xs font-bold text-muted-foreground hover:bg-muted rounded cursor-pointer border-none bg-transparent">{h}</button>
                        ))}
                    </ToolbarGroup>
                    <ToolbarDivider />
                    <ToolbarGroup>
                        <ToolbarBtn icon={List} label="Bullet List" />
                        <ToolbarBtn icon={ListOrdered} label="Ordered List" />
                    </ToolbarGroup>
                    <ToolbarDivider />
                    <ToolbarGroup>
                        <ToolbarBtn icon={Code} label="Inline Code" />
                        <button className="px-1.5 py-1 text-xs font-mono text-muted-foreground hover:bg-muted rounded cursor-pointer border-none bg-transparent">{'{ }'}</button>
                    </ToolbarGroup>
                    <ToolbarDivider />
                    <ToolbarGroup>
                        <ToolbarBtn icon={Image} label="Image" />
                        <ToolbarBtn icon={Link2} label="Link" />
                    </ToolbarGroup>
                </div>
                <div className="p-6 min-h-[400px] text-[0.95rem] leading-relaxed">
                    <h2 className="text-2xl font-bold mb-4">{chapterName}</h2>
                    {chapterName === 'Hypothesis' ? <HypothesisContent /> : (
                        <p className="text-muted-foreground italic">Start writing your content here...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

function HypothesisContent() {
    return (
        <>
            <p className="mb-3">Principally - We/ students will be able to get placed if</p>
            <ul className="list-none mb-4 pl-4">
                <li className="mb-2">- &ldquo;We are able to build our ability to learn and to think about our own thinking deeply.&rdquo;</li>
            </ul>
            <p className="mb-3">Implicitly, what this means is :</p>
            <ol className="list-decimal pl-6 mb-4 flex flex-col gap-1.5">
                <li>We have excellent comprehension skills,</li>
                <li>Ability to think about our own thinking and reason logically,</li>
                <li>high confidence to approach anything</li>
                <li>the rigor to stay with the problem and accomplish difficult things.</li>
            </ol>
            <p>What this means in Programming context is : We are able to learn/build and explain anything in a short amount of time.</p>
        </>
    )
}

function ToolbarGroup({ children }: { children: React.ReactNode }) {
    return <div className="flex items-center gap-0.5">{children}</div>
}
function ToolbarDivider() {
    return <div className="w-px h-4 bg-border mx-1" />
}
function ToolbarBtn({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <button title={label} className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer border-none bg-transparent">
            <Icon size={15} />
        </button>
    )
}

// ─── Assessment View ──────────────────────────────────────────────────────────

function AssessmentView({
    chapterName, tab, onTabChange, problems, selectedIds, onToggle
}: {
    chapterName: string
    tab: 'coding' | 'mcq' | 'openended'
    onTabChange: (t: 'coding' | 'mcq' | 'openended') => void
    problems: { id: number; title: string; language: string; difficulty: Difficulty; description: string }[]
    selectedIds: number[]
    onToggle: (id: number) => void
}) {
    const [search, setSearch] = useState('')
    const [topic, setTopic] = useState('All Topics')
    const [difficulty, setDifficulty] = useState('Any Difficulty')
    const [isCreateAssessmentOpen, setIsCreateAssessmentOpen] = useState(false)
    const [showManageSettings, setShowManageSettings] = useState(false)
    const [publishedQuestions, setPublishedQuestions] = useState<MCQQuestion[]>([])

    const filtered = problems.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
        const matchDiff = difficulty === 'Any Difficulty' || p.difficulty === difficulty
        return matchSearch && matchDiff
    })
    const selectedProblems = problems.filter(p => selectedIds.includes(p.id))

    if (showManageSettings) {
        return (
            <ManageSettingsView
                chapterName={chapterName}
                onBack={() => setShowManageSettings(false)}
                questions={publishedQuestions}
            />
        )
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-border bg-surface">
                <h1 className="text-xl font-bold">{chapterName}</h1>
                <button
                    onClick={() => setShowManageSettings(true)}
                    className="btn btn-primary flex items-center gap-2 py-2 px-5 text-sm"
                >
                    Next <ChevronRight size={16} />
                </button>
            </div>

            {/* Tabs */}
            <div className="px-8 border-b border-border bg-surface">
                <div className="flex gap-0">
                    {([
                        { id: 'coding', label: 'Coding Problems' },
                        { id: 'mcq', label: 'MCQs' },
                        { id: 'openended', label: 'Open-Ended Questions' },
                    ] as const).map(t => (
                        <button
                            key={t.id}
                            onClick={() => onTabChange(t.id)}
                            className={cn(
                                'px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors bg-transparent border-x-0 border-t-0 cursor-pointer',
                                tab === t.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            {t.label} ({t.id === 'coding' ? selectedIds.length : 0})
                        </button>
                    ))}
                    <button
                        onClick={() => setIsCreateAssessmentOpen(true)}
                        className="px-5 py-3 text-sm font-medium border-b-2 -mb-px border-transparent text-primary/80 hover:text-primary hover:border-primary/40 transition-colors bg-transparent border-x-0 border-t-0 cursor-pointer flex items-center gap-1.5"
                    >
                        <span className="text-base leading-none">✦</span>
                        Create AI Adaptive Assessment
                    </button>
                </div>
            </div>

            {/* Two-column content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left: Problem Library */}
                <div className="flex-1 flex flex-col border-r border-border overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
                        <div className="flex items-center gap-2 flex-1 bg-muted/40 border border-border rounded-md px-3 py-2">
                            <Search size={15} className="text-muted-foreground shrink-0" />
                            <input
                                type="text"
                                placeholder="Search By Name"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm text-foreground w-full placeholder:text-muted-foreground"
                            />
                        </div>
                        <select value={topic} onChange={e => setTopic(e.target.value)} className="input w-auto px-3 py-2 text-sm">
                            <option>All Topics</option>
                            <option>Arrays</option>
                            <option>Strings</option>
                            <option>Linked Lists</option>
                        </select>
                        <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="input w-auto px-3 py-2 text-sm">
                            <option>Any Difficulty</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {tab === 'coding' ? (
                            <>
                                <p className="text-sm font-semibold text-muted-foreground mb-4">Coding Problem Library</p>
                                <div className="flex flex-col gap-0 divide-y divide-border">
                                    {filtered.map(problem => {
                                        const isSelected = selectedIds.includes(problem.id)
                                        return (
                                            <div key={problem.id} className="py-4">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                                            <span className="font-semibold text-[0.95rem]">{problem.title}</span>
                                                            <span className="text-xs px-2 py-0.5 rounded bg-info/10 text-info font-medium">{problem.language}</span>
                                                            <span className={cn('text-xs px-2 py-0.5 rounded font-medium', DIFFICULTY_COLOR[problem.difficulty])}>{problem.difficulty}</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-1.5">{problem.description}</p>
                                                        <button className="text-xs text-primary font-medium bg-transparent border-none cursor-pointer p-0 hover:underline">View Full Description</button>
                                                    </div>
                                                    <button
                                                        onClick={() => onToggle(problem.id)}
                                                        className={cn(
                                                            'w-7 h-7 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all shrink-0 mt-0.5',
                                                            isSelected
                                                                ? 'border-primary bg-primary text-primary-foreground'
                                                                : 'border-border bg-transparent text-muted-foreground hover:border-primary/60'
                                                        )}
                                                    >
                                                        {isSelected ? <span className="text-sm font-bold leading-none">✓</span> : <Plus size={14} />}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-40 text-center">
                                <p className="text-muted-foreground text-sm">No questions available in this category yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Selected Questions */}
                <div className="w-72 flex flex-col bg-surface shrink-0">
                    <div className="px-5 py-4 border-b border-border">
                        <h3 className="text-sm font-semibold">Selected Questions</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto px-5 py-4">
                        {selectedProblems.length === 0 ? (
                            <div className="flex items-center justify-center h-32">
                                <p className="text-sm text-muted-foreground italic">No Selected questions</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {selectedProblems.map(p => (
                                    <div key={p.id} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{p.title}</p>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="text-xs px-1.5 py-0.5 rounded bg-info/10 text-info">{p.language}</span>
                                                <span className={cn('text-xs px-1.5 py-0.5 rounded', DIFFICULTY_COLOR[p.difficulty])}>{p.difficulty}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => onToggle(p.id)} className="text-muted-foreground hover:text-destructive bg-transparent border-none cursor-pointer p-0 mt-0.5 transition-colors">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create AI Adaptive Assessment Modal */}
            {isCreateAssessmentOpen && (
                <CreateAssessmentModal
                    onClose={() => setIsCreateAssessmentOpen(false)}
                    onNext={(qs) => {
                        setIsCreateAssessmentOpen(false)
                        setPublishedQuestions(qs)
                        setShowManageSettings(true)
                    }}
                />
            )}
        </div>
    )
}

// ─── Create Assessment Modal ──────────────────────────────────────────────────

function CreateAssessmentModal({
    onClose,
    onNext,
}: {
    onClose: () => void
    onNext: (questions: MCQQuestion[]) => void
}) {
    // ── Step 0 form state ──
    const [bootcamp, setBootcamp] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [selectedTopic, setSelectedTopic] = useState('')
    const [questionCount, setQuestionCount] = useState(1)
    const [topicsList, setTopicsList] = useState<{ topic: string; count: number }[]>([])

    // ── Step 1 MCQ state ──
    const [step, setStep] = useState<0 | 1>(0)
    const [questions, setQuestions] = useState<MCQQuestion[]>(SAMPLE_MCQ_QUESTIONS)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editDraft, setEditDraft] = useState<MCQQuestion | null>(null)

    const totalQuestions = topicsList.reduce((sum, t) => sum + t.count, 0)

    // ── Form handlers ──
    const handleAddTopic = () => {
        if (!selectedTopic) return
        const existing = topicsList.find(t => t.topic === selectedTopic)
        if (existing) {
            setTopicsList(prev => prev.map(t => t.topic === selectedTopic ? { ...t, count: t.count + questionCount } : t))
        } else {
            setTopicsList(prev => [...prev, { topic: selectedTopic, count: questionCount }])
        }
        setSelectedTopic('')
        setQuestionCount(1)
    }
    const handleRemoveTopic = (topic: string) => setTopicsList(prev => prev.filter(t => t.topic !== topic))

    // ── CRUD handlers ──
    const handleStartEdit = (q: MCQQuestion) => {
        setEditingId(q.id)
        setEditDraft({ ...q, options: [...q.options] })
    }
    const handleCancelEdit = () => {
        // If this was a newly added (empty) question, remove it
        if (editDraft && editDraft.question === '' && editDraft.options.every(o => o === '')) {
            setQuestions(prev => prev.filter(q => q.id !== editDraft.id))
        }
        setEditingId(null)
        setEditDraft(null)
    }
    const handleSaveEdit = () => {
        if (!editDraft) return
        setQuestions(prev => prev.map(q => q.id === editDraft.id ? editDraft : q))
        setEditingId(null)
        setEditDraft(null)
    }
    const handleDelete = (id: number) => {
        setQuestions(prev => prev.filter(q => q.id !== id))
    }
    const handleAddQuestion = () => {
        const newQ: MCQQuestion = {
            id: Date.now(),
            topic: TOPICS[0],
            difficulty: 'Easy',
            question: '',
            options: ['', '', '', ''],
            correctIndex: 0,
        }
        setQuestions(prev => [...prev, newQ])
        setEditingId(newQ.id)
        setEditDraft({ ...newQ })
    }

    const canSaveEdit = editDraft
        ? editDraft.question.trim() !== '' && editDraft.options.every(o => o.trim() !== '')
        : false

    const updateDraftOption = (idx: number, value: string) => {
        if (!editDraft) return
        const newOpts = [...editDraft.options]
        newOpts[idx] = value
        setEditDraft({ ...editDraft, options: newOpts })
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ── Step 1: MCQ Review ──
    // ─────────────────────────────────────────────────────────────────────────
    if (step === 1) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50" onClick={onClose} />
                <div className="relative bg-surface rounded-2xl shadow-xl w-[720px] max-h-[88vh] flex flex-col z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-border">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-primary text-lg leading-none">✦</span>
                                <h2 className="text-lg font-bold text-foreground">AI Generated MCQ Questions</h2>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {questions.length} question{questions.length !== 1 ? 's' : ''} · Edit, delete or add questions before publishing
                            </p>
                        </div>
                        <button onClick={onClose} className="text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer p-1 transition-colors mt-0.5">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Questions list */}
                    <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4">
                        {questions.map((q, qi) => {
                            const isEditing = editingId === q.id

                            if (isEditing && editDraft) {
                                // ── Edit mode ──
                                return (
                                    <div key={q.id} className="border-2 border-primary/40 bg-primary-light/10 rounded-xl p-5">
                                        {/* Topic + Difficulty row */}
                                        <div className="flex gap-3 mb-4">
                                            <select
                                                value={editDraft.topic}
                                                onChange={e => setEditDraft({ ...editDraft, topic: e.target.value })}
                                                className="flex-1 px-3 py-2 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary cursor-pointer"
                                            >
                                                {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                            <select
                                                value={editDraft.difficulty}
                                                onChange={e => setEditDraft({ ...editDraft, difficulty: e.target.value as Difficulty })}
                                                className="w-32 px-3 py-2 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary cursor-pointer"
                                            >
                                                <option value="Easy">Easy</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Hard">Hard</option>
                                            </select>
                                        </div>

                                        {/* Question text */}
                                        <textarea
                                            rows={3}
                                            placeholder="Enter question text..."
                                            value={editDraft.question}
                                            onChange={e => setEditDraft({ ...editDraft, question: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary resize-none placeholder:text-muted-foreground mb-4"
                                        />

                                        {/* Options */}
                                        <div className="flex flex-col gap-2.5 mb-5">
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Options — select the correct answer</p>
                                            {editDraft.options.map((opt, oi) => (
                                                <div key={oi} className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name={`correct-${q.id}`}
                                                        checked={editDraft.correctIndex === oi}
                                                        onChange={() => setEditDraft({ ...editDraft, correctIndex: oi })}
                                                        className="accent-primary shrink-0 w-4 h-4 cursor-pointer"
                                                    />
                                                    <span className="text-xs font-bold text-muted-foreground w-4 shrink-0">{String.fromCharCode(65 + oi)}</span>
                                                    <input
                                                        type="text"
                                                        placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                                                        value={opt}
                                                        onChange={e => updateDraftOption(oi, e.target.value)}
                                                        className="flex-1 px-3 py-2 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary placeholder:text-muted-foreground"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Save / Cancel */}
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={handleCancelEdit}
                                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent border border-border rounded-lg cursor-pointer transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveEdit}
                                                disabled={!canSaveEdit}
                                                className="px-4 py-2 text-sm font-medium btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                )
                            }

                            // ── View mode ──
                            return (
                                <div key={q.id} className="border border-border rounded-xl p-5">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-muted-foreground">Q{qi + 1}</span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary-dark font-medium">{q.topic}</span>
                                            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', DIFFICULTY_COLOR[q.difficulty])}>{q.difficulty}</span>
                                        </div>
                                        {/* Edit + Delete actions */}
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button
                                                onClick={() => handleStartEdit(q)}
                                                title="Edit question"
                                                className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary-light transition-colors bg-transparent border-none cursor-pointer"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(q.id)}
                                                title="Delete question"
                                                className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors bg-transparent border-none cursor-pointer"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-sm font-medium text-foreground mb-4">{q.question}</p>

                                    <div className="flex flex-col gap-2">
                                        {q.options.map((opt, oi) => {
                                            const isCorrect = oi === q.correctIndex
                                            return (
                                                <div
                                                    key={oi}
                                                    className={cn(
                                                        'flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm',
                                                        isCorrect
                                                            ? 'border-success/40 bg-success/8 text-success font-medium'
                                                            : 'border-border bg-muted/20 text-foreground'
                                                    )}
                                                >
                                                    <div className={cn(
                                                        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold',
                                                        isCorrect ? 'border-success bg-success text-white' : 'border-border'
                                                    )}>
                                                        {isCorrect ? '✓' : String.fromCharCode(65 + oi)}
                                                    </div>
                                                    {opt}
                                                    {isCorrect && <span className="ml-auto text-xs text-success font-medium">Correct Answer</span>}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}

                        {/* Add Question button */}
                        <button
                            onClick={handleAddQuestion}
                            disabled={editingId !== null}
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-primary font-medium bg-transparent border border-dashed border-primary/40 rounded-xl cursor-pointer hover:bg-primary-light/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Plus size={15} />
                            Add Question
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-8 py-5 border-t border-border">
                        <button
                            onClick={() => setStep(0)}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer transition-colors"
                        >
                            <ChevronLeft size={16} /> Back to Form
                        </button>
                        <div className="flex items-center gap-3">
                            <button onClick={onClose} className="btn border border-border bg-transparent text-foreground hover:bg-muted text-sm px-5">
                                Cancel
                            </button>
                            <button
                                onClick={() => onNext(questions)}
                                disabled={questions.length === 0 || editingId !== null}
                                className="btn btn-primary flex items-center gap-2 text-sm px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ── Step 0: Form ──
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-[#f5f4f0] rounded-2xl shadow-xl w-[560px] max-h-[90vh] overflow-y-auto z-10">
                <div className="flex items-start justify-between px-8 pt-8 pb-6">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Create Assessment</h2>
                        <p className="text-sm text-muted-foreground mt-1">Configure the assessment settings for bootcamp</p>
                    </div>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer p-1 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="px-8 pb-8 flex flex-col gap-6">
                    {/* Bootcamp */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Bootcamp <span className="text-destructive">*</span></label>
                        <select
                            value={bootcamp}
                            onChange={e => setBootcamp(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-primary bg-surface text-foreground text-sm outline-none cursor-pointer"
                        >
                            <option value="">Select a bootcamp...</option>
                            {BOOTCAMPS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Assessment Title <span className="text-destructive">*</span></label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g., JavaScript Fundamentals Assessment"
                            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary placeholder:text-muted-foreground"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Brief description of what this assessment covers..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary resize-y placeholder:text-muted-foreground"
                        />
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Start Date <span className="text-destructive">*</span></label>
                        <div className="relative">
                            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">End Date <span className="text-destructive">*</span></label>
                        <div className="relative">
                            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Topics */}
                    <div className="bg-[#c8c5bb]/40 rounded-xl p-5">
                        <label className="block text-sm font-semibold mb-3">Topics with Question Count <span className="text-destructive">*</span></label>
                        <div className="flex gap-2 mb-3">
                            <select
                                value={selectedTopic}
                                onChange={e => setSelectedTopic(e.target.value)}
                                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary cursor-pointer"
                            >
                                <option value="">Select a topic...</option>
                                {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <input
                                type="number"
                                min={1}
                                value={questionCount}
                                onChange={e => setQuestionCount(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-20 px-3 py-2.5 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary text-center"
                            />
                            <button onClick={handleAddTopic} className="btn btn-primary flex items-center gap-1.5 px-4 py-2.5 text-sm whitespace-nowrap">
                                <Plus size={14} /> Add
                            </button>
                        </div>
                        {topicsList.length > 0 ? (
                            <div className="flex flex-col gap-2 mb-3">
                                {topicsList.map(t => (
                                    <div key={t.topic} className="flex items-center justify-between bg-surface rounded-lg px-3 py-2 text-sm">
                                        <span className="font-medium">{t.topic}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-muted-foreground">{t.count} question{t.count !== 1 ? 's' : ''}</span>
                                            <button onClick={() => handleRemoveTopic(t.topic)} className="text-muted-foreground hover:text-destructive bg-transparent border-none cursor-pointer p-0 transition-colors">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">No topics selected. Add at least one topic with question count.</p>
                        )}
                    </div>

                    {/* Summary */}
                    <div className="bg-[#c8c5bb]/40 rounded-xl p-5">
                        <h4 className="text-sm font-semibold mb-4">Assessment Summary</h4>
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Topics:</span>
                                <span className="font-semibold">{topicsList.length} selected</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Questions:</span>
                                <span className="font-semibold">{totalQuestions}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button onClick={onClose} className="btn border-none bg-transparent text-foreground font-semibold cursor-pointer hover:text-muted-foreground transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={() => setStep(1)}
                            disabled={!bootcamp || !title || !startDate || !endDate || topicsList.length === 0}
                            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Assessment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Manage Settings View ─────────────────────────────────────────────────────

function ManageSettingsView({
    chapterName,
    onBack,
    questions,
}: {
    chapterName: string
    onBack: () => void
    questions: MCQQuestion[]
}) {
    const [description, setDescription] = useState('')
    const [codingCounts, setCodingCounts] = useState({ easy: 0, medium: 0, hard: 0 })
    const [mcqCounts, setMcqCounts] = useState({ easy: 0, medium: 0, hard: 0 })
    const [codingWeight, setCodingWeight] = useState(0)
    const [mcqWeight, setMcqWeight] = useState(0)
    const [copyPaste, setCopyPaste] = useState(true)
    const [tabChange, setTabChange] = useState(true)
    const [isPublished, setIsPublished] = useState(false)

    const totalCoding = codingCounts.easy + codingCounts.medium + codingCounts.hard
    const totalMcq = mcqCounts.easy + mcqCounts.medium + mcqCounts.hard

    if (isPublished) {
        return (
            <PublishedView
                chapterName={chapterName}
                questions={questions}
                onBack={() => setIsPublished(false)}
            />
        )
    }

    const CountInput = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
        <input
            type="number"
            min={0}
            value={value}
            onChange={e => onChange(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-14 px-2 py-1 rounded-md border border-border bg-surface text-foreground text-sm outline-none focus:border-primary text-center"
        />
    )

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-surface shrink-0">
                <div className="flex items-center gap-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Back to {chapterName}
                    </button>
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-foreground">Manage Settings</h2>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium border border-border">Draft</span>
                    </div>
                </div>
                <button onClick={() => setIsPublished(true)} className="btn btn-primary text-sm px-5">
                    Publish Options
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Description:</label>
                    <input
                        type="text"
                        placeholder="Enter description (optional)"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary placeholder:text-muted-foreground"
                    />
                </div>

                {/* Question counts */}
                <section>
                    <h3 className="text-base font-semibold text-foreground mb-1">Choose number of questions shown to students</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Students will receive at least 1 question from each difficulty level of each question type. Additionally, the questions will be randomized for each question type.
                    </p>
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-8 items-start">
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Coding Problems</h4>
                            <div className="flex flex-col gap-3">
                                {(['easy', 'medium', 'hard'] as const).map(level => (
                                    <div key={level} className="flex items-center gap-3">
                                        <CountInput value={codingCounts[level]} onChange={v => setCodingCounts(prev => ({ ...prev, [level]: v }))} />
                                        <span className="text-sm text-muted-foreground capitalize">{level} question(s) out of 0</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">MCQs</h4>
                            <div className="flex flex-col gap-3">
                                {(['easy', 'medium', 'hard'] as const).map(level => (
                                    <div key={level} className="flex items-center gap-3">
                                        <CountInput value={mcqCounts[level]} onChange={v => setMcqCounts(prev => ({ ...prev, [level]: v }))} />
                                        <span className="text-sm text-muted-foreground capitalize">{level} question(s) out of 0</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="min-w-[160px]">
                            <h4 className="text-sm font-semibold text-foreground mb-4">Total Selected Questions</h4>
                            <div className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">Coding:</span>
                                    <span className="font-medium">{totalCoding} out of 0</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">Quiz:</span>
                                    <span className="font-medium">{totalMcq} out of 0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="border-t border-border" />

                {/* Weightage + Proctoring */}
                <div className="grid grid-cols-2 gap-12">
                    <section>
                        <h3 className="text-base font-semibold text-foreground mb-1">Individual Section Weightage</h3>
                        <p className="text-sm text-muted-foreground mb-5">Total from both categories should be 100%</p>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Coding Problems', val: codingWeight, set: setCodingWeight },
                                { label: 'MCQs', val: mcqWeight, set: setMcqWeight },
                            ].map(({ label, val, set }) => (
                                <div key={label} className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={val}
                                        onChange={e => set(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="w-16 px-2 py-1.5 rounded-md border border-border bg-surface text-foreground text-sm outline-none focus:border-primary text-center"
                                    />
                                    <span className="text-sm text-muted-foreground">{label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-base font-semibold text-foreground mb-5">Manage Proctoring Settings</h3>
                        <div className="flex flex-col gap-5">
                            {[
                                { label: 'Copy Paste', val: copyPaste, set: setCopyPaste },
                                { label: 'Tab Change', val: tabChange, set: setTabChange },
                            ].map(({ label, val, set }) => (
                                <div key={label} className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-foreground">{label}</p>
                                    <Switch checked={val} onCheckedChange={set} />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

// ─── Published View ───────────────────────────────────────────────────────────

function PublishedView({
    chapterName,
    questions,
    onBack,
}: {
    chapterName: string
    questions: MCQQuestion[]
    onBack: () => void
}) {
    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-surface shrink-0">
                <div className="flex items-center gap-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Back to Manage Settings
                    </button>
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-foreground">{chapterName} — Questions</h2>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-medium border border-success/30">
                            Published
                        </span>
                    </div>
                </div>
                <span className="text-sm text-muted-foreground">{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Question list */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
                {questions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <ClipboardList size={28} className="text-muted-foreground" />
                        </div>
                        <p className="font-medium text-foreground mb-1">No questions added</p>
                        <p className="text-sm text-muted-foreground">Go back and add questions to this assessment.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 max-w-3xl">
                        {questions.map((q, qi) => (
                            <div key={q.id} className="border border-border rounded-xl p-5 bg-surface">
                                {/* Badges */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-bold text-muted-foreground">Q{qi + 1}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary-dark font-medium">{q.topic}</span>
                                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', DIFFICULTY_COLOR[q.difficulty])}>{q.difficulty}</span>
                                </div>

                                {/* Question */}
                                <p className="text-sm font-medium text-foreground mb-4">{q.question}</p>

                                {/* Options */}
                                <div className="flex flex-col gap-2">
                                    {q.options.map((opt, oi) => {
                                        const isCorrect = oi === q.correctIndex
                                        return (
                                            <div
                                                key={oi}
                                                className={cn(
                                                    'flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm',
                                                    isCorrect
                                                        ? 'border-success/40 bg-success/8 text-success font-medium'
                                                        : 'border-border bg-muted/20 text-foreground'
                                                )}
                                            >
                                                <div className={cn(
                                                    'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold',
                                                    isCorrect ? 'border-success bg-success text-white' : 'border-border'
                                                )}>
                                                    {isCorrect ? '✓' : String.fromCharCode(65 + oi)}
                                                </div>
                                                {opt}
                                                {isCorrect && <span className="ml-auto text-xs text-success font-medium">Correct Answer</span>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
