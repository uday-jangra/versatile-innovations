import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export interface SubjectCardProps {
  _id: string
  id: number
  name: string
  description: string
  logoUrl: string
  maxLevels: number
  _userLevel: number
}

const SubjectCards = ({ data }: { data: SubjectCardProps }) => {
  return (
    <Link to={`/app/subject/${data.id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Img variant="top" src={data.logoUrl} />
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>
            {data.description} <br />
            Current Level: {data._userLevel}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default SubjectCards
