import styles from "./page.module.css";

interface TextareaProps {
    field: {
      name: string;
      value: string;
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    };
  }

  export const Textarea: React.FC<TextareaProps> = ({ field }) => {
    return (
      <div className={styles.form__textarea_container}>
        <textarea placeholder="Напишите" className={styles.form__textarea} {...field} />
      </div>
    )
  }

  export default Textarea