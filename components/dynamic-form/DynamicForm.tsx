"use client"

import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./page.module.css";
import { createFormSchema, Form, Question } from "@/types/types"
import Textarea from "../textarea/Textarea";
import CheckboxItem from "../checkbox-item/CheckboxItem";
import RadiogroupItem from "../radiogroup-item/RadiogroupItem";
import RangeInput from "../range-input-new/RangeInputNew";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postFields } from "@/app/api/postData";
import { z } from "zod";
import SubmitModal from "../submit-modal/SubmitModal";
interface DynamicFormProps {
  fields: Form,
  // onSubmit: (data: Form) => void
}
export const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [selectedRadioItemId, setSelectedRadioItemId] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const schema = createFormSchema(fields);
  const methods = useForm(
    // { resolver: zodResolver(schema) }
  );
  const { formState: { errors }, setValue } = methods

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    await postFields({data, params: Object.fromEntries(new URLSearchParams(window.location.search).entries())})
      .catch((error) => { alert(`Ошибка отправки полей формы: ${error}`) })
    console.log(data);
    setSuccess(true);
  }

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
          <RangeInput name={`from-0_to-10:${question.id}`} />
        )
      case "checkboxes":
        return (
                <>
                <div className={styles.form__checkboxes} key={question.id.toString()}>
                {question.options.map((option) => (
                  <CheckboxItem 
                      option={option} 
                      name={`checkboxes:${question.id}`}
                      key={option.id}
                      selected={(selectedCheckboxes?.includes(option.id))}
                      onClick={() => {
                        const newSelectedCheckboxes = [...selectedCheckboxes]

                        if (newSelectedCheckboxes?.includes(option.id)) {
                          const index = newSelectedCheckboxes.indexOf(option.id);

                          if (index > -1) {
                            newSelectedCheckboxes.splice(index, 1);
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
                    name={`radiogroup:${question.id}`}
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
            name={`textarea:${question.id}`}
            placeholder={question.placeholder}
          />
        )
      default:
        return null
    }
  }
  return (
    <div className={styles.page}>
       {success && <SubmitModal fields={fields} />}
       {!success && ( 
        <FormProvider {...methods}>
        {/* TODO: remome any */}
        <form onSubmit={methods.handleSubmit(onSubmit as any)} className={styles.form__container}> 
            <h1 className={styles.form__title}>{fields.title}</h1>
                {fields.questions.map((field, index) => {
                        let type;

                        switch (field.type) {
                            case 'from-0_to-10':
                                type = 'from-0_to-10';
                                break;
                            case 'checkboxes':
                                type = 'checkboxes';
                                break;
                            case 'radiogroup':
                                type = 'radiogroup';
                                break;
                            case 'textarea':
                                type = 'textarea';
                                break;
                            default:
                                throw new Error(
                                    `Неизвестный тип вопроса: ${field.type}`
                                );
                        }

                        return (
                          <Fragment key={field.id}>
                            <div
                                className={styles.form__question}>
                                <label
                                    className={styles.form__label}
                                    htmlFor={field.title}>
                                    {`${index + 1}. ${field.title}`}
                                </label>

                                {renderField(field)}
                                
                            </div>
                            <div className={styles.form__errors_container}>
                              {errors[`${type}:${field.id}`] && (
                                  <p className={styles.form__error_text}>
                                      {
                                          errors[`${type}:${field.id}`]
                                              ?.message as string
                                      }
                                  </p>
                              )}
                            </div>

                            </Fragment>
                        );
                    })}
            <button className={Object.keys(errors).length === 0 ? styles.form__submit_button : styles.form__submit_button_default} type="submit">{fields.submitButton}</button>
          </form>
      </FormProvider>
       )}
      
    </div>
  )
}