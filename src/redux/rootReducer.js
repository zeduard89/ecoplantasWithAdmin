// rootReducer.js
import { combineReducers } from 'redux';
import catalogoReducer from './catalogoSlice';
// Importa otros reductores si tienes más

const rootReducer = combineReducers({
  catalogo: catalogoReducer,
  // Añade otros reductores aquí
});

export default rootReducer;