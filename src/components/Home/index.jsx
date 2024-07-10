import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
} from "antd";
import "./home.scss";
import { useEffect, useState } from "react";
import { callCategoryBook, callListBook } from "../../services/api";
const Home = () => {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-sold");

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
  // console.log("check cate", category);
  useEffect(() => {
    fetchBook();
  }, [current, pageSize, filter, sortQuery]);

  const fetchBook = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callListBook(query);
    // console.log(res);
    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
    setLoading(false);
  };

  // console.log("check listbook", listBook);
  const onFinish = (values) => {};

  const items = [
    {
      key: "sort=-sold",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "sort=-updatedAt",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "sort=price",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "sort=-price",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  const handleOnchangePage = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };
  const handleChangeFilter = (changedValues, values) => {
    console.log(">>> check handleChangeFilter", changedValues, values);
  };

  return (
    <>
      <div
        className="homepage-container"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <Row gutter={[[20, 20]]}>
          <Col md={4} sm={0} xs={0} style={{ border: "1px solid green" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px",
                marginBottom: "30px",
                marginTop: "20px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                <FilterTwoTone /> Bộ lọc tìm kiếm
              </span>
              <ReloadOutlined
                title="Reset"
                onClick={() => form.resetFields()}
              />
            </div>
            <Divider />

            <Form
              onFinish={onFinish}
              form={form}
              onValuesChange={(changedValues, values) =>
                handleChangeFilter(changedValues, values)
              }
            >
              <Form.Item
                name="category"
                label="Danh mục sản phẩm"
                labelCol={{ span: 24 }}
              >
                <Checkbox.Group>
                  <Row>
                    {category?.map((item, index) => (
                      <Col
                        span={24}
                        key={`index-${index}`}
                        style={{ padding: "7px 0" }}
                      >
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Divider />
              <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Form.Item name={["range", "from"]}>
                    <InputNumber
                      name="from"
                      min={0}
                      placeholder="đ TỪ"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <span>-</span>
                  <Form.Item name={["range", "to"]}>
                    <InputNumber
                      name="to"
                      min={0}
                      placeholder="đ ĐẾN"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Button
                    onClick={() => form.submit()}
                    style={{ width: "100%" }}
                    type="primary"
                  >
                    Áp dụng
                  </Button>
                </div>
              </Form.Item>
              <Divider />
              <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                <div>
                  <Rate
                    value={5}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text"></span>
                </div>
                <div>
                  <Rate
                    value={4}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={3}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={2}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={1}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <Col md={20} xs={24} style={{ border: "1px solid red" }}>
            <div
              style={{ padding: "20px", background: "#fff", borderRadius: 5 }}
            >
              <Row>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
              </Row>
              <Row className="customize-row">
                {listBook.map((item, index) => (
                  <div className="column">
                    <div className="wrapper">
                      <div className="thumbnail">
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/images/book/${item.thumbnail}`}
                          alt="thumbnail book"
                        />
                      </div>
                      <div className="text" style={{ overflow: "hidden" }}>
                        {item.mainText}
                      </div>
                      <div className="price">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item?.price ?? 0)}
                      </div>
                      <div className="rating">
                        <Rate
                          value={5}
                          disabled
                          style={{ color: "#ffce3d", fontSize: 10 }}
                        />
                        <span>{item.sold}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Row>
            </div>

            <Divider />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                current={current}
                total={total}
                pageSize={pageSize}
                responsive
                onChange={(p, s) =>
                  handleOnchangePage({ current: p, pageSize: s })
                }
              />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Home;
