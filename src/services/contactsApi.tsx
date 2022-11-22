import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ContactInterface } from "../model/contact.model"
import { providerTags } from './providerTags'


export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  tagTypes: [providerTags.GetContacts],
  endpoints: (builder) => ({
    GetContacts: builder.query<ContactInterface[], void>({
      keepUnusedDataFor: 30,
      query: () => "/users",
      providesTags: [providerTags.GetContacts],
    }),
    GetContactsDetail: builder.query<ContactInterface, string>({
      keepUnusedDataFor: 30,
      query: (id) => `/users/${1}`,
      providesTags: [providerTags.GetContacts],
    }),
    deleteUser: builder.mutation<void, string>({
      invalidatesTags: (result, error, arg) => {
        if(error) return []
        return [providerTags.GetContacts]
      },
      query:(id)=> ({
        url: `/users/${id}`,
        method: 'DELETE',
      })
    }),
    addUser: builder.mutation<ContactInterface, Omit<ContactInterface, "id">>({
      invalidatesTags: (result, error, arg) => {
        if(error) return []
        return [providerTags.GetContacts]
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
  useGetContactsQuery,
  useGetContactsDetailQuery,
  useDeleteUserMutation,
  useAddUserMutation,
} = contactsApi
