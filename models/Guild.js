const mongoose = require("mongoose");

const schema = mongoose.Schema({
    guildID: String,
    guildName: String,
    prefix: {
        type: String,
        default: process.env.PREFIX
    },
    fined: {
		min: {
            type: Number,
            default: "50"
        },
		max: {
            type: Number,
            default: "100"
        },
	},
    money: {
		min: {
            type: Number,
            default: "6"
        },
		max: {
            type: Number,
            default: "3"
        },
	},
    exp: {
		min: {
            type: Number,
            default: "10"
        },
		max: {
            type: Number,
            default: "25"
        },
	},
    channel: {
        welcome: {
            type: String,
            default: ''
        },
        bye: {
            type: String,
            default: ''
        },
        modlog: {
            type: String,
            default: ''
        },
        income: {
            type: String,
            default: ''
        },
        levelup: {
            type: String,
            default: ''
        },
        chatmoney: {
            type: String,
            default: ''
        },
        story: {
            type: String,
            default: ''
        },
        afk: {
            type: String,
            default: ''
        },
        isolasi: {
            type: String,
            default: ''
        },
    },
    budget: {
        type: Number,
        default: '1'
    },
    role: {
        adminRole: {
            type: String,
            default: ''
        },
        modRole: {
            type: String,
            default: ''
        },
        kosuke: {
            type: String,
            default: ''
        },
        upCrRole: {
            type: String,
            default: ''
        },
        mutedRole: {
            type: String,
            default: ''
        },
        vipRole: {
            type: String,
            default: ''
        },
        warn1: {
            type: String,
            default: ''
        },
        warn2: {
            type: String,
            default: ''
        },
        warn3: {
            type: String,
            default: ''
        },
        warn4: {
            type: String,
            default: ''
        },
    },
    active: {
		welcome: {
            type: Boolean,
            default: "false"
        },
		bye: {
            type: Boolean,
            default: "false"
        },
        apply: {
            type: Boolean,
            default: "false"
        },
        convert: {
            type: Boolean,
            default: "false"
        },
        give: {
            type: Boolean,
            default: "false"
        },
	}
});

module.exports = mongoose.model("Guild", schema);