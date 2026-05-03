import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    selectedBookId: null
}

const adminDeleteModalSlice = createSlice({
    name: 'adminDeleteModal',
    initialState,
    reducers: {
        openDeleteModal(state, action) {
            state.isOpen = true
            state.selectedBookId = action.payload
        },
        closeDeleteModal: (state) => {
            state.isOpen = false
            state.selectedBookId = null
        },
        
    }
})

export const adminDeleteModalActions = adminDeleteModalSlice.actions

export default adminDeleteModalSlice.reducer