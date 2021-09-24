import { Link, useParams } from "react-router-dom"

import { Breadcrumb, Card, Col, Layout, Row, Skeleton, Typography } from "antd"
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons"
import { useEffect, useState } from "react"
import axios from "axios"
import CardSecondary from "../components/CardSecondary"

const GamesDetail = () => {


    const [detail, setDetail] = useState({})
    const [relateds, setRelateds] = useState([])
    const [loading, setLoading] = useState(true)
    
    const { id } = useParams()

    useEffect(async () => {
        let res = await axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
        if (res) {
            setLoading(false)
            setDetail(res.data)
        }

        let rel = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
        if (rel) {
            setRelateds(rel.data.filter(i => i.id !== parseInt(id)).slice(0, 3))
        }
    }, [id])

    if (loading) {
        return <Skeleton active />
    }

    return (
        <section style={{ marginTop: "2rem" }}>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>{ detail.name }</Typography.Title>
            <Breadcrumb style={{ marginTop: "6px", fontSize: "14px" }}>
                <Breadcrumb.Item>
                    <Link to="/">Explore</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/games">Games</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Judul Movie</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[22, 22]} style={{ marginTop: "28px" }}>
                <Col span={10}>
                    <Layout style={{ background: "#FFFFFF" }}>
                        <Card hoverable style={{ background: `url(${detail.image_url})` }} className="poster-detail game" />
                    </Layout>
                </Col>
                <Col span={14}>
                    <Layout style={{ background: "#FFFFFF" }}>
                        <div>
                            <table style={{ fontSize: "14px" }}>
                                <tbody>
                                    <tr>
                                        <th style={ RowMiddle }>Genre</th>
                                        <td style={ ColMiddle }>
                                            { detail.genre }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Platform</th>
                                        <td style={ ColMiddle }>
                                            { detail.platform }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Release</th>
                                        <td style={ ColMiddle }>
                                            { detail.release }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Modes</th>
                                        <td style={{ ...ColMiddle, display: "flex", gap: "1rem" }}>
                                            <div style={{display: "flex", alignItems: "center", gap: "6px" }}>
                                                { detail.singlePlayer ? (
                                                    <CheckCircleFilled style={{ color: "#6DE54C" }} />
                                                ) : (
                                                    <CloseCircleFilled style={{ color: "#EB3E37" }} />
                                                ) }
                                                <span>Single-Player</span>
                                            </div>
                                            <div style={{display: "flex", alignItems: "center", gap: "6px" }}>
                                                { detail.multiPlayer ? (
                                                    <CheckCircleFilled style={{ color: "#6DE54C" }} />
                                                ) : (
                                                    <CloseCircleFilled style={{ color: "#EB3E37" }} />
                                                ) }
                                                <span>Multi-Player</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Layout>
                </Col>
                <Col span={24}>
                    <div style={{ marginTop: "32px" }}>
                        <Typography.Title level={4}>Related</Typography.Title>

                        <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                            { relateds.map((item, index) => (
                                <Col span={8} key={index}>
                                    <CardSecondary uri={`/games/${item.id}`} item={item} />
                                </Col>
                            )) }
                        </Row>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default GamesDetail

// Styles
const RowMiddle = { padding: "0.6rem 0", width: "5rem", textAlign: "left", verticalAlign: "middle" }
const ColMiddle = { padding: "0.6rem 0", verticalAlign: "middle" }