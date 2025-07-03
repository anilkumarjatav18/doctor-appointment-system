import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import axios from "axios";

import moment from "moment";
import { message, Table } from "antd";

function DoctorAppointment() {
    const [appointments, setAppointments] = useState([]);
    
    const getAppointments = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/v1/doctor/doctor-appointment", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          console.log(res.data)
          if (res.data.success) {
            setAppointments(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getAppointments();
      }, []);
      const handleStatus=async(record,status)=>{
               try {
                const res=await axios.post("http://localhost:8080/api/v1/doctor/update-status",{appointmentId:record._id,status},{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                })
                if (res.data.success) {
                    message.success(res.data.message)
                    getAppointments()
                  }

               } catch (error) {
                console.log(error)
                message.error("SomeThing Went Wrong")
               }
      }
    const columns = [
        {
          title: "ID",
          dataIndex: "_id",
        },
        {
      title: "Patient Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.userInfo.name} 
        </span>
      ),
    },     
        {
          title: "Date & Time",
          dataIndex: "date",
          render: (text, record) => (
            <span>
              {moment(record.date).format("DD-MM-YYYY")} &nbsp;
              {moment(record.time).format("HH:mm")}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render:(text,record)=>(
            <div className='d-flex '>
                
                    {record.status === "pending" && (
                        <div className='d-flex '>
                                <button className="btn btn-success ms-2" onClick={()=> handleStatus(record,'approved')}>Approve</button>
                                <button className="btn btn-danger ms-2" onClick={()=> handleStatus(record,'reject')}>Reject</button>
                        </div>
                    )}
                
            </div>
          )
        },
      ];
  return (
    <Layout>
        <h1>Appoinmtnets Lists</h1>
        <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default DoctorAppointment
