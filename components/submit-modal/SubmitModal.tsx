import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Form } from "@/types/types";
// import CloseIcon from '@mui/icons-material/Close';
interface SubmitModalProps {
  fields: Form,
  // onSubmit: (data: Form) => void
}

export const SubmitModal: React.FC<SubmitModalProps>  = ({ fields }) => {
    // console.log(fields)
    // const router = useRouter();
  return (
    <>
        <div className={styles.modal__root}>
            <h1 className={styles.modal__text}>{fields.successfullyMessage}</h1>
            <h1 className={styles.modal__text_mobile}>Спасибо</h1>
            <span className={styles.modal__text_minor}>Ваш отзыв отправлен</span>
            {/* <button className={styles.modal__close_button} onClick={() => router.push('/')}>
                <CloseIcon className={styles.modal__close_icon} />
            </button> */}
        </div>
    </>
  )
}

export default SubmitModal