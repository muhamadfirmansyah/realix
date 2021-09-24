import { Card, Col, Input, Select, Row, Skeleton, Typography } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import CardPrimary from "../components/CardPrimary"
import CardSecondary from "../components/CardSecondary"

const Home = () => {

    const [movies, setMovies] = useState([])
    const [games, setGames] = useState([])
    const [random, setRandom] = useState([])

    const [moviesLoading, setMoviesLoading] = useState(true)
    const [gamesLoading, setGamesLoading] = useState(true)

    useEffect(async () => {
        let m = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        if (m) {
            setMovies(m.data)
            setMoviesLoading(false)
        }
        
        let g = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
        if (g) {
            setGames(g.data)
            setGamesLoading(false)
        }


    }, []);

    return (
        <>
            <section style={{ marginTop: "2rem" }}>
                <header>
                    <Typography.Title level={2}>Explore</Typography.Title>
                    <form>
                        <Input.Group compact className="filter-search">
                            <Input style={{ width: "44%" }} className="search-box" placeholder="Find movies and games here ..." />
                            <Select  style={{ width: "18%" }} placeholder="Genre" allowClear bordered={false}>
                                <Select.Option value="Option2">Option2</Select.Option>
                            </Select>
                            <Select  style={{ width: "18%" }} placeholder="Release" allowClear bordered={false}>
                                <Select.Option value="All">Menari diatas penderitaan</Select.Option>
                            </Select>
                            <Select  style={{ width: "18%" }} placeholder="Duration" allowClear bordered={false}>
                                <Select.Option value="Menari diatas penderitaan">Menari diatas penderitaan</Select.Option>
                            </Select>
                        </Input.Group>
                    </form>
                </header>
                <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                    <Col span={8}>
                        <Card hoverable className="recomendation-card" style={{ background: `url(https://i.ibb.co/nmFFCRk/Rectangle-2.png)` }}>
                            <div className="card-cover"></div>
                            <div className="card-content">
                                <Typography.Title level={5} className="card-snippet-top">2019</Typography.Title>
                                <Typography.Title level={4} className="card-title">Movie Title</Typography.Title>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </section>
            <section style={{ marginTop: "60px" }}>
                <header>
                    <Typography.Title level={2}><span style={{ color: "#40A798" }}>Rating:</span> Best Movies</Typography.Title>
                </header>
                { moviesLoading ? (
                    <Skeleton active />
                ) : (
                    <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                        { movies.sort((a, b) => a.rating < b.rating ? 1 : -1).slice(0, 3).map((item) => (
                            <Col span={8} key={item.id}>
                                <CardPrimary uri={`/movies/${item.id}`} item={item} />
                            </Col>
                        )) }
                    </Row>
                ) }
            </section>
            <section style={{ marginTop: "60px" }}>
                <header>
                    <Typography.Title level={2}><span style={{ color: "#40A798" }}>Latest:</span> Games</Typography.Title>
                </header>
                { gamesLoading ? (
                    <Skeleton active />
                ) : (
                    <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                        { games.sort((a, b) => a.created_at < b.created_at).slice(0, 6).map((item) => (
                            <Col span={8} key={item.id}>
                                <CardSecondary uri={`/games/${item.id}`} item={item} />
                            </Col>
                        )) }
                    </Row>
                ) }
            </section>
        </>
    )
}

export default Home