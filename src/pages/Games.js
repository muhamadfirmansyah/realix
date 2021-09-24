import { useEffect, useState } from "react"
import { Typography, Col, Row, Skeleton } from "antd"
import axios from "axios";
import CardSecondary from '../components/CardSecondary'

const Games = () => {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getGames = async () => {
            let g = await axios.get(`https://backendexample.sanbersy.com/api/data-game`);
            if (g) {
                setGames(g.data)
                setLoading(false)
            }
        }

        getGames()
    }, [])

    if (loading) {
        return <Skeleton active />
    }

    return (
        <section style={{ marginTop: "2rem" }}>
            <header>
                <Typography.Title level={2}><span style={{ color: "#40A798" }}>List of </span> Games</Typography.Title>
            </header>
            <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                { games.map((item, index) => (
                    <Col span={8} key={index}>
                        <CardSecondary uri={`/games/${item.id}`} item={item} />
                    </Col>
                )) }
            </Row>
        </section>
    )
}

export default Games