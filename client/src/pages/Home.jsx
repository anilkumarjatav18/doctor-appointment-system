import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../component/Layout"
import { Row } from "antd";
import DoctorList from "../component/DoctorList";
const HomePage = () => {
  const [doctors,setDoctor]=useState([])
  const [search, setSearch] = useState("");
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        setDoctor(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.firstName.toLowerCase().includes(search.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
    <input
        type="text"
        placeholder="Search doctor by name or specialization"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          margin: "20px 20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
       
       {filteredDoctors.length >0 ?(
        <Row>
         {filteredDoctors.map((doctor) => (
          <DoctorList key={doctor._id} doctor={doctor} />
        ))}
      </Row>
       ):(
  <h3 className="text-center">No doctors found</h3>
)}
     
    </Layout>
  );
};

export default HomePage;