import { useGetBooksQuery } from '../../api/api'
import { useState, useEffect } from 'react';
import { CiMenuKebab } from "react-icons/ci"
import styles from "./Table.module.css"
import { useDispatch } from 'react-redux';
import { adminModalActions } from '../../store/adminModalSlice';
import Modal from './Modal';

export default function Table() {
    const [value, setValue] = useState('')
    const { data = [], isLoading, isError } = useGetBooksQuery()
    const [books, setBooks] = useState(data)
    const dispatch = useDispatch()

    useEffect(() => {
        setBooks(data)
    }, [data])

    useEffect(() => {
        const timer = setTimeout(() =>{
            const filteredBooks = data.filter(book => book.title.toLowerCase().includes(value.toLowerCase()))
            setBooks(filteredBooks)
        }, 1000)
        
        return () => clearTimeout(timer)
    }, [value, data])

    function hadnldeBook(id) {
        dispatch(adminModalActions.openModal(id))
    }

    return(
        isError ? <p>Ошибка, книжечки не получены...</p> :
        isLoading ? <p>Книжечки загружаются...</p> :
        <>
            <input 
                className={styles.search}
                type="text" 
                name="search" 
                placeholder='Книга' 
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
            />

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td className={styles.headLine}>Название</td>
                            <td className={styles.headLine}>Автор</td>
                            <td className={styles.headLine}> </td>
                        </tr>
                    </thead>
                    <tbody>
                        {books?.map((book, index) => (
                        <tr key={index}>
                            <td className={styles.content}>{book.title}</td>
                            <td className={styles.content}>{book.author}</td>
                            <td className={styles.content}>
                                <button className={styles.menu}>
                                    <CiMenuKebab size={20} onClick={() => hadnldeBook(book.id)}/>
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal />
        </>
    )
}