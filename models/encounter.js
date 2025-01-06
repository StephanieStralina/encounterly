const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const encounterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    players: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    enemies: {
        type: [Schema.Types.ObjectId],
        ref: 'Monster'
    },
    difficulty: {
        type: Number,
    }
});