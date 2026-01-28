'use client'

import React from 'react'
import styles from './ProgressBar.module.css'

interface ProgressBarProps {
    value: number
    max?: number
    className?: string
}

export function ProgressBar({ value, max = 100, className }: ProgressBarProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
        <div className={`${styles.container} ${className || ''}`}>
            <div
                className={styles.fill}
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
            />
        </div>
    )
}
