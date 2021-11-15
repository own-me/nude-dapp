import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NftInterface } from "./nft";

interface GetUserNftsRequest {
    address: string;
}

interface GetUserNftsResponse {
    userNfts: NftInterface[];
}

export const nftDbApi = createApi({
    reducerPath: "nftDbApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getUserNfts: builder.query<GetUserNftsResponse, GetUserNftsRequest>({
            query: ({ address }) => ({
                url: `nft-db/user/${address}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        })
    }),
});

export const { useGetUserNftsQuery } = nftDbApi;