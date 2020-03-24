const Sequelize = require("sequelize");
const db = require("../../config/db");

const MlbPlayer = db.define("mlb_players", {
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
    references: "teams",
    referencesKey: "id"
  }
});

module.exports = MlbPlayer;
