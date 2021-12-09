import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetNftRequest {
    tokenId: string;
}

interface GetNftResponse {
    nft: NftInterface;
    ownerName: string;
    isLiked: boolean;
    likesCount: number;
    viewsCount: number;
}

export interface TokenURIInterface {
    title: string;
    description: string;
    image: string;
}

interface GetUserNftsRequest {
    address: string;
}

interface PostNftLikeRequest {
    fromAddress: string;
    tokenId: string;
}

interface PostNftLikeResponse {
    message: string;
}

interface GetSearchNftsRequest {
    query: string;
}

interface GetSearchNftsResponse {
    message?: string;
    error?: string;
    nfts?: NftInterface[];
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
}

export const nftApi = createApi({
    reducerPath: "nftApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getNft: builder.query<GetNftResponse, GetNftRequest>({
            query: ({ tokenId }) => ({
                url: `nft/${tokenId}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        }),
        getUserNfts: builder.query<NftInterface[], GetUserNftsRequest>({
            query: ({ address }) => ({
                url: `nft/user/${address}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        }),
        postNftLike: builder.mutation<PostNftLikeResponse, PostNftLikeRequest>({
            query: ({ fromAddress, tokenId }) => ({
                url: "nft/like",
                method: "POST",
                body: {
                    fromAddress,
                    tokenId
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        }),
        getSearchNfts: builder.query<GetSearchNftsResponse, GetSearchNftsRequest>({
            query: ({ query }) => ({
                url: `nft/search/${query}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        })
    })
});

export const { useGetNftQuery, useGetUserNftsQuery, usePostNftLikeMutation, useGetSearchNftsQuery } = nftApi;