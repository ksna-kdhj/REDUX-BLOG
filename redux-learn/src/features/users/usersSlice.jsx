import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const initialState = []
export const fetchUsers = createAsyncThunk('users/fetchUsers',async()=>{
    try{
    const response = await axios.get(USERS_URL)
    return response.data
    }catch(err){
        console.error(err);
    }
})


const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state,action)=>{
            return action.payload
        })
    }
})

export const selectAllUsers = (state)=>state.users
console.log('here')
export const selectUserById = (state,userID)=>state.users.find(user=> user.id === userID)

export default usersSlice.reducer