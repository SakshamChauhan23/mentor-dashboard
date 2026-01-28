'use client'

import styles from './Switch.module.css'

interface SwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label?: string
}

export function Switch({ checked, onChange, label }: SwitchProps) {
    return (
        <div className={styles.center}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={styles.switch}
                aria-label={label}
            >
                <span className={styles.thumb} />
            </button>
            {label && <span style={{ fontSize: '0.875rem' }}>{label}</span>}
        </div>
    )
}
