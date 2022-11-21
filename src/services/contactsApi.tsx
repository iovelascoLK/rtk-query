import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UserInterface } from "../model/contact.model"
import { providerTags } from './providerTags'


export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  tagTypes: [providerTags.GetUser],
  endpoints: (builder) => ({
    getUsers: builder.query<UserInterface[], void>({
      keepUnusedDataFor: 30,
      query: () => "/users",
      providesTags: [providerTags.GetUser],
    }),
    getUserDetail: builder.query<UserInterface, string>({
      keepUnusedDataFor: 30,
      query: (id) => `/users/${1}`,
      providesTags: [providerTags.GetUser],
    }),
    deleteUser: builder.mutation<void, string>({
      invalidatesTags: (result, error, arg) => {
        if(error) return []
        return [providerTags.GetUser]
      },
      query:(id)=> ({
        url: `/users/${id}`,
        method: 'DELETE',
      })
    }),
    addUser: builder.mutation<{}, Omit<UserInterface, "id">>({
      invalidatesTags: (result, error, arg) => {
        if(error) return []
        return [providerTags.GetUser]
      },
      query:(user) => ({
        url:"/users",
        method:'POST',
        body: user
      })
    })
  }),
})

export const {
  useGetUsersQuery,
  useGetUserDetailQuery,
  useDeleteUserMutation,
  useAddUserMutation,
} = contactsApi
