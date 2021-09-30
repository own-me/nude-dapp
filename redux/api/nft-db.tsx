import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface NftDbRequest {

}

interface NftDbResponse {
    
}

export const nftDbApi = createApi({
    reducerPath: "nftDbApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        getAllNfts: builder.query<NftDbResponse, NftDbRequest>({
            query: () => ({
                url: `nft-db/all`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        })
    }),
});

export const { useGetAllNftsQuery } = nftDbApi;