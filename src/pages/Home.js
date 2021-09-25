import { Col, Input, Row, Skeleton, Typography } from "antd"
import { useContext, useEffect, useState } from "react"
import CardPrimary from "../components/CardPrimary"
import CardSecondary from "../components/CardSecondary"
import { GlobalContext } from "../contexts/GlobalContext"

const Home = () => {

    const { getMovies, getGames } = useContext(GlobalContext)

    const [movies, setMovies] = useState([])
    const [games, setGames] = useState([])
    const [initialMovies, setInitialMovies] = useState([])
    const [initialGames, setInitialGames] = useState([])

    const [moviesLoading, setMoviesLoading] = useState(true)
    const [gamesLoading, setGamesLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [searchMovies, setSearchMovies] = useState([])
    const [searchGames, setSearchGames] = useState([])

    useEffect(() => {
        getMovies(cb => {
            if (!cb.error) {
                let data = cb.data.sort((a, b) => a.rating > b.rating ? -1 : (a.created_at < b.created_at ? 1 : 0)).slice(0, 3)
                setMovies(data)

                let dataRandom = cb.data.sort((a, b) => Math.random() - 0.5)
                setInitialMovies(dataRandom)
                setSearchMovies(dataRandom.slice(0, 3))
                setMoviesLoading(false)
            }
        })

        getGames(cb => {
            if (!cb.error) {
                let data = cb.data.sort((a, b) => a.id < b.id ? 1 : -1).slice(0, 6)
                setGames(data)

                let dataRandom = cb.data.sort((a, b) => Math.random() - 0.5)
                setInitialGames(dataRandom)
                setSearchGames(dataRandom.slice(0, 3))
                setGamesLoading(false)
            }
        })

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const helperSearch = (data, keyword) => {
        let result = data.filter((item) => {
            let title = item.title ?? item.name ?? ""
            if (title.toUpperCase().indexOf(keyword.toUpperCase()) > -1 ) {
                return item
            }
            return false
        })

        return result.slice(0,3)
    }

    const handleSearch = async (e) => {
        setSearchMovies(await helperSearch(initialMovies, e.target.value))
        setSearchGames(await helperSearch(initialGames, e.target.value))
    }

    return (
        <>
            <section style={{ marginTop: "2rem" }}>
                <header>
                    <Typography.Title level={2}>Explore</Typography.Title>
                    <Input.Group compact className="filter-search search-only">
                        <Input style={{ width: "100%" }} className="search-box" allowClear value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter to find movies and games here ..." onPressEnter={handleSearch} />
                    </Input.Group>
                </header>
                {(moviesLoading && gamesLoading) ? (
                    <Skeleton active />
                ) : (
                    <>
                        { searchMovies.length > 0 || searchGames.length > 0 ? (
                            <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                                { searchMovies.length > 0 && searchMovies.map((item, index) => (
                                    <Col span={8} key={`${item.id}_${index}`}>
                                        <CardSecondary uri={`/movies/${item.id}`} item={item} />
                                    </Col>
                                ))}
                                { searchGames.length > 0 && searchGames.map((item, index) => (
                                    <Col span={8} key={`${item.id}_${index}`}>
                                        <CardSecondary uri={`/games/${item.id}`} item={item} />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div style={{ paddingTop: "1rem" }}>
                                <Typography.Title level={4} style={{ color: "#f1f1f1" }}>No Data Found</Typography.Title>
                            </div>
                        ) }
                    </>
                )}
            </section>
            <section style={{ marginTop: "60px" }}>
                <header>
                    <Typography.Title level={2}><span style={{ color: "#40A798" }}>Rating:</span> Best Movies</Typography.Title>
                </header>
                {moviesLoading ? (
                    <Skeleton active />
                ) : (
                    <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                        {movies.map((item) => (
                            <Col span={8} key={item.id}>
                                <CardPrimary uri={`/movies/${item.id}`} item={item} />
                            </Col>
                        ))}
                    </Row>
                )}
            </section>
            <section style={{ marginTop: "60px" }}>
                <header>
                    <Typography.Title level={2}><span style={{ color: "#40A798" }}>Latest:</span> Games</Typography.Title>
                </header>
                {gamesLoading ? (
                    <Skeleton active />
                ) : (
                    <Row gutter={[12, 12]} style={{ marginTop: "22px" }}>
                        {games.map((item) => (
                            <Col span={8} key={item.id}>
                                <CardSecondary uri={`/games/${item.id}`} item={item} />
                            </Col>
                        ))}
                    </Row>
                )}
            </section>
        </>
    )
}

export default Home