import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 3,
  total: 0,
  isLoading: true,
};

// in createAsyncThunk we pass 2 parameters first is action's name and second is callback func
export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      // we created an action named clearCart
      state.cartItems = [];
      // Alternative approach
      // return { ...state, cartItems: [] };
    },
    removeItem: (state, action) => {
      const itemId = action.payload; // here the payload will be value that we passed into this removeItem function through cartItem.js , which means our payload is going to be id of particular product bcoz thats what we are passing into this action
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      // action will contains result of api if we were successful
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions; // we exported our actions which are followings

export default cartSlice.reducer; // here we exported reducer means we passed reducer for controlling initial state
