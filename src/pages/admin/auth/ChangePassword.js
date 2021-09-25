import { Form, Input, Button, Typography, Space, message } from "antd";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../../contexts/GlobalContext";

const ChangePassword = () => {

    const history = useHistory()

    const { updatePassword } = useContext(GlobalContext)

    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        updatePassword(values, (cb) => {
            if (!cb.error) {
                message.success('Password successfully updated!', 5)
                history.push('/')
            } else {
                let txt = Object.values(JSON.parse(cb.message))

                message.error(txt[0], 5);
            }
        })
    }

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    return (
        <section style={{ marginTop: "2rem" }}>
            <Typography.Title level={2}><span style={{ color: "#40A798" }}>Change Your</span> Password</Typography.Title>


            <Form
                form={form}
                {...layout}
                style={{ width: "100%", margin: "2rem auto" }}
                onFinish={handleSubmit}
                className="custom-form">

                <Form.Item name="current_password" label="Current Password" rules={[{ required: true, message: "Current Password is required" }]}>
                    <Input.Password />
                </Form.Item>
                
                <Form.Item name="new_password" label="New Password" rules={[{ required: true, message: "New Password is required" }, { min: 6, message: "Password must be at least 6 character!" }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item name="new_confirm_password" label="Confirm Password"
                    dependencies={['new_password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }
                
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item label="" wrapperCol={{ offset: 6, span: 18 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </section>
    )
}

export default ChangePassword