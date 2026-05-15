import { useState } from 'react';
import { useGetOrdersQuery } from '../../api/cartApi';
import { useSelector } from "react-redux";
import Headline from "../../components/Headline/Headline";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import styles from './OrdersPage.module.css';
import { IoChevronDownOutline } from "react-icons/io5";

const OrderCard = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.orderCard} ${isOpen ? styles.cardOpen : ''}`}>
            <div
                className={styles.orderHeader}
                onClick={() => setIsOpen(prev => !prev)}
                style={{ cursor: 'pointer' }}
            >
                <div>
                    <span className={styles.orderNumber}>Заказ #{order.id}</span>
                    <span className={styles.orderDate}>
                        от {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <div className={styles.headerRight}>
                    <span className={styles.statusBadge}>{order.status}</span>
                    <IoChevronDownOutline
                        className={`${styles.arrow} ${isOpen ? styles.arrowRotate : ''}`}
                    />
                </div>
            </div>

            <div className={`${styles.details} ${isOpen ? styles.detailsVisible : ''}`}>
                <div className={styles.inner}>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoBlock}>
                            <p className={styles.infoLabel}>Получатель</p>
                            <p>{order.fullName}</p>
                            <p>{order.phone}</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <p className={styles.infoLabel}>Доставка и оплата</p>
                            <p>{order.deliveryMethod === 'courier' ? 'Курьер' : 'Самовывоз'}</p>
                            <p>{order.paymentMethod === 'card' ? 'Картой онлайн' : 'При получении'}</p>
                            <p>{order.address}</p>
                        </div>
                    </div>

                    <div className={styles.itemsList}>
                        <p className={styles.infoLabel}>Товары</p>
                        {order.items?.map((item, idx) => (
                            <div key={idx} className={styles.bookItem}>
                                <img src={item.imageUrl} alt="" className={styles.bookMini} />
                                <div className={styles.bookInfo}>
                                    <p className={styles.bookTitle}>{item.title}</p>
                                    <p className={styles.bookCount}>
                                        {item.quantity} шт. {item.price} р.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.orderFooter}>
                        <span className={styles.totalLabel}>Сумма заказа:</span>
                        <span className={styles.orderPrice}>{order.totalPrice} р.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function OrdersPage() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { data: orders = [], isLoading, isError } = useGetOrdersQuery(undefined, { skip: !isAuthenticated });

    if (isLoading) return <div className="pageContent"><p>Загрузка истории...</p></div>;
    if (isError) return <div className="pageContent"><p>Ошибка при загрузке заказов</p></div>;

    return (
        <div className="pageContent">
            <div className={styles.headerRow}>
                <ButtonBack />
                <Headline text="История заказов" />
            </div>
            <div className={styles.container}>
                {orders.length > 0 ? (
                    <div className={styles.ordersList}>
                        {orders.map(order => <OrderCard key={order.id} order={order} />)}
                    </div>
                ) : (
                    <div className={styles.emptyState}><p>У вас пока нет оформленных заказов.</p></div>
                )}
            </div>
        </div>
    );
}