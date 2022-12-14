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
        <div className={styles.inputElement}>
            <input className={`${styles.input} ${className}`} {...props} placeholder="" required/>
            <span className={styles.inputPlaceholder}>{props.placeholder}</span>
        </div>
    )
} 