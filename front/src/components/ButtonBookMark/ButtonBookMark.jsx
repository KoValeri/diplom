import styles from './ButtonBookMark.module.css'
import { IoBookmarkOutline } from "react-icons/io5"

export default function ButtonBookMark () {
    return(
        <button className={styles.btn}><IoBookmarkOutline size={30}/></button>
    )
}