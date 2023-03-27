import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const TOKEN = 'token';

// export const authenticate =
//   (username, password, method) => async (dispatch) => {
//     try {
//       const res = await axios.post(`/auth/${method}`, { username, password });
//       window.localStorage.setItem(TOKEN, res.data.token);
//       dispatch(me());
//     } catch (authError) {
//       return dispatch(setAuth({ error: authError }));
//     }
//   };

//first arguement is the prefix for the generated action type
export const authenticate = createAsyncThunk(
  'user/authenticate',
  async (username: string, password: string, method: string) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
    } catch (error) {}
  }
);

const initialState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: () => {},
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
