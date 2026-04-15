import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
    setAge,
    setGenre,
    setPrice,
    setCover,
    setPublHouse,
    resetFilters,
    setSort
} from '../../store/bookFilterSlice';

import { useGetGenresQuery } from '../../api/genresApi';
import { useGetAgesQuery } from '../../api/agesApi';
import { useGetCoversQuery } from '../../api/coversApi';
import { useGetPublishingHousQuery } from '../../api/publishingHouseApi';

import CustomSelect from '../CustomSelect/CustomSelect';
import styles from './BookFilter.module.css';

const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

export default function BookFilter() {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.bookFilters);
    const location = useLocation();

    const { data: genres = [] } = useGetGenresQuery();
    const { data: ages = [] } = useGetAgesQuery();
    const { data: covers = [] } = useGetCoversQuery();
    const { data: publishingHouses = [] } = useGetPublishingHousQuery();

    const [minPrice, setMinPrice] = useState(filters.price[0].toString());
    const [maxPrice, setMaxPrice] = useState(filters.price[1].toString());

    useEffect(() => {
        dispatch(resetFilters());
    }, [location]);

    useEffect(() => {
        setMinPrice(filters.price[0].toString());
        setMaxPrice(filters.price[1].toString());
    }, [filters.price]);

    const handleGenreChange = (value) => {
        const current = filters.genre;

        dispatch(setGenre(
            current.includes(value)
                ? current.filter(g => g !== value)
                : [...current, value]
        ));
    };

    const handlePublChange = (value) => {
        const current = filters.publishingHouse;

        dispatch(setPublHouse(
            current.includes(value)
                ? current.filter(p => p !== value)
                : [...current, value]
        ));
    };

    const handleCoverChange = (value) => {
        const current = filters.cover;

        dispatch(setCover(
            current.includes(value)
                ? current.filter(c => c !== value)
                : [...current, value]
        ));
    };

    const handleAgeChange = (value) => {
        const current = filters.age;

        dispatch(setAge(
            current.includes(value)
                ? current.filter(a => a !== value)
                : [...current, value]
        ));
    };

    const applyMinPrice = () => {
        let value = Number(minPrice);

        if (isNaN(value)) value = 5;

        value = clamp(value, 5, filters.price[1]);

        dispatch(setPrice([value, filters.price[1]]));
    };

    const applyMaxPrice = () => {
        let value = Number(maxPrice);

        if (isNaN(value)) value = 200;

        value = clamp(value, filters.price[0], 200);

        dispatch(setPrice([filters.price[0], value]));
    };

    return (
        <div className={styles.bookFilter}>

            <CustomSelect
                options={[
                    { value: "new", label: "По новизне" },
                    { value: "priceAsc", label: "Сначала дешёвые" },
                    { value: "priceDesc", label: "Сначала дорогие" },
                    { value: "rating", label: "По популярности" }
                ]}
                value={filters.sort}
                onChange={(val) => dispatch(setSort(val))}
            />

            <div className={styles.filterBox}>
                <label className={styles.headLineLabel}>Возраст:</label>
                <div className={styles.checkboxGroup}>
                    {ages.map(age => (
                        <label key={age}>
                            <input
                                type="checkbox"
                                checked={filters.age.includes(age)}
                                onChange={() => handleAgeChange(age)}
                            />
                            {age}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.filterBox}>
                <label className={styles.headLineLabel}>Жанр:</label>
                <div className={styles.checkboxGroup}>
                    {genres.map(g => (
                        <label key={g.id}>
                            <input
                                type="checkbox"
                                checked={filters.genre.includes(g.id)}
                                onChange={() => handleGenreChange(g.id)}
                            />
                            {g.name}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.filterBox}>
                <label className={styles.headLineLabel}>Переплёт:</label>
                <div className={styles.checkboxGroup}>
                    {covers.map(cover => (
                        <label key={cover}>
                            <input
                                type="checkbox"
                                checked={filters.cover.includes(cover)}
                                onChange={() => handleCoverChange(cover)}
                            />
                            {cover}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.filterBox}>
                <label className={styles.headLineLabel}>Издательство:</label>
                <div className={styles.checkboxGroup}>
                    {publishingHouses.map(p => (
                        <label key={p}>
                            <input
                                type="checkbox"
                                checked={filters.publishingHouse.includes(p)}
                                onChange={() => handlePublChange(p)}
                            />
                            {p}
                        </label>
                    ))}
                </div>
            </div>

            <div className={`${styles.filterSection} ${styles.filterBox}`}>
                <label className={styles.headLineLabel}>Цена:</label>

                <div className={styles.priceInputs}>
                    <input
                        type="text"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        onBlur={applyMinPrice}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                applyMinPrice();
                                e.target.blur();
                            }
                        }}
                    />

                    <span>—</span>

                    <input
                        type="text"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        onBlur={applyMaxPrice}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                applyMaxPrice();
                                e.target.blur();
                            }
                        }}

                    />
                </div>

                <div className={styles.rangeWrapper}>
                    <div className={styles.rangeTrack}></div>

                    <div
                        className={styles.rangeFill}
                        style={{
                            left: `${(filters.price[0] / 200) * 100}%`,
                            width: `${((filters.price[1] - filters.price[0]) / 200) * 100}%`
                        }}
                    />

                    <input
                        type="range"
                        min="5"
                        max="200"
                        value={filters.price[0]}
                        onChange={(e) =>
                            dispatch(setPrice([
                                Number(e.target.value),
                                filters.price[1]
                            ]))
                        }
                    />

                    <input
                        type="range"
                        min="5"
                        max="200"
                        value={filters.price[1]}
                        onChange={(e) =>
                            dispatch(setPrice([
                                filters.price[0],
                                Number(e.target.value)
                            ]))
                        }
                    />
                </div>
            </div>

            <button onClick={() => dispatch(resetFilters())}>
                Сбросить фильтры
            </button>
        </div>
    );
}