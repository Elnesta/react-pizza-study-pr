import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';

export default configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  }
})