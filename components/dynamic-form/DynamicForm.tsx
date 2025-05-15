'use client'

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import styles from './page.module.css'
import { Form, Question } from '@/types/types'
import Textarea from '../textarea/Textarea'
import CheckboxItem from '../checkbox-item/CheckboxItem'
import RadiogroupItem from '../radiogroup-item/RadiogroupItem'
import RangeInput from '../range-input-new/RangeInputNew'
import { Fragment, useEffect, useState } from 'react'
import { postFields } from '@/app/api/postData'
import SubmitModal from '../submit-modal/SubmitModal'

import TextareaFullname from '../textarea-fullname/TextareaFullname'
import PhoneNumber from '../phonenumber/PhoneNumber'
import ConfidentCheckbox from '../confident-checkbox/ConfidentCheckbox'
import { VALID_TYPES } from '@/shared/VALID_TYPES'

type FormFields = Record<string, any>

interface DynamicFormProps {
  fields: Form
  afterSubmit: (data: FormFields, params: Record<string, string>, fields: Form) => Promise<void>
  locale: string
  metrikaGoal?: string | null
}

declare global {
  interface Window {
    ym: (id: number, method: string, target: string, params?: any, callback?: () => void) => void
  }
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields, afterSubmit, locale }) => {
  const [success, setSuccess] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [phone, setPhone] = useState('')

  const methods = useForm({ mode: 'onChange' })
  const {
    formState: { errors },
    handleSubmit,
  } = methods

  const sendSize = () => {
    const height = document.documentElement.scrollHeight
    window.parent.postMessage({ height }, '*')
  }

  const handleMetrikaGoal = (goal: string) => {
    if (goal && typeof window !== 'undefined' && window.ym) {
      window.ym(99990810, 'reachGoal', goal)
      console.log('Yandex Metrika goal reached:', goal)
    }
  }

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    const params = Object.fromEntries(new URLSearchParams(window.location.search).entries())
    const metrikaGoal = params.metrikaGoal

    try {
      await Promise.all([
        afterSubmit(data, params, fields),
        postFields({ data, params }),
      ])

      handleMetrikaGoal(metrikaGoal)
      setSuccess(true)
      sendSize()
    } catch (err) {
      alert('Ошибка, попробуйте еще раз позже')
      console.error(err)
    }
  }

  useEffect(() => {
    window.parent.postMessage({ title: fields.title }, '*')
    window.addEventListener('resize', sendSize)
    sendSize()

    return () => {
      window.removeEventListener('resize', sendSize)
    }
  }, [])

  const handleCheckboxChange = () => setIsChecked(prev => !prev)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
  }

  const renderField = (question: Question, index: number) => {
    const name = (index + 1).toString()
    switch (question.type) {
      case 'from-0_to-10':
        return <RangeInput name={name} />

      case 'checkboxes':
        return (
          <div className={styles.form__checkboxes}>
            {question.options.map((option) => (
              <CheckboxItem
                key={option.id}
                option={option}
                name={name}
              />
            ))}
          </div>
        )

      case 'radiogroup':
        return (
          <div className={styles.form__radiobuttons} key={question.id.toString()}>
            {question.options.map((option) => (
              <RadiogroupItem
                key={option.id}
                option={option}
                name={name}
              />
            ))}
          </div>
        )
      case 'textarea':
        return <Textarea name={name} placeholder={question.placeholder} />
      case 'text':
        return <TextareaFullname name={name} placeholder={question.placeholder} />
      case 'phone':
        return <PhoneNumber value={phone} onChange={handleInput} name={name} />
      default:
        return null
    }
  }
  return (
    <div className={styles.page}>
      {success && <SubmitModal fields={fields} />}
      {!success && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form__container}>
            <h1 className={styles.form__title}>{fields.title}</h1>
            {fields.subtitle && <p className={styles.form__subtitle}>{fields.subtitle}</p>}

            {fields.questions.map((field, index) => {
              const { type, id, title } = field

              if (!VALID_TYPES[type]) {
                throw new Error(`Неизвестный тип вопроса: ${type}`)
              }

              const errorKey = `${type}:${id}`

              return (
                <Fragment key={id}>
                  <div className={styles.form__question}>
                    <label className={styles.form__label} htmlFor={title}>
                      {`${index + 1}. ${title}`}
                    </label>

                    {renderField(field, index)}
                  </div>
                  <div className={styles.form__errors_container}>
                    {errors[errorKey] && (
                      <p className={styles.form__error_text}>{errors[errorKey]?.message as string}</p>
                    )}
                  </div>
                </Fragment>
              )
            })}
            
            <button
              className={
                Object.keys(errors).length === 0 && isChecked
                  ? styles.form__submit_button
                  : styles.form__submit_button_default
              }
              type="submit"
              disabled={Object.keys(errors).length !== 0}
            >
              {fields.submitButton}
            </button>

            <ConfidentCheckbox 
              isChecked={isChecked} 
              onCheckboxChange={handleCheckboxChange} 
              locale={locale} 
            />
          </form>
        </FormProvider>
      )}
    </div>
  )
}
