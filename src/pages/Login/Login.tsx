import { Typography } from "antd";
import React from "react";
import LoginForm from "../../components/loginForm/LoginForm";
import "./Login.css";

const Login: React.FC = () => {
  const { Title } = Typography;
  return (
    <div className="login">
      <div className="login__container">
        <Title className="login__title">Patient Manager</Title>
        <Title className="login__subtitle" level={2}>
          Login
        </Title>
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
