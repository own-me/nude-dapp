import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ipfsApi = createApi({
    reducerPath: "ipfsApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        postIpfsUpload: builder.mutation<{ ipfsUrl?: string, message?: string, error?: string }, FormData>({
            query: (formData) => ({
                url: "ipfs/upload",
                method: "POST",
                contentType: "multipart/form-data",
                body: formData,
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const { usePostIpfsUploadMutation } = ipfsApi;