const db = require('../models');
const User = db.User;

const createUser = async (data) => {
  if (!data) {
    return ({
      status: 400,
      msg: `Unauthorized to save this user`
    });
  }

  const [firstName, lastName] = data.name.split(' ');

  const user = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: data.email,
    oauthId: data.id
  }

  try {
    const newUser = await User.create(user);
    return newUser.json();

  } catch (error) {
    return {
      status: 500,
      msg: error.message,
      info: `Could not save user: ${data}`
    };
  }
}

const getOneUser = async (data) => {
  if (!data) {
    return ({
      status: 400,
      msg: 'No data provided to find a user'
    });
  }

  try {
    const user = await User.findOne({
      limit: 1,
      where: {
        oauthId: data.id
      }
    });
    return user;

  } catch (error) {
    return {
      status: 500,
      msg: error.message,
      info: `Could not find user: ${data}`
    }
  }
}

module.exports = {
  createUser,
  getOneUser
};