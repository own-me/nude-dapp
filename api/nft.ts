import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TokenURIInterface {
    title: string;
    description: string;
    image: string;
    hashtags: string[];
}

export interface NftInterface {
    tokenId: number;
    recipient: string;
    address: string;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    tokenURI: TokenURIInterface;
    price: string;
    ownerName?: string;
    isLiked?: boolean;
    likesCount: number;
    viewsCount: number;
}

interface GetNftResponse {
    nft: NftInterface;
    ownerName?: string;
    isLiked?: boolean;
    likesCount: number;
    viewsCount: number;
}

export const nftApi = createApi({
    reducerPath: "nftApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV === "true" ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        getNft: builder.query<GetNftResponse, { tokenId: number }>({
            query: ({ tokenId }) => ({
                url: `nft/${tokenId}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getUserNfts: builder.query<NftInterface[], { address: string }>({
            query: ({ address }) => ({
                url: `nft/user/${address}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        postNftLike: builder.mutation<{ message?: string }, { tokenId: number }>({
            query: ({ tokenId }) => ({
                url: "nft/like",
                method: "POST",
                body: {
                    tokenId
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        postNftUnlike: builder.mutation<{ message?: string }, { tokenId: number }>({
            query: ({ tokenId }) => ({
                url: "nft/unlike",
                method: "POST",
                body: {
                    tokenId
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        getSearchNfts: builder.query<{ nfts: NftInterface[], message?: string, error?: string }, { query: string, page: number }>({
            query: ({ query, page }) => ({
                url: `nft/search/${query}?page=${page}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        }),
        postNftReport: builder.mutation<{ message?: string }, { tokenId: number, reason: string }>({
            query: ({ tokenId, reason }) => ({
                url: "nft/report",
                method: "POST",
                body: {
                    tokenId,
                    reason
                },
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const {
    useGetNftQuery,
    useGetUserNftsQuery,
    usePostNftLikeMutation,
    usePostNftUnlikeMutation,
    usePostNftReportMutation,
    useGetSearchNftsQuery
} = nftApi;