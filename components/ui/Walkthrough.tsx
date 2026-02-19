'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface WalkthroughStep {
    target: string // CSS selector
    title: string
    content: string
    position?: 'top' | 'bottom' | 'left' | 'right'
}

interface WalkthroughProps {
    steps: WalkthroughStep[]
    pageKey: string // Unique key to remember dismissal in localStorage
}

export function Walkthrough({ steps, pageKey }: WalkthroughProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })

    useEffect(() => {
        const dismissed = localStorage.getItem(`zuvy_walkthrough_${pageKey}`)
        if (!dismissed) {
            setIsOpen(true)
        }
    }, [pageKey])

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem(`zuvy_walkthrough_${pageKey}`, 'true')
    }

    const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const updatePosition = useCallback(() => {
        if (!isOpen) return

        const step = steps[currentStep]
        const element = document.querySelector(step.target)

        if (element) {
            const rect = element.getBoundingClientRect()
            setPosition({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height
            })

            requestAnimationFrame(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            })
        }
    }, [currentStep, isOpen, steps])

    useEffect(() => {
        updatePosition()
        const handleResize = () => {
            if (resizeTimer.current) clearTimeout(resizeTimer.current)
            resizeTimer.current = setTimeout(updatePosition, 150)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            if (resizeTimer.current) clearTimeout(resizeTimer.current)
        }
    }, [updatePosition])

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(updatePosition, 100)
            return () => clearTimeout(timer)
        }
    }, [isOpen, updatePosition])

    if (!isOpen) return null

    const step = steps[currentStep]

    // Dynamic positioning — must stay inline (computed pixel values)
    const spacing = 12
    let popoverStyle: React.CSSProperties = {
        position: 'absolute',
        zIndex: 1000,
        width: '300px',
        maxWidth: '90vw',
    }

    if (step.position === 'right') {
        popoverStyle.top = position.top + (position.height / 2) - 100
        popoverStyle.left = position.left + position.width + spacing
    } else if (step.position === 'bottom') {
        popoverStyle.top = position.top + position.height + spacing
        popoverStyle.left = position.left + (position.width / 2) - 150
    } else if (step.position === 'left') {
        popoverStyle.top = position.top
        popoverStyle.left = position.left - 300 - spacing
    } else {
        popoverStyle.top = position.top - spacing - 200
        popoverStyle.left = position.left
    }

    if (typeof popoverStyle.left === 'number' && popoverStyle.left < 10) {
        popoverStyle.left = 10
    }

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 z-[998] pointer-events-none" />

            {/* Highlight box */}
            <div
                className="absolute rounded-md pointer-events-none z-[999] transition-all duration-300"
                style={{
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    height: position.height,
                    boxShadow: '0 0 0 9999px rgba(0,0,0,0.5), 0 0 0 4px hsl(var(--primary))',
                }}
            />

            {/* Content card */}
            <div className="card relative" style={popoverStyle}>
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X size={16} />
                </button>

                <h4 className="text-[1.1rem] mb-2 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0">
                        {currentStep + 1}
                    </span>
                    {step.title}
                </h4>

                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {step.content}
                </p>

                <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'w-2 h-2 rounded-full',
                                    i === currentStep ? 'bg-primary' : 'bg-border'
                                )}
                            />
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            className="btn px-2 py-1 text-sm"
                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                            disabled={currentStep === 0}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            className="btn btn-primary px-2 py-1 text-sm"
                            onClick={() => {
                                if (currentStep < steps.length - 1) {
                                    setCurrentStep(currentStep + 1)
                                } else {
                                    handleClose()
                                }
                            }}
                        >
                            {currentStep === steps.length - 1 ? 'Finish' : <ChevronRight size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
