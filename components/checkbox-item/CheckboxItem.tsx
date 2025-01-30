import Image from "next/image";
import styles from "./page.module.css";
import { Option } from "@/types/types";
import { useFormContext } from 'react-hook-form';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
interface CheckboxItemProps {
    option: Option;
    name: string;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({ option, name }) => {
  const { register } = useFormContext();

  return (
    <>
    <div className={styles.form__checkbox_item_checked} {...register(name)}>
        {/* <input type="checkbox" {...register(name)} /> */}
        <label htmlFor='some'></label>
        <Image 
            src={`${BASE_URL}${option.image.url}`}
            alt={option.image.alternativeText}
            width={220}
            height={160}
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