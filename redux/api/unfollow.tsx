import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UnfollowRequest {
    followerId: string;
}

interface UnfollowResponse {
    message: string;
    ok: boolean;
}

export const unfollowApi = createApi({
    reducerPath: "unfollowApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postUnfollow: builder.mutation<UnfollowResponse, UnfollowRequest>({
            query: ({ followerId }) => ({
                url: "unfollow/",
                method: "POST",
                body: {
                    followerId
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
    }),
});

export const { usePostUnfollowMutation } = unfollowApi;