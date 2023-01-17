import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Upload } from "antd";

import "./AddPatientForm.css";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddPatientForm = () => {
  const navigate = useNavigate();

  const [fav, setFav] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("number", values.number);
    formData.append("dob", values.dob);
    formData.append("address", values.address);
    formData.append("photo", values.upload[0].originFileObj);
    formData.append("is_fav", `${fav}`);
    formData.append("user_id", localStorage.getItem("id") as string);

    try {
      const res = await axios.post("/patients/add", {
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.data) {
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
      id="patientForm"
    >
      <Form.Item
        label="First Name"
        name="firstname"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input data-testid="input-first-name"/>
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastname"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input data-testid="input-last-name"/>
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input data-testid="input-email"/>
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input data-testid="input-address"/>
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="number"
        rules={[{ required: true, message: "Please input your number!" }]}
      >
        <Input data-testid="input-phone"/>
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[{ required: true, message: "Please input your DOB!" }]}
      >
        <Input data-testid="input-dob"/>
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="photo" action="/upload.do" listType="picture" data-testid="upload-input">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item name="fav" label="Fav">
        <Checkbox.Group>
          <Checkbox value={true} onChange={(e) => setFav(e.target.checked)} data-testid="input-checkbox"/>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        className="AddPatientForm__btn"
        wrapperCol={{ offset: 11, span: 16 }}
      >
        <Button type="primary" htmlType="submit" data-testid="add-patient-btn">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPatientForm;
