import { useEffect, useState } from "react";
import { Typography, Select, Input, Col, Row, Skeleton } from "antd"
import CardPrimary from "../components/CardPrimary";
import axios from "axios";

const Movies = () => {

    const [initialMovies, setInitialMovies] = useState([])
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const [genres, setGenres] = useState([])
    const [releases, setReleases] = useState([])
    const [durations, setDurations] = useState([])
    const [filter, setFilter] = useState({
        search: "",
        genre: "",
        release: "",
        duration: "",
    })

    useEffect(async () => {
        let res = await axios.get("https://backendexample.sanbersy.com/api/data-movie")
        if (res) {
            setInitialMovies(res.data)
            setMovies(res.data)
            setLoading(false)
            setGenres(res.data.map((i) => i.genre))
            setReleases(res.data.map((i) => i.year))
            setDurations(res.data.map((i) => i.duration))
        }
    }, [])

    const handleFilter = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })

        handleSearch()
    }

    const handleSearch = () => {
        let filterSearch = initialMovies
        if (filter.search !== "") {
            filterSearch = initialMovies.filter((item) => {
                if (item.title.toUpperCase().indexOf(filter.search.toUpperCase()) > -1) {
                    return item
                }
                return false
            })
        }

        setGenres(filterSearch.map((i) => i.genre))
        setReleases(filterSearch.map((i) => i.year))
        setDurations(filterSearch.map((i) => i.duration))
        setMovies(filterSearch)
    }

    if (loading) {
        return <Skeleton active />
    }

    return (
        <section style={{ marginTop: "2rem" }}>
            <header>
                <Typography.Title level={2}><span style={{ color: "#40A798" }}>List of </span> Movies</Typography.Title>
                <form>
                    <Input.Group compact className="filter-search">
                        <Input style={{ width: "44%" }} className="search-box" name="search" value={filter.search} placeholder="Find movies and games here ..." onInput={handleFilter} allowClear={true} />
                        <Select  style={{ width: "18%" }} placeholder="Genre" name="genre" value={filter.genre} allowClear bordered={false} onChange={handleFilter}>
                            { genres.map((genre) => (
                                <Select.Option value={genre}>{ genre }</Select.Option>
                            )) }
                        </Select>
                        <Select  style={{ width: "18%" }} placeholder="Release" name="release" value={filter.release} allowClear bordered={false} onChange={handleFilter}>
                            { releases.map((release) => (
                                <Select.Option value={release}>{ release }</Select.Option>
                            )) }
                        </Select>
                        <Select  style={{ width: "18%" }} placeholder="Duration" name="duration" value={filter.duration} allowClear bordered={false} onChange={handleFilter}>
                            { durations.map((duration) => (
                                <Select.Option value={duration}>{ duration }</Select.Option>
                            )) }
                        </Select>
                    </Input.Group>
                </form>
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