const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
	category: 'NSFW',
	name: 'boobs',
	description: 'boobs!',
	callback: ({ message, args }) => {
		if (message.channel.nsfw) {
		(async () => {
			let desire = args[0]
			const image = await nsfw.boobs();
			const embed = new Discord.MessageEmbed()
				.setTitle(`NSFW`)
				.setColor("RED")
				.setImage(image);
			message.channel.send(embed);
		})();
	} else {
		message.reply("Ta komenda jest dostępna tylko na kanałach NSFW.");
	}
	},
};