import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IpfsRequest {
    image: string | ArrayBuffer;
}

interface IpfsResponse {
    message: string;
}

export const ipfsApi = createApi({
    reducerPath: "ipfsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postIpfsUpload: builder.mutation<IpfsResponse, IpfsRequest>({
            query: ({ image }) => ({
                url: "ipfs/upload",
                method: "POST",
                body: {
                    image
                }
            }),
        }),
    }),
});

export const { usePostIpfsUploadMutation } = ipfsApi;