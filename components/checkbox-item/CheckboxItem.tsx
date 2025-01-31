import Image from "next/image";
import styles from "./page.module.css";
import { Option } from "@/types/types";
import { useFormContext } from 'react-hook-form';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
interface CheckboxItemProps {
    option: Option;
    name: string;
    onClick: () => void;
    selected?: boolean;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({ option, name, selected, onClick }) => {  
  const { register } = useFormContext();

  return (
    <>
    <input {...register(name)} type="checkbox" checked={selected} value={name} style={{ display: 'none' }} />
    <div
      className={selected ? styles.form__checkbox_item_checked : styles.form__checkbox_item}
      onClick={onClick}
    >
        <label htmlFor='some'></label>
        <Image 
            src={`${BASE_URL}${option.image.url}`}
            alt={option.image.alternativeText}
            width={220}
            height={160}
            className={styles.form__checkbox_image}
        />
        <div className={styles.form__checkbox_text_container}>
          <span className={styles.form__checkbox_description}>{option.title}</span>
          <span className={styles.form__checkbox_title}>{option.description}</span>
        </div>
    </div>
    </>
  )
}

export default CheckboxItem