import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  addAccessTokensToLocalStorage,
  addDefaultsToAxios,
} from "../../utils/localStorage";

import "./LoginForm.css";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    const credentials = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await axios.post("/signin", {
        data: credentials,
      });

      if (res.data) {
        const data = res.data.data;
        addAccessTokensToLocalStorage(data.accessToken, "true", data.id);
        addDefaultsToAxios();
        navigate("/patient");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
        <Button type="primary" htmlType="submit" data-testid="login-form-btn">
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
