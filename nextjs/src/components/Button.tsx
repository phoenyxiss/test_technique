import { MouseEvent } from 'react';
import styles from './Button.module.scss'

// Button component
export default function Button ({ className, ...props }: {className?: string, value: string, onClick: (e: MouseEvent<HTMLButtonElement>) => void}) {
    return (
        <button className={`${styles.button} ${className}`} type="button" {...props}>{props.value}</button>
    )
}