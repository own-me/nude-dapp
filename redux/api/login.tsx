import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Login {
    email?: string,
    password?: string,
    token?: string
}

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    postLogin: builder.mutation<Login, string>({
        query: (body) => ({
            url: "login/",
            method: "POST",
            body
        }),
    }),
  }),
})

export const { usePostLogin } = loginApi