import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((user: any) => ({
                type: "User",
                id: user.id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    updateUserRole: builder.mutation({
      query: (args) => ({
        url: `/user/${args.id}/role`,
        method: "PATCH",
        body: { role: args.role },
      }),
      invalidatesTags: (result, error, args) => [{ type: "User", id: args.id }],
    }),

    updateUserStatus: builder.mutation({
      query: (args) => ({
        url: `/user/${args.id}/status`,
        method: "PATCH",
        body: { status: args.status },
      }),
      invalidatesTags: (result, error, args) => [{ type: "User", id: args.id }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} = userApi;
