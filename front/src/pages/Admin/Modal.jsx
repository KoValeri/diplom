import { useGetBookByIdQuery } from "../../api/api"
import styles from "./Modal.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { adminModalActions } from '../../store/adminModalSlice';
import { IoMdClose } from "react-icons/io";
import { useBookForm } from "./useBookForm"

export default function Modal() {
    const dispatch = useDispatch()
    const { isOpen, selectedBookId } = useSelector(state => state.adminModal)
    const { data: book } = useGetBookByIdQuery(selectedBookId, {
        skip: !selectedBookId
    })
    const { form, handleChange, resetForm } = useBookForm(book)

    if (!isOpen) return null

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <button
                    className={styles.close}
                    onClick={() => dispatch(adminModalActions.closeModal())}
                >
                    <IoMdClose size={17}/>
                </button>

                <form className={styles.form}>
                    <div className={styles.fields}>

                        <div className={styles.divFields}>
                            <label>Название</label>
                            <input name="title" value={form.title} onChange={handleChange} className={styles.input}/>
                        </div>

                        <div className={styles.divFields}>
                            <label>Автор</label>
                            <input name="author" value={form.author} onChange={handleChange} className={styles.input}/>
                        </div>

                        <div className={styles.divFields}>
                            <label>Серия книг</label>
                            <input name="series" value={form.series} onChange={handleChange} className={styles.input}/>
                        </div>

                        <div className={styles.divFields}>
                            <label>Тип обложки</label>
                            <input name="cover" value={form.cover} onChange={handleChange} className={styles.input}/>
                        </div>

                        <div className={styles.divFields}>
                            <label>Категория</label>
                            <input name="categoryName" value={form.categoryName} onChange={handleChange} className={styles.input}/>
                        </div>

                        <div className={styles.divFields}>
                            <label>Подкатегория</label>
                            <input name="subcategoryName" value={form.subcategoryName} onChange={handleChange} className={styles.input}/>
                        </div>

                        <div className={`${styles.smallGroup}`}>
                            
                            <div className={styles.divFields}>
                                <label>Цена (р)</label>
                                <input name="price" value={form.price} onChange={handleChange} className={styles.input}/>
                            </div>

                            <div className={styles.divFields}>
                                <label>Год издания</label>
                                <input name="yearOfPublication" value={form.yearOfPublication} onChange={handleChange} className={styles.input}/>
                            </div>

                            <div className={styles.divFields}>
                                <label>Возраст</label>
                                <input name="ageRestrictions" value={form.ageRestrictions} onChange={handleChange} className={styles.input}/>
                            </div>

                            <div className={styles.divFields}>
                                <label>Страницы</label>
                                <input name="pages" value={form.pages} onChange={handleChange} className={styles.input}/>
                            </div>

                            <div className={styles.divFields}>
                                <label>Рейтинг</label>
                                <input name="rating" value={form.rating} onChange={handleChange} className={styles.input}/>
                            </div>

                        </div>

                        <div className={`${styles.divFields} ${styles.full}`}>
                            <label>Жанры</label>
                            <input name="genres" value={form.genres} onChange={handleChange} className={styles.input}/>
                        </div>

                        <div className={`${styles.divFields} ${styles.full}`}>
                            <label>Описание</label>
                            <textarea 
                                name="description" value={form.description}
                                className={`${styles.input} ${styles.textarea}`} 
                                onChange={handleChange}
                            />
                        </div>

                        <div className={`${styles.divFields} ${styles.full}`}>
                            <label>Обложка (URL)</label>
                            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={styles.input}/>
                        </div>

                        <div className={`${styles.actions}`}>
                            <button type="submit" className={styles.primary}>
                                Сохранить
                            </button>
                            <button type="button" className={styles.secondary} onClick={resetForm}>
                                Сбросить
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}