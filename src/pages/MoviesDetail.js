import { Link, useParams } from "react-router-dom"
import { Breadcrumb, Card, Col, Layout, Rate, Row, Skeleton, Typography } from "antd"
import { useContext, useEffect, useState } from "react"
import CardSecondary from "../components/CardSecondary"
import { GlobalContext } from "../contexts/GlobalContext"

const MoviesDetail = () => {
    
    const { getMovie, getMovies } = useContext(GlobalContext)

    const [movie, setMovie] = useState({})
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        
        getMovie(id, (cb) => {
            if (!cb.error) {
                setMovie(cb.data)
                setLoading(false)
            }
        })

        getMovies(cb => {
            if (!cb.error) {
                let data = cb.data.filter(d => d.id !== parseInt(id)).sort((a, b) => Math.random() - 0.5).slice(0, 3)
                setMovies(data)
            }
        })

    }, [getMovie, getMovies, id])

    if (loading) {
        return <Skeleton active />
    }

    return (
        <section style={{ marginTop: "2rem" }}>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>{ movie.title }</Typography.Title>
            <Breadcrumb style={{ marginTop: "6px", fontSize: "14px" }}>
                <Breadcrumb.Item>
                    <Link to="/">Explore</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/movies">Movies</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{ movie.title }</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[22, 22]} style={{ marginTop: "28px" }}>
                <Col span={15}>
                    <Layout style={{ background: "#FFFFFF" }}>
                        <Typography.Paragraph style={{ fontSize: "14px" }}>{movie.description}</Typography.Paragraph>

                        <div style={{ marginTop: "20px" }}>
                            <Typography.Title level={4}>Infomation</Typography.Title>

                            <table style={{ fontSize: "14px" }}>
                                <tbody>
                                    <tr>
                                        <th style={ RowMiddle }>Genre</th>
                                        <td style={ ColMiddle }>
                                            { movie.genre }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Duration</th>
                                        <td style={ ColMiddle }>
                                            { movie.duration } minutes
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={ RowMiddle }>Release</th>
                                        <td style={ ColMiddle }>
                                            { movie.year }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ ...RowMiddle, verticalAlign: "middle" }}>Rating</th>
                                        <td style={{ ...ColMiddle, verticalAlign: "middle" }}>
                                            <Rate allowHalf disabled value={ parseFloat(movie.rating)/2 } /> 
                                            <span style={{ color: "#979797", marginLeft: "8px" }}>({ movie.rating } out of 10)</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={RowMiddle}>Review</th>
                                        <td style={ColMiddle}>{ movie.review }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Layout>
                </Col>
                <Col span={9}>
                    <Layout style={{ background: "#FFFFFF" }}>
                        <Card hoverable className="poster-image">
                            <div className="poster-image-body" style={{ background: `url(${movie.image_url})` }}></div>
                        </Card>
                    </Layout>
                </Col>
                <Col span={24}>
                    <div style={{ marginTop: "32px" }}>
                        <Typography.Title level={4}>Related</Typography.Title>

                        <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                            { movies.map(( item, index ) => (
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
const RowMiddle = { padding: "0.6rem 0", width: "5rem", textAlign: "left", verticalAlign: "top" }
const ColMiddle = { padding: "0.6rem 0", verticalAlign: "top" }