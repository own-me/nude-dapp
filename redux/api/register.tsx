import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
    email: string,
    name: string,
    password: string,
    verificationCode: string
}

interface RegisterResponse {
    message: string,
}

interface VerifyEmailRequest {
    email: string
}

interface VerifyEmailResponse {
    message: string,
}

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postRegister: builder.mutation<RegisterResponse, RegisterRequest>({
            query: ({ email, name, password, verificationCode }) => ({
                url: "register/",
                method: "POST",
                body: {
                    email,
                    name,
                    password,
                    verificationCode
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