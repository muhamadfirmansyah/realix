import { Form, Input, Button, Checkbox, Typography } from "antd";

const Register = () => {
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
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
                Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Register