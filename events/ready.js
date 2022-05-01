const client = require("../index");
const activities = [ 
	{ type: 'PLAYING', name: `on version ${client.version}` },
    { type: 'WATCHING', name: `Taqabbalallahu minna waminkum ja'alanallahu minal aidin wal faizin. Selamat menikmati hari kemenangan!` }
];

client.on('ready', () => {
	let currentIndex = 0;
	console.log(`${client.user.username} ✅`)
    setInterval(() => {
        const activity = activities[currentIndex];
		client.user.setActivity(activity);

		currentIndex = currentIndex >= activities.length -1
		? 0
		: currentIndex + 1;
	}, 10000);
});