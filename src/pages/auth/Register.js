import { Form, Input, Button, Typography, Alert } from "antd";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

const Register = () => {

    const { setRegister } = useContext(GlobalContext)

    const history = useHistory()

    const [ isAlert, setIsAlert ] = useState({
        type: "",
        title: "",
        message: [],
        status: false
    })

    const onFinish = (values) => {
        setRegister(values, (res) => {
            if (res.error && res.http !== 201) {
                let msg = res.message
                setIsAlert({
                    type: "error",
                    title: "Register Failed",
                    message: Object.values(JSON.parse(msg)),
                    status: true
                })
            } else {
                Cookies.set("user_token", JSON.stringify(res.data))
                history.push('/')
            }
        })  
    };

    const onFinishFailed = (errorInfo) => {
    //   console.log(errorInfo)  
    };

    return (
        <Form
            name="basic"
            style={{ width: "420px", margin: "4rem auto", marginTop: "2rem" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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

            <Typography.Title level={1} style={{ marginBottom: "34px" }}>Register</Typography.Title>
            <Form.Item
                style={{ marginBottom: "1rem" }}
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your email!" }]}
            >
                <Input placeholder="Type your name here..." className="custom-input" />
            </Form.Item>

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
                rules={[{ required: true, message: "Please input your password!" }, { min: 6, message: "Password must be at least 6 character!" }]}
            >
                <Input.Password placeholder="Type your password here..." className="custom-input" />
            </Form.Item>

            <Form.Item>
                <Button className="custom-button" style={{ width: "120px" }} type="primary" htmlType="submit">
                Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Register