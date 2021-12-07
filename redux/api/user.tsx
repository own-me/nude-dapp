import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Following } from "./follow";

interface UserRequest {
    address: string;
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
    link?: string;
    isFollowing?: boolean;
    following?: Following[];
    message?: string;
    error?: string;
}

interface UploadProfileImageRequest  {
    formData: FormData;
}

interface UploadProfileImageResponse {
    message?: string;
    error?: string;
    profileImageUrl?: string;
}

interface UploadProfileBannerRequest  {
    formData: FormData;
}

interface UploadProfileBannerResponse {
    message?: string;
    error?: string;
    bannerImageUrl?: string;
}

interface UserEditResponse {
    message?: string;
    error?: string;
}
interface UserEditRequest {
    name?: string;
    bio?: string;
    link?: string;
    profileImageUrl?: string;
    bannerImageUrl?: string;
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
            query: ({ formData }) => ({
                url: "user/profile-image",
                method: "POST",
                contentType: "multipart/form-data",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
        uploadProfileBanner: builder.mutation<UploadProfileBannerResponse, UploadProfileBannerRequest>({
            query: ({ formData }) => ({
                url: "user/profile-banner",
                method: "POST",
                contentType: "multipart/form-data",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
        editUser: builder.mutation<UserEditResponse, UserEditRequest>({
            query: ({ name, bio, link, profileImageUrl, bannerImageUrl }) => ({
                url: "user/edit",
                method: "POST",
                body: {
                    name,
                    bio,
                    link,
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