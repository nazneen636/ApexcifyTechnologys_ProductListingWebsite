import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    toggleWishList: (state, action) => {
      const product = action.payload;
      const isExists = state.find((item) => item.id === product.id);
      if (isExists) {
        return state.filter((item) => item.id !== product.id);
      } else {
        state.push(product);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
