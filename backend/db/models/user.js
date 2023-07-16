'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 15],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    host: DataTypes.BOOLEAN,
    superHost: DataTypes.BOOLEAN,
    identityVerified: DataTypes.BOOLEAN,
    online: DataTypes.BOOLEAN,
    aboutMe: DataTypes.STRING,
    duringStay: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },

  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Listing, {
      foreignKey: 'ownerId',
      onDelete: 'CASCADE',
      hooks: true
    });
    User.hasMany(models.Review, { foreignKey: 'authorId' });
    User.hasMany(models.Image, { foreignKey: 'userId' });
    User.hasMany(models.SearchHistory, { foreignKey: 'userId' });
    User.hasMany(models.PasswordHistory, { foreignKey: 'userId' });
    User.hasMany(models.UserSetting, { foreignKey: 'userId' });
    User.hasMany(models.DirectMessageThread, { foreignKey: 'hostId' }); //needs alias
    User.hasMany(models.DirectMessageThread, { foreignKey: 'guestId' }); //needs alias
    User.hasMany(models.DirectMessage, { foreignKey: 'senderId' });
    User.hasMany(models.Booking, { foreignKey: 'userId' });
    User.hasMany(models.ListingBrowseHistory, { foreignKey: 'userId' });
    User.hasMany(models.ListingPrice, { foreignKey: 'userId',
    onDelete: 'CASCADE',
    hooks: true
    });
    User.hasMany(models.WishList, { foreignKey: 'userId' });

  };

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };

   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };

   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password, firstName, lastName }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      firstName,
      lastName
    });

    return await User.scope('currentUser').findByPk(user.id);
  };
  return User;
};


































// 'use strict';
// const { Model, Validator } = require('sequelize');
// const bcrypt = require("bcryptjs");

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     toSafeObject() {
//       const { id, username, email } = this; // context will be the User instance
//       return { id, username, email };
//     }
//     validatePassword(password) {
//       return bcrypt.compareSync(password, this.hashedPassword.toString());
//     }
//     static getCurrentUserById(id) {
//       return User.scope("currentUser").findByPk(id);
//     }
//     static async login({ credential, password }) {
//       const { Op } = require('sequelize');
//       const user = await User.scope('loginUser').findOne({
//         where: {
//           [Op.or]: {
//             username: credential,
//             email: credential,
//           },
//         },
//       });
//       if (user && user.validatePassword(password)) {
//         return await User.scope('currentUser').findByPk(user.id);
//       }
//     }
//     static async signup({ username, email, password }) {
//       const hashedPassword = bcrypt.hashSync(password);
//       const user = await User.create({
//         username,
//         email,
//         hashedPassword,
//       });
//       return await User.scope('currentUser').findByPk(user.id);
//     };
//     static associate(models) {
//       // define association here
//     }
//   };
//   User.init(
//     {
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [4, 30],
//           isNotEmail(value) {
//             if (Validator.isEmail(value)) {
//               throw new Error("Cannot be an email.");
//             }
//           },
//         },
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [3, 256],
//         },
//       },
//       hashedPassword: {
//         type: DataTypes.STRING.BINARY,
//         allowNull: false,
//         validate: {
//           len: [60, 60],
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "User",
//       defaultScope: {
//         attributes: {
//           exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
//         },
//       },
//       scopes: {
//         currentUser: {
//           attributes: { exclude: ["hashedPassword"] },
//         },
//         loginUser: {
//           attributes: {},
//         },
//       },
//     }
//   );
//   return User;
// };
