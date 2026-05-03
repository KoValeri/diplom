import styles from "./AdminMenu.module.css"
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { adminModalActions } from '../../store/adminModalSlice';
import { adminDeleteModalActions } from "../../store/adminDeleteModalSlice";
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

                <div
                    className={styles.delete}
                    onClick={() => {dispatch(adminDeleteModalActions.openDeleteModal(bookId))}}
                >
                    <RiDeleteBin6Line size={20} /> Удалить
                </div>
            </div>
        </>
    )
}