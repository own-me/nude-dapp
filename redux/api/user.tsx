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

interface UploadProfileImageRequest {
    name: string,
    image: string
}

interface UploadProfileImageResponse {
    message: string,
    url: string
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
        uploadProfileImage: builder.mutation<UploadProfileImageResponse, UploadProfileImageRequest>({
            query: ({ name, image }) => ({
                url: `user/upload-profile-image`,
                method: "POST",
                body: {
                    name,
                    image
                }
            }),
        }),
    }),
});

export const { useGetUserQuery, useUploadProfileImageMutation } = userApi;