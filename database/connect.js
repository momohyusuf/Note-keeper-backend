const mongoose = require('mongoose');

const connectDataBase = async (key) => {
  await mongoose.connect(key);
};

module.exports = connectDataBase;
