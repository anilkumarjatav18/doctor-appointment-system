import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import axios from 'axios'
import { message, Table } from 'antd'
function Doctor() {
   const [doctors,setdoctors]=useState([])
   const getUsers=async()=>{
        try {
         const res=await axios.get("http://localhost:8080/api/v1/admin/getAllDocors",{
            headers:{
               Authorization:`Bearer ${localStorage.getItem("token")}`
            }
         })
         if(res.data.success){
            setdoctors(res.data.data)
         }
        } catch (error) {
         console.log(error)
        }
   }
   const handleAccountStatus=async(record,status)=>{
    try {
      const res=await axios.post("http://localhost:8080/api/v1/admin/changeAccountStatus",{doctorId:record._id,userId:record.userId,status:status},{
         headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
         }
      })
      if(res.data.success){
         message.success(res.data.message)
      }
     } catch (error) {
      message.error("something went wrong")
     }
   }
   
   useEffect(()=>{
      getUsers()
   },[])
   const columns=[
      {
         title:"Name",
         dataIndex:'name',
         render:(text,record)=>(
               <span>{record.firstName} {record.lastName}</span>
         )
      },
      {
         title:"Status",
         dataIndex:'status'
      },
      {
         title:"Phone Number",
        dataIndex:'phone'
      },
      {
         email:"Email",
        dataIndex:'email'
      },
      {
         title:'Actions',
         dataIndex:"actions",
         render:(text,record)=>(
            <div className='d-flex'
            >
              {record.status==="pending" ? <buttton className="btn btn-success" onClick={()=>handleAccountStatus(record,"approved")}>Approve</buttton> :
              <buttton className="btn btn-danger">Reject</buttton>
              }
            </div>
         ),
      },
   ]
  return (
     <Layout>
        <h4>Doctor List</h4>
        <Table columns={columns} dataSource={doctors}/>
     </Layout>
  )
}

export default Doctor;

