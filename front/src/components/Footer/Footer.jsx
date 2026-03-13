import { footerContent } from "../../configs/footerConfig"
import { Link } from "react-router-dom"
import styles from './Footer.module.css'
import { PiTelegramLogoLight } from "react-icons/pi"
import { FaViber } from "react-icons/fa"

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <div className={styles.upperInfo}>
                <div id="contacts">
                    <p className={styles.title}>Контакты</p>
                    <p>Здесь должен быть адрес нашего физического магазина</p>
                    <p className={styles.phone}>+ 375 77 777 77 77</p>
                    <a href='#' className={styles.email}>Liberty@mail.ru</a>
                    <div className={styles.apps}>
                        <a href='#' className={styles.telegramm}><PiTelegramLogoLight size={30}/></a>
                        <a href='#' className={styles.viber}><FaViber size={30}/></a>
                    </div>
                </div>

                {footerContent.map(item => (
                    <div key={item.title}>
                        <p className={styles.title}>{item.title}</p>
                        {item.subTitle.map(sub => (
                            <div key={sub.text}>
                                <Link
                                    to={sub.href}
                                >
                                    {sub.text}
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className={styles.downInfo}>
                <span>2022-2026. ООО "Валерьяночка". Все права защищены</span>
            </div>
        </footer>
    )
}