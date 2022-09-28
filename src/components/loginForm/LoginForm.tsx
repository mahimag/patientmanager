import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addAccessTokensToLocalStorage,
  addDefaultsToAxios,
} from "../../utils/localStorage";
import "./LoginForm.css";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await axios("/signin", {
        method: "POST",
        data: credentials,
      });

      if (res.data) {
        const data = res.data.data;
        console.log("data", data);
        addAccessTokensToLocalStorage(data.accessToken, "true", data.id);
        addDefaultsToAxios();
        navigate("/patient");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      id="loginForm"
    >
      <Form.Item
        name="email"
        className="loginForm__item"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        className="loginForm__item"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        className="loginForm__btn"
        wrapperCol={{ offset: 11, span: 16 }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <p>
        Not a member? <Link to="/register">Register!</Link>
      </p>
    </Form>
  );
};

export default LoginForm;
