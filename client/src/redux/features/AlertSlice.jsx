import {createSlice } from '@reduxjs/toolkit'

export const AlertSlice=createSlice({
    name:"alerts",
    initialState:{
        loading:false,
    },
    reducers:{
        showLoading:(state)=>{
            state.loading=true
        },
        highLoading:(state)=>{
            state.loading=false
        }
    }
})
export const { showLoading,highLoading}=AlertSlice.actions