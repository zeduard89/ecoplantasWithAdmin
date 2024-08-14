import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    macetas: [],  
    plantas: [],  
    maceteros: [],
    arrayMaceteros20:[],
    arrayMaceteros30:[],
    countMaceteros20:0,
    countMaceteros30:0,
    emptyCatalogo:false
}; 

export const catalogoSlice = createSlice({
    name: "catalogo",
    initialState,
    // Create reducers
    reducers: {
        addCatalogo: (state, action) => {
            const { macetas, plantas, maceteros, emptyCatalogo } = action.payload;
            state.macetas = macetas || []; 
            state.plantas = plantas || []; 
            state.maceteros = maceteros || [];   
            const maceteros20 = maceteros?.filter(macetero => {
                return macetero.base.includes('20');
              });
            state.arrayMaceteros20 = maceteros20 || [];
              const maceteros30 = maceteros?.filter(macetero => {
                return macetero.base.includes('30');
              });
            state.arrayMaceteros30 = maceteros30 || [];
            state.emptyCatalogo = emptyCatalogo;
            
        },
        increment: (state, action) => {
            const { title, category } = action.payload;
            if (title !== undefined && category !== undefined && state[category]) {
                state[category] = state[category].map(item =>
                    item.title === title ? { ...item, cuantity: (item.cuantity || 0) + 1 } : item
                );
            }
        },
        decrement: (state, action) => {
            const { title, category } = action.payload;
            if (title !== undefined && category !== undefined && state[category]) {
                state[category] = state[category].map(item =>
                    item.title === title && item.cuantity > 0 ? { ...item, cuantity: item.cuantity - 1 } : item
                );
            }
        },
        incrementMaceterosL: (state, action) => {
            const { base } = action.payload;
            if (base !== undefined && base.includes('20')) {
                state.maceteros20 += 1;
            }else if(base !== undefined && base.includes('30')){
                state.maceteros30 += 1;
            }
        },
        decrementMaceterosL: (state, action) => {
            const { base } = action.payload;
            if (base !== undefined && base.includes('20') && state.maceteros20 > 0) {
                state.maceteros20 -= 1;
            }else if(base !== undefined && base.includes('30') && state.maceteros30 > 0){
                state.maceteros30 -= 1;
            }
        },
        reset: (state) => {
            return initialState;
        },
        setPresupuesto: (state, action) => {
            const { macetas, plantas, maceteros } = action.payload;
            state.pedidoMacetas = macetas || []; 
            state.pedidoPlantas = plantas || [];
            state.pedidosMaceteros = maceteros || [];
        },
    }
})

export const { addCatalogo, increment, decrement, incrementMaceterosL, decrementMaceterosL, reset, setPresupuesto } = catalogoSlice.actions;
export default catalogoSlice.reducer;

