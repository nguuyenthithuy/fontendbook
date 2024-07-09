import React, { useState } from "react";
import { Button, Divider, Form, Input, message, notification } from "antd";
import "./Register.scss";
import { callRegister } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    setIsLoading(true);
    const res = await callRegister(fullName, email, password, phone);
    setIsLoading(false);
    // console.log(res);
    if (res?.data?._id) {
      message.success("Đăng kí tài khoản thành công");
      navigate("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && res.message.length > 0 ? res.message[0] : res.message,
        duration: 5,
      });
    }
  };

  return (
    <>
      <div className="register__page">
        <main className="main">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Kí Tài Khoản</h2>
              <Divider />
            </div>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              // wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, margin: "0 auto" }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }}
                label="FullName"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Đăng kí
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal">
                Đã có tài khoản ?
                <span>
                  <Link to="/login"> Đăng Nhập </Link>
                </span>
              </p>
            </Form>
          </section>
        </main>
      </div>
    </>
  );
};
export default Register;
