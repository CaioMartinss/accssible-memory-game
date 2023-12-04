import mongoose from 'mongoose'

const URI =
  'mongodb+srv://alefe:woamvNtYSnNO7KSb@accssible-memory-game.ifno2c3.mongodb.net/?retryWrites=true&w=majority'

const databaseConnection = async () => {
  if (!global.mongoose) {
    mongoose.set('strictQuery', false)
    global.mongoose = await mongoose.connect(URI)
  }
}

export default databaseConnection
