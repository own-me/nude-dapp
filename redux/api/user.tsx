import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserRequest {
    name: string
}

interface UserResponse {
    name: string,
    birthDate: string
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