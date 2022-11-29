import styles from "./Button.module.scss";

export enum ButtonType {
    default = "default",
    question = "question",
    validation = "validation",
    question2 = "question2"
}

// Button component
export default function Button ( { type = ButtonType.default, isFocused = false, ...props }: {
        type?: ButtonType,
        isFocused?: boolean,
        value: string,
        onClick: () => void} ) {
    
    return (
        <button 
            className={`${styles.button} ${styles[type]} ${isFocused ? styles.focused : ""}`} 
            type="button"
            { ...props }>
            { props.value }
        </button>
    );
}