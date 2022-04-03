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
        gamestatus : {
            type: String,
            default: "This user not setting game status!"
        },
		genshin: {
            type: String,
            default: "-"
        },
		steamId: {
            type: String,
            default: "-"
        },
        mobileLegends: {
            type: String,
            default: "-"
        },
        osu: {
            type: String,
            default: "-"
        },
        honkaiImpact: {
            type: String,
            default: "-"
        },
        RockstarGames: {
            type: String,
            default: "-"
        },
        Valorant: {
            type: String,
            default: "-"
        },
        ApexLegend: {
            type: String,
            default: "-"
        },
        PointBlank: {
            type: String,
            default: "-"
        },
        PUBG: {
            type: String,
            default: "-"
        },
        lastProfileUpdate: Date,
	},
    socialMedia: {
        sosmedStatus : {
            type: String,
            default: "This user not setting game status!"
        },
		facebook: {
            type: String,
            default: "-"
        },
		twitter: {
            type: String,
            default: "-"
        },
        instagram: {
            type: String,
            default: "-"
        },
        tiktok: {
            type: String,
            default: "-"
        }
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
        default: `Dapin-kun`
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