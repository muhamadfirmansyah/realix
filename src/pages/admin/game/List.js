import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled } from "@ant-design/icons"
import { Button, Typography, Table, Row, Col, Skeleton, Modal, Space, message } from "antd"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import CardSecondary from "../../../components/CardSecondary"
import { GlobalContext } from "../../../contexts/GlobalContext"

const AdminGameList = () => {

    const history = useHistory()

    const { getGames, deleteGame } = useContext(GlobalContext)

    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)

    const dataBoolean = [
        {
            text: "Yes",
            value: 1,
        },
        {
            text: "No",
            value: 0,
        }
    ]

    const [filterReleases, setFilterReleases] = useState([])

    const fetchGames = () => {
        getGames(cb => {
            if (!cb.error) {
                let data = cb.data.map((item) => {
                    return {...item, key: item.id}
                })
                setGames(data)

                let releases = cb.data.map((item) => item.release).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a > b ? 1 : -1).map(item => {
                    return {
                        text: item,
                        value: item
                    }
                })
                setFilterReleases(releases)
            }

            setLoading(false)
        })
    }

    useEffect(() => {
        fetchGames()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Release',
            dataIndex: 'release',
            key: "release",
            filters: filterReleases,
            onFilter: (value, record) => {
                return record.release === value
            },
            sorter: (a, b) => a.release - b.release,
        },
        {
            title: 'Single Player',
            dataIndex: 'singlePlayer',
            key: "singlePlayer",
            filters: dataBoolean,
            onFilter: (value, record) => {
                return record.singlePlayer === value
            },
            sorter: (a, b) => a.singlePlayer - b.singlePlayer,
            render: (text, record) => {
                return  record.singlePlayer ? <CheckCircleFilled style={{ color: "#6DE54C" }} /> : <CloseCircleFilled style={{ color: "#EB3E37" }} />
            }
        },
        {
            title: 'Multi Player',
            dataIndex: 'multiplayer',
            key: "multiplayer",
            filters: dataBoolean,
            onFilter: (value, record) => {
                return record.multiplayer === value
            },
            sorter: (a, b) => a.multiplayer - b.multiplayer,
            render: (text, record) => {
                return  record.multiplayer ? <CheckCircleFilled style={{ color: "#6DE54C" }} /> : <CloseCircleFilled style={{ color: "#EB3E37" }} />
            }
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
                  <Button type="dahsed" onClick={() => history.push(`/admin/games/edit/${record.id}`)}>Edit</Button>
                </Space>
            ),
        }
    ]

    const handleDelete = (id) => {
        deleteGame(id, (cb) => {
            if (!cb.error) {
                message.success('Game successfully deleted!', 5)
                fetchGames()
            }
        })
    }

    if (loading) {
        return <Skeleton active />
    }

    return (
        <section style={{ marginTop: "2rem" }}>
            <div style={{ display: "flex", alingItems: "center", justifyContent: "space-between" }}>
                <Typography.Title level={2}><span style={{ color: "#40A798" }}>List of</span> Games</Typography.Title>

                <Button onClick={() => history.push('/admin/games/create')}>Create Game</Button>
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
                                        Platform
                                    </Col>
                                    <Col span={18}>
                                        { record.platform }
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <CardSecondary uri={`/games/${record.id}`} item={record} />
                            </Col>
                        </Row>
                    ),
                    rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                    dataSource={games}
                />
            </div>
        </section>
    )
}

export default AdminGameList