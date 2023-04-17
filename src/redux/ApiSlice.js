import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
 import {nanoid} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery : fetchBaseQuery({baseUrl: "http://localhost:2020"}),
     endpoints:(builder) => ({
         getTodo: builder.query({
             query:() => "/todo",
             providesTags: ['Todos']
         }),
         addTodo:builder.mutation({
             query:(arg) => ({
                 url : "/todo",
                 method: 'POST',
                 body: arg,
             }),
             invalidatesTags : ['Todos'],
         }),
         updateTodo : builder.mutation({
             query:(arg) => ({
                 url:`/todo/${arg.id}`,
                 method:'PATCH',
                 body: arg
             }),
             invalidatesTags : ['Todos']

         }),
         deleteTodo: builder.mutation({
             query:({id}) => ({
                  url:`/todo/${id}`,
                  method: "DELETE",
                  body:id
             }),
             invalidatesTags : ['Todos']

         })

     })
})

export const {useGetTodoQuery,useAddTodoMutation,useUpdateTodoMutation,useDeleteTodoMutation} = apiSlice

