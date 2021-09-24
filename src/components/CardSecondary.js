import { Card, Typography } from "antd"
import { Link } from "react-router-dom"

const CardSecondary = ({ uri, item }) => {
    return (
        <Link to={uri}>
            <Card hoverable className="card-secondary">
                <div className="card-secondary-body" style={{ background: `url(${item.image_url})` }}>
                    <div className="card-secondary-content">
                        <div className="card-secondary-text">
                            <Typography.Title level={5} className="card-snippet-top">{ item.year ?? item.release }</Typography.Title>
                            <Typography.Title level={4} className="card-title">{ item.title ?? item.name }</Typography.Title>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default CardSecondary