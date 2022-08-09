const User = require('../../models/user');

const { isValueExists } = require('../../utilities/collections');

exports.registerUsers = async (request, response, next) => {

  try {

    const body = request.body;

    const name = body.name;
    const email = body.email;
    const emailVerified = body.emailVerified;
    const profilePicture = body.picture;
    const user = new User(name, email, emailVerified, profilePicture, null);

    const users = await User.fetchAll();

    const userAlreadyExists = isValueExists(users, 'email', email);

    if (userAlreadyExists === true) {

      return response.status(200).json({
        message: 'User with this email is already registered!',
        data: null
      });

    }

    const userId = await user.save();

    const userProfile = await User.findById(userId);

    const data = {
      user: userProfile,
    };

    return response.status(200).json({
      message: 'User registered successfully!',
      data
    });

  } catch (exception) {

    return response.status(500).json({ error: exception });

  }

};