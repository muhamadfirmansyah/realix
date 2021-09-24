import { Link, useParams } from "react-router-dom"
import { Breadcrumb, Card, Col, Descriptions, Layout, Rate, Row, Skeleton, Typography } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import CardSecondary from "../components/CardSecondary"

const MoviesDetail = () => {

    const [data, setData] = useState({})
    const [relateds, setRelateds] = useState([])
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(async () => {
        let detail = await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
        if (detail) {
            setData(detail.data)
            setLoading(false)
        }

        let rel = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        if (rel) {
            setRelateds(rel.data.filter(i => i.id !== parseInt(id)).slice(0, 3))
        }
    }, [id])

    if (loading) {
        return <Skeleton active />
    }

    return (
        <section style={{ marginTop: "2rem" }}>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>{ data.title }</Typography.Title>
            <Breadcrumb style={{ marginTop: "6px", fontSize: "14px" }}>
                <Breadcrumb.Item>
                    <Link to="/">Explore</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/movies">Movies</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Judul Movie</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[22, 22]} style={{ marginTop: "28px" }}>
                <Col span={16}>
                    <Layout style={{ background: "#FFFFFF" }}>
                        <Typography.Paragraph style={{ fontSize: "14px" }}>{data.description}</Typography.Paragraph>

                        <div style={{ marginTop: "20px" }}>
                            <Typography.Title level={4}>Infomation</Typography.Title>

                            <table style={{ fontSize: "14px" }}>
                                <tbody>
                                    <tr>
                                        <th style={ RowMiddle }>Genre</th>
                                        <td style={ ColMiddle }>
                                            { data.genre }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Duration</th>
                                        <td style={ ColMiddle }>
                                            { data.duration } minutes
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Release</th>
                                        <td style={ ColMiddle }>
                                            { data.year }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Rating</th>
                                        <td style={ ColMiddle }>
                                            <Rate allowHalf disabled value={ parseFloat(data.rating)/2 } /> 
                                            <span style={{ color: "#979797", marginLeft: "8px" }}>({ data.rating } out of 10)</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ ...RowMiddle, verticalAlign: "top" }}>Review</th>
                                        <td style={{ ...ColMiddle, verticalAlign: "top" }}>{ data.review }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Layout>
                </Col>
                <Col span={8}>
                    <Layout style={{ background: "#FFFFFF" }}>
                        <Card hoverable style={{ background: `url(${data.image_url})` }} className="poster-detail"/>
                    </Layout>
                </Col>
                <Col span={24}>
                    <div style={{ marginTop: "32px" }}>
                        <Typography.Title level={4}>Related</Typography.Title>

                        <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                            { relateds.map(( item, index ) => (
                                <Col span={8} key={index}>
                                    <CardSecondary uri={`/movies/${item.id}`} item={item} />
                                </Col>
                            )) }
                        </Row>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default MoviesDetail

// Styles
const RowMiddle = { padding: "0.6rem 0", width: "5rem", textAlign: "left", verticalAlign: "middle" }
const ColMiddle = { padding: "0.6rem 0", verticalAlign: "middle" }