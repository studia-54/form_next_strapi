import { DynamicForm } from "@/components/dynamic-form/DynamicForm";
import { Form } from "@/types/types";
import { fetchFields } from '@/app/api/getData';
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>

export default async function ({ params }: { params: Params }) {
  const { slug } = await params

  const fields: Form = await fetchFields()
  console.log(fields.slug)

      if (fields.slug !== slug) return notFound()
      

    return (
        <>
            <DynamicForm fields={fields}/>
        </>
      )
}

