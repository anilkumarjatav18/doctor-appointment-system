import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input,message } from "antd";
import { Link ,useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux'
import { showLoading,highLoading } from "../redux/features/alertSlice";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const onfinishHandler = async (values) => {
    try {
        dispatch(showLoading())
      const res = await axios.post("http://localhost:8080/api/v1/user/login",values);
      window.location.reload()
      dispatch(highLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(highLoading())
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login From</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
