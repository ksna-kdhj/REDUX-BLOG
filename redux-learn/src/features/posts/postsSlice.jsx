import { createSlice,nanoid,createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import {sub} from 'date-fns'
import axios from 'axios'
const posts_url =  'https://jsonplaceholder.typicode.com/posts'
const postsAdapter =createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})
const initialState = postsAdapter.getInitialState({
    status:'idle',
    error: null,
    count:0
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async()=>{
    try{
    const response = await axios.get(posts_url)
    return response.data
    }catch(err){
        return err.msg
    }
})

export const addNewPost = createAsyncThunk('post/addNewPost',async(initialPost)=>{
    try{
        const response = await axios.post(posts_url, initialPost)
        return response.data
    }catch(err){
        return initialPost
    }
})
export const editPost = createAsyncThunk('edit/editPost',async(initialPost)=>{
    const {id} = initialPost
    try{
        const response = await axios.put(`${posts_url}/${id}`, initialPost)
        return response.data
    }catch(err){
        return initialPost
    }
})
export const deletePost = createAsyncThunk('delete/deletePost',async(initialPost)=>{
    const {id} = initialPost
    try{
        const response =  await axios.delete(`${posts_url}/${id}`)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
        }catch(err){
        return err.message
    }
})


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers:{
    reactionAdded (state,action) {
        const {postId,reaction} =action.payload
        const existingPost = state.entities[postId]
        if (existingPost)
        existingPost.reactions[reaction]++
    },
    increaseCount(state,action){
        state.count++
    }

},
extraReducers(builder){
    builder
    .addCase(fetchPosts.pending, (state,action)=>{
        state.status = 'loading'
    })
    .addCase(fetchPosts.fulfilled, (state,action)=>{
        state.status = 'succeeded'
        let min=1
        console.log(action.payload)
        const loadedPosts = action.payload.map(post =>{
            post.date = sub(new Date(),{minutes:min++}).toISOString()
            post.reactions={
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
            return post
        })
        postsAdapter.upsertMany(state,loadedPosts)
    })
    .addCase(fetchPosts.rejected,(state,action)=>{
        state.status = 'failed'
        state.error = action.error.message
    })
    .addCase(addNewPost.fulfilled,(state,action)=>{
        action.payload.userId = Number(action.payload.userId)
        action.payload.date =  new Date().toISOString()
        action.payload.reactions = {
            thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
        }
        // console.log(action.payload)
        postsAdapter.addOne(state,action.payload)
    })
    .addCase(editPost.fulfilled,(state,action)=>{
        if(!action.payload?.id){
            console.error('could not update post')
        return
        }
        action.payload.date = new Date().toISOString()
        postsAdapter.upsertOne(state,action.payload)
    })
    .addCase(deletePost.fulfilled,(state,action)=>{
        if(!action.payload?.id){
            console.error('could not delete post')
        return
        }
        const {id} =action.payload
        postsAdapter.removeOne(state,id)
     })
}
})

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)


export const {increaseCount,reactionAdded} = postsSlice.actions
export const selectPostByUser =createSelector([selectAllPosts,(state,userID) => userID], (posts,userID) => posts.filter(post=> post.userId === userID))
export const getPostStatus = (state) => state.posts.status 
export const getPostError = (state) => state.posts.error
export const getCount = (state) => state.posts.count

export default postsSlice.reducer