import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../slices/api";

export const followsApi = createApi({
    reducerPath: "followsApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getFollows: builder.query({
            query: () => "/follows/all",
        }),
        getUserFollows: builder.query({
            query: (user_id) => `/follows/user-follows/find/${user_id}`,
        })
    }),
});

export const {
    useGetUserFollowsQuery,
} = followsApi;