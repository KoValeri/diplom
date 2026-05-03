import styles from "./DeleteModal.module.css"
import { useDispatch, useSelector } from "react-redux"
import { adminDeleteModalActions } from "../../store/adminDeleteModalSlice"
import { useGetBookByIdQuery, useDeleteBookMutation } from "../../api/api"

export default function DeleteModal({ onClose }) {
    const dispatch = useDispatch()
    const { isOpen, selectedBookId } = useSelector(state => state.adminDeleteModal)
    const { data: book } = useGetBookByIdQuery(selectedBookId, {
        skip: !selectedBookId
    })
    const [deleteBook] = useDeleteBookMutation()

    if (!isOpen) return null

    return (
        <div className={styles.overlay}>
            <div className={styles.deleteModal}>
                <div>
                    Вы хотите удалить книгу «{book?.title}»
                </div>
                <div className={styles.actions}>
                    <button type="button" className={styles.primary} onClick={() => {
                        dispatch(adminDeleteModalActions.closeDeleteModal())
                        onClose()
                    }}>
                        Отмена
                    </button>

                    <button
                    type="button"
                    className={styles.secondary}
                    onClick={async () => {
                        try {
                        await deleteBook(selectedBookId).unwrap()

                        dispatch(adminDeleteModalActions.closeDeleteModal())
                        dispatch(adminDeleteModalActions.closeDeleteModal())
                        onClose()

                        } catch (err) {
                        console.error(err)
                        }
                    }}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}