import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "antd";
import InputSearch from "./InputSearch";
import { render } from "react-dom";
import { callListBook, callListUser } from "../../../services/api";
import UserViewDetail from "./BookViewDetail";
import {
  CloudUploadOutlined,
  DeleteTwoTone,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import UserModalCreate from "./BookModalCreate";
import moment from "moment";
import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
import UserModalUpdate from "./BookModalUpdate";
import BookModalCreate from "./BookModalCreate";
import BookModalUpdate from "./BookModalUpdate";
import BookViewDetail from "./BookViewDetail";

const BookTable = () => {
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
  const [dataViewDetail, setDataViewDetail] = useState(null);
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
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
  //   console.log(listUser);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        // console.log("Check record", record);
        return (
          // <a href='#' onClick={() => {
          //     setDataViewDetail(record);
          //     setOpenViewDetail(true);
          // }}>{record._id}</a>
          <>
            <a
              href="#"
              onClick={() => {
                setDataViewDetail(record);
                setOpenViewDetail(true);
              }}
            >
              {record._id}
            </a>
          </>
        );
      },
    },
    {
      title: "Tên sách",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: true,
      render: (text, record, index) => {
        return <>{moment(record.updatedAt).format(FORMAT_DATE_DISPLAY)}</>;
      },
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <button>Delete</button>
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => {
                setOpenModalUpdate(true);
                setDataUpdate(record);
              }}
            >
              Update
            </button>
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSortQuery(q);
    }
    // console.log("params", pagination, filters, sorter, extra);
  };

  const handleSearch = (query) => {
    setFilter(query);
  };
  const renderHeader = () => {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Table List Books</span>
          <span style={{ display: "flex", gap: 15 }}>
            <Button icon={<ExportOutlined />} type="primary">
              Export
            </Button>

            <Button icon={<CloudUploadOutlined />} type="primary">
              Import
            </Button>

            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setOpenModalCreate(true)}
            >
              Thêm mới
            </Button>
            <Button
              type="ghost"
              onClick={() => {
                setFilter("");
                setSortQuery("");
              }}
            >
              <ReloadOutlined />
            </Button>
          </span>
        </div>
      </>
    );
  };
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]} - {range[1]} trên {total} rows
                  </div>
                );
              },
            }}
            className="def"
            columns={columns}
            dataSource={listBook}
            onChange={onChange}
            loading={isLoading}
          />
        </Col>
      </Row>
      <BookModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchBook={fetchBook}
      />
      <BookViewDetail
        setOpenViewDetail={setOpenViewDetail}
        openViewDetail={openViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <BookModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchBook={fetchBook}
      />
    </>
  );
};

export default BookTable;
