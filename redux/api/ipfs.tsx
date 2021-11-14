import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IpfsRequest extends FormData {

}

interface IpfsResponse {
    message?: string;
    error?: string;
    ipfsUrl?: string;
}

export const ipfsApi = createApi({
    reducerPath: "ipfsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postIpfsUpload: builder.mutation<IpfsResponse, IpfsRequest>({
            query: (formData) => ({
                url: "ipfs/upload",
                method: "POST",
                contentType: "multipart/form-data",
                body: formData
            }),
        }),
    }),
});

export const { usePostIpfsUploadMutation } = ipfsApi;