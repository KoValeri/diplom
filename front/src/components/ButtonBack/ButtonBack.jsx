import { useNavigate } from 'react-router-dom';
import styles from './ButtonBack.module.css';

export default function ButtonBack() {
  const navigate = useNavigate();

  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      ← Back
    </button>
  );
}
