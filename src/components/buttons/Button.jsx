import styles from './Button.module.css';

function Button({ children, type = "button", action }) {

    if (type == "submit")
        return (
            <button type="submit">
                <p>{children}</p>
            </button>
        );

    return (
        <button type="button" onClick={action}>
            <p>{children}</p>
        </button>
    );
}

export default Button