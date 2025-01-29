"use client"

import {useState} from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./page.module.css";
import { createFormSchema, Form, Question } from "@/types/types"
import Image from "next/image";

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

    console.log(question)
    switch (question.type) {
      case "from-0_to-10":
        return (
          <Controller
            name={question.id.toString()}
            control={control}
            defaultValue={5}
            render={({ field: { onChange, value } }) => (
              // <Slider min={0} max={10} step={1} value={[value]} onValueChange={(vals) => onChange(vals[0])} />
              <>
            <input
              className={styles.form__range_input}
              type="range"
              id="question1"
              min="0"
              max="10"
              value={[value]}
              // onChange={(e) =>
              //   setAnswers((prev) => ({
              //     ...prev,
              //     [index]: e.target.value,
              //   }))
              // }
            />
            {/* <div>Оценка: {answers[index]}</div> */}
              </>
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

                {question.options.map((option)=>(
                   <div key={option.id} className={styles.form__checkbox_item}>
                   <input type="checkbox" id='some' />

                   <label htmlFor='some' className="flex items-center space-x-2">
                    <Image 
                      src={option.image.url}
                      alt={option.image.alternativeText}
                      width={220}
                      height={160}
                    />
                    
                     {/* <img
                       src={option.image || "/placeholder.svg"}
                       alt={option.label}
                       className="w-6 h-6 object-cover"
                     /> */}
                     <span>{option.label}</span>
                   </label>
                 </div>
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
            render={({ field }) => (
              <div 
              // onValueChange={field.onChange}
               defaultValue={field.value} className={styles.form__checkboxes}>  {/* to do styles */}
                {field.options &&
                  field.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <input className={styles.question__option} value={option.id} id={option.id}></input>
                      <label htmlFor={option.id}>{option.label}</label> {/* to do styles */}
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
            render={({ field }) => 
            <>
              <div className={styles.form__textarea_container}>
                <textarea placeholder="Напишите" className={styles.form__textarea} {...field} />
              </div>
            </>
          }
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.page}>
      {/* <div className={styles.form__container}> */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form__container}>
          <h1 className={styles.form__title}>Ваш отзыв</h1>
            {fields.questions.map((field) => (
              <div key={field.title} className={styles.form__question}>
 
                <label className={styles.form__label} htmlFor={field.title}>{field.title}</label>

                {renderField(field)}
                {errors[field.title] && <p className="text-red-500 text-sm">{errors[field.title]?.message as string}</p>}
              </div>
            ))}
            <button className={styles.form__submit_button} type="submit">Отправить</button>
        </form>
      </div>
    // </div>
  )
}

