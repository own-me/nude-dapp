import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
    email?: string,
    password?: string,
    token?: string
}

interface DecodedToken {
    email: string,
    exp: number,
    iat: number
}
interface LoginResponse {
    token: string,
    message: string,
    decoded: DecodedToken
}

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postLogin: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "login/",
                method: "POST",
                body
            }),
        }),
    }),
});

export const { usePostLoginMutation } = loginApi;