import styles from './styles/IconPicker.module.css';

import icons from '@/constants/CategoryIcons';

function IconPicker({ selected, setIcon }) {

    return (
        <>
            <div className={styles.iconPicker}>
                {
                    icons.map((icon, index) =>
                    (
                        <div 
                            className={`${styles.icon} ${index == selected ? styles.selected : ''}`} 
                            key={index}
                            onClick={() => setIcon(index)}
                        >
                            <i className={icon}></i>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default IconPicker