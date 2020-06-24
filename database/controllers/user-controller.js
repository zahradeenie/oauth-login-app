const db = require('../models');
const User = db.user;
// const Op = db.Sequelize.Op;

const createUser = async (user) => {
  if (!user) {
    return ({
      status: 400,
      msg: 'Unauthorized to save this user'
    });
  }

  const firstName = user.name.substring(0, user.name.indexOf(' '));
  const lastName = user.name.substring(0, user.name.indexOf(' ') + 1);

  const user = {
    firstName: firstName !== '' ? firstName : lastName,
    lastName: firstName !== '' ? lastName : '',
    email: user.email,
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