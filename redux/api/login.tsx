import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
    address?: string;
}

interface LoginResponse {
    address: string;
    message: string;
    nonce?: string;
    token?: string;
}

interface DecodedToken {
    address: string;
    exp: number;
    iat: number;
}

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postLogin: builder.mutation<LoginResponse, LoginRequest>({
            query: ({ address }) => ({
                url: "login/",
                method: "POST",
                body: {
                    address
                },
                headers: {
                    ...(localStorage.getItem("token") && {Authorization: `Bearer ${localStorage.getItem("token")}`})
                }
            }),
        }),
    }),
});

export const { usePostLoginMutation } = loginApi;