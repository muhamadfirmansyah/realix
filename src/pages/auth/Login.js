import { Form, Input, Button, Checkbox, Typography, Alert } from "antd";
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import Cookies from "js-cookie"
import { useHistory } from "react-router-dom";

const Login = () => {

  const history = useHistory()

  const { setLogin } = useContext(GlobalContext)

  const [ isAlert, setIsAlert ] = useState({
    type: "",
    title: "",
    message: [],
    status: false
  })

  const onFinish = (values) => {
    setLogin(values, (res) => {
      if (res.error && res.http !== 201) {
          setIsAlert({
              type: "error",
              title: "Login Failed",
              message: Object.values(res.message),
              status: true
          })
      } else {
          if (values.remember) {
            Cookies.set("realix_user_token", JSON.stringify(res.data), { expires: 7 })
          } else {
            Cookies.set("realix_user_token", JSON.stringify(res.data))
          }

          history.push('/')
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <Form
        name="basic"
        style={{ width: "420px", margin: "4rem auto", marginTop: "2rem" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        >

        { isAlert.status && (
          <Alert
              message={ isAlert.title }
              description={ isAlert.message.map((item, index) => (
                  <div key={index}>{item}</div>
              )) }
              type={ isAlert.type }
              style={{ marginBottom: "2rem" }}
              showIcon
              />
        )}

        <Typography.Title level={1} style={{ marginBottom: "34px" }}>Login</Typography.Title>
        <Form.Item
            style={{ marginBottom: "1rem" }}
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }, { type: "email", message: "Please input the valid email!" }]}
        >
            <Input placeholder="Type your email here..." className="custom-input" />
        </Form.Item>

        <Form.Item
            style={{ marginBottom: "1rem" }}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
        >
            <Input.Password placeholder="Type your password here..." className="custom-input" />
        </Form.Item>

        <Form.Item
            name="remember"
            valuePropName="checked"
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
            <Button className="custom-button" style={{ width: "120px" }} type="primary" htmlType="submit">
            Login
            </Button>
        </Form.Item>
    </Form>
  );
};

export default Login;
