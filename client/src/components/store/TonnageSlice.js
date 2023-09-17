import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoaded: false,
  data: [],
  errorMessage: null
}

const tonnageSlice = createSlice({
    name: 'tonnage',
    initialState: initialState,
    reducers: {
        setData(state, action) {
            return {
                ...state, data: action.payload, filteredData: action.payload, isLoaded:true
            }
        },
        setIsLoaded(state, action) {
            return {...state, isLoaded: action.payload}
        },
        setErrorMessage(state, action) {
            return {...state, errorMessage: action.payload}
        }
    },
});

export const {setData, setIsLoaded, setErrorMessage} = tonnageSlice.actions;

export default tonnageSlice.reducer;


