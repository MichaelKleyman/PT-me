"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/auth/authSlice";
import patientReducer from "./Features/patients/patientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
