import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { UserInterface } from "../model/users.model";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  // global configuration for the api
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getPosts: builder.query<UserInterface, Omit<UserInterface, "id">>({
      query: (user) => ({
        url: "/users",
        method: "GET",
        body: user,
      }),
      // configuration for an individual endpoint, overriding the api setting
      keepUnusedDataFor: 5,
    }),
  }),
});
