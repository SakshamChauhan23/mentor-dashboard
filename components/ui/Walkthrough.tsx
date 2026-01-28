'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'

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

    // Check if previously dismissed
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

            // Scroll element into view if needed
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [currentStep, isOpen, steps])

    useEffect(() => {
        updatePosition()
        window.addEventListener('resize', updatePosition)
        return () => window.removeEventListener('resize', updatePosition)
    }, [updatePosition])

    // Wait for DOM to be ready
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(updatePosition, 500)
            return () => clearTimeout(timer)
        }
    }, [isOpen, updatePosition])

    if (!isOpen) return null

    const step = steps[currentStep]

    // Calculate Popover Position
    let popoverStyle: React.CSSProperties = {
        position: 'absolute',
        zIndex: 1000,
        width: '300px',
        maxWidth: '90vw'
    }

    const spacing = 12

    // Simple positioning logic
    if (step.position === 'right') {
        popoverStyle.top = position.top + (position.height / 2) - 100 // Center roughly
        popoverStyle.left = position.left + position.width + spacing
    } else if (step.position === 'bottom') {
        popoverStyle.top = position.top + position.height + spacing
        popoverStyle.left = position.left + (position.width / 2) - 150
    } else if (step.position === 'left') {
        popoverStyle.top = position.top
        popoverStyle.left = position.left - 300 - spacing
    } else {
        // Top or default
        popoverStyle.top = position.top - spacing - 200 // Approximate height
        popoverStyle.left = position.left
    }

    // Fallback if offscreen (basic)
    if (popoverStyle.left < 10) popoverStyle.left = 10

    return (
        <>
            {/* Backdrop with "Hole" is complex, we'll use a semi-transparent overlay + high z-index target approach or just a simple overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    zIndex: 998,
                    pointerEvents: 'none' // Let clicks pass through? No, we want to block interaction elsewhere usually
                }}
            />

            {/* Highlight Box (The "Hole") */}
            <div
                style={{
                    position: 'absolute',
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    height: position.height,
                    boxShadow: '0 0 0 9999px rgba(0,0,0,0.5), 0 0 0 4px var(--primary)', // The overlay trick
                    borderRadius: 'var(--radius-md)',
                    pointerEvents: 'none',
                    zIndex: 999,
                    transition: 'all 0.3s ease'
                }}
            />

            {/* Content Card */}
            <div
                className="card"
                style={{
                    ...popoverStyle,
                    zIndex: 1000,
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)'
                }}
            >
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-tertiary)'
                    }}
                >
                    <X size={16} />
                </button>

                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem'
                    }}>
                        {currentStep + 1}
                    </span>
                    {step.title}
                </h4>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                    {step.content}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: i === currentStep ? 'var(--primary)' : 'var(--border)'
                                }}
                            />
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                            disabled={currentStep === 0}
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                if (currentStep < steps.length - 1) {
                                    setCurrentStep(currentStep + 1)
                                } else {
                                    handleClose()
                                }
                            }}
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        >
                            {currentStep === steps.length - 1 ? 'Finish' : <ChevronRight size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
