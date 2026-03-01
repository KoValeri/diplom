import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from './Header.module.css'

function Header() {
    return(
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <a className={styles.headerTitle}>Liberty</a>

                <input className={styles.headerSearch}
                name="search"
                type="text"
                placeholder="Найти книгу"
                />

                <nav>
                    <ul className={styles.headerLinks}>
                        <li className={styles.headerUser}>
                            <ul>
                                <li>
                                    <a >Иконка1</a>
                                </li>
                                <li>
                                    <a >Иконка2</a>
                                </li>
                                <li>
                                    <a >Иконка3</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header