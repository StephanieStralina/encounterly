const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const detailSchema = new Schema ({
    abilities: {
        type: String,
    },
    senses: {
        type: String,
    },
    languages: {
        type: String,
    },
    description: {
        type: String,
    },
});

const statSchema = new Schema ({
    str: {
        type: Number,
        required: true,
    },
    dex: {
        type: Number,
        required: true,
    },
    con: {
        type: Number,
        required: true,
    },
    int: {
        type: Number,
        required: true,
    },
    wis: {
        type: Number,
        required: true,
    },
    cha: {
        type: Number,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
}),


const monsterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    xp: {
        type: Number,
        required: true,
    }
    cr: {
        type: Number,
        required: true,
    }
    hp: {
        type: Number,
        required: true,
    }
    ac: {
        type: Number,
        required: true,
    },
    prof: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    details: [detailSchema],
    stats: [statSchema],
    user: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
});










module.exports = mongoose.model("Monster", monsterSchema);