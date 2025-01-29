import React from 'react';
import styles from "./page.module.css";

const FormPage = () => {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.form}>
          <h1 className={styles.form__title}>Ваш отзыв</h1>
          <ol>
               {/* (item.type === "from1_to_10") */}
            <li className={styles.form__question}>
              <label className={styles.form__label}>Какую оценку вы бы поставили общей организации мероприятия?</label>

           

            </li>

             {/* (item.type === "many" || item.type === "one") */}
            <li className={styles.form__question}>
              <label className={styles.form__label}>Какие модели мебели вызвали у вас наибольший интерес?</label>
             

            </li>
            <li className={styles.form__question}>
              <label className={styles.form__label}>Что вы хотели бы изменить или улучшить в продукции бренда FiftyFourms?</label>
             
              
            </li>
          </ol>
        </div>
      </div>
    </>
  )
}

export default FormPage
