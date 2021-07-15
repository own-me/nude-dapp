import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserRequest {
    name: string
}

interface UserResponse {
    message: string,
    name: string,
    birthDate: string,
    registrationDate: string,
    lastLoginDate: string
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, UserRequest>({
            query: ({ name }) => ({
                url: `user/${name}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUserQuery } = userApi;