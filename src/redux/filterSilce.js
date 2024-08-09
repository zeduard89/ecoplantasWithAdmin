import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterArray: [],  
}; 

export const filterSilce = createSlice({
    name: "filter",
    initialState,
    // Create reducers
    reducers: {
        addFilterData: (state, action) => {
            const  filterData  = action.payload;
            console.log(filterData)
            state.filterArray = filterData || []; 
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

export const { addFilterData } = filterSilce.actions;
export default filterSilce.reducer;