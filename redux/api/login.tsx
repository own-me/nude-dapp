import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
    address: string
}

interface LoginResponse {
    address: string,
    message: string,
    nonce: string
}

interface DecodedToken {
    id: number,
    email: string,
    name: string,
    exp: number,
    iat: number
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
                }
            }),
        }),
    }),
});

export const { usePostLoginMutation } = loginApi;