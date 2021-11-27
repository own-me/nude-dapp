import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetPostRequest {
	postId: string;
}

interface GetPostResponse {
	id: string;
	childOf?: string;
	text: string;
	creatorAddress: string;
	creatorName?: string;
    dateCreated: string;
    likesCount: number;
    commentCount: number;
    imageUrl?: string;
    profileImageUrl?: string;
}

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getPost: builder.query<GetPostResponse, GetPostRequest>({
            query: ({ postId }) => ({
                url: `posts/${postId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        })
    })
});

export const { useGetPostQuery } = postsApi;