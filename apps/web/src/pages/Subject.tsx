import { useCallback, useContext, useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { UserContext } from '../context/authContext'
import axios from 'axios'
import Loader from '../components/Spinner'
import { SubjectCardProps } from '../components/SubjectCards'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function Subject() {
  const context = useContext(UserContext)
  const [subject, setSubject] = useState<SubjectCardProps>()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const getSubject = useCallback(async () => {
    try {
      setLoading(true)
      if (!id) {
        throw new Error('Invalid subject Id')
      }
      const subject = await axios.get(
        import.meta.env.VITE_API_URL + 'subject/' + id,
        {
          headers: {
            Authorization: `Bearer ${await context.user?.getIdToken()}`,
          },
        }
      )
      console.log(subject.data)
      setSubject(subject.data)
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        toast.error(err.message)
      }
      navigate('/app/dashboard')
    } finally {
      setLoading(false)
    }
  }, [context.user, id, navigate])

  useEffect(() => {
    getSubject()
  }, [getSubject])

  return (
    <>
      <Container fluid className="mt-4">
        <Row className="justify-content-md-center">
          <h1>{`Welcome to ${subject?.name}`}</h1>
        </Row>
      </Container>
      <Container fluid>
        {loading && <Loader />}
        {!loading && <>{subject?.description}</>}
      </Container>
    </>
  )
}

export default Subject
