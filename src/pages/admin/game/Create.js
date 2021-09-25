import { Typography } from "antd"
import { useHistory } from "react-router-dom"

const AdminGameCreate = () => { 
    const history = useHistory()

    return (
        <div>
            <Typography.Title level={1}>Admin</Typography.Title>
        </div>
    )
}

export default AdminGameCreate