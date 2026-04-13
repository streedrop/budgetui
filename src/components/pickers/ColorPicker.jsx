import styles from './styles/ColorPicker.module.css'

import { useState, useEffect } from 'react';

function ColorPicker() {

    const [count, setCount] = useState(12);
    const [colors, setColors] = useState([]);
    const [colors1, setColors1] = useState([]);
    const [colors2, setColors2] = useState([]);
    const [colors3, setColors3] = useState([]);
    const [colors4, setColors4] = useState([]);

    useEffect(() => {
        const fillColorArray = () => {
            let array = [];
            const lightnesses = [45, 55, 65];
            const saturations = [60, 75, 90];
            for (let i = 0; i < count; ++i) {
                array.push(`hsl(${(i * 137.508) % 360}, ${saturations[i % 3]}%, ${lightnesses[i % 3]}%)`);
            }
            return array;
        }

        const fillColorArray1 = () => {
            let array = [];
            const saturations = [60, 75, 90];
            for (let i = 0; i < count; ++i) {
                array.push(`hsl(${(i * 137.508) % 360}, ${saturations[i % 3]}%, 55%)`);
            }
            return array;
        }

        const fillColorArray2 = () => {
            let array = [];
            const lightnesses = [45, 55, 65];
            for (let i = 0; i < count; ++i) {
                array.push(`hsl(${(i * 137.508) % 360}, 70%, ${lightnesses[i % 3]}%)`);
            }
            return array;
        }

        const fillColorArray3 = () => {
            let array = [];
            for (let i = 0; i < count; ++i) {
                array.push(`hsl(${(i * 137.508) % 360}, 70%, 55%)`);
            }
            return array;
        }

        const fillColorArray4 = () => {
            let array = [];
            for (let i = 0; i < count; ++i) {
                array.push(`hsl(${(i * 360 / count) % 360}, 80%, 50%)`);
            }
            return array;
        }

        setColors(fillColorArray());
        setColors1(fillColorArray1());
        setColors2(fillColorArray2());
        setColors3(fillColorArray3());
        setColors4(fillColorArray4());
    }, [count]);


    return (
        <>
            <p>Pick a color:</p>
            <div className={styles.colorPicker}>
                {colors.map((color) => (<div className={styles.color} style={{ backgroundColor: color }}></div>))}
            </div>
            <div className={styles.colorPicker}>
                {colors1.map((color) => (<div className={styles.color} style={{ backgroundColor: color }}></div>))}
            </div>
            <div className={styles.colorPicker}>
                {colors2.map((color) => (<div className={styles.color} style={{ backgroundColor: color }}></div>))}
            </div>
            <div className={styles.colorPicker}>
                {colors3.map((color) => (<div className={styles.color} style={{ backgroundColor: color }}></div>))}
            </div>
            <div className={styles.colorPicker}>
                {colors4.map((color) => (<div className={styles.color} style={{ backgroundColor: color }}></div>))}
                <div className={styles.color} style={{ backgroundColor: 'gray' }}></div>
                <div className={styles.color} style={{ backgroundColor: 'brown' }}></div>
            </div>
        </>
    )
}

export default ColorPicker