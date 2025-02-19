import Image from "next/image";
import styles from "./page.module.css";
import checkedIcon from "@/shared/input_checked.svg";
import { usePathname } from 'next/navigation';
interface ConfidentCheckboxProps {
    isChecked: boolean;
    onCheckboxChange: () => void;
}

const ConfidentCheckbox: React.FC<ConfidentCheckboxProps> =  ({ isChecked, onCheckboxChange }) => {
    const pathname = usePathname();

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
            <span className={styles.confident_text}>Принимаю условия </span>
            <a
            href={pathname.includes('studia-54') ? 'https://admin.forms.studia-54.com/uploads/Politika_Studia54_b0f85802a1.pdf' : 'https://admin.forms.studia-54.com/uploads/Politika_Fifty_767335c813.pdf'}
                target="_blank"
                // download="confident_example.pdf"
                >
                <span className={styles.confident_highlight}>Политики конфиденциальности</span>
            </a>
        </div>
    </div>
  )
}

export default ConfidentCheckbox