import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ProposalInterface {
	proposalId: string;
	description: string;
}

export const proposalsApi = createApi({
    reducerPath: "proposalsApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.IS_DEV === "true" ? "http://localhost:3000/" : "https://api.ownme.io/" }),
    endpoints: (builder) => ({
        getList: builder.query<{proposals: ProposalInterface[]}, {query: string, page: number}>({
            query: ({query, page}) => ({
                url: `proposals/list/?page=${page}`,
                method: "GET",
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })

        })
    })
});

export const {
    useGetListQuery
} = proposalsApi;