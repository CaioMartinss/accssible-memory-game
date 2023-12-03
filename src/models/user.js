import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
