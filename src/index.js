import express from 'express'
import bodyParser from 'body-parser'
import userController from './controller/user.js'
import cors from 'cors'
const app = express()
const port = 3006

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userController)

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`)
})
