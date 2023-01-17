import axios from "axios";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Form, Input, Upload } from "antd";

import "./UpdatePatientForm.css";
import { getUserId } from "../../../utils/localStorage";
import { Patient, PatientToUpdate } from "../../../interfaces/Patient";

interface UpdatePatientFormInterface {
  oldData?: Patient;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UpdatePatientForm = (props: UpdatePatientFormInterface) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [fav, setFav] = useState<boolean>(false);
  const [data, setData] = useState<PatientToUpdate>();

  //function checks for dependencies and when they change, it calls function inside useEffect

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/patients/${id}`)
      .then((response) => {
        const data = response.data.data;
        setData({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          number: data.number,
          address: data.address,
          isFav: [data.isFav],
          photo: [],
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
      });
  }, [id]);

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
    formData.append("user_id", getUserId());
    formData.append("id", getUserId());

    try {
      const res = await axios(`/patients/${id}`, {
        method: "PUT",
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

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <Form
      name="basic"
      initialValues={data}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      id="UpdatePatientForm"
    >
      <Form.Item
        label="First Name"
        name="firstname"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastname"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="number"
        rules={[{ required: true, message: "Please input your number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[{ required: true, message: "Please input your DOB!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="photo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item name="isFav" label="Fav">
        <Checkbox.Group>
          <Checkbox value={true} onChange={(e) => setFav(e.target.checked)} />
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        className="UpdatePatientForm__btn"
        wrapperCol={{ offset: 11, span: 16 }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdatePatientForm;
