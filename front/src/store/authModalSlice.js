import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isOpen: false,
  mode: "login"
}

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isOpen = true
      state.mode = "login"
    },
    openRegister: (state) => {
      state.isOpen = true
      state.mode = "register"
    },
    closeModal: (state) => {
      state.isOpen = false
    }
  }
})

export const authModalActions =
  authModalSlice.actions

export default authModalSlice.reducer