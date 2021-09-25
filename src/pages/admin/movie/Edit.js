import { Typography } from "antd"
import { useParams } from "react-router-dom"
import MovieForm from "./Form"

const AdminMovieEdit = () => {


    const { id } = useParams()

    return (
        <div style={{ marginTop: "2rem" }}>
            <Typography.Title level={2}><span style={{ color: "#40A798" }}>Edit</span> Movie</Typography.Title>

            <MovieForm id={id} />
        </div>
    )
}

export default AdminMovieEdit