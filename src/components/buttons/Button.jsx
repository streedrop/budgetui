import styles from './Button.module.css';

function Button({ children, type = "button", disabled = false, action, className = "" }) {
    if (type == "submit")
        return (
            <button type="submit">
                <p>{children}</p>
            </button>
        );

    return (
        <button type="button" disabled={disabled} onClick={action} className={className}>
            <p>{children}</p>
        </button>
    );
}

export default Button