import { Typography } from "antd";
import React from "react";
import NavBar from "../../components/navBar/index";
import UpdatePatientForm from "../../components/patient/updatePatient/UpdatePatientForm";
import "./UpdatePatient.css";

const UpdatePatient: React.FC = () => {
  const { Title } = Typography;

  return (
    <>
      <NavBar />
      <div id="updatePatient">
        <Title className="updatePatient__title">Update Patient</Title>
        <UpdatePatientForm />
      </div>
    </>
  );
};
export default UpdatePatient;
