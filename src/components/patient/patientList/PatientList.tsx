import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import "./PatientList.css";
import { Patient } from "../../../interfaces/Patient";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();

  const onDeleteHandler = async (id: number) => {
    await axios.delete(`/patients/${id}`);
    navigate("/patient");
  };
  const columns: ColumnsType<Patient> = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (url) => (
        <img
          style={{
            width: "80px",
            height: "80px",
          }}
          src={url}
          alt={url}
        />
      ),
    },
    { title: "Full Name", dataIndex: "firstname", key: "firstname" },
    { title: "Number", dataIndex: "number", key: "number" },
    {
      title: "Special Attention",
      dataIndex: "isFav",
      key: "isFav",
      render: (_, record) => {
        return record.isFav ? <HeartFilled /> : <HeartOutlined />;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <div id="actions">
          <Button
            onClick={() => {
              onDeleteHandler(+record.id);
            }}
          >
            Delete
          </Button>
          <Button>
            <Link to={`/patient/update/${record.id}`}>Update</Link>
          </Button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getData(1);
  }, []);

  const getData = (id: number) => {
    axios("/patients", {
      method: "POST",
      data: {
        id: localStorage.getItem("id"),
      },
    })
      .then((res) => {
        const newData = res.data.data.map((item: Patient, idx: number) => {
          return {
            ...item,
            key: idx,
          };
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [data, setData] = useState<Patient[]>([]);

  return <Table className="patientlist" columns={columns} dataSource={data} />;
};

export default PatientList;
