import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedKingdom: null,
    selectedClass: null
}

const kingdomSlice = createSlice({
    name: 'kingdoms',
    initialState: initialState,
    reducers: {
        setSelectedKingdom(state, action) {
            return {...state, selectedKingdom: action.payload}
        },
        setSelectedClass(state, action) {
            return {...state, selectedClass: action.payload}
        }
    },
});

export const {setSelectedKingdom,setSelectedClass} = kingdomSlice.actions;

export default kingdomSlice.reducer;
