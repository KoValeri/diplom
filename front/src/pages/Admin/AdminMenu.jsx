import styles from "./AdminMenu.module.css"
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { adminModalActions } from '../../store/adminModalSlice';
export default function AdminMenu({ bookId, onClose }) {
    const dispatch = useDispatch()

    return (
        <>
            <div className={styles.actionMenu}>
                <div
                    className={styles.edit}
                    onClick={() => {dispatch(adminModalActions.openEditModal(bookId))}}
                >
                    <CiEdit size={20} /> Редактировать
                </div>

                <div className={styles.delete}>
                    <RiDeleteBin6Line size={20} /> Удалить
                </div>
            </div>
        </>
    )
}