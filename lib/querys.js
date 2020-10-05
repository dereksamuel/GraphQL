'use strict';
const CONNECTdb = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  getCourses: async () => {
    let db
    let courses = []
    try {
      db = await CONNECTdb()
      courses = await db.collection('courses').find().toArray()
    } catch (err) {
      errorHandler(err);
    }
    return courses
  },
  getCourse: async (root, { id }) => {
    let db
    let course
    try {
      db = await CONNECTdb()
      course = await db.collection('courses').findOne({ _id: ObjectID(id) })
    } catch (err) {
      errorHandler(err);
    }
    return course
  },
  getPeople: async () => {
    let db
    let courses = []
    try {
      db = await CONNECTdb()
      courses = await db.collection('students').find().toArray()
    } catch (err) {
      errorHandler(err);
    }
    return courses
  },
  getPerson: async (root, { id }) => {
    let db
    let student
    try {
      db = await CONNECTdb();
      student = await db.collection('students').findOne({ _id: ObjectID(id) })
    } catch (err) {
      errorHandler(err);
    }
    return student
  },
  searchItems: async (root, { keyword }) => {
    let db;
    let items;
    let courses;
    let people;
    try {
      db = await CONNECTdb();
      courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray();
      people = await db.collection('students').find({ $text: { $search: keyword } }).toArray();
      items = [...courses, ...people];
    } catch (err) {
      errorHandler(err);
    }
    return items;
  },
}
