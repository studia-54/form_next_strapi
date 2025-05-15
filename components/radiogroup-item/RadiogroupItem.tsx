'use client'

import { useFormContext } from 'react-hook-form'
import styles from './page.module.css'
import { Option } from '@/types/types'
import React from 'react'

interface RadiogroupItemProps {
  option: Option
  name: string
}

const RadiogroupItem: React.FC<RadiogroupItemProps> = ({ option, name }) => {
  const { register, watch } = useFormContext()
  const selectedValue = watch(name)

  return (
    <div className={styles.radio_container}>
      <input
        {...register(name)}
        type="radio"
        className={styles.radio_input}
        value={option.title}
        id={option.id.toString()}
      />
      <label
        htmlFor={`${name}_${option.id}`}
        className={
          Number(selectedValue) === option.id
            ? styles.form__radiogroup_item_checked
            : styles.form__radiogroup_item
        }
      >
        <div className={styles.form__radiogroup_text}>{option.title}</div>
      </label>
    </div>
  )
}

export default RadiogroupItem
