'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowLeft, Plus, Video, FileText, Code2, HelpCircle,
    PenLine, ClipboardList, ClipboardCheck, Radio,
    GripVertical, Trash2, X, Search, ChevronRight,
    Bold, Italic, Underline, Strikethrough, List,
    ListOrdered, Code, Link2, Image, Table2, Calendar
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

// ─── Types ───────────────────────────────────────────────────────────────────

type ChapterType = 'article' | 'video' | 'coding' | 'quiz' | 'assignment' | 'assessment' | 'form' | 'live'

interface Chapter {
    id: string
    name: string
    type: ChapterType
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
    { id: 1, title: 'Longest Word in Sentence', language: 'Javascript', difficulty: 'Hard' as const, description: 'Given a sentence, return the longest word...' },
    { id: 2, title: 'Move Zeros to End', language: 'Javascript', difficulty: 'Medium' as const, description: 'Given an array, move all zeros to the end...' },
    { id: 3, title: 'Count Characters Frequency', language: 'Javascript', difficulty: 'Medium' as const, description: 'Given a string, return the frequency of ea...' },
    { id: 4, title: 'Even Odd Difference', language: 'Javascript', difficulty: 'Easy' as const, description: 'Given an array, return the difference between the sum of even and odd...' },
    { id: 5, title: 'Reverse Words in String', language: 'Javascript', difficulty: 'Easy' as const, description: 'Given a string, reverse the order of words...' },
]

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EvalPage() {
    const [chapters, setChapters] = useState<Chapter[]>(INITIAL_CHAPTERS)
    const [activeChapterId, setActiveChapterId] = useState('1')
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Assessment state
    const [assessmentTab, setAssessmentTab] = useState<'coding' | 'mcq' | 'openended'>('coding')
    const [selectedProblemIds, setSelectedProblemIds] = useState<number[]>([])

    const activeChapter = chapters.find(c => c.id === activeChapterId) ?? chapters[0]
    const assessmentChapters = chapters.filter(c => c.type === 'assessment')

    const addChapter = (type: ChapterType) => {
        const assessmentCount = chapters.filter(c => c.type === 'assessment').length
        const name = type === 'assessment'
            ? `Chapter ${chapters.length + 1}`
            : CHAPTER_TYPE_NAMES[type]
        const newChapter: Chapter = { id: Date.now().toString(), name, type }
        setChapters(prev => [...prev, newChapter])
        setActiveChapterId(newChapter.id)
        setIsModalOpen(false)
        // suppress unused variable
        void assessmentCount
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
                {/* Back to Curriculum */}
                <Link
                    href="/student"
                    className="flex items-center gap-1.5 px-5 py-4 text-sm text-muted-foreground no-underline hover:text-foreground transition-colors border-b border-border"
                >
                    <ArrowLeft size={15} />
                    Back to Curriculum
                </Link>

                {/* Module Info */}
                <div className="px-5 pt-4 pb-3">
                    <h2 className="text-base font-bold text-foreground">Module Content</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Placement Hypothesis</p>
                </div>

                {/* Add Chapter */}
                <div className="px-4 pb-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-primary font-medium bg-transparent border border-dashed border-primary/40 rounded-md cursor-pointer hover:bg-primary-light/50 transition-colors"
                    >
                        <Plus size={16} />
                        Add Chapter
                    </button>
                </div>

                {/* Chapter List */}
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
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="relative bg-surface rounded-xl shadow-lg w-[480px] p-6 z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold">New Chapter</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-7 h-7 rounded-full border border-border flex items-center justify-center bg-transparent cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Type Grid */}
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
            {/* Chapter heading */}
            <h1 className="text-2xl font-bold mb-3">{chapterName}</h1>

            {/* Type badge */}
            <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-3 py-1 border border-border rounded-md text-sm text-muted-foreground bg-muted/40">
                    <Table2 size={14} />
                    Article
                </div>
            </div>

            {/* Editor / Upload PDF toggle */}
            <div className="flex items-center gap-6 mb-6 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="mode"
                        checked={mode === 'editor'}
                        onChange={() => setMode('editor')}
                        className="accent-primary"
                    />
                    <span className={mode === 'editor' ? 'font-medium text-foreground' : 'text-muted-foreground'}>Editor</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="mode"
                        checked={mode === 'pdf'}
                        onChange={() => setMode('pdf')}
                        className="accent-primary"
                    />
                    <span className={mode === 'pdf' ? 'font-medium text-foreground' : 'text-muted-foreground'}>Upload PDF</span>
                </label>
            </div>

            {/* Article Details */}
            <div className="border border-border rounded-xl overflow-hidden">
                <div className="px-4 py-2 border-b border-border bg-muted/30">
                    <span className="text-sm font-medium text-foreground">Article Details</span>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-1 px-3 py-2 border-b border-border flex-wrap">
                    {/* Text formatting */}
                    <ToolbarGroup>
                        <ToolbarBtn icon={Bold} label="Bold" />
                        <ToolbarBtn icon={Italic} label="Italic" />
                        <ToolbarBtn icon={Underline} label="Underline" />
                        <ToolbarBtn icon={Strikethrough} label="Strikethrough" />
                    </ToolbarGroup>
                    <ToolbarDivider />
                    {/* Headings */}
                    <ToolbarGroup>
                        {(['H1', 'H2', 'H3', 'H4'] as const).map(h => (
                            <button key={h} className="px-1.5 py-1 text-xs font-bold text-muted-foreground hover:bg-muted rounded cursor-pointer border-none bg-transparent">
                                {h}
                            </button>
                        ))}
                    </ToolbarGroup>
                    <ToolbarDivider />
                    {/* Lists */}
                    <ToolbarGroup>
                        <ToolbarBtn icon={List} label="Bullet List" />
                        <ToolbarBtn icon={ListOrdered} label="Ordered List" />
                    </ToolbarGroup>
                    <ToolbarDivider />
                    {/* Code */}
                    <ToolbarGroup>
                        <ToolbarBtn icon={Code} label="Inline Code" />
                        <button className="px-1.5 py-1 text-xs font-mono text-muted-foreground hover:bg-muted rounded cursor-pointer border-none bg-transparent">{'{ }'}</button>
                    </ToolbarGroup>
                    <ToolbarDivider />
                    {/* Media */}
                    <ToolbarGroup>
                        <ToolbarBtn icon={Image} label="Image" />
                        <ToolbarBtn icon={Link2} label="Link" />
                    </ToolbarGroup>
                </div>

                {/* Content area */}
                <div className="p-6 min-h-[400px] text-[0.95rem] leading-relaxed">
                    <h2 className="text-2xl font-bold mb-4">{chapterName}</h2>
                    {chapterName === 'Hypothesis' ? (
                        <HypothesisContent />
                    ) : (
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
            <p className="mb-3">
                Principally - We/ students will be able to get placed if
            </p>
            <ul className="list-none mb-4 pl-4">
                <li className="mb-2">
                    - &ldquo;We are able to build our ability to learn and to think about our own thinking deeply.&rdquo;
                </li>
            </ul>
            <p className="mb-3">Implicitly, what this means is :</p>
            <ol className="list-decimal pl-6 mb-4 flex flex-col gap-1.5">
                <li>We have excellent comprehension skills,</li>
                <li>Ability to think about our own thinking and reason logically,</li>
                <li>high confidence to approach anything</li>
                <li>the rigor to stay with the problem and accomplish difficult things. (we do enough difficult things/ figuring it out in different context))</li>
            </ol>
            <p>
                What this means in Programming context is : We are able to learn/build and explain anything in a short amount of time.
            </p>
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
        <button
            title={label}
            className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer border-none bg-transparent"
        >
            <Icon size={15} />
        </button>
    )
}

// ─── Assessment View ──────────────────────────────────────────────────────────

type Difficulty = 'Hard' | 'Medium' | 'Easy'

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

    const filtered = problems.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
        const matchDiff = difficulty === 'Any Difficulty' || p.difficulty === difficulty
        return matchSearch && matchDiff
    })

    const selectedProblems = problems.filter(p => selectedIds.includes(p.id))

    const difficultyColor: Record<Difficulty, string> = {
        Hard: 'bg-destructive/10 text-destructive',
        Medium: 'bg-warning/10 text-warning',
        Easy: 'bg-success/10 text-success',
    }

    return (
        <div className="flex flex-col h-full">
            {/* Assessment header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-border bg-surface">
                <h1 className="text-xl font-bold">{chapterName}</h1>
                <button className="btn btn-primary flex items-center gap-2 py-2 px-5 text-sm">
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
                    {/* AI Adaptive Assessment — opens modal */}
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
                    {/* Search + Filters */}
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
                        <select
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                            className="input w-auto px-3 py-2 text-sm"
                        >
                            <option>All Topics</option>
                            <option>Arrays</option>
                            <option>Strings</option>
                            <option>Linked Lists</option>
                        </select>
                        <select
                            value={difficulty}
                            onChange={e => setDifficulty(e.target.value)}
                            className="input w-auto px-3 py-2 text-sm"
                        >
                            <option>Any Difficulty</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    {/* Problem list */}
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
                                                            <span className="text-xs px-2 py-0.5 rounded bg-info/10 text-info font-medium">
                                                                {problem.language}
                                                            </span>
                                                            <span className={cn('text-xs px-2 py-0.5 rounded font-medium', difficultyColor[problem.difficulty])}>
                                                                {problem.difficulty}
                                                            </span>
                                                        </div>
                                                        {problem.description && (
                                                            <p className="text-sm text-muted-foreground mb-1.5">{problem.description}</p>
                                                        )}
                                                        <button className="text-xs text-primary font-medium bg-transparent border-none cursor-pointer p-0 hover:underline">
                                                            View Full Description
                                                        </button>
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
                                                        {isSelected ? (
                                                            <span className="text-sm font-bold leading-none">✓</span>
                                                        ) : (
                                                            <Plus size={14} />
                                                        )}
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
                                                <span className={cn('text-xs px-1.5 py-0.5 rounded', difficultyColor[p.difficulty])}>{p.difficulty}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onToggle(p.id)}
                                            className="text-muted-foreground hover:text-destructive bg-transparent border-none cursor-pointer p-0 mt-0.5 transition-colors"
                                        >
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
                <CreateAssessmentModal onClose={() => setIsCreateAssessmentOpen(false)} />
            )}
        </div>
    )
}

// ─── Create Assessment Modal ──────────────────────────────────────────────────

const TOPICS = ['Arrays', 'Strings', 'Dynamic Programming', 'Trees', 'Graphs', 'Sorting', 'Recursion', 'Linked Lists']
const BOOTCAMPS = ['Placement Bootcamp', 'Web Dev Bootcamp', 'Data Science Bootcamp', 'DSA Bootcamp']

function CreateAssessmentModal({ onClose }: { onClose: () => void }) {
    const [bootcamp, setBootcamp] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [selectedTopic, setSelectedTopic] = useState('')
    const [questionCount, setQuestionCount] = useState(1)
    const [topicsList, setTopicsList] = useState<{ topic: string; count: number }[]>([])
    const [created, setCreated] = useState(false)

    const totalQuestions = topicsList.reduce((sum, t) => sum + t.count, 0)

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

    const handleRemoveTopic = (topic: string) => {
        setTopicsList(prev => prev.filter(t => t.topic !== topic))
    }

    if (created) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" onClick={onClose} />
                <div className="relative bg-surface rounded-2xl shadow-xl w-[520px] p-10 z-10 text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold mb-2">Assessment Created!</h3>
                    <p className="text-muted-foreground mb-6">Your AI Adaptive Assessment has been configured successfully.</p>
                    <button className="btn btn-primary" onClick={onClose}>Done</button>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-[#f5f4f0] rounded-2xl shadow-xl w-[560px] max-h-[90vh] overflow-y-auto z-10">
                {/* Modal Header */}
                <div className="flex items-start justify-between px-8 pt-8 pb-6">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Create Assessment</h2>
                        <p className="text-sm text-muted-foreground mt-1">Configure the assessment settings for bootcamp</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer p-1 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="px-8 pb-8 flex flex-col gap-6">
                    {/* Bootcamp */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Bootcamp <span className="text-destructive">*</span>
                        </label>
                        <select
                            value={bootcamp}
                            onChange={e => setBootcamp(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border-2 bg-surface text-foreground text-sm outline-none transition-colors cursor-pointer ${bootcamp ? 'border-primary' : 'border-primary'}`}
                        >
                            <option value="">Select a bootcamp...</option>
                            {BOOTCAMPS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

                    {/* Assessment Title */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Assessment Title <span className="text-destructive">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g., JavaScript Fundamentals Assessment"
                            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
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
                            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary transition-colors resize-y placeholder:text-muted-foreground"
                        />
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Start Date <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                <Calendar size={16} />
                            </div>
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            End Date <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                <Calendar size={16} />
                            </div>
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-surface text-foreground text-sm outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    {/* Topics with Question Count */}
                    <div className="bg-[#c8c5bb]/40 rounded-xl p-5">
                        <label className="block text-sm font-semibold mb-3">
                            Topics with Question Count <span className="text-destructive">*</span>
                        </label>
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
                            <button
                                onClick={handleAddTopic}
                                className="btn btn-primary flex items-center gap-1.5 px-4 py-2.5 text-sm whitespace-nowrap"
                            >
                                <Plus size={14} /> Add
                            </button>
                        </div>

                        {/* Added topics list */}
                        {topicsList.length > 0 && (
                            <div className="flex flex-col gap-2 mb-3">
                                {topicsList.map(t => (
                                    <div key={t.topic} className="flex items-center justify-between bg-surface rounded-lg px-3 py-2 text-sm">
                                        <span className="font-medium">{t.topic}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-muted-foreground">{t.count} question{t.count !== 1 ? 's' : ''}</span>
                                            <button
                                                onClick={() => handleRemoveTopic(t.topic)}
                                                className="text-muted-foreground hover:text-destructive bg-transparent border-none cursor-pointer p-0 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {topicsList.length === 0 && (
                            <p className="text-sm text-muted-foreground italic">
                                No topics selected. Add at least one topic with question count.
                            </p>
                        )}
                    </div>

                    {/* Assessment Summary */}
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

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            onClick={onClose}
                            className="btn border-none bg-transparent text-foreground font-semibold cursor-pointer hover:text-muted-foreground transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setCreated(true)}
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
