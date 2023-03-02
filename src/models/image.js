'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
        // define association here
      }
  }
    Image.init({
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            readOnly: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            readOnly: true,
        },
        file_name: {
            type: DataTypes.STRING,
            readOnly: true,
        },
        s3_bucket_path: {
            type: DataTypes.STRING,
            readOnly: true,
        }
},

    {
    sequelize,
    modelName: 'Image',
    date_created : 'account_created',
  });
    return Image;
};
