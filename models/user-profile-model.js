const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// user sign up model steps gotten from mongoose documentation
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Firstame cannot be blank'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Lastname cannot be blank'],
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'a password is required'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email address ',
      ],
    },
  },
  { timestamps: true }
);
// ******************

// hash_password before sending the information into the database for security purpose
// using the bcrypt Library
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//

// ensure protection of information transportation with JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_DURATION,
    }
  );
};
// *****************************

module.exports = mongoose.model('User', UserSchema);
