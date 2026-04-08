import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    age: [],
    genre: [],
    price: [0, 200],
    cover: [],
    publishingHouse: [],
    sort: "new",
};

const bookFilterSlice = createSlice({
    name: "bookFilters",
    initialState,
    reducers: {
        setAge: (state, action) => { state.age = action.payload },
        setGenre: (state, action) => { state.genre = action.payload },
        setPrice: (state, action) => { state.price = action.payload },
        setCover: (state, action) => { state.cover = action.payload },
        setPublHouse: (state, action) => { state.publishingHouse = action.payload },
        setSort: (state, action) => { state.sort = action.payload },
        resetFilters: () => initialState,
    }
});

export const { setAge, setGenre, setPrice, setCover, setPublHouse, setSort, resetFilters } = bookFilterSlice.actions;
export default bookFilterSlice.reducer;