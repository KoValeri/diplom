import { useNavigate } from 'react-router-dom';
import styles from './ButtonBack.module.css';
import { IoIosArrowBack } from "react-icons/io"

export default function ButtonBack() {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <IoIosArrowBack size={25}/>
      </button>
      <span>Назад</span>
    </div>
  );
}
