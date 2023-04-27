import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const sagamiddleware = createSagaMiddleware()

const middlewares = [sagamiddleware]

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares
})

export const persistor = persistStore(store)

sagamiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch