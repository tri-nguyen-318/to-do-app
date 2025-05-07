import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import issueReducer from './issues/slice';
import chessReducer from './chess/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      issues: issueReducer,
      chess: chessReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
