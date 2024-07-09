import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  notification,
} from "antd";
import { callLogin } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { doLoginAction } from "../../redux/account/accountSlice";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // console.log(values);
    const { username, password } = values;
    const res = await callLogin(username, password);
    // console.log(res);
    if (res && res.data) {
      // console.log("check res", res);

      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Thông tin tài khoản không chính xác",
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
              <h2 className="text text-large">Đăng Nhập Tài Khoản</h2>
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
                label="Email"
                name="username"
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

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <p className="text text-normal">
                Chưa có tài khoản ?
                <span>
                  <Link to="/register"> Đăng Kí </Link>
                </span>
              </p>
            </Form>
          </section>
        </main>
      </div>
    </>
  );
};
export default Login;
