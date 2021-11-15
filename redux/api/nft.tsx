import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetNftRequest {
    tokenId: string;
}

interface TokenURIInterface{
    title: string;
    description: string;
    image: string;
}

interface GetNftResponse {
    tokenId: number;
    recipient: string;
    address: string;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    tokenURI: TokenURIInterface;
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
            }),
        })
    }),
});

export const { useGetNftQuery } = nftApi;