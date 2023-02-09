'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name:{
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    }, 
    sku:{
        type:DataTypes.STRING,
        //unique:true,
        allowNull:false,
    },
    manufacturer:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    owner_user_id:{
        type:DataTypes.INTEGER,
    }
    }, {
    sequelize,  
    modelName: 'Product',
    timestamps: true,
    updatedAt: 'date_last_updated',
    createdAt: 'date_added',
  });
  return Product;
};