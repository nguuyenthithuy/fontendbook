import { Divider, Form, Input, Modal, message, notification } from "antd";
import { callCreateAUser, callUpdateUser } from "../../../services/api";
import { useEffect, useState } from "react";

const BookModalUpdate = (props) => {
  // const [openModalCreate, setOpenModalCreate] = useState(false);
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  //   const handleCancel = () => {
  //     setOpenModalUpdate(false);
  //   };
  const onFinish = async (values) => {
    const { _id, fullName, phone } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(_id, fullName, phone);
    // console.log("check res create", res);
    if (res && res.data) {
      message.success("Cập nhật user thành công");
      form.resetFields();
      setOpenModalUpdate(false);
      await props.fetchBook();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
    console.log("Success:", values);
  };
  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <>
      <Modal
        title="Cập nhật User"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
        }}
        okText={"Cập nhật"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider></Divider>

        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            hidden
            labelCol={{ span: 24 }}
            label="Id"
            name="_id"
            rules={[{ required: true, message: "Vui lòng nhập Id!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Tên hiển thị"
            name="fullName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default BookModalUpdate;
