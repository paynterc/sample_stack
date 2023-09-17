import { configureStore } from '@reduxjs/toolkit';
import tonnageSlice from './components/store/TonnageSlice';
import kingdomSlice from './components/store/KingdomSlice';
import lifeFormSlice from './components/store/LifeFormSlice';

const store = configureStore({
  reducer: {
    tonnage: tonnageSlice,
    kingdom: kingdomSlice,
    lifeforms: lifeFormSlice,
  },
});

export default store;
