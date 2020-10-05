'use strict';
const connectDB = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
  Course: {
    people: async ({ people }) => {
      let db;
      let peopleDATA;
      let ids;
      try {
        db = await connectDB();
        ids = people ? people.map((id) => ObjectID(id)) : [];
        peopleDATA = ids.lenght > 0 ? await db.collection('students').find(
          { _id: { $in: ids } } // TODO: Buscar estudiantes que recibamos en people por id
        ).toArray() : [];
      } catch (err) {
        console.error(err);
      }
      return peopleDATA;
    }
  },
  Person: {
    __resolveType: (person, context, input) => {
      if (person.phone) {
        return 'Monitor'
      } else {
        return 'Student'
      }
    }
  },
  GlobalSearch: {
    __resolveType : (item, context, info) => {
      if (item.title) 'Course';
      if (item.phone) 'Monitor';
      return 'Student';
    }
  }
}
