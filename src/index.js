const express = require('express')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()

app.use(express.json())
app.use(router)

const Score = mongoose.model('Score', {
  name: String,
  score: Number
})

router.get('/', async (req, res) => {
  const scores = await Score.find()
  return res.send(scores)
})

router.post('/', async (req, res) => {
  const score = new Score({
    name: req.body.name,
    score: req.body.score
  })

  await score.save()
  return res.send(score)
})

router.delete('/:id', async (req, res) => {
  const score = await Score.findByIdAndDelete(req.params.id)
  return res.send(score)
})

router.put('/:id', async (req, res) => {
  const score = await Score.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    score: req.body.score
  })
  return res.send(score)
})

app.listen(3006, () => {
  mongoose.connect(
    'mongodb+srv://alefe:z832JtAo8wiGt9ae@accssible-memory-game.4obwt2p.mongodb.net/?retryWrites=true&w=majority'
  )
  console.log('Server running on port 3006')
})
