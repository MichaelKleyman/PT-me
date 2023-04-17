'use client';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';

const TOKEN = 'token';
const BASE_URL = 'http://localhost:3001';

interface AuthState {
  user: any; // Replace 'any' with your user type
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

interface AuthenticatePayload {
  username: string;
  password: string;
  method: string;
}

export const me = createAsyncThunk(
  `${BASE_URL}/auth/me`,
  async (_, { dispatch }) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const res = await Axios.get('/auth/me', {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    }
  }
);

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ username, password, method }: AuthenticatePayload, { dispatch }) => {
    try {
      const res = await Axios.post(`${BASE_URL}/auth/${method}`, {
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      await dispatch(me());
    } catch (authError) {
      return { error: authError.message };
    }
  }
);

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(me.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authenticate.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.error = action.payload?.error ?? null;
      });
  },
});

export default authSlice.reducer;
