import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, setToStorage } from '../utils/localStorageUtils';
import { KEYS } from '../configs/localStorageConfig';

const storedUser = getFromStorage(KEYS.USER);

const initialState = {
  user: storedUser ? { email: storedUser.email, password: storedUser.password } : null,
  isAuthenticated: storedUser ? storedUser.isAuthenticated : false,
  loginError: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action) {
        state.user = action.payload;
        state.isAuthenticated = false;
        state.loginError = false;

        setToStorage( KEYS.USER, { ...action.payload, isAuthenticated: false } );
    },
    login(state, action) {
        const {email, password} = action.payload;

        if (state.user && email === state.user.email && password === state.user.password){
          state.isAuthenticated = true;
          setToStorage( KEYS.USER, { ...state.user, isAuthenticated: true } );
          state.loginError = false;
        } else {
            state.loginError = true
        }
    },
    logout(state) {
        state.loginError = false;
        state.isAuthenticated = false;
        setToStorage( KEYS.USER, { ...state.user, isAuthenticated: false } );
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
