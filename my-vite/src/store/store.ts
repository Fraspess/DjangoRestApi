import { configureStore } from '@reduxjs/toolkit'
import{categoryApi} from "./apis/categoryApi"



export const store = configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
