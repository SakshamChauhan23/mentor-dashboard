import { LucideIcon } from 'lucide-react'
import styles from './MetricCard.module.css'

interface MetricCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    change?: string
    trend?: 'up' | 'down' | 'neutral'
}

export function MetricCard({ title, value, icon: Icon, change, trend }: MetricCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                <Icon className={styles.icon} size={20} />
            </div>
            <div className={styles.content}>
                <span className={styles.value}>{value}</span>
                {change && (
                    <span className={`${styles.change} ${trend === 'up' ? styles.up : trend === 'down' ? styles.down : ''}`}>
                        {change}
                    </span>
                )}
            </div>
        </div>
    )
}
