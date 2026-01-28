import { ReactNode } from 'react'
import styles from './Table.module.css'

interface Column<T> {
    header: string
    accessor: keyof T | ((item: T) => ReactNode)
    className?: string
}

interface TableProps<T> {
    data: T[]
    columns: Column<T>[]
    onRowClick?: (item: T) => void
}

export function Table<T>({ data, columns, onRowClick }: TableProps<T>) {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className={styles.th}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={onRowClick ? styles.rowInteractive : styles.row}
                            onClick={() => onRowClick?.(item)}
                        >
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className={styles.td}>
                                    {typeof col.accessor === 'function'
                                        ? col.accessor(item)
                                        : (item[col.accessor] as ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
