import axios from "axios";
import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    if (values.password === values.confirmed) {
      axios.post("/signup", {
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((data) => navigate("/login"))
        .catch((err) => console.log(err));
    } else {
      console.log("Password doesn't match");
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
      id="registerForm"
    >
      <Form.Item
        name="username"
        id="registerForm__item"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" data-testid="input-register-username"/>
      </Form.Item>

      <Form.Item
        name="email"
        className="registerForm__item"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" data-testid="input-register-email"/>
      </Form.Item>

      <Form.Item
        name="password"
        className="registerForm__item"
        data-testid="test-password-item"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" data-testid="input-register-pass"/>
      </Form.Item>

      <Form.Item
        name="confirmed"
        className="registerForm__item"
        data-testid="test-confirm-password-item"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Confirm Password" data-testid="input-register-confirm-pass"/>
      </Form.Item>

      <Form.Item id="registerForm__btn">
        <Button type="primary" htmlType="submit" data-testid="register-form-btn">
          Submit
        </Button>
        <Link to="/login">{"  "}Cancel.</Link>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
