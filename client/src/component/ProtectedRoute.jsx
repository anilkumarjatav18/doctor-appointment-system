import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { highLoading, showLoading } from '../redux/features/AlertSlice'
import axios from 'axios'
import { setUser } from '../redux/features/UserSlice'

function ProtectedRoute({children}) {
  const dispatch=useDispatch()
      const {user}=useSelector(state=>
        state.user
      )

  //getUser
  const getUser=async()=>{
    try {
      dispatch(showLoading)
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(highLoading())
      if(res.data.success){
        dispatch(setUser(res.data.data))
      }else{
        <Navigate to="/login" />
      }
    } catch (error) {
      dispatch(highLoading())
      console.log(error)
    }
  }
  useEffect(()=>{
    if(!user){
      getUser()
    }
  },[user,getUser])
  if(localStorage.getItem("token")){ 
    return children
  }else{
    return <Navigate to="/login"/>
  }
}

export default ProtectedRoute
