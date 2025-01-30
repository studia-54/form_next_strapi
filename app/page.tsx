import { Form } from "@/types/types";
import { DynamicForm } from "../components/dynamic-form/DynamicForm";
// import { type FormField, formSchema } from "./types";
import styles from "./page.module.css";

import { fetchFields } from './api/getData';

export default async function Home() {
  const fields: Form = await fetchFields()

  // console.log(fields)

  // const handleSubmit = async (data: any) => {
  //   // Имитация отправки данных на сервер
  //   console.log("Отправленные данные:", data)
  //   alert("Форма успешно отправлена! Проверьте консоль для просмотра данных.")
  // }
  
  return (
    <div className={styles.page}>
      {/* {fields.length > 0 ? */}
       <DynamicForm fields={fields} 
      //  onSubmit={handleSubmit} 
       />
        {/* : <p>Загрузка полей формы...</p> */}
    </div>
  )
}