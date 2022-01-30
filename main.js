const { token } = require('./config.json');
const { readdirSync } = require('fs');
const { Client, Collection, Intents, Guild, Permissions } = require('discord.js');
const prefix = "&"

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Collection();

customChannels = []



const loadCommands = (dir = "./commands/") => {
	readdirSync(dir).forEach(dirs => {
		const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
		for (const file of commands) {
			const getFileName = require(`${dir}/${dirs}/${file}`);
			client.commands.set(getFileName.help.name, getFileName)
			console.log(`Commande chargée: ${getFileName.help.name}`)
		}
	})
}

loadCommands();

client.once('ready', async () => {
	console.log('Ready!');
});

client.on('messageCreate', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return
	const args = message.content.slice(prefix.length).split(/ +/)
	const command = args.shift().toLowerCase()
	if (!client.commands.has(command)) return
	client.commands.get(command).run(client, message, args);
});

client.on("voiceStateUpdate",  async (oldState, newState) => {
	
	// verif connection a un channel
	if(newState.channelId){
		// verif du nom du channel
		if (client.channels.cache.get(newState.channelId).name == "new-voc"){
			client.commands.get("create_custom_chann").run(client, oldState, newState)
		}
	}

	// verif deco
	if (oldState.channelId && (!newState.channelId || oldState.channelId != newState.channelId)){
		console.log("deconnection!")
		//Verificaion nbre dans le voc
		if (client.channels.cache.get(oldState.channelId).members.size == 0){
			console.log("pweaonne dans le voc")
			//Verificaion channel custom
			if (customChannels.find(chann => chann == oldState.channelId)){
				console.log("channel custom vide : destruction")
				client.commands.get("delete_custom_chann").run(client, oldState, newState)
			}
		}
	}
})

client.login(token);