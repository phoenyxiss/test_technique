import { ChangeEvent, MouseEvent } from 'react';

// Button component
export default function Button ({ className, ...props }: {className?: string, value: string, onClick: (e: MouseEvent<HTMLButtonElement>) => void}) {
    return (
        <button className={`${className}`} type="button" {...props}>{props.value}</button>
    )
}