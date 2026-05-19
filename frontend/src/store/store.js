import { configureStore, createSlice } from '@reduxjs/toolkit';
const auth = createSlice({
  name: 'auth',
  initialState: { user: JSON.parse(localStorage.getItem('user')||'null'), token: localStorage.getItem('token') },
  reducers: {
    setAuth: (s, a) => { s.user = a.payload.user; s.token = a.payload.token;
      localStorage.setItem('user', JSON.stringify(a.payload.user)); localStorage.setItem('token', a.payload.token); },
    logout: (s) => { s.user = null; s.token = null; localStorage.clear(); }
  }
});
export const { setAuth, logout } = auth.actions;
export const store = configureStore({ reducer: { auth: auth.reducer } });
