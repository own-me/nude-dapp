import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FollowRequest {
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
            query: ({ followerId }) => ({
                url: "follow/",
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

export const { usePostFollowMutation } = followApi;