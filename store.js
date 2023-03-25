import { createSlice, configureStore } from '@reduxjs/toolkit';

let locationState = {
    locationCoords: {},
};


// Define a slice
const locationSlice = createSlice({
  name: 'location',
  initialState: locationState,
  reducers: {
    setLocation: (state, action) => {
        state.locationCoords = action.payload
    },
  },
});

// Create a store
const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
  },
});

export const actions = locationSlice.actions;


export default store;