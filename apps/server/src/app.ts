import express, { Request } from 'express'
import cors from 'cors'
import authMiddleware from './middlewares/firebase'
import authRouter from './routes/auth.router'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import subjectRouter from './routes/subject.router'
const app = express()

export interface IRequest extends Request {
  user: DecodedIdToken
}
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(authMiddleware)
app.use('/auth', authRouter)
app.use('/subject', subjectRouter)

export default app
