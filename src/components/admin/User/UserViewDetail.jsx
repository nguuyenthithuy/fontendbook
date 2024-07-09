import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment";

const UserViewDetail = (props) => {
  const {
    setOpenViewDetail,
    openViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;
  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };

  console.log(dataViewDetail);
  return (
    <>
      <Drawer
        title="Chức năng chi tiết"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="Thông tin user" bordered column={2}>
          <Descriptions.Item label="Id">
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="FullName">
            {dataViewDetail?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {dataViewDetail?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Role" span={2}>
            <Badge status="processing" text={dataViewDetail?.role} />
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY, HH:MM:SS")}
          </Descriptions.Item>
          <Descriptions.Item label="Update At">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY, HH:MM:SS")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default UserViewDetail;
