import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Table, Row, Col, Typography, Space, Skeleton, Button, message, Modal, Input } from "antd"
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardSecondary from "../../../components/CardSecondary";
import { GlobalContext } from "../../../contexts/GlobalContext";
import Highlighter from 'react-highlight-words';

const AdminMovieList = () => {

    const history = useHistory()

    const { getMovies, deleteMovie } = useContext(GlobalContext)

    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [filterDurations, setFilterDurations] = useState([])
    const [filterYears, setFilterYears] = useState([])
    const [filterRatings, setFilterRatings] = useState([])

    const fetchMovies = () => {
        getMovies(cb => {
            if (!cb.error) {
                let data = cb.data.map((item) => {
                    return { ...item, key: item.id }
                })
                setMovies(data)

                let durations = cb.data.map((item) => item.duration).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a > b ? 1 : -1).map(item => {
                    return {
                        text: item,
                        value: item
                    }
                })
                setFilterDurations(durations)

                let years = cb.data.map((item) => item.year).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a > b ? 1 : -1).map(item => {
                    return {
                        text: item,
                        value: item
                    }
                })
                setFilterYears(years)

                let ratings = cb.data.map((item) => item.rating).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a > b ? 1 : -1).map(item => {
                    return {
                        text: item,
                        value: item
                    }
                })
                setFilterRatings(ratings)

                setLoading(false)
            }
        })
    }

    useEffect(() => {
        fetchMovies()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleDelete = (id) => {
        deleteMovie(id, (cb) => {
            if (!cb.error) {
                message.success('Movie successfully deleted!', 5)
                fetchMovies()
            }
        })
    }

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");


    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            let item = record[dataIndex]
            return item
                ? item.toString().toLowerCase().includes(value.toLowerCase())
                : ''
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
      };
    
    const handleReset = clearFilters => {
        clearFilters()
        setSearchText("")
    };
    

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: "title",
            sorter: (a, b) => (a.title ?? "").localeCompare(b.title ?? ""),
            ...getColumnSearchProps('title')
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: "year",
            filters: filterYears,
            onFilter: (value, record) => {
                return record.year === value
            },
            sorter: (a, b) => a.year - b.year
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: "rating",
            filters: filterRatings,
            onFilter: (value, record) => {
                return record.rating === value
            },
            sorter: (a, b) => a.rating - b.rating
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: "duration",
            filters: filterDurations,
            onFilter: (value, record) => {
                return record.duration === value
            },
            sorter: (a, b) => a.duration - b.duration
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "id",
            render: (text, record) => (
                <Space size="middle" key={record.id}>
                  <Button danger ghost onClick={() => {
                      Modal.confirm({
                          title: 'Do you want to delete this item?',
                          icon: <ExclamationCircleFilled />,
                          content: 'The item will be deleted permanently.',
                          onOk() {
                            handleDelete(record.id)
                          },
                          onCancel() {
                            console.log('Canceled!');
                          },
                      })
                  } }>Delete</Button>
                  <Button type="dahsed" onClick={() => history.push(`/admin/movies/edit/${record.id}`)}>Edit</Button>
                </Space>
            ),
        }
    ];

    if (loading) {
        return <Skeleton active />
    }

    return (
        <section style={{ marginTop: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography.Title level={2}><span style={{ color: "#40A798" }}>List of </span> Movies</Typography.Title>

                <Button onClick={() => history.push('/admin/movies/create')} style={{ marginBottom: "1rem" }}>Create Movie</Button>
            </div>

            <div style={{ overflowX: "auto" }}>
                <Table
                    columns={columns}
                    expandable={{
                    expandedRowRender: record => (
                        <Row gutter={[16]}>
                            <Col span={16}>
                                <Row gutter={[12, 20]}>
                                    <Col span={6} style={{ fontWeight: "bold" }}>
                                        Genre
                                    </Col>
                                    <Col span={18}>
                                        { record.genre }
                                    </Col>
                                    <Col span={6} style={{ fontWeight: "bold" }}>
                                        Description
                                    </Col>
                                    <Col span={18}>
                                        { record.description }
                                    </Col>
                                    <Col span={6} style={{ fontWeight: "bold" }}>
                                        Review
                                    </Col>
                                    <Col span={18}>
                                        { record.review }
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <CardSecondary uri={`/movies/${record.id}`} item={record} />
                            </Col>
                        </Row>
                    ),
                    rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={movies}
                />
            </div>

        </section>
    )
}

export default AdminMovieList