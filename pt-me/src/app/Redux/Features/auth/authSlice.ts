'use client';

import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

const TOKEN = 'token';
const BASE_URL = 'http://localhost:3001';

export interface AuthState {
  //   user: Object | null;
  //   token: Text | null;
}

const initialState: AuthState = {
  //   user: null,
  //   token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    me: async () => {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const res = await Axios.get(`${BASE_URL}/auth/me`, {
          headers: {
            authorization: token,
          },
        });
        return res.data;
      }
    },
  },
});
