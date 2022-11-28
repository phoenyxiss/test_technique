import { ChangeEvent } from 'react';

// Imput component
export default function Input ({ className, ...props }: {className: string, id: string, type: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <input className={`${className}`} {...props} required/>
    )
} 