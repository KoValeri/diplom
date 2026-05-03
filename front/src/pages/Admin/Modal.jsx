import { useDispatch, useSelector } from "react-redux"
import styles from "./Modal.module.css"
import { IoMdClose } from "react-icons/io"
import { adminModalActions } from "../../store/adminModalSlice"
import CustomSelect from "./CustomSelect"
import { useBookForm } from "./useBookForm"
import { useGetBookByIdQuery } from "../../api/api"
import { useGetCategoriesQuery } from "../../api/categoriesApi"
import { useGetGenresQuery } from "../../api/genresApi"
import { useGetAgesQuery } from "../../api/agesApi"
import { useGetCoversQuery } from "../../api/coversApi"
import { useGetPublishingHousQuery } from '../../api/publishingHouseApi';
import { useCreateBookMutation, useUpdateBookMutation } from "../../api/api"
import { prepareForm } from "./prepareBookForm"

export default function Modal({ onClose }) {
    const dispatch = useDispatch()
    const { isOpen, selectedBookId, mode } = useSelector(state => state.adminModal)
    const { data: book } = useGetBookByIdQuery(selectedBookId, {
        skip: mode !== "edit" || !selectedBookId
    })
    const {
        form,
        handleChange,
        handleGenresChange,
        resetForm
    } = useBookForm(book, mode)

    const [createBook] = useCreateBookMutation()
    const [updateBook] = useUpdateBookMutation()

    const { data: categories = [] } = useGetCategoriesQuery()
    const { data: genres = [] } = useGetGenresQuery()
    const { data: ages = [] } = useGetAgesQuery()
    const { data: covers = [] } = useGetCoversQuery()
    const { data: publishingHouse = [] } = useGetPublishingHousQuery()

    if (!isOpen) return null

    const currentCategory = categories.find(
        c => String(c.id) === String(form.categoryId)
    )

    const subcategories = currentCategory?.subcategories ?? []

    const handleSubmit = async (e) => {
        e.preventDefault()
        const preparedForm = prepareForm(form)

        try {
            if (mode === "create") {
                await createBook(preparedForm).unwrap()
            } else {
                await updateBook({
                    id: Number(selectedBookId),
                    body: preparedForm
                }).unwrap()
            }

            dispatch(adminModalActions.closeModal())
            onClose()

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={styles.overlay}>

            <button
                className={styles.close}
                onClick={() => {
                    dispatch(adminModalActions.closeModal())
                    onClose()
                }}
            >
                <IoMdClose size={18} />
            </button>

            <div className={styles.modal}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.fields}>

                        <div className={styles.divFields}>
                            <label>Название</label>
                            <input name="title" value={form.title} onChange={handleChange} className={styles.input} />
                        </div>

                        <div className={styles.divFields}>
                            <label>Автор</label>
                            <input name="author" value={form.author} onChange={handleChange} className={styles.input} />
                        </div>

                        <div className={styles.divFields}>
                            <label>Серия</label>
                            <input name="series" value={form.series} onChange={handleChange} className={styles.input} />
                        </div>

                        <div className={styles.divFields}>
                            <label>Категория</label>

                            <CustomSelect
                                options={categories.map(c => ({
                                    value: c.id,
                                    label: c.name
                                }))}
                                value={form.categoryId}
                                onChange={(val) =>
                                    handleChange({
                                        target: {
                                            name: "categoryId",
                                            value: val
                                        }
                                    })
                                }
                                placeholder="Выберите категорию"
                            />
                        </div>

                        <div className={styles.divFields}>
                            <label>Подкатегория</label>

                            <CustomSelect
                                options={subcategories.map(s => ({
                                    value: s.id,
                                    label: s.name
                                }))}
                                value={form.subcategoryId}
                                onChange={(val) =>
                                    handleChange({
                                        target: {
                                            name: "subcategoryId",
                                            value: val
                                        }
                                    })
                                }
                                placeholder="Выберите подкатегорию"
                            />
                        </div>

                        <div className={styles.divFields}>
                            <label>Обложка</label>

                            <CustomSelect
                                options={covers.map(c => ({
                                    value: c,
                                    label: c
                                }))}
                                value={form.cover}
                                onChange={(val) =>
                                    handleChange({
                                        target: {
                                            name: "cover",
                                            value: val
                                        }
                                    })
                                }
                                placeholder="Выберите обложку"
                            />
                        </div>

                        <div className={styles.smallGroup}>

                            <div className={styles.divFields}>
                                <label>Цена</label>
                                <input name="price" value={form.price} onChange={handleChange} className={styles.input} />
                            </div>

                            <div className={styles.divFields}>
                                <label>Скидка</label>
                                <input name="discount" value={form.discount} onChange={handleChange} className={styles.input} 
                                />
                            </div>

                            <div className={styles.divFields}>
                                <label>Год</label>
                                <input name="yearOfPublication" value={form.yearOfPublication} onChange={handleChange} className={styles.input} />
                            </div>

                            <div className={styles.divFields}>
                                <label>Возраст</label>

                                <CustomSelect
                                    options={ages.map(a => ({
                                        value: a,
                                        label: a
                                    }))}
                                    value={form.ageRestrictions}
                                    onChange={(val) =>
                                        handleChange({
                                            target: {
                                                name: "ageRestrictions",
                                                value: val
                                            }
                                        })
                                    }
                                    placeholder=""
                                />
                            </div>

                            <div className={styles.divFields}>
                                <label>Издательство</label>

                                <CustomSelect
                                    options={publishingHouse.map(pubHouse => ({
                                        value: pubHouse?.trim(),
                                        label: pubHouse?.trim()
                                    }))}
                                    value={form.publishingHouse}
                                    onChange={(val) =>
                                        handleChange({
                                            target: {
                                                name: "publishingHouse",
                                                value: val
                                            }
                                        })
                                    }
                                    placeholder=""
                                />
                            </div>

                            <div className={styles.divFields}>
                                <label>Страницы</label>
                                <input name="pages" value={form.pages} onChange={handleChange} className={styles.input} />
                            </div>

                            <div className={styles.divFields}>
                                <label>Рейтинг</label>
                                <input name="rating" value={form.rating} onChange={handleChange} className={styles.input} />
                            </div>

                        </div>

                        <div className={`${styles.divFields} ${styles.full}`}>
                            <label>Жанры</label>

                            <select
                                multiple
                                value={form.genres}
                                onChange={handleGenresChange}
                                className={`${styles.input} ${styles.multiSelect}`}
                            >
                                {genres.map(g => (
                                    <option key={g.id} value={String(g.id)}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`${styles.divFields} ${styles.full}`}>
                            <label>Описание</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className={styles.textarea}
                            />
                        </div>

                        <div className={`${styles.divFields} ${styles.full}`}>
                            <label>URL обложки</label>
                            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={styles.input} />
                        </div>

                        <div className={styles.actions}>
                            <button type="button" className={styles.secondary} onClick={resetForm}>
                                Сбросить
                            </button>

                            <button type="submit" className={styles.primary}>
                                Сохранить
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}