import { useState } from 'react';
import styles from './Notification.module.css'

import { useNavigate } from 'react-router-dom';

function Notification({ importance, url, children }) {

    const [hidden, setHidden] = useState(false);

    let color, icon;

        switch (importance) {
            default:
            case "info":
                color = 'blue';
                icon = 'fa-circle-info';
                break;
            case "warning":
                color = 'yellow';
                icon = 'fa-circle-exclamation';
                break;
            case "critical":
                color = 'red';
                icon = 'fa-triangle-exclamation';
                break;
        }
    
    const navigate = useNavigate();

    return (
        <div className={`${styles.notification} ${styles[color]} ${hidden ? styles.hidden : ''}`} onClick={() => navigate(url)}>
            <i className={`fa-solid ${icon}`} />
            <div className={styles.message}>
                {children}
            </div>
            <i className="fa-solid fa-xmark" onClick={(e) => {e.stopPropagation(); setHidden(true)}} />
        </div>
    )
}

export default Notification