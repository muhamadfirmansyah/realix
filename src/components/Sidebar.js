import { Layout, Menu } from "antd";
import {
  RocketOutlined,
  UserAddOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom"

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = withRouter(({ location }) => {

  const [activeOpen, setActiveOpen] = useState([])

  const keys = [
    {
      key: "sub1",
      routes: [
        "/admin/movies",
        "/admin/movies/create"
      ]
    },
    {
      key: "sub2",
      routes: [
        "/admin/games",
        "/admin/games/create"
      ]
    },
    {
      key: "sub3",
      routes: [
        "/admin/change-password",
      ]
    },
  ]

  useEffect(() => {
    let active = keys.find((item) => {
      return item.routes.includes(location.pathname)
    })

    if (active) {
      setActiveOpen([active.key])
    }

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onOpenChange = (keys) => {
    setActiveOpen([...keys])
  }

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider style={{
      position: "relative",
      overflowY: 'auto',
      borderRight: "1px solid #DEE1E6",
      background: "#FFFFFF",
      zIndex: 100,
    }} collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} width={250} className="site-layout-background">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        openKeys={activeOpen}
        onOpenChange={onOpenChange}
        style={{ height: "100%", borderRight: 0 }}
      >
        <SubMenu key="sub1" icon={<VideoCameraAddOutlined />} title="Movies">
          <Menu.Item key="/admin/movies">
            <Link to="/admin/movies">List</Link>
          </Menu.Item>
          <Menu.Item key="/admin/movies/create">
            <Link to="/admin/movies/create">Create</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<RocketOutlined />} title="Games">
          <Menu.Item key="/admin/games">
            <Link to="/admin/games">List</Link>
          </Menu.Item>
          <Menu.Item key="/admin/games/create">
            <Link to="/admin/games/create">Create</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<UserAddOutlined />} title="Settings">
          <Menu.Item key="/admin/change-password">
            <Link to="/admin/change-password">Change Password</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
});

export default Sidebar;
