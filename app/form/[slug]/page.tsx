import { DynamicForm } from "@/components/dynamic-form/DynamicForm";
import { Form } from "@/types/types";
import { fetchFields } from '@/app/api/getData';

export default async function () {
      const fields: Form = await fetchFields()

    return (
        <>
            <DynamicForm fields={fields}/>
        </>
      )
}