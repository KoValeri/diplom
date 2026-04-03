import styles from './Headline.module.css'

export default function Headline({ text }) {
    return(
        <span className={styles.headline}>{text}</span>
    )
}