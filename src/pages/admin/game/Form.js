import { Form, Input, Button, Switch, DatePicker, message, Space } from "antd";
import { useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { GlobalContext } from "../../../contexts/GlobalContext";
import moment from "moment"

const GameForm = () => {

    const history = useHistory()

    const { id } = useParams()

    const { addGame, getGame, updateGame } = useContext(GlobalContext)

    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getGame(id, (cb) => {
                if (!cb.error) {
                    let newdata = { ...cb.data, ...{ release: moment(cb.data.release, "YYYY") } }
                    form.setFieldsValue(newdata)
                } else {
                    message.error('Oops! there is something wrong...')
                    history.push('/admin/games')
                }
            })
        }
    }, [id, getGame]) // eslint-disable-line react-hooks/exhaustive-deps

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const handleSubmit = (values) => {
        let replace = {
            release: values.release.format('YYYY'),
        }

        let data = { ...values, ...replace }

        if (id) {
            updateGame(id, data, (cb) => {
                if (!cb.error) {
                    message.success('Game successfully updated!', 5)
                    history.push('/admin/games')
                }
            })
        } else {
            addGame(data, (cb) => {
                if (!cb.error) {
                    message.success('Game successfully added!', 5)
                    history.push('/admin/games')
                }
            })
        }
        
    }

    return (
        <Form
            form={form}
            {...layout}
            style={{ width: "100%", margin: "2rem auto" }}
            onFinish={handleSubmit}
            className="custom-form">

            <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="genre"
                label="Genre"
                rules={[{ required: true, message: "Genre is required" }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="platform"
                label="Platform"
                rules={[{ required: true, message: "Platform is required" }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="release"
                label="Release Year"
                rules={[{ required: true, message: "Release year is required" }]}
            >
                <DatePicker picker="year" disabledDate={d => !d || d.isAfter("2022-01-01") || d.isSameOrBefore("1980-01-01")} />
            </Form.Item>

            <Form.Item
                name="image_url"
                label="Image URL"
                rules={[{ required: true, message: "Image URL is required" }, { type: "url", message: "URL is not valid" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="singlePlayer" label="Single Player" valuePropName="checked" initialValue={true}>
                <Switch defaultChecked={true} />
            </Form.Item>

            <Form.Item name="multiplayer" label="Multi Player" valuePropName="checked" initialValue={true}>
                <Switch defaultChecked={true} />
            </Form.Item>

            <Form.Item label="" wrapperCol={{ offset: 6, span: 18 }}>
                <Space>
                    <Link to="/admin/games">
                        <Button
                            type="button">
                            Back
                        </Button>
                    </Link>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default GameForm