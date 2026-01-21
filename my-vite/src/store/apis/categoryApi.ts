import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {APP_ENV} from "../../env";
import type {ICreateCategory} from "../../types/ICreateCategory.ts";
import type {ServiceResponse} from "../../types/ServiceResponse.ts";
import type {ICategory} from "../../types/ICategory.ts";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({baseUrl: APP_ENV.SERVER_URL + "api/categories"}),
    endpoints: (builder) => ({
        createCategory: builder.mutation<ServiceResponse<null>, FormData>({
            query: (formData) => ({url: "/", method: "post", body: formData}),
        }),
        getCategories: builder.query<ICategory[], void>({
            query: () => '/',
        }),

        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}/`,
                method: "DELETE",
            }),
        }),

        getCategory: builder.query<ICategory, number>({
            query: (id) => `/${id}/`
        })

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useCreateCategoryMutation, useGetCategoriesQuery, useDeleteCategoryMutation, useGetCategoryQuery} = categoryApi