import { z } from "zod"

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

