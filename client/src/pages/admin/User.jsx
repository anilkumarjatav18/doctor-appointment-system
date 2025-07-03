import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import axios from 'axios'
import { Table } from 'antd'
function User() {
   const [users,setUsers]=useState([])
   const getUsers=async()=>{
        try {
         const res=await axios.get("http://localhost:8080/api/v1/admin/getAllusers",{
            headers:{
               Authorization:`Bearer ${localStorage.getItem("token")}`
            }
         })
         if(res.data.success){
            setUsers(res.data.data)
         }
        } catch (error) {
         console.log(error)
        }
   }
   useEffect(()=>{
      getUsers()
   },[])
   const columns=[
      {
         title:"Name",
         dataIndex:'name'
      },
      {
         title:"Email",
         dataIndex:'email'
      },
      {
         title:"isDoctor",
         dataIndex:"isDoctor",
         render:(text,record)=>(
            <span>{record.isDoctor ?'Yes' :'No'}</span>
         )
      },
      {
         title:'Actions',
         dataIndex:"actions",
         render:(text,record)=>(
            <div className='d-flex'
            >
         <button className='btn btn-danger'>Block</button>
            </div>
         ),
      },
   ]
  return (
     <Layout>
        <h4>User List</h4>
        <Table columns={columns} dataSource={users}/>
     </Layout>
  )
}

export default User

