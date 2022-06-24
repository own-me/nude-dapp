import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ipfsApi } from "../api/ipfs";
import { loginApi } from "../api/login";
import { registerApi } from "../api/register";
import { authApi } from "../api/auth";
import { userApi } from "../api/user";
import { nftApi } from "../api/nft";
import { postsApi } from "../api/posts";
import { verifyApi } from "../api/verify";
import { proposalsApi } from "../api/proposals";
import appReducer from "./slices/app";
import userReducer from "./slices/user";
import walletReducer from "./slices/wallet";

export const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
        wallet: walletReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [ipfsApi.reducerPath]: ipfsApi.reducer,
        [nftApi.reducerPath]: nftApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [verifyApi.reducerPath]: verifyApi.reducer,
        [proposalsApi.reducerPath]: proposalsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        loginApi.middleware,
        registerApi.middleware,
        authApi.middleware,
        userApi.middleware,
        ipfsApi.middleware,
        nftApi.middleware,
        postsApi.middleware,
        verifyApi.middleware,
        proposalsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;