import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    selectedBookId: null,
    mode: "create"
}

const adminModalSlice = createSlice({
    name: 'adminModal',
    initialState,
    reducers: {
        openCreateModal(state) {
            state.isOpen = true
            state.mode = "create"
            state.selectedBookId = null
        },

        openEditModal(state, action) {
            state.isOpen = true
            state.mode = "edit"
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