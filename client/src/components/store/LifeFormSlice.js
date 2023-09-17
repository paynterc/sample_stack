import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';


// idle, loading, succeeded, failed
const initialState = {
  data: [],
  status: 'idle',
  error: null
}

export const fetchLifeFormData = createAsyncThunk('data/fetchLifeFormData', async () => {
  const response = await fetch("http://localhost:9000/lfAPI")
    .then(res => res.json())
    .catch(error => {
        console.log('error:', error);
    });
  return response
})

const lifeFormSlice = createSlice({
  name: 'lifeForms',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setData(state, action) {
      return {...state, data: action.payload}
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(fetchLifeFormData.pending, (state, action) => {
        state.status = 'loading';
      })
    .addCase(fetchLifeFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
      state.data = action.payload;
    })
    .addCase(fetchLifeFormData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    })
  },
})
export const {setData} = lifeFormSlice.actions;
export default lifeFormSlice.reducer;
