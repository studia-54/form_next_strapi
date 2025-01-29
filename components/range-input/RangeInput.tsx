import styles from "./page.module.css";

interface RangeInputProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({ value, onChange}) => {
  return (
        <>
                <div className={styles.form__range_value_box}>
                    <div>5</div>
                </div>
                <input
                  className={styles.form__range_input}
                  type="range"
                  id="question1"
                  min="0"
                  max="10"
                  step="1"
                  // value={data}
                  // onChange={(e)=> setData(e.target.value)}
                />
        </>
  )
}

export default RangeInput
