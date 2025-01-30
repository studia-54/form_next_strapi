"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./page.module.css";
import { createFormSchema, Form, Question } from "@/types/types"
import Textarea from "../textarea/Textarea";
import CheckboxItem from "../checkbox-item/CheckboxItem";
import RangeInputNew from "../range-input-new/RangeInputNew";
// import RangeInput from "../range-input/RangeInput";
// import RadiogroupItem from "../radiogroup-item/RadiogroupItem";

interface DynamicFormProps {
  fields: Form
  // onSubmit: (data: any) => void
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {

  const schema = createFormSchema(fields)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const renderField = (question: Question) => {

    // console.log(question)
    switch (question.type) {
      case "from-0_to-10":
        return (
          <Controller
            name={question.id.toString()}
            control={control}
            defaultValue={5}
            render={({ field: { onChange, value } }) => ( 
              <RangeInputNew />
            )}
          />
        )
      case "checkboxes":
        return (
          <Controller
            name={question.id.toString()}
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
              <div className={styles.form__checkboxes}>

                {question.options.map((option) => (
                  <CheckboxItem option={option} key={option.id.toString()} />

                ))}
                {/* {options &&
                  field.options.map((option) => (
                    <div key={option.id} className={styles.form__checkbox_item}>
                      <input type="text" />

                      <label htmlFor={option.id} className="flex items-center space-x-2">
                        <img
                          src={option.image || "/placeholder.svg"}
                          alt={option.label}
                          className="w-6 h-6 object-cover"
                        />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))} */}
              </div>
            )}
          />
        )
      case "radiogroup":
        return (
          <Controller
            name={question.id.toString()}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value} }) => (
                  // <RadiogroupItem option={option} key={option.id.toString()} />

              <div 
              // onValueChange={field.onChange}
               defaultValue={value} className={styles.form__checkboxes}>
                {question.options &&
                  question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <input className={styles.question__option} value={option.title} id={option.id.toString()}></input>
                    </div>
                  ))}
              </div>

            )}
          />
        )
      case "textarea":
        return (
          <Controller
            name={question.id.toString()}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea field={field} />
            )}
          />
        )
      default:
        return null
    }
  }

  // console.log(fields.title)

  return (
    <div className={styles.page}>
      {/* <div className={styles.form__container}> */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form__container}>
          <h1 className={styles.form__title}>{fields.title}</h1>
          {/* Отрисовка списка */}
            {fields.questions.map((field) => (
              <div key={field.title} className={styles.form__question}>
                <label className={styles.form__label} htmlFor={field.title}>{field.title}</label>
                {renderField(field)}
                {errors[field.title] && <p className="text-red-500 text-sm">{errors[field.title]?.message as string}</p>}
              </div>
            ))}
            <button className={styles.form__submit_button} type="submit" onClick={() => {console.log('results')}}>Отправить</button>
        </form>
      </div>
    // </div>
  )
}

