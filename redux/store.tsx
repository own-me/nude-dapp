import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { followApi } from "./api/follow";
import { ipfsApi } from "./api/ipfs";
import { loginApi } from "./api/login";
import { registerApi } from "./api/register";
import { userApi } from "./api/user";
import { unfollowApi } from "./api/unfollow";
import { nftDbApi } from "./api/nft-db";
import userReducer from "./slices/user";
import walletReducer from "./slices/wallet";

export const store = configureStore({
    reducer: {
        user: userReducer,
        wallet: walletReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [ipfsApi.reducerPath]: ipfsApi.reducer,
        [followApi.reducerPath]: followApi.reducer,
        [unfollowApi.reducerPath]: unfollowApi.reducer,
        [nftDbApi.reducerPath]: nftDbApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        loginApi.middleware,
        registerApi.middleware,
        userApi.middleware,
        ipfsApi.middleware,
        followApi.middleware,
        unfollowApi.middleware,
        nftDbApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;