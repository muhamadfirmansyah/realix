import { Typography } from "antd"
import GameForm from "./Form"

const AdminGameCreate = () => { 

    return (
        <div style={{ marginTop: "2rem" }}>
            <Typography.Title level={2}><span style={{ color: "#40A798" }}>Create a</span> New Game</Typography.Title>

            <GameForm />
        </div>
    )
}

export default AdminGameCreate