import { Badge, Descriptions, Divider, Drawer, Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, Upload } from "antd";
import { v4 as uuidv4 } from "uuid";
const BookViewDetail = (props) => {
  const {
    setOpenViewDetail,
    openViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };

  // console.log(dataViewDetail);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    // console.log("check view Data", dataViewDetail);
    if (dataViewDetail) {
      let imgThumnail = {},
        imgSlider = [];

      if (dataViewDetail?.thumbnail) {
        imgThumnail = {
          uid: uuidv4(),
          name: dataViewDetail.thumbnail,
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            dataViewDetail.thumbnail
          }`,
        };
      }
      if (dataViewDetail?.slider && dataViewDetail?.slider?.length > 0) {
        dataViewDetail.slider.map((item) => {
          console.log("item ", item);
          imgSlider.push({
            uid: uuidv4(),
            name: item,
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          });
        });
      }
      setFileList([imgThumnail, ...imgSlider]);
      // console.log("check, slider", imgSlider);
    }
  }, [dataViewDetail]);

  const handlePreview = async (file) => {
    // console.log("check file", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleCancel = () => setPreviewOpen(false);

  return (
    <>
      <Drawer
        title="Chức năng chi tiết"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="Thông tin book" bordered column={2}>
          <Descriptions.Item label="Id">
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sách">
            {dataViewDetail?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label="Tác giả">
            {dataViewDetail?.author}
          </Descriptions.Item>
          <Descriptions.Item label="Giá tiền">
            {dataViewDetail?.price}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng">
            {dataViewDetail?.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Đã bán">
            {dataViewDetail?.sold}
          </Descriptions.Item>
          <Descriptions.Item label="Thể loại" span={2}>
            <Badge status="processing" text={dataViewDetail?.category} />
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY, HH:MM:SS")}
          </Descriptions.Item>
          <Descriptions.Item label="Update At">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY, HH:MM:SS")}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Ảnh book</Divider>
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={{ showRemoveIcon: false }}
        ></Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Drawer>
    </>
  );
};
export default BookViewDetail;
