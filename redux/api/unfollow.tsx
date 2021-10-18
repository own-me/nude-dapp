import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UnfollowRequest {
    toAddress: string;
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
            query: ({ toAddress }) => ({
                url: "unfollow/",
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

export const { usePostUnfollowMutation } = unfollowApi;