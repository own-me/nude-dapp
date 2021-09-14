import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FollowRequest {
    userId: number;
    followerId: string;
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
            query: ({ userId, followerId }) => ({
                url: "follow/",
                method: "POST",
                body: {
                    userId, 
                    followerId
                }
            }),
        }),
    }),
});

export const { usePostFollowMutation } = followApi;