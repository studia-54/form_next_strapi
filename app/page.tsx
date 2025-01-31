import { Form } from "@/types/types";
import { DynamicForm } from "../components/dynamic-form/DynamicForm";
// import { type FormField, formSchema } from "./types";
import styles from "./page.module.css";
import { fetchFields } from './api/getData';

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  params: Params
  searchParams: SearchParams
}) {

  const fields: Form = await fetchFields()
  
  return (
    <div className={styles.page}>
      {/* {fields.length > 0 ? */}
       {/* <DynamicForm fields={fields}/> */}
        {/* : <p>Загрузка полей формы...</p> */}
    </div>
  )
}