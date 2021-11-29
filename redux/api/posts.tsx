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
}

interface GetPostRequest {
    postId: string;
}

interface GetUserPostsRequest {
    userAddress: string;
}

interface PostsPostRequest {
    childOf?: number | null;
    text: string;
    userAddress: string;
    imageUrl?: string | null;
}

interface PostsPostResponse {
    message?: string;
    error?: string;
}

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getPost: builder.query<Post, GetPostRequest>({
            query: ({ postId }) => ({
                url: `posts/${postId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        }),
        getUserPosts: builder.query<Post[], GetUserPostsRequest>({
            query: ({ userAddress }) => ({
                url: `posts/user/${userAddress}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        }),
        postsPost: builder.mutation<PostsPostResponse, PostsPostRequest>({
            query: ({ childOf, text, userAddress, imageUrl }) => ({
                url: "posts/",
                method: "POST",
                body: {
                    childOf,
                    text,
                    userAddress,
                    imageUrl
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        })
    })
});

export const { useGetPostQuery, useGetUserPostsQuery, usePostsPostMutation } = postsApi;