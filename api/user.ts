import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Following } from "./follow";

interface User {
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

interface UserEditRequest {
    name?: string;
    bio?: string;
    link?: string;
    profileImageUrl?: string;
    bannerImageUrl?: string;
}

interface SearchUser {
    toProfileImageUrl: string;
    name: string;
    toAddress: string;
    followersCount: number;
    nftsCount: number;
}

export interface InitialLoginInfoResponse {
    address?: string;
    name?: string;
    profileImageUrl?: string;
    message?: string;
    error?: string;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        getUser: builder.query<User, { address: string }>({
            query: ({ address }) => ({
                url: `user/${address}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        uploadProfileImage: builder.mutation<{ profileImageUrl?: string, message?: string, error?: string }, { formData: FormData }>({
            query: ({ formData }) => ({
                url: "user/profile-image",
                method: "POST",
                contentType: "multipart/form-data",
                body: formData,
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        uploadProfileBanner: builder.mutation<{ bannerImageUrl?: string, message?: string, error?: string }, { formData: FormData }>({
            query: ({ formData }) => ({
                url: "user/profile-banner",
                method: "POST",
                contentType: "multipart/form-data",
                body: formData,
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        editUser: builder.mutation<{ message?: string, error?: string }, UserEditRequest>({
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
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getSearchUsers: builder.query<{ users?: SearchUser[], message?: string, error?: string }, { query: string }>({
            query: ({ query }) => ({
                url: `user/search/${query}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getInitialLoginInfo: builder.query<InitialLoginInfoResponse, { token: string }>({
            query: ({ token }) => ({
                url: "user/initial-login-info",
                method: "GET",
                headers: {
                    ...((token || localStorage.getItem("token")) && { Authorization: `Bearer ${token || localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const {
    useGetUserQuery,
    useUploadProfileImageMutation,
    useUploadProfileBannerMutation,
    useEditUserMutation,
    useGetSearchUsersQuery,
    useGetInitialLoginInfoQuery
} = userApi;