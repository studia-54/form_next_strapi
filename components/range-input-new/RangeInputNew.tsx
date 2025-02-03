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
    const rangeRef = useRef<HTMLInputElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const { register, setValue: setFormValue, watch } = useFormContext();

    const { ref, ...rest } = register(name);

    const watchRangeInput = watch(name);

    useEffect(() => {
        if (rangeRef.current) {
            const percent = ((value - min) / (max - min)) * 100;

            const position = Math.min(Math.max(percent, 0), 100);

            if (tooltipRef.current) {
                tooltipRef.current.style.left = `calc(${position}% + ${
                    (position - 50) * -0.2
                }px)`;
            }
        }
    }, [rangeRef.current, value, min, max]);

    useEffect(() => {
        if (typeof watchRangeInput !== 'undefined') {
            setValue(watchRangeInput);
        }
    }, [watchRangeInput]);

    return (
        <div className={styles.range__wrapper}>
            <div
                ref={tooltipRef}
                className={styles.range__tooltip}
            >
                {value}
            </div>

            {(value > 0) && (
                <div className={styles.range__tooltip_default_one}>0</div>
            )}
            {(value < 10) && (
                <div className={styles.range__tooltip_default_ten}>10</div>
            )}

                <input 
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={0}
                    className={styles.form__range_input}
                    {...rest}
                    name={name}
                    ref={(e) => {
                        ref(e)
                        rangeRef.current = e
                    }}
                />
        </div>
    );
};

export default Range;
