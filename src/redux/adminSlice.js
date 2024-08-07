import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:''
}; 

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    // Create reducers
    reducers: {
        adminToken: (state, action) => {
            const  token  = action.payload;
            state.token = token || ''; 
 
        },
    }
})

export const { adminToken } = adminSlice.actions;
export default adminSlice.reducer;