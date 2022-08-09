const mongodb = require('mongodb');

const { getDB } = require('../utilities/database');

class User {

  constructor(name, email, emailVerified, profilePicture, id) {
    this.name = name;
    this.email = email;
    this.emailVerified = emailVerified;
    this.profilePicture = profilePicture;
    this._id = id ? mongodb.ObjectId(id) : null;
  }

  save() {

    const db = getDB();

    return db.collection('users')
      .insertOne(this)
      .then((response) => {
        return response.insertedId.toString();
      })
      .catch((error) => console.log(error));

  }

  static fetchAll() {

    const db = getDB();

    return db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        return users;
      })
      .catch((error) => console.log(error));
  }

  static findById(id) {

    const db = getDB();

    const objectId = new mongodb.ObjectId(id);

    return db.collection('users')
      .find({ _id: objectId })
      .next()
      .then((user) => {
        return user;
      })
      .catch((error) => console.log(error));
  }

}

module.exports = User;