import { Layout, Menu } from "antd";
import {
  RocketOutlined,
  UserAddOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider style={{
        position: "sticky",
        overflowY: 'auto',
        borderRight: "1px solid #DEE1E6",
        background: "#FFFFFF",
        zIndex: 100,
      }} collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} width={250} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <SubMenu key="sub1" icon={<VideoCameraAddOutlined />} title="Movies">
          <Menu.Item key="1">List</Menu.Item>
          <Menu.Item key="2">Create</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<RocketOutlined />} title="Games">
          <Menu.Item key="5">List</Menu.Item>
          <Menu.Item key="6">Create</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<UserAddOutlined />} title="Settings">
          <Menu.Item key="9">Change Password</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
