import { configureStore } from '@reduxjs/toolkit';
import AutosSlice from './Autos/AutosSlice';
//import authSlice from './auth/authSlice';


export const store = configureStore({
    reducer: {
        autos: AutosSlice.reducer,
        //auth: authSlice.reducer,
    },
  })


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type StoreType = typeof store;