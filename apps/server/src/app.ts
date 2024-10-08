import express from 'express'
import cors from 'cors'
import authMiddleware from './middlewares/firebase'
const app = express()

app.use(cors())

app.use(authMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
