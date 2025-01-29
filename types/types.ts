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
                fieldSchema = z
                    .number()
                    .min(0, 'Значение должно быть от 1 до 10')
                    .max(10, 'Значение должно быть от 1 до 10');
                break;
            case 'checkboxes':
                fieldSchema = z.array(z.number()).min(1, 'Выберите хотя бы один вариант');
                break;
            case 'radiogroup':
                fieldSchema = z
                    .number()
                    .nullable()
                    .refine((val) => val !== null, {
                        message: 'Выберите один вариант'
                    });
                break;
            case 'textarea':
                fieldSchema = z.string().min(1, 'Это поле не может быть пустым');
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
