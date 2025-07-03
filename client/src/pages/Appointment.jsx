import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../component/Layout";
import moment from "moment";
import { message, Table,Button } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UpdateAppointement from "./UpdateAppointement";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showCancelled, setShowCancelled] = useState(false);
  const getAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data)
      if (res.data.success) {
        setAppointments(res.data.data);
        console.log(appointments);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelAppointment=async(record,status)=>{
      try {
        const res=await axios.post(`http://localhost:8080/api/v1/user/cancel-appointment`,{appointmentId:record._id,status},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      if(res.data.success){
        message.success("Appointment cancled successfully");
        getAppointments()
      }else{
        message.error("Failed to cancel appointment.");
      }
      } catch (error) {
        console.log(error.message);
        message.error("something went wrong")
      }
  }
  const updateAppointment=async(id)=>{
    
    navigate(`/updateAppointment/${id}`)
  }

  useEffect(() => {
    getAppointments();
  }, []);
  const filteredAppointments = showCancelled
    ? appointments.filter(
      (record)=> record.status.toLowerCase() ==="cancelled" )
    : appointments.filter(
        (record) => record.status.toLowerCase() !== "cancelled"
      );
  const toggleView = () => {
    setShowCancelled(!showCancelled);
  };
  const columns = [
    
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) =><span>{record.doctorInfo.phone}</span>,
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
                                
                                <button className="btn btn-danger ms-2" onClick={()=>cancelAppointment(record,
                                  'Cancelled'
                                ) }>Cancel</button>
                        </div>
                    )}
                    {
                      
                      record.status === "approved" && (
                        <div className='d-flex '>
                                <button className="btn btn-primary ms-2" onClick={()=>updateAppointment(record._id)}>Update</button>
                        </div>
                    )

                    }
                
            </div>
          )
        },
  ];

  return (
    <Layout>
      <h1>Appoinmtnets Lists</h1>
       <Button className="btn btn-secondary ml-2 " style={{ marginleft: "80%" }} onClick={toggleView}>
          {showCancelled ? "All" :"Cancelled"}
        </Button>
         <h1>{showCancelled ? " Cancelled Appointment ":''}</h1>
        
      <Table columns={columns} dataSource={filteredAppointments} />
    </Layout>
  );
};

export default Appointments;