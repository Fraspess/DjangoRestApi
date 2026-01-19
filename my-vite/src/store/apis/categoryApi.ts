import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {APP_ENV} from "../../env";
import type {ICreateCategory} from "../../types/ICreateCategory.ts";
import type {ServiceResponse} from "../../types/ServiceResponse.ts";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: APP_ENV.SERVER_URL + "api/categories" }),
    endpoints: (builder) => ({
        createCategory: builder.mutation<ServiceResponse<null>, ICreateCategory>({
            query: (formData) => ({ url: "/", method: "post", body: formData }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateCategoryMutation } = categoryApi