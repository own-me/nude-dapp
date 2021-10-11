import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthRequest {
    address: string;
    message: string;
    signature: string;
}

interface AuthResponse {
    address: string;
    message: string;
    nonce: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postAuth: builder.mutation<AuthResponse, AuthRequest>({
            query: ({ address, message, signature }) => ({
                url: "auth/",
                method: "POST",
                body: {
                    address,
                    message,
                    signature
                }
            }),
        }),
    }),
});

export const { usePostAuthMutation } = authApi;