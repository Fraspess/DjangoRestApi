import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {APP_ENV} from "../env";
import type {ICategory} from "../types/category/ICategory.ts"
import type {ICreateCategory} from "../types/category/ICreateCategory.ts";
import {serialize} from "object-to-formdata";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({baseUrl: APP_ENV.SERVER_URL + "api/categories"}),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        createCategory: builder.mutation<void, ICreateCategory>({
            query: (requestData) => {
                const formData = serialize(requestData)
                return {
                    url: "/",
                    method: "POST",
                    body: formData
                }
            }
        }),
        getCategories: builder.query<ICategory[], void>({
            query: () => '/',
            providesTags: ['Categories']
        }),

        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}/`,
                method: "DELETE",
            }),
        }),

        getCategory: builder.query<ICategory, string>({
            query: (id) => ({
                url: `/${id}/`,
                method: "GET"
            })
        }),

        patchCategory: builder.mutation<void, ICategory>({
            query: (requestData) => {
                const formData = serialize(requestData)
                return {
                    url: `/${requestData.id}/`,
                    method: "PATCH",
                    body: formData
                }
            },
            invalidatesTags:['Categories'],
        }),

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useGetCategoryQuery,
    usePatchCategoryMutation,
} = categoryApi