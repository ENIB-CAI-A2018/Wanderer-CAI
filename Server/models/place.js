'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    images: DataTypes.STRING,
    infos: DataTypes.STRING
  }, {});
  Place.associate = function(models) {
    // associations can be defined here
  };
  return Place;
};