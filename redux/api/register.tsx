import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
    email: string,
    password: string
}

interface RegisterResponse {
    message: string,
}

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postRegister: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: "register/",
                method: "POST",
                body
            }),
        }),
    }),
});

export const { usePostRegisterMutation } = registerApi;