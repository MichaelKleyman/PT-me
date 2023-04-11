import { configureStore } from '@reduxjs/toolkit';
import auth from './auth.mjs';

const store = configureStore({
  reducer: {
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      devTools: true,
      //fixed the bug about
    }), //can do .concat(logger) if you want to see redux-logs
});

export default store;
