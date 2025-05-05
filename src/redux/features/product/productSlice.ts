import { createSlice } from "@reduxjs/toolkit";

// Dummy API call — পরে replace করে নিজে backend API দিবি
// export const fetchProducts = createAsyncThunk(
//   "product/fetchProducts",
//   async () => {
//     const res = await fetch("https://fakestoreapi.com/products");
//     const data = await res.json();
//     return data;
//   }
// );

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchProducts.pending, (state) => {
  //         state.loading = true;
  //         state.error = null;
  //       })
  //       .addCase(fetchProducts.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.products = action.payload;
  //       })
  //       .addCase(fetchProducts.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.error.message || "Something went wrong";
  //       });
  //   },
});

export const { setUser, setLoading } = productSlice.actions;

export default productSlice.reducer;
