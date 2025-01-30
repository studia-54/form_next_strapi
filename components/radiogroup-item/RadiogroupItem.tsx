import styles from "./page.module.css";
import { Option } from "@/types/types";
import { useFormContext } from 'react-hook-form';
interface RadiogroupItemProps {
    option: Option;
    name: string;
}
export const RadiogroupItem: React.FC<RadiogroupItemProps>  = ({ option, name}) => {
  const { register } = useFormContext();

  return (
      <div key={option.id} className={styles.form__radiogroup_item_checked}>
        {/* <input type="radio" className={styles.question__option} value={option.title} id={option.id.toString()} {...register(name)}></input> */}
        <div className={styles.form__radiogroup_text} id={option.id.toString()} {...register(name)}>{option.title}</div>
        {/* <label className={styles.question__label} htmlFor={option.id.toString()}>{option.title}</label> */}
      </div>
  )
}

export default RadiogroupItem