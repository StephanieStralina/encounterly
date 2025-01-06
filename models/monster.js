const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const abilitySchema = new Schema ({
    name: {
       type: String, 
    },
    description: {
        type: String,
    },
});


const detailSchema = new Schema ({
    abilities: [abilitySchema],
    skills: {
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
});


const monsterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    type: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    alignment: {
        type: String,
    },
    xp: {
        type: Number,
        required: true,
    },
    cr: {
        type: String,
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
    prof: {
        type: Number,
        required: true,
    },
    details: detailSchema,
    stats: statSchema,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});


module.exports = mongoose.model("Monster", monsterSchema);