// rootReducer.js
import { combineReducers } from 'redux';
import catalogoReducer from './catalogoSlice';
import adminReducer from './adminSlice';
import filterReducer from './filterSilce'
// Importa otros reductores si tienes más

const rootReducer = combineReducers({
  catalogo: catalogoReducer,
  admin: adminReducer,
  filter: filterReducer,
  // Añade otros reductores aquí
});

export default rootReducer;