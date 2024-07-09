import React from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";

const InputSearch = (props) => {
  // console.log(props);
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values) => {
    let query = "";
    if (values.mainText) {
      query += `&mainText=/${values.mainText}/i`;
    }
    if (values.author) {
      query += `&author=/${values.author}/i`;
    }
    if (values.category) {
      query += `&category=/${values.category}/i`;
    }
    if (query) {
      props.handleSearch(query);
    }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Tên sách" name="mainText" labelCol={{ span: 24 }}>
            <Input placeholder="Tên sách" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Tác giả" name="author" labelCol={{ span: 24 }}>
            <Input placeholder="Tác giả" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Thể loại" name="category" labelCol={{ span: 24 }}>
            <Input placeholder="Thể loại" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputSearch;
