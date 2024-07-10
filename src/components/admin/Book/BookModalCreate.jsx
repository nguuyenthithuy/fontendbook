import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
  notification,
  Upload,
} from "antd";
import {
  callCategoryBook,
  callCreateABook,
  callCreateAUser,
  callUploadBookImg,
} from "../../../services/api";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const BookModalCreate = (props) => {
  // const [openModalCreate, setOpenModalCreate] = useState(false);
  const { openModalCreate, setOpenModalCreate } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [category, setCategory] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);
  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => {
    setOpenModalCreate(false);
  };

  useEffect(() => {
    const fetchCate = async () => {
      const res = await callCategoryBook();
      // console.log("lol", res);
      if (res && res.data) {
        const q = res.data.map((item) => {
          return {
            value: item,
            label: item,
          };
        });
        setCategory(q);
      }
    };
    fetchCate();
  }, []);

  // console.log("mé", category);
  const onFinish = async (values) => {
    // console.log("check value", values);
    // console.log("check data thumnai", dataThumbnail);
    // console.log("check data slider", dataSlider);
    // return;
    if (dataThumbnail.length === 0) {
      notification.error({
        message: "Lỗi validate",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }
    if (dataSlider.length === 0) {
      notification.error({
        message: "Lỗi validate",
        description: "Vui lòng upload ảnh slider",
      });
      return;
    }
    const { mainText, author, price, category, quantity, sold } = values;
    const thumbnail = dataThumbnail.name;
    const slider = dataSlider.map((item) => item.name);
    setIsSubmit(true);
    const res = await callCreateABook(
      thumbnail,
      slider,
      mainText,
      author,
      price,
      category,
      quantity,
      sold
    );
    // console.log("check res create", res);
    if (res && res.data) {
      message.success("Tạo mới sách thành công");
      form.resetFields();
      setDataSlider([]);
      setDataThumbnail([]);
      setOpenModalCreate(false);
      await props.fetchBook();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
    // console.log("Success:", values);
  };
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info, type) => {
    // console.log("check info and type", info, type);
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
    // console.log("check file ", file);
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      setDataThumbnail({
        uid: file.uid,
        name: res.data.fileUploaded,
      });
    }
    // console.log(res);

    onSuccess("ok");
  };
  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    // console.log("check file ", file);
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      setDataSlider((dataSlider) => [
        ...dataSlider,
        {
          uid: file.uid,
          name: res.data.fileUploaded,
        },
      ]);
    }
    // console.log(res);

    onSuccess("ok");
  };
  // console.log("check dataThumbnail", dataThumbnail);
  // console.log("check dataSlider", dataSlider);

  const handlePreview = async (file) => {
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };
  const handleRemoveFile = (file, type) => {
    if (type === "thumbnail") {
      setDataThumbnail([]);
    }
    if (type === "slider") {
      const newSlider = dataSlider.filter((x) => x.uid !== file.uid);
      setDataSlider(newSlider);
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới Book"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
        width={"50vw"}
        maskClosable={false}
      >
        <Divider></Divider>

        <Form
          name="basic"
          // style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên sách"
                name="mainText"
                rules={[{ required: true, message: "Please input your book!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tác giả"
                name="author"
                rules={[
                  { required: true, message: "Please input your author!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giá tiền"
                name="price"
                rules={[
                  { required: true, message: "Please input your price!" },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  addonAfter="VND"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Thể loại"
                name="category"
                rules={[
                  { required: true, message: "Please input your category!" },
                ]}
              >
                <Select
                  defaultValue={null}
                  // style={{ width: 120 }}
                  // onChange={handleChange}
                  options={category}
                  showSearch
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[
                  { required: true, message: "Please input your quantity!" },
                ]}
              >
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  // formatter={(value) =>
                  //   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  // }
                  // addonAfter="VND"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Đã bán"
                name="sold"
                rules={[{ required: true, message: "Please input your sold!" }]}
                initialValue={0}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  defaultValue={0}
                  // formatter={(value) =>
                  //   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  // }
                  // addonAfter="VND"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Thumbnail"
                name="thumbnail"
              >
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  className="avatar-uploader"
                  maxCount={1}
                  multiple={false}
                  customRequest={handleUploadFileThumbnail}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  onRemove={(file) => handleRemoveFile(file, "thumbnail")}
                  onPreview={handlePreview}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Slider"
                name="slider"
              >
                <Upload
                  multiple
                  name="slider"
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={handleUploadFileSlider}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, "slider")}
                  onRemove={(file) => handleRemoveFile(file, "slider")}
                  onPreview={handlePreview}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
export default BookModalCreate;
