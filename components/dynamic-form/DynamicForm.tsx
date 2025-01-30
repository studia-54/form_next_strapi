"use client"

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./page.module.css";
import { createFormSchema, Form, Option, Question } from "@/types/types"
import Textarea from "../textarea/Textarea";
import CheckboxItem from "../checkbox-item/CheckboxItem";
import RadiogroupItem from "../radiogroup-item/RadiogroupItem";
import RangeInputNew from "../range-input-new/RangeInputNew";

interface DynamicFormProps {
  fields: Form
  // onSubmit: (data: any) => void
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
  const schema = createFormSchema(fields);

  const methods = useForm({ resolver: zodResolver(schema) });
  const { formState: { errors } } = methods

  const onSubmit = (data) => {
    console.log(data)
  };

  console.log(errors)

  const renderField = (question: Question) => {
    switch (question.type) {
      case "from-0_to-10":
        return (
          <RangeInputNew name={question.id.toString()} />
          
        )
      case "checkboxes":
        return (
              <>
              <div className={styles.form__checkboxes} key={question.id.toString()}>
               {question.options.map((option) => (
                 <CheckboxItem 
                    option={option} 
                    name={option.id.toString()}
                    key={option.id}
                     />
                 ))}
            </div>
            {/* <div>{errors[field.title]?.message as string}</div> */}
              </>
            //  {errors[field.title] && <p className="text-red-500 text-sm">{errors[field.title]?.message as string}</p>}
        )
      case "radiogroup":
        return (
          <div className={styles.form__radiobuttons} key={question.id.toString()}>
               {question.options.map((option) => (
                 <RadiogroupItem 
                    option={option} 
                    name={option.id.toString()}
                    key={option.id}
                     />
                 ))}
            </div>
        )
      case "textarea":
        return (
          <Textarea
            name={question.id.toString()}
            />
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.page}>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form__container}>
            <h1 className={styles.form__title}>{fields.title}</h1>
              {fields.questions.map((field) => (
                <div key={field.title} className={styles.form__question}>
                  <label className={styles.form__label} htmlFor={field.title}>{field.title}</label>
                  {renderField(field)}
                  {errors[field.id] && <p className={styles.form__error_text}>{errors[field.id]?.message as string}</p>}
                </div>
              ))}
              <button className={styles.form__submit_button} type="submit">Отправить</button>
          </form>
      </FormProvider>
      </div>
  )
}