import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./ProductApi";
import wishListReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// 1️⃣ Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["wishList", "cart"], // persist only wishlist slice
};

// 2️⃣ Combine reducers
const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  wishList: wishListReducer,
  cart: cartReducer,
});

// 3️⃣ Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }).concat(productApi.middleware),
});

// 5️⃣ Persistor
export const persistor = persistStore(store);

// 6️⃣ Setup RTK Query listeners
setupListeners(store.dispatch);
