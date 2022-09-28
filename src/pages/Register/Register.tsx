import { Typography } from "antd";
import React from "react";
import RegisterForm from "../../components/registerForm/RegisterForm";
import "./Register.css";

const Register: React.FC = () => {
  const { Title } = Typography;

  return (
    <div className="register">
      <div className="register__container">
        <Title className="register__title">Register</Title>
        <RegisterForm />
      </div>
    </div>
  );
};
export default Register;
