import { useSelector, useDispatch } from 'react-redux';
import { setAge, setGenre, setPrice, setCover, setPublHouse, resetFilters } from '../../store/bookFilterSlice';
import { useGetGenresQuery } from '../../api/genresApi';
import { useGetAgesQuery } from '../../api/agesApi';
import { useGetCoversQuery } from '../../api/coversApi';
import { useGetPublishingHousQuery } from '../../api/publishingHouseApi';
import styles from './BookFilter.module.css';

export default function BookFilter() {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.bookFilters);
    
    const { data: genres = [] } = useGetGenresQuery();
    const { data: ages = [] } = useGetAgesQuery();
    const { data: covers = [] } = useGetCoversQuery();
    const { data: publishingHouses = [] } = useGetPublishingHousQuery();

    const handleGenreChange = (value) => {
        const current = filters.genre;

        if (current.includes(value)) {
            dispatch(setGenre(current.filter(g => g !== value)));
        } else {
            dispatch(setGenre([...current, value]));
        }
    };

    const handlePublChange = (value) => {
        const current = filters.publishingHouse;

        if (current.includes(value)) {
            dispatch(setPublHouse(current.filter(p => p !== value)));
        } else {
            dispatch(setPublHouse([...current, value]));
        }
    };

    const handleCoverChange = (value) => {
        const current = filters.cover;

        if (current.includes(value)) {
            dispatch(setCover(current.filter(c => c !== value)));
        } else {
            dispatch(setCover([...current, value]));
        }
    }

    const handleAgeChange = (value) => {
        const current = filters.age;

        if (current.includes(value)) {
            dispatch(setAge(current.filter(a => a !== value)));
        } else {
            dispatch(setAge([...current, value]));
        }
    }

    return (
        <div className={styles.bookFilter}>
            <div>
                <label>Возраст:</label>
                <div className={styles.checkboxGroup}>
                    {ages.map(age => (
                        <label key={age}>
                            <input
                                type="checkbox"
                                checked={filters.age?.includes(age)}
                                onChange={() => handleAgeChange(age)}
                            />
                            {age}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label>Жанр:</label>
                <div className={styles.checkboxGroup}>
                    {genres.map(g => (
                        <label key={g.id}>
                            <input
                                type="checkbox"
                                checked={filters.genre?.includes(g.id)}
                                onChange={() => handleGenreChange(g.id)}
                            />
                            {g.name}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label>Переплёт:</label>
                <div className={styles.checkboxGroup}>
                    {covers.map(cover => (
                        <label key={cover}>
                            <input
                                type="checkbox"
                                checked={filters.cover?.includes(cover)}
                                onChange={() => handleCoverChange(cover)}
                            />
                            {cover}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label>Издательство:</label>
                <div className={styles.checkboxGroup}>
                    {publishingHouses.map(p => (
                        <label key={p}>
                            <input
                                type="checkbox"
                                checked={filters.publishingHouse?.includes(p)}
                                onChange={() => handlePublChange(p)}
                            />
                            {p}
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.filterSection}>
                <label>
                    Цена: {filters.price[0]} – {filters.price[1]} р.
                </label>

                <div className={styles.rangeWrapper}>
                    <div className={styles.rangeTrack}></div>

                    <div
                        className={styles.rangeFill}
                        style={{
                            left: `${(filters.price[0] / 200) * 100}%`,
                            width: `${((filters.price[1] - filters.price[0]) / 200) * 100}%`
                        }}
                    ></div>

                    <input
                        type="range"
                        min="5"
                        max="200"
                        value={filters.price[0]}
                        onChange={e => {
                            const value = Number(e.target.value);
                            if (value <= filters.price[1]) {
                                dispatch(setPrice([value, filters.price[1]]));
                            }
                        }}
                    />

                    <input
                        type="range"
                        min="5"
                        max="200"
                        value={filters.price[1]}
                        onChange={e => {
                            const value = Number(e.target.value);
                            if (value >= filters.price[0]) {
                                dispatch(setPrice([filters.price[0], value]));
                            }
                        }}
                    />
                </div>
            </div>

            <button onClick={() => dispatch(resetFilters())}>
                Сбросить фильтры
            </button>
        </div>
    );
}