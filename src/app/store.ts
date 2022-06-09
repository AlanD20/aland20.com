import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../features/alertSlice';
import tagSelectionReducer from '../features/tagSelectionSlice';


const store = configureStore({
  reducer: {
    alert: alertReducer,
    tagSelection: tagSelectionReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          // 'alertStatus/setSuccess',
        ],
      },
    }),
});


export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
