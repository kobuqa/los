import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import specialistReducer from '../entities/specialist/model/slice';

export const store = configureStore({
  reducer: {
    specialist: specialistReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
