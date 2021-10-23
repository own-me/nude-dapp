import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Follower {
    fromAddress: string;
    id: number;
    toAddress: string;
}

interface FollowRequest {
    toAddress: string;
}

interface FollowResponse {
    message: string;
    ok: boolean;
}

export const followApi = createApi({
    reducerPath: "followApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postFollow: builder.mutation<FollowResponse, FollowRequest>({
            query: ({ toAddress }) => ({
                url: "follow/",
                method: "POST",
                body: {
                    toAddress
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
    }),
});

export const { usePostFollowMutation } = followApi;