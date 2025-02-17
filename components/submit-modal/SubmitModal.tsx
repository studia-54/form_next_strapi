import styles from "./page.module.css";
import { Form } from "@/types/types";
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import clsx from 'clsx';
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
            <Markdown className={clsx(styles.modal__text, 'markdown_accent_i')} rehypePlugins={[rehypeRaw]}>
                {fields.markdownSubmitMessage}
            </Markdown>
            <Markdown className={clsx(styles.modal__text_mobile, 'markdown_accent_i')} rehypePlugins={[rehypeRaw]}>
                {fields.markdownSubmitMessage}
            </Markdown>
            {/* <h1 className={styles.modal__text}>{fields.markdownSubmitMessage}</h1>
            <h1 className={styles.modal__text_mobile}>{fields.markdownSubmitMessage}</h1> */}
            {/* <span className={styles.modal__text_minor}>Ваш отзыв отправлен</span> */}
            {/* <button className={styles.modal__close_button} onClick={() => router.push('/')}>
                <CloseIcon className={styles.modal__close_icon} />
            </button> */}
        </div>
    </>
  )
}

export default SubmitModal