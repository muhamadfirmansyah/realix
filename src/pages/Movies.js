import { useContext, useEffect, useState } from "react";
import { Typography, Col, Row, Skeleton } from "antd"
import CardPrimary from "../components/CardPrimary";
import { GlobalContext } from "../contexts/GlobalContext";

const Movies = () => {

    const { getMovies } = useContext(GlobalContext)

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect( () => {

        getMovies(cb => {
            if (!cb.error) {
                let data = cb.data.sort((a, b) => a.id < b.id ? 1 : -1)
                setMovies(data)
                setLoading(false)
            }
        })
    }, [getMovies])

    if (loading) {
        return <Skeleton active />
    }

    return (
        <section style={{ marginTop: "2rem" }}>
            <header>
                <Typography.Title level={2}><span style={{ color: "#40A798" }}>List of </span> Movies</Typography.Title>
            </header>
            <Row gutter={[12, 12]} style={{ marginTop: "2rem" }}>
                { movies.map((item, index) => (
                    <Col span={8} key={index}>
                        <CardPrimary uri={`movies/${item.id}`} item={item} />
                    </Col>
                )) }
            </Row>
        </section>
    )
}

export default Movies