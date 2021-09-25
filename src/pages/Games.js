import { useContext, useEffect, useState } from "react"
import { Typography, Col, Row, Skeleton } from "antd"
import CardSecondary from '../components/CardSecondary'
import { GlobalContext } from "../contexts/GlobalContext";

const Games = () => {

    const { getGames } = useContext(GlobalContext)

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getGames(cb => {
            if (!cb.error) {
                let data = cb.data.sort((a, b) => a.id < b.id ? 1 : -1)
                setGames(data)
                setLoading(false)
            }
        })
    }, [getGames])

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