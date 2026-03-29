import styles from './BookDetails.module.css'
import { useGetBookByIdQuery  } from "../../api/api"
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa"
import Button from "../Button/Button"
import ButtonBookMark from "../ButtonBookMark/ButtonBookMark"

export default function BookDetails() {
    const { id } = useParams();
    const { data: book, isLoading } = useGetBookByIdQuery(id);
    const hasDiscount = book?.discount > 0;
    const newPrice = hasDiscount
        ? Math.round(book?.price * (1 - book?.discount))
        : book?.price;

    return (
        <>
            {isLoading ? (
                <p>Книжечка загружается...</p>
            ) : (
                <>
                    <div className={styles.upConteiner}>
                        <img className={styles.bookImg} src={book.imageUrl} alt={book.title} />
                        
                        <div className={styles.bookMainInfo}>
                            <p className={styles.title}>{book.title}</p>
                            <p className={styles.author}>{book.author}</p>
                            <p className={styles.rating}><FaStar />{book.rating}</p>
                            <div className={styles.price}>
                                {hasDiscount ? (
                                    <>
                                    <span>{newPrice} р.</span>
                                    <span className={styles.oldPrice}>{book.price} р.</span>
                                    <span className={styles.discountFlag}>
                                        -{Math.round(book.discount * 100)}%
                                    </span>
                                    </>
                                ) : (
                                    <span className={styles.price}>{book.price} р.</span>
                                )}
                            </div>
                            <div className={styles.btns}>
                                <Button text='В корзину'/>
                                <ButtonBookMark />
                            </div>
                            <div className={styles.description}>{book.description}</div>
                        </div>
                    </div>

                    <div className={styles.bookInfo}>
                        <div className={styles.characteristics}>Характеристики</div>
                        <div>
                            <span className={styles.infoPoint}>Жанры:</span> {book.genres.map(g => g.name).join(', ')}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Издательство:</span> {book.publishingHouse}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Год идзания:</span> {book.yearOfPublication}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Количество страниц:</span> {book.pages}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Тип обложки:</span> {book.cover}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Возрастное ограничение:</span> {book.ageRestrictions}
                        </div>
                        {book.series && 
                            <div>
                                <span className={styles.infoPoint}>Серия книг:</span> {book.series}
                            </div>
                        }
                        <div>
                            <span className={styles.infoPoint}>Категория:</span> {book.categoryName}
                        </div>
                        <div>
                            <span className={styles.infoPoint}>Подкатегория:</span> {book.subcategoryName}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}