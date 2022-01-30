const { Client, Collection, Intents, Guild, Permissions } = require("discord.js")

module.exports.run = async (client, oldState, newState) => {
	toDelete = client.channels.cache.get(oldState.channelId)	
	toDelete.delete()
	.then((channel) =>{
        customChannels.splice(customChannels.indexOf(channel.id), 1)
	})
	.catch((error) =>{
		console.log(error)
	});
	console.log("channel deleted")
}

module.exports.help = {
	name: "delete_custom_chann",
}