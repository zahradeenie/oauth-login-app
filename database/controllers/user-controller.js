const db = require('../models');
const User = db.user;

const createUser = async (data) => {
  if (!data) {
    return ({
      status: 400,
      msg: 'Unauthorized to save this user'
    });
  }

  const firstName = data.name.substring(0, data.name.indexOf(' '));
  const lastName = data.name.substring(0, data.name.indexOf(' ') + 1);

  const user = {
    firstName: firstName !== '' ? firstName : lastName,
    lastName: firstName !== '' ? lastName : '',
    email: data.email,
  }

  try {
    const newUser = await User.create(user);
    return newUser.json();
  } catch (error) {
    return {
      status: 500,
      msg: error.message || 'Could not save this user'
    };
  }
}

module.exports = {
  createUser
};