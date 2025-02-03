import { Form } from "@/types/types";
import styles from "./page.module.css";
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
      name: string;
      placeholder?: string;
  };

  export const Textarea: React.FC<TextareaProps> = ({ name, placeholder }) => {

    const { register } = useFormContext();

    return (
      <div className={styles.form__textarea_container}>
        <textarea placeholder={placeholder} className={styles.form__textarea} {...register(name)}></textarea>
      </div>
    )
  }

  export default Textarea