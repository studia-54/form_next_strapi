
'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import { useFormContext } from 'react-hook-form';

interface RangeProps {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    name: string;
}

const Range = ({
    name,
    min = 0,
    max = 10,
    step = 1,
    defaultValue = 0,
}: RangeProps) => {
    const [value, setValue] = useState<number>(defaultValue);
    const [width, setWidth] = useState<number>(0);
    const rangeRef = useRef<HTMLInputElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

      const { register } = useFormContext();

    useEffect(() => {
        if (rangeRef.current) {
            const range = rangeRef.current;
            const percent = ((value - min) / (max - min)) * 100;

            if (tooltipRef.current) {
                setWidth(tooltipRef.current.offsetWidth);
            }

            const position = Math.min(Math.max(percent, 0), 100);
            if (tooltipRef.current) {
                tooltipRef.current.style.left = `calc(${position}% + ${
                    (position - 50) * -0.2
                }px)`;
            }
        }
    }, [value, min, max]);

    return (
        <div className={styles.rangeWrapper}>
            <div
                ref={tooltipRef}
                
                className={styles.range__tooltip}
            >
                {value}
            </div>
            <input
                ref={rangeRef}
                {...register(name)}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className={styles.form__range_input}
            />
        </div>
    );
};

export default Range;
