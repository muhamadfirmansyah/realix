import { Link } from "react-router-dom"
import { Card, Typography } from "antd"

const CardPrimary = ({ uri, item }) => {
    return (
        <Link to={uri}>
            <Card hoverable className="card-primary">
                <div className="card-primary-body" style={{ backgroundImage: `url(${item.image_url})` }}>
                    <div className="card-primary-content">
                        <div className="card-primary-text">
                            <Typography.Title level={5} className="card-snippet-top">{ item.year }</Typography.Title>
                            <Typography.Title level={4} className="card-title">{ item.title }</Typography.Title>
                            <Typography.Paragraph className="card-snippet-bottom">{ item.description }</Typography.Paragraph>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default CardPrimary