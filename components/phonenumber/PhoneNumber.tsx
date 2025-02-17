import styles from "./page.module.css";
import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import { FieldError } from 'react-hook-form';

interface PhoneNumberProps {
      name: string;
      value?: string;
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const PhoneNumber: React.FC<PhoneNumberProps> = ({ name, value, onChange }) => {
    const { register, formState } = useFormContext();
    const registerWithMask = useHookFormMask(register);

    const error = formState.errors[name] as FieldError | undefined;

    return (
        <div className={styles.form__textarea_container}>
            <input

            {...registerWithMask(name, ['+7 (999) 999-99-99'], {
              // required: "Телефон обязателен",
              required: false,
              pattern: {
                  value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                  message: "Введите телефон в формате +7 (999) 999-99-99",
              },
          })}
              type="text"
              onChange={onChange}
              // value={value}
              placeholder="+7 (___) ___-__-__"
              className={styles.phone_input}
      />
        </div>
    )
  }

export default PhoneNumber