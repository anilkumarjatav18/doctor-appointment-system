import Layout from '../component/Layout'
import BookingPage from './BookingPage'
import React, { useEffect, useState } from 'react'
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateAppointement() {
    const params = useParams(); // this will get the appointment or doctor id from the URL
    
  const [doctors, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Fetch doctor or appointment details
  const getAppointments=async()=>{
    try{
        console.log(params.id)
         const res = await axios.post(
        "http://localhost:8080/api/v1/doctor/doctor-appointment-update",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
        if (res.data.success) {
          setDoctor(res.data.data);
          console.log(doctors)
        }

    }catch(error){
  console.error("Error fetching doctor info:", error);
    }
  }
    const getUserData = async () => {
      try {
        console.log(params.id)
         const res = await axios.post(
        "http://localhost:8080/api/v1/doctor/doctor-appointment-update",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
        if (res.data.success) {
          setDoctor(res.data.data);
          console.log(doctors)
        }
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };
    const handleBooking=async()=>{
      try{
        if(!date && !time){
          return alert(" Date and Time is required ");
        }
        const res=await axios.post("http://localhost:8080/api/v1/user/updateAppointment",{
          appointmentId:doctors._id,
          date:date,
          time:time,
        },{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }

        })
        if (res.data.success) {
                message.success(res.data.message);
                console.log(res.data.data);
              }else{
                message.error(res.data.message)
              }

      }catch(error){
        console.log(error);
      }
    }

  useEffect(() => {
      getAppointments();
      //eslint-disable-next-line
    }, []);
  return (
    <Layout>
      <h3>Update AppointMent</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4 >
              Dr. {doctors.doctorInfo.firstName} {doctors.doctorInfo.lastName}
              
            </h4>
            <h4>Fees : {doctors.doctorInfo.feesPerCunsaltation}</h4>
            <h4>
              Timings : {doctors.doctorInfo.timings && doctors.doctorInfo.timings[0]} -{" "}
              {doctors.doctorInfo.timings && doctors.doctorInfo.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                 
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
               
                onChange={(value) => {
                  if (value) {
      setTime(value.format("HH:mm"));  // value is already a moment object, no need to wrap again
    } 
                }}
              />

              <button
                className="btn btn-primary mt-2"
                // onClick={handleAvailability}
              >
                Check Availability
              </button>

              <button className="btn btn-dark mt-2"
             onClick={handleBooking}
               >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default UpdateAppointement
