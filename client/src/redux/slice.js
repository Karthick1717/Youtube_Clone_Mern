import {createSlice} from "@reduxjs/toolkit"
const userSlice=createSlice({
    name:"user",
    initialState:{
        token:null,
        search:null,
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        removeToken:(state)=>{
            state.token=null
        },
        setSearch:(state,action)=>{
            state.search=action.payload
        }
    }
})
export const {setToken,removeToken,setSearch}=userSlice.actions
export default userSlice.reducer