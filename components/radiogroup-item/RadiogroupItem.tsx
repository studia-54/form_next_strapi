import styles from "./page.module.css";
import { Option } from "@/types/types";

interface RadiogroupItemProps {
    option: Option;
    key: string;
}
export const RadiogroupItem: React.FC<RadiogroupItemProps>  = () => {
  return (
    <div 
              // onValueChange={field.onChange}
               defaultValue={field.value} className={styles.form__checkboxes}> 
                {question.options &&
                  question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <input className={styles.question__option} value={option.title} id={option.id.toString()}></input>
                    </div>
                  ))}
              </div>
  )
}

export default RadiogroupItem