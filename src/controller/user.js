import { Router } from 'express'
import {
  listUsers,
  createUser,
  deleteUser,
  updateUser
} from '../services/user.js'

const router = Router()

router.get('/', async (req, res) => {
  const usersList = await listUsers()
  res.send(usersList)
})

router.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body)
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/:userId', async (req, res) => {
  await deleteUser(req.params.userId)
  res.send()
})

router.put('/:userId', async (req, res) => {
  const userUpdated = await updateUser(req.params.userId, req.body)
  res.send(userUpdated)
})

export default router
