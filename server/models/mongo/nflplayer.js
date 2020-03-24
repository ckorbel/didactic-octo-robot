const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NflPlayerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  currentTeamId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("NflPlayer", NflPlayerSchema);
