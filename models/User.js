const mongoose = require("mongoose");

const schema = mongoose.Schema({
    account: {
		username: String,
		userId: String,
		patreon: {
			type: String,
			enum: ["", "Bronze", "Silver", "Gold", "Platinum"],
			default: "",
		},
	},
    games: {
		genshin: {
            type: String,
            default: 0
        },
		steamId: {
            type: String,
            default: 0
        },
        mobileLegends: {
            type: String,
            default: 0
        },
        osu: {
            type: String,
            default: 0
        },
        honkaiImpact: {
            type: Number,
            default: 0
        },
        RockstarGames: {
            type: String,
            default: 0
        },
        lastProfileUpdate: Date,
	},
    rankcard: {
		background: {
            type: String,
            default: "https://i.ibb.co/12VWkmG/RankCard.png"
        },
		color: {
            type: Array,
            default: "FFFFFF"
        },
	},
    
    userID: String,
    guildID: String,
    username: String,
    lastpayday: Date,
    money: {
        type: Number,
        default: 0
    },
    point: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    xprequired: {
        type: Number,
        default: 0
    },
    messages: {
        type: Number,
        default: 0
    },
    warn: {
        type: Number,
        default: 0
    },
    muted: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: `Jonesmania`
    },
    waifu: {
        type: String,
        default: `Mama Altina`
    },
    _time: {
        type: Number,
        default: 0
    },
    afk: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Not Afk"
    },
    banner: {
        type: String,
        default: ''
    },
    questdone: {
        type: Number,
        default: '0'
    },
    blacklist: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("User", schema);