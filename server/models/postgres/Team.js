const Sequelize = require("sequelize");
const db = require("../../config/db");
const MlbPlayer = require("./MlbPlayer");

const Team = db.define("teams", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  logo: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

Team.hasMany(MlbPlayer);

module.exports = Team;
