import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginResponse {
    address: string;
    message: string;
    nonce?: string;
    token?: string;
}

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV === "true" ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        postLogin: builder.mutation<LoginResponse, { address?: string }>({
            query: ({ address }) => ({
                url: "auth/login/",
                method: "POST",
                body: {
                    address
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const { usePostLoginMutation } = loginApi;