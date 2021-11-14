import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
    address: string;
    isAgeConfirmed: boolean;
    name?: string;
    email?: string;
}

interface RegisterResponse {
    message: string;
}

interface VerifyEmailRequest {
    email: string;
}

interface VerifyEmailResponse {
    message: string;
}

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postRegister: builder.mutation<RegisterResponse, RegisterRequest>({
            query: ({ address, isAgeConfirmed, name, email }) => ({
                url: "auth/register/",
                method: "POST",
                body: {
                    address,
                    isAgeConfirmed,
                    name,
                    email
                }
            }),
        }),
        verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
            query: ({ email }) => ({
                url: "register/verify-email",
                method: "POST",
                body: {
                    email
                }
            }),
        }),
    }),
});

export const { usePostRegisterMutation, useVerifyEmailMutation } = registerApi;