import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Following {
    fromAddress: string;
    toAddress: string;
    toProfileImageUrl: string;
    name: string;
    followersCount: number;
    nftsCount: number;
}

export const followApi = createApi({
    reducerPath: "followApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV ? "http://localhost:3000/" : "http://api.ownme.io:3000/" }),
    endpoints: (builder) => ({
        postFollow: builder.mutation<{ message: string, ok: boolean }, { toAddress: string }>({
            query: ({ toAddress }) => ({
                url: "follow/",
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

export const { usePostFollowMutation } = followApi;