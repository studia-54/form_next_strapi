import { z } from "zod"

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
    type: 'from-0_to-10' | 'checkboxes' | 'radiogroup' | 'textarea';
    required: boolean;
    options: Option[];
    }
    
    export interface Form {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    questions: Question[];
    }
    

export const createFormSchema = (form: Form) => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    form.questions.forEach((question) => {
        let fieldSchema: z.ZodTypeAny;

        switch (question.type) {
            case 'from-0_to-10':
                fieldSchema = z.coerce
                    .number({ errorMap: () => ( { message: 'Значение должно быть от 1 до 10' } ) } )
                    .min(1)
                    .max(10);
                break;
            case 'checkboxes':
                fieldSchema = z.array(z.coerce.number(), { errorMap: () => ( { message: 'Выберите хотя бы один вариант' } ) });
                break;
            case 'radiogroup':
                fieldSchema = z.array(
                    z.number({ coerce: true })
                    .nullable()
                    .refine((val) => val !== null, {
                        message: 'Выберите один вариант'
                    })).min(1);
                break;
            case 'textarea':
                fieldSchema = z.string({ errorMap: () => ( { message: 'Это поле не может быть пустым' } ) }).min(1);
                break;
        }

        if (question.required) {
            schemaFields[question.id.toString()] = fieldSchema;
        } else {
            schemaFields[question.id.toString()] = fieldSchema.optional();
        }
    });

    return z.object(schemaFields);
};

export type FieldType = "range" | "text" | "checkbox" | "radio" | "textarea"

export interface BaseField {
  type: FieldType
  title: string
}

export interface RangeField extends BaseField {
  type: "range"
}

export interface TextField extends BaseField {
  type: "text"
}

export interface CheckboxField extends BaseField {
  type: "checkbox"
  options: { id: string; label: string; image: string }[]
}

export interface RadioField extends BaseField {
  type: "radio"
  options: { id: string; label: string }[]
}

export interface TextareaField extends BaseField {
  type: "textarea"
}

export type FormField = RangeField | TextField | CheckboxField | RadioField | TextareaField

export const fieldSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("range"),
    title: z.string(),
  }),
  z.object({
    type: z.literal("text"),
    title: z.string(),
  }),
  z.object({
    type: z.literal("checkbox"),
    title: z.string(),
    options: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        image: z.string(),
      }),
    ),
  }),
  z.object({
    type: z.literal("radio"),
    title: z.string(),
    options: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
      }),
    ),
  }),
  z.object({
    type: z.literal("textarea"),
    title: z.string(),
  }),
])

export const formSchema = z.array(fieldSchema)

