import { Layout, Typography } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import { GithubFilled } from "@ant-design/icons";
import { useLocation } from "react-router";
import { useLayoutEffect } from "react";

const { Content } = Layout;

const LayoutComponent = ({ content }) => {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <Layout style={{ background: "#FFFFFF" }}>
      { Cookies.get("token") && (
        <Sidebar />
      ) }
      <Layout style={{ background: "#FFFFFF" }}>
        <Navbar />
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: "0 auto",
            width: "758px",
            minHeight: "calc(100vh - 14rem)",
          }}
        >
          {content}
        </Content>
        <Layout.Footer style={{ marginTop: "4rem", background: "#FFFFFF", borderTop: "1px solid #DEE1E6", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
          <div>
            <a href="https://github.com/muhamadfirmansyah" style={{ display: 'flex', alignItems: "center", gap: "4px" }}>
              <GithubFilled />
              muhamadfirmansyah
            </a>
          </div>
          <Typography.Text>&copy; 2021</Typography.Text>
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
