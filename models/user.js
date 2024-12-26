const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  charName: {
    type: String,
    required: true,
  },
  charImg: {
    type: String,
  },
  charClass: {
    type: String,
    enum: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk',
      'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'],
    required: true,
    default: 'Barbarian',
  },
  charLevel: {
    type: Number,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },
  ac: {
    type: Number,
    required: true,
  },
  partyName: {
    type: String,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  savedEncounters: {
    type: [Schema.Types.ObjectId],
    ref: 'Encounter'
  },
  players: [playerSchema],
});

module.exports = mongoose.model("User", userSchema);
