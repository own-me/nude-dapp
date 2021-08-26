import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IpfsRequest {
    image: string | ArrayBuffer;
    filename: string;
}

interface IpfsResponse {
    message: string;
    ok: boolean;
}

export const ipfsApi = createApi({
    reducerPath: "ipfsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postIpfsUpload: builder.mutation<IpfsResponse, IpfsRequest>({
            query: ({ image, filename }) => ({
                url: "ipfs/upload",
                method: "POST",
                body: {
                    image,
                    filename
                }
            }),
        }),
    }),
});

export const { usePostIpfsUploadMutation } = ipfsApi;