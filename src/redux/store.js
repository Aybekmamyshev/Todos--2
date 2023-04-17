import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./ApiSlice";
const  store = configureStore({
    reducer: {
      [apiSlice.reducePath] : apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)

})

export default store