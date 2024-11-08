import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker,message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";

const ApplyDoctor = () => {
  const { user } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  // const handleFinish = (values) => {
  //   console.log(values)
  // }
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const date=new Date()
      date.setHours(values.timings[0].$H)
      date.setHours(values.timings[0].$m)
      const date2=new Date()
      date2.setHours(values.timings[1].$H)
      date2.setHours(values.timings[1].$m)
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        { ...values, userId: user._id,
          timings: [
            
            moment(date).format("HH:mm"),
            moment(date2).format("HH:mm"),
          ],
         },
    
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong ");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Apply for Barber</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[
          { required: true, message: 'Please enter your first name' },
          {
            pattern: /^[^\d]+$/, // Regular expression to allow only non-numeric characters
            message: 'Please enter a valid first name without numbers',
          },
        ]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[
          { required: true, message: 'Please enter your first name' },
          {
            pattern: /^[^\d]+$/, // Regular expression to allow only non-numeric characters
            message: 'Please enter a valid last name without numbers',
          },
        ]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
          <Form.Item
            label="Phone No"
            name="phone"
            required
            rules={[
            { required: true, message: 'Please enter your contact no' },
             {
              pattern: /^[0-9]{10}$/,
              message: 'Phone number must be 10 digits',
             },
              ]}
              >
    <Input type="text" placeholder="Your contact no" />
  </Form.Item>
</Col>

<Col xs={24} md={24} lg={8}>
  <Form.Item
    label="Email"
    name="email"
    required
    rules={[
      { required: true, message: 'Please enter your email address' },
      {
        type: 'email',
        message: 'Please enter a valid email address',
      },
    ]}
  >
    <Input type="email" placeholder="Your email address" />
  </Form.Item>
</Col>

          {/* <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col> */}
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="A small intro"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Intro" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Cutting Fees"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="In Rs" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;