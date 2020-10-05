'use strict'
const mutations = require('./mutations')
const querys = require('./querys')
const types = require('./type')

module.exports = {
  Query: querys,
  Mutation: mutations,
  ...types
}
