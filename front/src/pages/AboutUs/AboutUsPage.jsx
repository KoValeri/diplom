import bookStore from "../../assets/bookStore.jpg"
import bookStore2 from "../../assets/bookStore2.jpg"
import bookStore3 from "../../assets/bookStore3.jpg"
import styles from "./AboutUs.module.css"

export default function AboutUsPage() {
    return(
        <div className={styles.content}>
            <span className={styles.topHeadline}>Добро пожаловать Liberty!</span>
            <div className={styles.upContent}>
                <div>
                    <iframe className={styles.map} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9730.829557444025!2d30.9951828!3d52.4300994!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d469aef5626f23%3A0xa036ae9dc705700c!2sOZ!5e0!3m2!1sru!2sby!4v1731778095483!5m2!1sru!2sby" width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div>
                    <span className={styles.headline}>О нас</span>
                    <br/>
                    <p className={styles.text}>Мы — команда увлечённых книгой людей, которые стремятся сделать мир литературы доступным для каждого. Наша цель — помочь вам найти именно ту книгу, которая станет вашим верным спутником, увлечёт вас и оставит незабываемые впечатления.</p>
                    <span className={styles.headline}>Наша история</span>
                    <br/>
                    <p className={styles.text}>Наш магазин был основан с любовью к литературе и стремлением поддержать читательскую культуру. Мы начали с небольшой коллекции книг и с тех пор выросли в полноценный магазин, где вы сможете найти как популярные бестселлеры, так и редкие издания.</p>
                    <span className={styles.headline}>Чай и книги - идеальное сочетание!</span>
                    <br/>
                    <p className={styles.text}>В нашем магазине можно не только выбрать любимую книгу, но и остаться на чашечку чая. Мы создали пространство, где чтение - это не спешка, а ритуал</p>
                    <p className={styles.text}>Сядьте у окна с книгой, закажите ароматный чай или кофе и просто возвольте себе выдохнуть. У нас звучит ненавязчивая музыка, мягкий свет и живой шелест страниц вокруг</p>
                </div>
            </div>
            <p className={styles.headlineText}>Наш магазин</p>
            <div className={styles.imgsContainer}>
                    <img className={styles.image} src={bookStore} alt="фото магазина" />
                    <img className={styles.image} src={bookStore2} alt="фото магазина" />
                    <img className={styles.image} src={bookStore3} alt="фото магазина" />
            </div>
        </div>
    )
}