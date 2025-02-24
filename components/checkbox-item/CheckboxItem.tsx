import Image from "next/image";
import styles from "./page.module.css";
import { Option } from "@/types/types";
import { useFormContext } from 'react-hook-form';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
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
    <div className={styles.checkbox_container}>
      <input {...register(name)} type="checkbox" value={option.title} />

      <div
        className={selected ? styles.form__checkbox_item_checked : styles.form__checkbox_item}
        onClick={onClick}
      >
          {
            option.image && (
              <Image
                src={`${NEXT_PUBLIC_API_URL}${option?.image?.url}`}
                priority
                alt={option?.image.alternativeText}
                width={220}
                height={160}
                className={styles.form__checkbox_image}
          />
            )
          }
          <div className={styles.form__checkbox_text_container}>
            <span className={styles.form__checkbox_description}>{option.title}</span>
            <span className={styles.form__checkbox_title}>{option.description}</span>
          </div>
        </div>
    </div>
    </>
  )
}

export default CheckboxItem