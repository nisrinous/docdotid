import { ProductResponse } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartItemsCount: number;
  cartProducts: ProductResponse[];
}

const initialState: CartState = {
  cartItemsCount: 0,
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartAttribute: (state, action: PayloadAction<Partial<CartState>>) => {
      Object.assign(state, action.payload);
    },
    incrementCart(state) {
      state.cartItemsCount += 1;
    },
    decrementCart(state) {
      state.cartItemsCount -= 1;
    },
  },
});

export const { setCartAttribute, incrementCart, decrementCart } =
  cartSlice.actions;
export default cartSlice.reducer;
