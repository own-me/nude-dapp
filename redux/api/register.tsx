import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Register {
    email: string,
    password: string
}

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postRegister: builder.mutation<Register, any>({
            query: (body) => ({
                url: "register/",
                method: "POST",
                body
            }),
        }),
    }),
});

export const { usePostRegisterMutation } = registerApi;