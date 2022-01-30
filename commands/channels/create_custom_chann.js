const { Client, Collection, Intents, Guild, Permissions } = require("discord.js")

module.exports.run = async (client, oldState, newState) => {
    voice_channel = client.channels.cache.get(newState.channelId)
	voice_guild = client.guilds.cache.get(voice_channel.guild.id)
	user = client.users.cache.get(newState.id)

	if(voice_channel.name == "new-voc"){
		voice_guild.channels.create(client.users.cache.get(newState.id).username, {
			type: 'GUILD_VOICE',
			parent: voice_channel.parentId,
			permissionOverwrites: [
				{
				  id: newState.id,
				  allow: [
					Permissions.FLAGS.VIEW_CHANNEL,
					Permissions.FLAGS.MANAGE_CHANNELS,
					Permissions.FLAGS.MANAGE_ROLES,
					Permissions.FLAGS.MUTE_MEMBERS,
					Permissions.FLAGS.DEAFEN_MEMBERS,
					Permissions.FLAGS.MOVE_MEMBERS,
					]
			   },
			 ],
		}).then((newChan) => {
			console.log(`newChanId : ${newChan.id}`)
			client.guilds.cache.get(voice_guild.id).members.cache.get(user.id).voice.setChannel(newChan)
			customChannels.push(newChan.id)
			console.log(`channel apres creation : ${customChannels}`)
		})
	}
}

module.exports.help = {
	name: "create_custom_chann",
}