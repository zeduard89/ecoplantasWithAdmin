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

        reset: (state) => {
            return initialState;
        },
    }
})

export const { addFilterData } = filterSilce.actions;
export default filterSilce.reducer;