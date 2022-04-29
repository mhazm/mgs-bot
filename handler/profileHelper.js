const determineSupporterTitle = (subscription) => {

	const titles = {
		Bronze: `${getIcon("bronzeSupporter")} Bronze Supporter ${getIcon("bronzeSupporter")}`,
		Silver: `${getIcon("silverSupporter")} Silver Supporter ${getIcon("silverSupporter")}`,
		Gold: `${getIcon("goldSupporter")} Gold Supporter ${getIcon("goldSupporter")}`,
		Platinum: `${getIcon("platinumSupporter")} Platinum Supporter ${getIcon("platinumSupporter")}`,
	};
	const title = titles[subscription] ? titles[subscription] : "Normal Member";
	return title;
};

const simpleSupporterTitle = (subscription) => {

	const pangkats = {
		Bronze: `Bronze Supporter`,
		Silver: `Silver Supporter`,
		Gold: `Gold Supporter`,
		Platinum: `Platinum Supporter`,
	};
	const pangkat = pangkats[subscription] ? pangkats[subscription] : "Normal Member";
	return pangkat;
}

const statusPTC = (status) => {

	const titles = {
		true: `Aktif`,
		false: `Tidak Aktif`,
	};
	const title = titles[status] ? titles[status] : "Unknowed";
	return title;
}

const generateTip = ()=> {
	let string = "Tip: ";
	const strings = [
		"Supporting WestManga dapat mempercepat update manga favoritmu!",
		"Chat yang banyak supaya server makin ramai",
		"Beradu pendapat boleh, tapi jangan sampai membully",
		"Spoiler wajib di channel khusus spoiler ya!",
		"Setting banner bisa pakai shortcommand sb",
		"Gunakan help apabila membutuhkan bantuan",
	];
	string += strings[Math.floor(Math.random() * strings.length)];
	return string;
};

const walletTip = ()=> {
	let string = "Tips: ";
	const strings = [
		"Kamu hanya bisa mendapatkan uang dari chatting di main kategori lho",
		"Ketik d.help payout untuk bantuan apabila ingin mencairkan uangmu!",
		"Kamu bisa cek di channel income-member untuk cek pendapatanmu",
	];
	string += strings[Math.floor(Math.random() * strings.length)];
	return string;
};

module.exports = { determineSupporterTitle, generateTip, simpleSupporterTitle, statusPTC, walletTip };