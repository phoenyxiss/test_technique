import { ChangeEvent } from 'react';
import styles from './Input.module.scss'

// Imput component
export default function Input ({ className, ...props }: {
        className: string, 
        id: string, 
        type: string, 
        value: string, 
        placeholder: string, 
        onChange: (e: ChangeEvent<HTMLInputElement>) => void
    }) {
    return (
        <input className={`${styles.input} ${className}`} {...props} required/>
    )
} 