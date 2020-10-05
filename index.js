'use strict'
require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors');
const express_gQLMIDDLEWARE = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const isDev = process.env.NODE_ENV.trimRight() !== 'production';
const { port } = require('./config').api
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)

app.use(cors());
// definiendo el primer esquema:
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/api', express_gQLMIDDLEWARE({
  schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(port, () => {
  try {
    console.log(`Server listening on port: http://localhost:${port}/api`)
  } catch (err) {
    console.error(`[error 🔥]: ${err}`)
  }
})
//Las interfaces son muy importantes y útiles cuando nos encontramos con tipos de datos similares. Una interfaz nos permite definir un tipo de dato padre que utilizando la palabra implements va a implementar los campos que tenga definidos dentro del tipo de dato que queramos.
