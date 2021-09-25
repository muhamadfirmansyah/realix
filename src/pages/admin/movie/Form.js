import { Form, Input, Button, Rate, InputNumber, DatePicker, message, Space } from "antd";
import { useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { GlobalContext } from "../../../contexts/GlobalContext";
import moment from "moment"

const MovieForm = () => {

    const history = useHistory()

    const { id } = useParams()

    const { addMovie, getMovie, updateMovie } = useContext(GlobalContext)

    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getMovie(id, (cb) => {
                if (!cb.error) {
                    let newdata = { ...cb.data, ...{ year: moment(cb.data.year, "YYYY"), rating: cb.data.rating / 2 } }
                    form.setFieldsValue(newdata)
                } else {
                    message.error('Oops! there is something wrong...')
                    history.push('/admin/movies')
                }
            })
        }
    }, [id, getMovie]) // eslint-disable-line react-hooks/exhaustive-deps

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const handleSubmit = (values) => {
        let replace = {
            year: values.year.format('YYYY'),
            rating: parseFloat(values.rating) * 2
        }

        let data = { ...values, ...replace }

        if (id) {
            updateMovie(id, data, (cb) => {
                if (!cb.error) {
                    message.success('Movie successfully updated!', 5)
                    history.push('/admin/movies')
                }
            })
        } else {
            addMovie(data, (cb) => {
                if (!cb.error) {
                    message.success('Movie successfully added!', 5)
                    history.push('/admin/movies')
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

            <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="genre"
                label="genre"
                rules={[{ required: true, message: "Genre is required" }]}>
                <Input />
            </Form.Item>

            <Form.Item name="duration" label="Duration (minutes)" rules={[{ required: true, message: "Duration is required" }]}>
                <InputNumber min={0} />
            </Form.Item>

            <Form.Item
                name="year"
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

            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Description is required" }]}
            >
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
            </Form.Item>

            <Form.Item name="rating" label="Rating" rules={[{ required: true, message: "Rating is required" }]}>
                <Rate allowHalf />
            </Form.Item>

            <Form.Item
                name="review"
                label="Review"
                rules={[{ required: true, message: "Review is required" }]}
            >
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
            </Form.Item>

            <Form.Item label="" wrapperCol={{ offset: 6, span: 18 }}>
                <Space>
                    <Link to="/admin/movies">
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

export default MovieForm