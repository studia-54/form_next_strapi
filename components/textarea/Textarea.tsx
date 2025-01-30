import styles from "./page.module.css";
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
      name: string;
      // value: string;
      // onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };

  export const Textarea: React.FC<TextareaProps> = ({ name }) => {

    const { register } = useFormContext();

    return (
      <div className={styles.form__textarea_container}>
        <input placeholder="Напишите" className={styles.form__textarea} {...register(name)} />
      </div>
    )
  }

  export default Textarea