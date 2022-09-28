import { Typography, Button } from "antd";
import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/index";
import PatientList from "../../components/patient/patientList/PatientList";

const Home: React.FC = () => {
  const { Title } = Typography;
  const navigate = useNavigate();

  return (
    <div id="home">
      <NavBar />
      <Title className="home__title">Home</Title>
      <PatientList />
      <Button className="newpatient" onClick={() => navigate("/patient/add")}>
        Add Patient
      </Button>
    </div>
  );
};
export default Home;
