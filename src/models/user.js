'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    first_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail: true,
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[5,8]
      }
    }
  },
  
   {
    sequelize,
    modelName: 'User',
    timestamp : true,
    updatedAt : 'account_updated',  
    createdAt : 'account_created',
  });
  return User;
};