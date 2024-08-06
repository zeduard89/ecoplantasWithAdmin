import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';

const EXPIRATION_TIME = 60 * 60 * 1000;

// Transformador para agregar y verificar la marca de tiempo
const expirationTransform = createTransform(
  (inboundState) => {
    return {
      ...inboundState,
      _persist: {
        ...inboundState._persist,
        timestamp: new Date().getTime(),
      },
    };
  },
  (outboundState) => {

    const { _persist } = outboundState;
    if (_persist && new Date().getTime() - _persist.timestamp > EXPIRATION_TIME) {
      return undefined;
    }
    return outboundState;
  },
  { whitelist: ['catalogo'] } 
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['catalogo'], 
  transforms: [expirationTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
