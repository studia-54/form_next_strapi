import React, { useState, useEffect } from 'react';

import Image from "next/image";
import styles from "./page.module.css";
import checkedIcon from "@/shared/input_checked.svg";
interface ConfidentCheckboxProps {
    isChecked: boolean;
    onCheckboxChange: () => void;
}

const ConfidentCheckbox: React.FC<ConfidentCheckboxProps> =  ({ isChecked, onCheckboxChange }) => {
    const [policyUrl, setPolicyUrl] = useState('https://studia-54.com/policy');

    useEffect(() => {
      if (typeof window !== 'undefined' && window.location.hash === '#fiftyfourms') {
        setPolicyUrl('https://fiftyfourms.com/policy');
      }
    }, []);

    const [policyEnUrl, setPolicyEnUrl] = useState('https://studia-54.com/en/policy');

    useEffect(() => {
      if (typeof window !== 'undefined' && window.location.hash === '#fiftyfourms') {
        setPolicyEnUrl('https://fiftyfourms.com/en/policy');
      }
    }, []);

  return (
    <div className={styles.confident_container}>
        <div className={styles.checkbox_container}>
            <input 
            type="checkbox" 
            name="confident"
            className={styles.confident_checkbox}
            onChange={onCheckboxChange}
            checked={isChecked}
            />

            <div className={isChecked ? styles.content_wrapper_checked : styles.content_wrapper }>
                <Image
                    src={checkedIcon}
                    priority
                    alt="Checkbox"
                    width={13}
                    height={8}
                    className={styles.image}
                />
            </div>
        </div>

        <div className={styles.text_box}>
            {/* <span className={styles.confident_text}>Принимаю условия </span>
            <a
             href={policyUrl}
                target="_blank"
                // download="confident_example.pdf"
                >
                <span className={styles.confident_highlight}>Политики конфиденциальности</span>
            </a> */}

            <span className={styles.confident_text}>I accept the terms </span>
              <a
              href={policyEnUrl}
                  target="_blank"
                  // download="confident_example.pdf"
                  >
                  <span className={styles.confident_highlight}>Privacy policy</span>
              </a>
        </div>
    </div>
  )
}

export default ConfidentCheckbox