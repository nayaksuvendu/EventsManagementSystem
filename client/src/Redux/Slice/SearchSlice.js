import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  city: undefined,
  event: undefined,
  dates: sessionStorage.getItem('dates') ?[sessionStorage.getItem('dates')] : [],
  options: {
    capacity: undefined,
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    newSearch: (state, action) => { 
       sessionStorage.setItem('dates',action?.payload?.dates)
       state.city = action?.payload?.destination
       state.event = action?.payload?.event
       state.dates = action?.payload?.dates
       state.options.capacity = action?.payload?.options.capacity
    },
    resetSearch: (_state) => {
      return initialState;
    },
    setDates: (state, action) => {
        sessionStorage.setItem('dates',action?.payload)
        state.dates = action?.payload;
    }
  },
});

export const { newSearch, resetSearch, setDates } = searchSlice.actions;
export default searchSlice.reducer;
