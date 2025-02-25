import { z } from 'zod'

export type Locale = 'ru' | 'en' ;

export interface Option {
    id: number;
    title: string;
    description: string | null;
    image: {
        id: number;
        url: string;
        alternativeText: string;
    }
    }
    export interface Question {
    id: number;
    title: string;
    type: 'from-0_to-10' | 'checkboxes' | 'radiogroup' | 'textarea' | 'phone' |'text'
    required: boolean;
    options: Option[];
    placeholder?: string;
    }
    
    export interface Form {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    locale: Locale; 
    questions: Question[];
    submitButton: string;
    markdownSubmitMessage: string;
    }
    
    export type FieldType = "range" | "text" | "checkbox" | "radio" | "textarea" | 'phone' | 'text'

export interface Form {
  id: number
  documentId: string
  title: string
  slug: string
  questions: Question[]
  submitButton: string
  markdownSubmitMessage: string
  actions: Action[]
}

export type Action = BitrixSaveInDealAction | BitrixAddCommentToDealAction | SentToGoogleSheets | SomeOtherAction

export interface BitrixAddCommentToDealAction {
  __component: 'bitrix-actions.add-comment-to-deal'
  id: number
  deal_id_property_name: string
  comment: string
}
export interface BitrixSaveInDealAction {
  __component: 'bitrix-actions.save-in-deal'
  id: number
  deal_id_property_name: string
  fields: { id: number; form_option_key: string; bitrix_field_key: string }[]
}

export interface SentToGoogleSheets {
  __component: 'bitrix-actions.sent-to-google-sheets'
  id: number
  google_sheet_url: string
}

export interface SomeOtherAction {
  __component: 'some-other-action'
  id: number
  someField: string
}

export interface BaseField {
  type: FieldType
  title: string
}

export interface RangeField extends BaseField {
  type: 'range'
}

export interface TextField extends BaseField {
  type: 'text'
}

export interface CheckboxField extends BaseField {
  type: 'checkbox'
  options: { id: string; label: string; image: string }[]
}

export interface RadioField extends BaseField {
  type: 'radio'
  options: { id: string; label: string }[]
}

export interface TextareaField extends BaseField {
  type: 'textarea'
}

export type FormField = RangeField | TextField | CheckboxField | RadioField | TextareaField

export const createFormSchema = (form: Form) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {}

  form.questions.forEach((question) => {
    let fieldSchema: z.ZodTypeAny

    switch (question.type) {
      case 'from-0_to-10':
        fieldSchema = z.coerce.number().min(1, { message: 'Значение должно быть от 1 до 10' })
        break
      case 'checkboxes':
        //   fieldSchema = z.coerce.string().min(1, { message: 'Выберите хотя бы одно поле' }).refine(string => string !== "false", { message: 'Выберите хотя бы одно поле' });
        fieldSchema = z.array(z.string().min(1, { message: 'Выберите хотя бы одно поле' }))
        break
      case 'radiogroup':
        fieldSchema = z.coerce
          .string()
          .min(1, { message: 'Выберите одно значение' })
          .refine((string) => string !== 'null', { message: 'Выберите одно значение' })
        break
      case 'textarea':
        fieldSchema = z
          .string({
            errorMap: () => ({
              message: 'Это поле не может быть пустым',
            }),
          })
          .min(1, { message: 'Это поле не может быть пустым' })
        break
      default:
        throw new Error(`Неизвестный тип вопроса: ${question.type}`)
    }

    // Если поле обязательное, то делаем его обязательным в схеме
    if (question.required) {
      switch (question.type) {
        case 'from-0_to-10':
          schemaFields[`from-0_to-10:${question.id}`] = fieldSchema
          break
        case 'checkboxes':
          schemaFields[`checkboxes:${question.id}`] = fieldSchema
          break
        case 'radiogroup':
          schemaFields[`radiogroup:${question.id}`] = fieldSchema
          break
        case 'textarea':
          schemaFields[`textarea:${question.id}`] = fieldSchema
          break
        default:
          throw new Error(`Неизвестный тип вопроса: ${question.type}`)
      }
      // schemaFields[question.id.toString()] = fieldSchema;
    } else {
      switch (question.type) {
        case 'from-0_to-10':
          schemaFields[`from-0_to-10:${question.id}`] = z.coerce.string().optional()
          break
        case 'checkboxes':
          schemaFields[`checkboxes:${question.id}`] = z.coerce.string().optional()
          break
        case 'radiogroup':
          schemaFields[`radiogroup:${question.id}`] = z.coerce.string().optional()
          break
        case 'textarea':
          schemaFields[`textarea:${question.id}`] = z.coerce.string().optional()
          break
        default:
          throw new Error(`Неизвестный тип вопроса: ${question.type}`)
      }
    }
  })

  return z.object(schemaFields)
}
