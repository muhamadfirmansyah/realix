import { Typography } from "antd"
import MovieForm from "./Form"

const AdminMovieCreate = () => {

    return (
        <div style={{ marginTop: "2rem" }}>
            <Typography.Title level={2}><span style={{ color: "#40A798" }}>Create a</span> New Movie</Typography.Title>

            <MovieForm />
        </div>
    )
}

export default AdminMovieCreate