'use strict'
const connectDB = require('./db')
const { ObjectID } = require('mongodb')
module.exports = {
  createCourse: async (root, { input }) => {
    const newCourse = Object.assign(input);
    let db;
    let courseAdd;
    try {
      db = await connectDB();
      courseAdd = await db.collection('courses').insertOne(newCourse);
      newCourse._id = courseAdd.insertedId // TODO:para crearle id al id del input
    } catch (err) {
      errorHandler(err);
    }
    return newCourse;
  },
  editCourse: async (root, { _id, input }) => {
    let db;
    let course;
    try {
      db = await connectDB();
      await db.collection('courses').updateOne(
        { _id: ObjectID(_id) },
        { $set: input } // información a cambiar = $Set
      );
      course = await db.collection('courses').findOne({
        _id: ObjectID(_id)
      });
    } catch (err) {
      errorHandler(err);
    }
    return course;
  },
  deleteCourse: async (root, { _id }) => {
    let db
    let courses
    try {
      db = await connectDB();
      db.collection('courses').deleteOne({ _id: ObjectID(_id) })
        .then(() => console.log('Deleted OK'))
        .catch((err) => console.error('[err]: ', err));
      courses = await db.collection('courses').find().toArray();
    } catch (err) {
      errorHandler(err);
    }
    return courses
  },
  deleteStudent: async (root, { _id }) => {
    let db;
    let students;
    try {
      db = await connectDB();
      db.collection('students').deleteOne({ _id: ObjectID(_id) })
        .then(() => console.log('Deleted OK'))
        .catch((err) => console.error('[err]: ', err));
      students = await db.collection('students').find().toArray();
    } catch (err) {
      errorHandler(err);
    }
    return students;
  },
  editPerson: async (root, { _id, input }) => {
    let db;
    let student;
    try {
      db = await connectDB();
      await db.collection('students').updateOne(
        { _id: ObjectID(_id) },
        { $set: input } // información a cambiar = $Set
      );
      student = await db.collection('students').findOne({
        _id: ObjectID(_id)
      });
    } catch (err) {
      errorHandler(err);
    }
    return student;
  },

  createPerson: async (root, { input }) => {
    let db;
    let studentAdd;
    try {
      db = await connectDB();
      studentAdd = await db.collection('students').insertOne(input);
      input._id = studentAdd.insertedId;// TODO:para crearle id al id del input
    } catch (err) {
      errorHandler(err);
    }
    return input;
  },
  addPeople: async (root, { courseId, personId }) => {
    let db;
    let person, course;
    try {
      db = await connectDB();
      course = await db.collection('courses').findOne({
        _id: ObjectID(courseId)
      });
      person = await db.collection('students').findOne({
        _id: ObjectID(personId)
      });
      if (!course || !person) throw new Error('No hay una persona');
      await db.collection('courses').updateOne(
        { _id: ObjectID(courseId) },
        { $addToSet: { people: ObjectID(personId) } }
      );// TODO: $addToSet sirve para buscar si existe un campo y añadir si es así a este lo que queramos
      // TODO:campo llamado people, se le va a añadir el id de la persona del id
    } catch (err) {
      errorHandler(err);
    }
    return course;
  }
}
