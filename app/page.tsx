import { Form } from "@/types/types";
import { DynamicForm } from "../components/dynamic-form/DynamicForm";
import styles from "./page.module.css";
import { fetchFields } from './api/getData';

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  params: Params
  searchParams: SearchParams
}) {
  
  return (
    <div className={styles.page}>

    </div>
  )
}