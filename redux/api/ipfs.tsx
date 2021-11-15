import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IpfsResponse {
    message?: string;
    error?: string;
    ipfsUrl?: string;
}

export const ipfsApi = createApi({
    reducerPath: "ipfsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
    endpoints: (builder) => ({
        postIpfsUpload: builder.mutation<IpfsResponse, FormData>({
            query: (formData) => ({
                url: "ipfs/upload",
                method: "POST",
                contentType: "multipart/form-data",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }),
        }),
    }),
});

export const { usePostIpfsUploadMutation } = ipfsApi;