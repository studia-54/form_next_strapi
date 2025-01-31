import styles from "./page.module.css";
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
      name: string;
  };

  export const Textarea: React.FC<TextareaProps> = ({ name }) => {

    const { register } = useFormContext();

    return (
      <div className={styles.form__textarea_container}>
        <textarea placeholder="Напишите" className={styles.form__textarea} {...register(name)}></textarea>
      </div>
    )
  }

  export default Textarea