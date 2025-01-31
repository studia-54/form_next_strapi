import styles from "./page.module.css";
import CloseIcon from '@mui/icons-material/Close';

export const SubmitModal: React.FC  = () => {

  return (
    <>
        <div className={styles.modal_root}>
            <h1 className={styles.modal__text}>Спасибо за ваш отзыв</h1>
            <span className={styles.modal__text_minor}>Ваш отзыв отправлен</span>
            <button className={styles.modal__close_button} onClick={() => {}}>
                <CloseIcon className={styles.modal__close_icon} onClick={() => {}} />
            </button>
        </div>
    </>
  )
}

export default SubmitModal