"use client"

import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import styles from "./page.module.css";
import { Form, Question } from "@/types/types"
import Textarea from "../textarea/Textarea";
import CheckboxItem from "../checkbox-item/CheckboxItem";
import RadiogroupItem from "../radiogroup-item/RadiogroupItem";
import RangeInput from "../range-input-new/RangeInputNew";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
import { postFields } from "@/app/api/postData";

interface DynamicFormProps {
  fields: Form
  // onSubmit: (data: Form) => void
}
export const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
  // const params = useSearchParams()
  
  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    await postFields(data)
    console.log(data)
  }

  const router = useRouter();
  // const schema = createFormSchema(fields);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [selectedRadioItemId, setSelectedRadioItemId] = useState<number | null>(null);

  const methods = useForm<Form>();
  const { formState: { errors }, setValue } = methods

  useEffect(() => {
    fields.questions.map((item: any) => {
      if (item.type === "checkboxes") {
        item.options.map((option: any) => {
          setValue(item.id.toString(), selectedCheckboxes.includes(option.id));
        });
      }

      if (item.type === "radiogroup") {
        item.options.map((option: any) => {
          setValue(item.id.toString(), selectedRadioItemId === option.id);
        });
      }
    });
  }, [selectedCheckboxes, selectedRadioItemId]);

  const renderField = (question: Question) => {
    switch (question.type) {
      case "from-0_to-10":
        return (
          <RangeInput  name={`from-0_to-10${question.id}`} />
        )
      case "checkboxes":
        return (
                <>
                <div className={styles.form__checkboxes} key={question.id.toString()}>
                {question.options.map((option) => (
                  <CheckboxItem 
                      option={option} 
                      name={`checkbox${option.id}`}
                      key={option.id}
                      selected={selectedCheckboxes?.includes(option.id)}
                      onClick={() => {
                        const newSelectedCheckboxes = [...selectedCheckboxes]

                        if (newSelectedCheckboxes?.includes(option.id)) {
                          const index = newSelectedCheckboxes.indexOf(option.id);

                          if (index > -1) { // only splice array when item is found
                            newSelectedCheckboxes.splice(index, 1); // 2nd parameter means remove one item only
                          }
                        } else {
                          newSelectedCheckboxes.push(option.id);
                        }
                        
                        setSelectedCheckboxes(newSelectedCheckboxes)} }
                      />
                  ))}
              </div>
              </>
        )
      case "radiogroup":
        return (
          <div className={styles.form__radiobuttons} key={question.id.toString()}>
               {question.options.map((option) => (
                 <RadiogroupItem 
                    option={option} 
                    name={`radiogroup${option.id}`}
                    key={option.id}
                    selected={option.id === selectedRadioItemId}
                    onClick={() => setSelectedRadioItemId(option.id)}
                  />
                 ))}
            </div>
        )
      case "textarea":
        return (
          <Textarea
          name={`textarea${question.id}`}
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
              {fields.questions.map((field, index) => (
                <div key={field.title} className={styles.form__question}>
                  <label className={styles.form__label} htmlFor={field.title}>{`${index + 1}. ${field.title}`}</label>
                  {renderField(field)}
                  {/* {errors[field.id] && <p className={styles.form__error_text}>{errors[field.id]?.message as string}</p>} */}
                </div>
              ))}
              <button className={styles.form__submit_button} type="submit" onClick={() => router.push('/submit')}
              >Отправить</button>
          </form>
      </FormProvider>
    </div>
  )
}