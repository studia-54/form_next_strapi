import styles from "./page.module.css";
import { Option } from "@/types/types";
import { useFormContext } from 'react-hook-form';
interface RadiogroupItemProps {
    option: Option;
    name: string;
    onClick: () => void;
    selected?: boolean;
}

export const RadiogroupItem: React.FC<RadiogroupItemProps>  = ({ option, name, selected, onClick}) => {
  const { register } = useFormContext();

  return (
    <>
      <input
        {...register(name)}
        type="radio"
        checked={selected}
        className={styles.question__option}
        value={option.id}
        id={option.id.toString()}
        style={{ display: "none" }}
      />

      <div key={option.id} className={selected ? styles.form__radiogroup_item_checked : styles.form__radiogroup_item} onClick={onClick}> 
        <div className={styles.form__radiogroup_text} id={option.id.toString()}>{option.title}</div>
      </div>
    </>
  )
}

export default RadiogroupItem