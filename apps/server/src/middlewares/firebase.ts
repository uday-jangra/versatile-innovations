import * as admin from 'firebase-admin'

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).send('Unauthorized')
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(authorization)
    req.user = decodedToken
    return next()
  } catch (error) {
    console.log(error)
    return res.status(401).send('Unauthorized')
  }
}

export default authMiddleware
