import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { UserContext } from '../context/authContext'
import '../css/loginRegister.css'
import { Link, useSearchParams } from 'react-router-dom'
import Loader from '../components/Spinner'

function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { verifyEmailCode } = useContext(UserContext)
  const handleVerification = useCallback(async () => {
    const code = searchParams.get('oobCode')
    const mode = searchParams.get('mode')
    setLoading(true)
    if (!mode) {
      setMessage('Invalid verification link')
      setLoading(false)
    }

    if (!code) {
      setMessage('Invalid verification link')
      setLoading(false)
    }

    if (code && mode === 'verifyEmail') {
      try {
        await verifyEmailCode(code)
        setMessage('Email verified successfully')
        setLoading(false)
      } catch (error) {
        console.log(error)
        setMessage('Error verifying email')
        setLoading(false)
      }
    }
  }, [searchParams, verifyEmailCode])

  useEffect(() => {
    console.log('useEffect')
    handleVerification()
  }, [handleVerification])

  return (
    <Container className="container-full-right">
      <Row className="justify-content-md-center">
        <Col className="form-container">
          {loading && <Loader />}
          {!loading && (
            <>
              <h1>{message}</h1>
              <Link to="/login">Login</Link>{' '}
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default memo(VerifyEmail)
