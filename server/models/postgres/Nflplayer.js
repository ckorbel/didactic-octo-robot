const Sequelize = require("sequelize");
const db = require("../../config/db");

const NflPlayer = db.define("nfl_players", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false
  },
  currentTeamId: {
    type: Sequelize.INTEGER,
    references: "nfl_teams",
    referencesKey: "id"
  }
});

module.exports = NflPlayer;
