import styles from "./page.module.css";
import { Form } from "@/types/types";
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import clsx from 'clsx';
interface SubmitModalProps {
  fields: Form,
}

export const SubmitModal: React.FC<SubmitModalProps>  = ({ fields }) => {
  return (
    <>
        <div className={styles.modal__root}>
            <Markdown className={clsx(styles.modal__text, 'markdown_accent_i', 'form__submit_button')} rehypePlugins={[rehypeRaw]}>
                {fields.markdownSubmitMessage}
            </Markdown>
        </div>
    </>
  )
}

export default SubmitModal