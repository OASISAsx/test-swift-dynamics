import { configureStore } from '@reduxjs/toolkit';
import personsReducer from './personsSlice';
import personFormReducer from './personFormSlice';

export const store = configureStore({
  reducer: {
    persons: personsReducer,
    personForm: personFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
