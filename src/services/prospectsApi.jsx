import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../slices/api";

export const prospectsApi = createApi({
    reducerPath: "prospectsApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ["Prospect"],
    endpoints: (builder) => ({
        prospects: builder.query({
            query: () => "/prospects/all",
            providesTags: ["Prospect"],
        }),
        userProspects: builder.query({
            query: (user_id) => `/prospects/user-prospects/find/${user_id}`,
            providesTags: ["Prospect"],
        }),
        prospect: builder.query({
            query: (id) => `/prospects/find/${id}`,
            providesTags: ["Prospect"],
        }),
        addProspect: builder.mutation({
            query: (prospect) => ({
                url: "/prospects/create",
                method: "POST",
                body: prospect,
            }),
            invalidatesTags: ["Prospect"],
        }),
        deleteProspect: builder.mutation({
            query: (id) => ({
                url: `/prospects/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Prospect"],
        }),
        updateProspect: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/prospects/edit/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Prospect"],
        }),
    }),
});

export const { 
    useProspectsQuery, 
    useUserProspectsQuery, 
    useProspectQuery, 
    useAddProspectMutation, 
    useDeleteProspectMutation,
    useUpdateProspectMutation,
} = prospectsApi;