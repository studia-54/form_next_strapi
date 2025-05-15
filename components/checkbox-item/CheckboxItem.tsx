'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Option } from '@/types/types'
import { useFormContext, Controller } from 'react-hook-form'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

interface CheckboxItemProps {
  option: Option
  name: string
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({ option, name }) => {
  const { control, watch } = useFormContext()
  const selectedValues: string[] = watch(name) || []

  const isSelected = selectedValues.includes(option.title)

  return (
    <div className={styles.checkbox_container}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const handleChange = () => {
            const newValue = field.value || []
            const isAlreadySelected = newValue.includes(option.title)

            const updatedValue = isAlreadySelected
              ? newValue.filter((v: string) => v !== option.title)
              : [...newValue, option.title]

            field.onChange(updatedValue)
          }

          return (
            <>
              <input
                type="checkbox"
                value={option.title}
                checked={isSelected}
                onChange={handleChange}
                className={styles.checkbox_input_hidden}
              />

              <div
                className={
                  isSelected
                    ? styles.form__checkbox_item_checked
                    : styles.form__checkbox_item
                }
                onClick={handleChange}
              >
                {option.image && (
                  <Image
                    src={`${NEXT_PUBLIC_API_URL}${option.image.url}`}
                    priority
                    alt={option.image.alternativeText || option.title}
                    width={220}
                    height={160}
                    className={styles.form__checkbox_image}
                  />
                )}

                <div className={styles.form__checkbox_text_container}>
                  <span className={styles.form__checkbox_description}>
                    {option.title}
                  </span>
                  <span className={styles.form__checkbox_title}>
                    {option.description}
                  </span>
                </div>
              </div>
            </>
          )
        }}
      />
    </div>
  )
}

export default CheckboxItem