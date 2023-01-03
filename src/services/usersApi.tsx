import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetUserApiArg,
  GetUserApiResponse,
  UserInterface,
} from "../model/users.model";
import { providerTags } from "./providerTags";

// is the core of RTK Query's functionality.
// It allows define a set of "endpoints"
// and how retrieve data
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: [providerTags.GetContacts],
  endpoints: (builder) => ({
    // explain response and argunment
    GetContacts: builder.query<UserInterface[], void>({
      // this query argument can be a object or a simple string
      query: () => "/users",
      providesTags: [providerTags.GetContacts],
    }),
    GetContactsDetail: builder.query<UserInterface, string>({
      query: (id) => `/users/${1}`,
      providesTags: [providerTags.GetContacts],
    }),
    deleteUser: builder.mutation<void, string>({
      invalidatesTags: (result, error, arg) => {
        if (error) return [];
        return [providerTags.GetContacts];
      },
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    addUser: builder.mutation<UserInterface, Omit<UserInterface, "id">>({
      invalidatesTags: (result, error, arg) => {
        if (error) return [];
        return [providerTags.GetContacts];
      },
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactsDetailQuery,
  useDeleteUserMutation,
  useAddUserMutation,
} = usersApi;
