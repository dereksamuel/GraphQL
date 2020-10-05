'use strict'
const { MongoClient } = require('mongodb')

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_PORT},${DB_HOST}:${DB_PORT}/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=${DB_NAME}`
let connection

async function connectDB () {
  if (connection) return connection
  try {
    console.log('DB connected')
    return (await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })).db('expresso')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
