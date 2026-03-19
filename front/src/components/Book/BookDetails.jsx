import styles from './BookDetails.module.css'
import { useGetBookByIdQuery  } from "../../api/api"
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa"
import Button from "../Button/Button"
import ButtonBookMark from "../ButtonBookMark/ButtonBookMark"

export default function BookDetails() {
    const { id } = useParams();
    const { data: book, isLoading } = useGetBookByIdQuery(id);

    return (
        <>
            {isLoading ? (
                <p>Книжечка загружается...</p>
            ) : (
            <div className={styles}>
                <div className={styles}>
                    <img className={styles} src={book.imageUrl} alt={book.title} />
                    <div>
                        <p className={styles}>{book.title}</p>
                        <p className={styles}>{book.author}</p>
                        <p className={styles}><FaStar />{book.rating}</p>
                        <p>{book.price}</p>
                        <div className={styles.btns}>
                            <Button text='В корзину'/>
                            <ButtonBookMark />
                        </div>
                    </div>
                </div>

                <div>
                    <div>{book.description}</div>
                    <div>
                        {book.genres?.length 
                            ? book.genres.map(g => g.name).join(', ') 
                            : 'Жанры не указаны'
                        }
                    </div>
                    <div>{book.publishingHouse}</div>
                    <div>{book.yearOfPublication}</div>
                    <div>{book.pages}</div>
                    <div>{book.cover}</div>
                    <div>{book.ageRestrictions}</div>
                    <div>{book.series}</div>
                </div>

            </div>
            )}
        </>
    );
}