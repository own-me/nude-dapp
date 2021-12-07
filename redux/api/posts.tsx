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

interface GetPostRequest {
    postId: string;
}

interface GetUserPostsRequest {
    userAddress: string;
}

interface PostsPostRequest {
    childOf?: number | null;
    text: string;
    imageUrl?: string | null;
}

interface PostsPostResponse {
    message?: string;
    error?: string;
}

interface LikePostRequest {
    postId: number;
}
interface LikePostResponse {
    message?: string;
    error?: string;
}

interface UnlikePostRequest {
    postId: number;
}
interface UnlikePostResponse {
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
            query: ({ childOf, text, imageUrl }) => ({
                url: "posts/",
                method: "POST",
                body: {
                    childOf,
                    text,
                    imageUrl
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        }),
        likePost: builder.mutation<LikePostResponse, LikePostRequest>({
            query: ({ postId }) => ({
                url: `posts/like/${postId}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        }),
        unlikePost: builder.mutation<UnlikePostResponse, UnlikePostRequest>({
            query: ({ postId }) => ({
                url: `posts/unlike/${postId}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
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
    useUnlikePostMutation
} = postsApi;