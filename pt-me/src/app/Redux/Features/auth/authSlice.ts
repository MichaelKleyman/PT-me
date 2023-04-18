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

interface SignupPayload {
  clinicName: string;
  address: string;
  email: string;
  password: string;
}
interface LoginPayload {
  email: string;
  password: string;
}

export const me = createAsyncThunk(
  `${BASE_URL}/auth/me`,
  async (_, { dispatch }) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const res = await Axios.get(`${BASE_URL}/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    { clinicName, address, email, password }: SignupPayload,
    { dispatch }
  ) => {
    try {
      const res = await Axios.post(`${BASE_URL}/auth/signup`, {
        clinicName,
        address,
        email,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      await dispatch(me());
    } catch (authError: any) {
      return { error: authError.message };
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginPayload, { dispatch }) => {
    try {
      const res = await Axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      await dispatch(me());
    } catch (authError: any) {
      return { error: authError.message };
    }
  }
);

export const logout = (): void => {
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
      .addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.error = action.payload?.error ?? null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.error = action.payload?.error ?? null;
      });
  },
});

export default authSlice.reducer;