import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";
import { Divider, Badge, Drawer, message, Avatar } from "antd";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import { callLogOut } from "../../services/api";
import { doLogOutAction } from "../../redux/account/accountSlice";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickLogout = async () => {
    const res = await callLogOut();
    // console.log(res);
    if (res && res.data) {
      dispatch(doLogOutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };
  let items = [
    {
      label: <label>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => handleClickLogout()}
        >
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  if (user.role === "ADMIN") {
    items.unshift({
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => navigate("/admin")}>
          Trang quản trị
        </label>
      ),
      key: "logout",
    });
  }
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;
  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span className="logo">
                <FaReact className="rotate icon-react" /> BOOK SEFT
                <VscSearchFuzzy className="icon-search" />
              </span>
              <input
                className="input-search"
                type={"text"}
                placeholder="Bạn tìm gì hôm nay"
              />
            </div>
          </div>
          <nav className="page-header__bottom">
            <ul id="navigation" className="navigation">
              <li className="navigation__item">
                <Badge count={5} size={"small"}>
                  <FiShoppingCart className="icon-cart" />
                </Badge>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}> Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Avatar src={urlAvatar} />
                        {user?.fullName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p>Đăng xuất</p>
        <Divider />
      </Drawer>
    </>
  );
};
export default Header;
