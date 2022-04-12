import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
    id: number;
    childOf?: number | null;
    text: string;
    userAddress: string;
    userName?: string;
    dateCreated: Date;
    likesCount: number;
    commentsCount: number;
    imageUrl?: string | null;
    profileImageUrl?: string;
    comments: Post[];
    isLiked: boolean;
}

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV ? "http://localhost:3000/" : "http://api.ownme.io:3000/" }),
    endpoints: (builder) => ({
        getPost: builder.query<Post, { postId: string }>({
            query: ({ postId }) => ({
                url: `posts/${postId}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getUserPosts: builder.query<Post[], { userAddress: string }>({
            query: ({ userAddress }) => ({
                url: `posts/user/${userAddress}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        postsPost: builder.mutation<{ message?: string, error?: string }, { text: string, childOf?: number, imageUrl?: string }>({
            query: ({ text, childOf, imageUrl }) => ({
                url: "posts/",
                method: "POST",
                body: {
                    childOf,
                    text,
                    imageUrl
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        likePost: builder.mutation<{ message?: string, error?: string }, { postId: number }>({
            query: ({ postId }) => ({
                url: `posts/like/${postId}`,
                method: "POST",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        unlikePost: builder.mutation<{ message?: string, error?: string }, { postId: number }>({
            query: ({ postId }) => ({
                url: `posts/unlike/${postId}`,
                method: "POST",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getSearchPosts: builder.query<{ posts?: Post[], message?: string, error?: string }, { query: string }>({
            query: ({ query }) => ({
                url: `posts/search/${query}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const {
    useGetPostQuery,
    useGetUserPostsQuery,
    usePostsPostMutation,
    useLikePostMutation,
    useUnlikePostMutation,
    useGetSearchPostsQuery
} = postsApi;