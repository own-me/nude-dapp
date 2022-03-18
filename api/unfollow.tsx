import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const unfollowApi = createApi({
    reducerPath: "unfollowApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postUnfollow: builder.mutation<{ message: string, ok: boolean }, { toAddress: string }>({
            query: ({ toAddress }) => ({
                url: "unfollow/",
                method: "POST",
                body: {
                    toAddress
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const { usePostUnfollowMutation } = unfollowApi;