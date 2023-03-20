import { createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter()
const initialState =  usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints(
    {
        endpoints: builder =>({
            getUsers: builder.query({
                query:()=>'/users',
                transformResponse: responseData => {
                    return usersAdapter.setAll(initialState,responseData)
                },
                provideTags:(result,error,arg)=>[
                    {type: 'User',id:'LIST'},
                    ...result.ids.map({type:'User',id})
                ]
            })
        })
    }
)
export const {
    useGetUsersQuery
} = usersApiSlice
export const selectUserResult = usersApiSlice.endpoints.getUsers.select()
const selectUserData = createSelector(selectUserResult, userResult => userResult.data)
export const{
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
} = usersAdapter.getSelectors(state=>selectUserData(state)??initialState)
