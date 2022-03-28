import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Person {
    firstName: string;
    lastName: string;
    idNumber?: string;
    gender?: string;
    dateOfBirth?: string;
}

interface Document {
    number: string,
    type: string,
    country: string
}

interface Verification {
    callback: string;
    person: Person;
    document: Document;
    vendorData?: string;
    timestamp: string;
}

interface CreateVerifySessionRequest {
    verification: Verification;
}

interface VerificationResponse {
    id: string;
    url: string;
    sessionToken: string;
    baseUrl: string;
}

interface CreateVerifySessionResponse {
    status: string;
    verification: VerificationResponse;
}

export const verifyApi = createApi({
    reducerPath: "verifyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://stationapi.veriff.com/v1/" }),
    endpoints: (builder) => ({
        createVerifySession: builder.mutation<CreateVerifySessionResponse, CreateVerifySessionRequest>({
            query: (body) => ({
                url: "sessions/",
                method: "POST",
                body,
                headers: {
                    ...(localStorage.getItem("token") && { Authorization: `Bearer ${localStorage.getItem("token")}` })
                }
            })
        })
    })
});

export const { useCreateVerifySessionMutation } = verifyApi;