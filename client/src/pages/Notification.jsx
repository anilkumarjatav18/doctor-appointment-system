import React, { useEffect } from 'react'
import Layout from '../component/Layout'
import { message, notification, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Children } from 'react'
import { highLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

function Notification() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{user}=useSelector(state=>state.user)

    //handle the notification 
    const handleMarkAllRead=async()=>{
       try {
              dispatch(showLoading) ;
              const res=await axios.post("http://localhost:8080/api/v1/user/get-all-notification",
                {userId:user._id},
                {
                    headers:{
                       Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                })
                dispatch(highLoading);

                if(res.data.message){
                    message.success(res.data.message)
                }else{
                    message.error(res.data.message)
                }
              
       } catch (error) {
        dispatch(highLoading)
        console.log(error)
        message.error("something Went wrong")
       }
    }
    //delete Notification
    const handleDeleteAllRead=async()=>{
        try {
            dispatch(showLoading) ;
            const res=await axios.post("http://localhost:8080/api/v1/user/delete-all-notification",
              {userId:user._id},
              {
                  headers:{
                     Authorization:`Bearer ${localStorage.getItem("token")}`
                  }
              })
              dispatch(highLoading);

              if(res.data.message){
                  message.success(res.data.message)
              }else{
                  message.error(res.data.message)
              }
            
     } catch (error) {
      dispatch(highLoading)
      console.log(error)
      message.error("something Went wrong")
     }
    }
    // useEffect(()=>{
    //   console.log (user.notification); 
    // })
   
    
  return (
   <Layout>
    {/*  After that we have to update the route so the notification is shown in the notification tab */}
    <h1 className='p-3 text-center'>Notification page</h1>
    <Tabs>
    <Tabs.TabPane tab='Un Read' key={0}>
            <div className='d-flex justify-content-end' >
                 <h4 className='p-2 text-primary' style={{cursor:"pointer"}} onClick={handleMarkAllRead}>
                    Mark All Read   
                 </h4>
            </div>
            {user?.notification.map((notificationMsg)=>(
                <div 
                className='card'
                style={{cursor:"pointer" ,marginBottom: "10px"}}
                >
               <div
               className='card-text' onClick={navigate(notificationMsg.onClickPath)}
               >
                {notificationMsg.message}
               </div>
                </div>
            ))}
    </Tabs.TabPane>
    <Tabs.TabPane tab='Read' key={1}>
            <div className='d-flex justify-content-end'>
                 <h4 className='p-2 text-primary' style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>
                    Delete All Read  
                 </h4>
            </div>
            {user?.seenotification.map((notificationMsg)=>(
                <div 
                className='card'
                style={{cursor:"pointer"}}
                >
               <div
               className='card-text' onClick={navigate(notificationMsg.onClickPath)}
               >
                {notificationMsg.message}

               </div>
                </div>
            ))}
    </Tabs.TabPane>
    </Tabs>
   </Layout>
  )
}

export default Notification
