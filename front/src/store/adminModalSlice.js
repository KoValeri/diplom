import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    selectedBookId: null
}

const adminModalSlice = createSlice({
    name: 'adminModal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
            state.selectedBookId = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
            state.selectedBookId = null
        }
    }
})

export const adminModalActions = adminModalSlice.actions

export default adminModalSlice.reducer