import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todoserver-irit.onrender.com/api/v1/",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    signUp: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
        body: {},
      }),
    }),
    getTodos: builder.query({
      query: () => ({
        url: "/todos",
        method: "GET",
      }),
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo._id}`,
        method: "PUT",
        body: todo,
      }),
    }),
    toggleTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo._id}`,
        method: "PATCH",
        body: { title: todo.title, completed: todo.completed },
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
} = api;
