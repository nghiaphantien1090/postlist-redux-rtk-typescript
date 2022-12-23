import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { postApi } from '../features/api/apiSlice';
export const store = configureStore({
  reducer: {
    [postApi.reducerPath]:postApi.reducer
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
