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
            state.filterArray = filterData || []; 
        },
        deleteItemFiltered: (state, action) => {
            const id = action.payload
                state.filterArray = state.filterArray.filter(item => item.id !== id);
          },
        reset: (state) => {
            return initialState;
        },
    }
})

export const { addFilterData, deleteItemFiltered } = filterSilce.actions;
export default filterSilce.reducer;