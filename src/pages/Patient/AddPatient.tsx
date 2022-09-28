import { Typography } from "antd";
import React from "react";
import NavBar from "../../components/navBar/index";
import AddPatientForm from "../../components/patient/addPatient/AddPatientForm";
import "./AddPatient.css";

const AddPatient: React.FC = () => {
  const { Title } = Typography;

  return (
    <>
      <NavBar />
      <div id="patient">
        <Title className="patient__title">Add Patient</Title>
        <AddPatientForm />
      </div>
    </>
  );
};
export default AddPatient;
