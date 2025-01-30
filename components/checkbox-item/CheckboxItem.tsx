import Image from "next/image";
import styles from "./page.module.css";
import { Option } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface CheckboxItemProps {
    option: Option;
    key: string;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({ option }) => {
  return (
    <>
    <div key={option.id} className={styles.form__checkbox_item}>
        <input type="checkbox" id='some' />

        <label htmlFor='some'>
        <Image 
            src={`${BASE_URL}${option.image.url}`}
            alt={option.image.alternativeText}
            width={220}
            height={160}
        />

        <span>{option.title}</span>
        </label>
    </div>
    </>
  )
}

export default CheckboxItem