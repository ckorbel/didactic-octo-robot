const Sequelize = require("sequelize");
const db = require("../../config/db");
const NflPlayer = require("./NflPlayer");

const NflTeam = db.define("nfl_teams", {
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

NflTeam.hasMany(NflPlayer);

module.exports = NflTeam;
