import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Following } from "./follow";

interface UserRequest {
    address: string
}

interface UserResponse {
    id?: string;
    address?: string;
    name?: string;
    birthDate?: string;
    registrationDate?: string;
    lastLoginDate?: string;
    profileImageUrl?: string;
    bannerImageUrl?: string;
    bio?: string;
    isFollowing?: boolean;
    following?: Following[];
    message?: string;
    error?: string;
}

interface UploadProfileImageRequest  {
    address: string;
    formData: FormData;
}

interface UploadProfileImageResponse {
    message?: string,
    error?: string
    profileImageUrl?: string
}

interface UploadProfileBannerRequest  {
    address: string;
    formData: FormData;
}

interface UploadProfileBannerResponse {
    message?: string,
    error?: string
    bannerImageUrl?: string
}

interface UserEditResponse {
    message?: string,
    error?: string
}
interface UserEditRequest {
    address: string;
    name?: string,
    bio?: string,
    profileImageUrl?: string,
    bannerImageUrl?: string
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getUser: builder.query<UserResponse, UserRequest>({
            query: ({ address }) => ({
                url: `user/${address}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
        uploadProfileImage: builder.mutation<UploadProfileImageResponse, UploadProfileImageRequest>({
            query: ({ address, formData }) => ({
                url: `user/profile-image/${address}`,
                method: "POST",
                contentType: "multipart/form-data",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
        uploadProfileBanner: builder.mutation<UploadProfileBannerResponse, UploadProfileBannerRequest>({
            query: ({ address, formData }) => ({
                url: `user/profile-banner/${address}`,
                method: "POST",
                contentType: "multipart/form-data",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
        editUser: builder.mutation<UserEditResponse, UserEditRequest>({
            query: ({ address, name, bio, profileImageUrl, bannerImageUrl }) => ({
                url: `user/edit/${address}`,
                method: "POST",
                body: {
                    name,
                    bio,
                    profileImageUrl,
                    bannerImageUrl
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
    }),
});

export const { useGetUserQuery, useUploadProfileImageMutation, useUploadProfileBannerMutation, useEditUserMutation } = userApi;