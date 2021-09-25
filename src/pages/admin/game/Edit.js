import { Typography } from "antd"
import { useParams } from "react-router-dom"
import GameForm from "./Form"

const AdminGameEdit = () => {


    const { id } = useParams()

    return (
        <div style={{ marginTop: "2rem" }}>
            <Typography.Title level={2}><span style={{ color: "#40A798" }}>Edit</span> Game</Typography.Title>

            <GameForm id={id} />
        </div>
    )
}

export default AdminGameEdit