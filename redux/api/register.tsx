import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
    address: string;
    isAgeConfirmed: boolean;
    name?: string;
    email?: string;
}

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postRegister: builder.mutation<{ message: string }, RegisterRequest>({
            query: ({ address, isAgeConfirmed, name, email }) => ({
                url: "auth/register/",
                method: "POST",
                body: {
                    address,
                    isAgeConfirmed,
                    name,
                    email
                }
            })
        }),
        verifyEmail: builder.mutation<{ email: string }, { email: string }>({
            query: ({ email }) => ({
                url: "register/verify-email",
                method: "POST",
                body: {
                    email
                }
            })
        }),
    }),
});

export const { usePostRegisterMutation, useVerifyEmailMutation } = registerApi;