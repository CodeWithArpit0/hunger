import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    discount: 0,
    noOfProducts: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
      action.payload.extraOptions = action.payload.extras;
      state.products.push(action.payload);
      state.noOfProducts += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    initializeCart: (state, action) => {
      state.products = action.payload;
    },
    updateCart: (state, action) => {
      state.products = action.payload.updatedCart.products;
      state.noOfProducts -= 1;
      state.total -= action.payload.updatedCart.deletingProductPrice;
    },
    updateCartCount: (state, action) => {
      state.noOfProducts = action.payload.noOfProducts;
      state.total = action.payload.cartTotal;
    },
    upateNoOfProducts: (state, action) => {
      state.noOfProducts = action.payload;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  reset,
  initializeCart,
  updateCartCount,
  upateNoOfProducts,
  updateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
