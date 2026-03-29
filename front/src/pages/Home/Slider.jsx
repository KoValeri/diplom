import styles from './Slider.module.css'
import { useState } from "react"
import { sliderContent } from '../../configs/sliderConfig'
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"
import { BsArrowRight } from "react-icons/bs"
import { useNavigate } from 'react-router-dom';

export default function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

    function prevSlide() {
        setCurrentIndex(prev => prev === 0 ? sliderContent.length - 1 : prev - 1)
    }

    function nextSlide() {
        setCurrentIndex(prev => prev === sliderContent.length - 1 ? 0 : prev + 1)
    }

    const slide = sliderContent[currentIndex]

    return(
        <div className={styles.block} key={currentIndex}>
            <button className={styles.btn} onClick={prevSlide}><IoIosArrowBack size={30}/></button>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.title}>{slide.title}</div>
                    <div className={styles.subTitle}>{slide.subTitle}</div>
                    <button className={styles.btnLink} onClick={() => navigate(slide.btnLink)}>{slide.btn} <BsArrowRight size={20}/></button>
                </div>
                <div>
                    <img className={`${styles[slide.imgClass]}`} src={slide.img} alt="описание"/>
                </div>
            </div>

            <button className={styles.btn} onClick={nextSlide}><IoIosArrowForward size={30}/></button>
        </div>
    )
}