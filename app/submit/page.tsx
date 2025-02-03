// import { Form } from "@/types/types"
// import SubmitModal from "@/components/submit-modal/SubmitModal";
// import styles from "./page.module.css";
// import { fetchFields } from '../api/getData';

// type Params = Promise<{ slug: string }>

// export default async function ({ params }: { params: Params }) {
//     const { slug } = await params
//     console.log(slug)

//     const fields: Form = await fetchFields(slug).catch((error) => { alert(`Ошибка получения полей формы: ${error}`) })

//     console.log(fields)

//   return (
//     <div className={styles.page}>
//       <SubmitModal fields={fields} />
//     </div>
//   );
// };