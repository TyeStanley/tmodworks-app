import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { gameApi } from './api/gameApi';
import gameReducer from './state/gameSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameReducer,
      [gameApi.reducerPath]: gameApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Define the AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  Action<string>
>;
