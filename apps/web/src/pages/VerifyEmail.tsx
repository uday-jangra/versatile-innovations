import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { UserContext } from '../context/authContext'
import '../css/loginRegister.css'
import { Navigate, useSearchParams } from 'react-router-dom'
import Loader from '../components/Spinner'

function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const context = useContext(UserContext)
  const handleVerification = async () => {
    const code = searchParams.get('oobCode')
    const mode = searchParams.get('mode')
    setLoading(true)
    if (!mode) {
      setLoading(false)
    }

    if (mode !== 'verifyEmail') {
      setLoading(false)
    }

    if (!code) {
      setLoading(false)
    } else {
      try {
        await context.verifyEmailCode(code)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    handleVerification()
  }, [])

  return (
    <Container className="container-full-right">
      <Row className="justify-content-md-center">
        <Col className="form-container">
          {loading && <Loader />}
          {!loading && <>{<Navigate to="/login" />}</>}
        </Col>
      </Row>
    </Container>
  )
}

export default VerifyEmail
