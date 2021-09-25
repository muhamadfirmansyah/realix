import { Link, useParams } from "react-router-dom"
import { Breadcrumb, Card, Col, Layout, Row, Skeleton, Typography } from "antd"
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons"
import { useContext, useEffect, useState } from "react"
import CardSecondary from "../components/CardSecondary"
import { GlobalContext } from "../contexts/GlobalContext"

const GamesDetail = () => {

    const { getGame, getGames } = useContext(GlobalContext)


    const [ game, setGame ] = useState({})
    const [ games, setGames ] = useState([])
    const [loading, setLoading] = useState(true)
    
    const { id } = useParams()

    useEffect(() => {

        getGame(id, (cb) => {
            if (!cb.error) {
                setGame(cb.data)
                setLoading(false)
            }
        })

        getGames(cb => {
            if (!cb.error) {
                let data = cb.data.filter(d => d.id !== parseInt(id)).sort((a, b) => Math.random() - 0.5).slice(0,3)
                setGames(data)
            }
        })

    }, [getGames, getGame, id])

    if (loading) {
        return <Skeleton active />
    }

    return (
        <section style={{ marginTop: "2rem" }}>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>{ game.name }</Typography.Title>
            <Breadcrumb style={{ marginTop: "6px", fontSize: "14px" }}>
                <Breadcrumb.Item>
                    <Link to="/">Explore</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/games">Games</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{ game.name }</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[22, 22]} style={{ marginTop: "28px" }}>
                <Col span={10}>
                    <Card hoverable className="poster-image">
                        <div className="poster-image-body" style={{ background: `url(${game.image_url})` }}></div>
                    </Card>
                </Col>
                <Col span={14}>
                    <Layout style={{ background: "#FFFFFF" }}>
                        <div>
                            <table style={{ fontSize: "14px" }}>
                                <tbody>
                                    <tr>
                                        <th style={ RowMiddle }>Genre</th>
                                        <td style={ ColMiddle }>
                                            { game.genre }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Platform</th>
                                        <td style={ ColMiddle }>
                                            { game.platform }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Release</th>
                                        <td style={ ColMiddle }>
                                            { game.release }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Modes</th>
                                        <td style={{ ...ColMiddle, display: "flex", gap: "1rem" }}>
                                            <div style={{display: "flex", alignItems: "center", gap: "6px" }}>
                                                { game.singlePlayer ? (
                                                    <CheckCircleFilled style={{ color: "#6DE54C" }} />
                                                ) : (
                                                    <CloseCircleFilled style={{ color: "#EB3E37" }} />
                                                ) }
                                                <span>Single-Player</span>
                                            </div>
                                            <div style={{display: "flex", alignItems: "center", gap: "6px" }}>
                                                { game.multiplayer ? (
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
                            { games.map((item, index) => (
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
const RowMiddle = { padding: "0.6rem 0", width: "5rem", textAlign: "left", verticalAlign: "top" }
const ColMiddle = { padding: "0.6rem 0", verticalAlign: "top" }