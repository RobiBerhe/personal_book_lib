
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import booksReducer from './features/books/booksSlice';
import authReducer from './features/auth/authSlice';
import booksSaga from './features/books/booksSaga';
import authSaga from './features/auth/authSaga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk:false}).concat(sagaMiddleware),
});

sagaMiddleware.run(booksSaga);
sagaMiddleware.run(authSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;