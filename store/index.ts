import organizationsSlice from "@/features/organization/organization.slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        [organizationsSlice.reducerPath]: organizationsSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
