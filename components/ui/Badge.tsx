import styles from './Badge.module.css'

interface BadgeProps {
    children: React.ReactNode
    variant?: 'success' | 'warning' | 'error' | 'neutral' | 'info'
}

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
    return (
        <span className={`${styles.badge} ${styles[variant]} `}>
            {children}
        </span>
    )
}
