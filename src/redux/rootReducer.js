// rootReducer.js
import { combineReducers } from 'redux';
import catalogoReducer from './catalogoSlice';
import adminReducer from './adminSlice';
// Importa otros reductores si tienes más

const rootReducer = combineReducers({
  catalogo: catalogoReducer,
  admin: adminReducer,
  // Añade otros reductores aquí
});

export default rootReducer;