//Author: vappy

//Generalized constants
const Discord = require("discord.js");
const config = require("./config.json");
const prefix = "!";

//Client setup with partials included.
const client = new Discord.Client({"partials": ['GUILD_MEMBER', 'USER', 'CHANNEL', 'MESSAGE', 'REACTION']});

//Setup for command helper, so there isn't a million lines
//of code in index.js for anything that would be executed in
//a #bot-commands channel.
client.commands = new Discord.Collection();
const botCommands = require('./commands');
Object.keys(botCommands).map(key => {
	client.commands.set(botCommands[key].name, botCommands[key]);
});



client.on("message", message => {
	/*
	*Parsing commands for bot.
	*If message is sent by bot, doesn't start with prefix,
	*or isn't in a channel named bot-commands, ignore message.
	*Else, parse the command to check if it exists in the bot,
	*then run the command if it does.
	*/
	if (message.author.bot) return;
	console.log(`channel type: ${message.channel.type}`);
	if(message.channel.type == "text"){
		if (!message.content.startsWith(prefix)) return;
		if (message.channel.name != "bot-commands") return;
		const commandBody = message.content.slice(prefix.length);
		const args = commandBody.split(' ');
		const command = args.shift().toLowerCase();
		console.info(`command: ${command}`);
		if(!client.commands.has(command)) return;
	
		//Try/catch commands below.
	
		try{
			client.commands.get(command).execute(message, args);
		} catch (error){
			console.error(error);
			message.reply("an error occured, oh no. Yell at the vap.");
		}
	} 

});

//Confirm on startup in logs that the bot has connected.
client.on('ready', () => {
	console.info(`Logged in as ${client.user.tag}!`);
});

client.on('messageReactionAdd', async (reaction, user) => {
	//Comments will only comment on how it works for one iteration,
	//since all of them are basically copy/pasted.

	//Logging to see when reaction is launched
	console.log("reactions add fired");
	
	//partials are complicated. basically, if a channel, message,
	//or reaction isn't cached, it only gets an ID of what was sent.
	//Then it caches it. But on bot start up that means things don't
	//work until someone reacts or posts in the channel. Partials
	//allow this to work on bot startup.
	//tl;dr check to see if data was a partial, and fetch the full
	//data if it was.
	if (reaction.message.partial) await reaction.message.fetch()
	.then(fullmessage => {
		console.log(fullmessage.content);
	});
	
	if(reaction.partial) await reaction.fetch();

	if(user.partial) await user.fetch();

	console.log(reaction.message.id);
	//If the message ID of the reacted message matches the post
	//in the server we are monitoring..
	if(reaction.message.id == 779581424147365888){
		//If user was a bot, don't do anything.
		if(user.bot){return}
		//Check the emoji reacted. If it equals any of the
		//if statements, enter it.
		if(reaction.emoji.name == '💜'){//💜
			//Fetch the user that just reacted, get their guild
			//member data. Then, add the role by the ID of the role.
			//Send a message confirming that the role was added, then
			//delete the message 5 seconds later.
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.add('779562260632829972');
				reaction.message.channel.send(member.displayName + ", Role added!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		//Repeat as needed for each emoji/role desired.
		if(reaction.emoji.name == '💙'){//💙
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.add('779562454459088897');
				reaction.message.channel.send(member.displayName + ", Role added!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		if(reaction.emoji.name == '🧡'){//🧡
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.add('779563197778493450');
				reaction.message.channel.send(member.displayName + ", Role added!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		if(reaction.emoji.name == '💛'){//💛
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.add('779562836643938306');
				reaction.message.channel.send(member.displayName + ", Role added!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		if(reaction.emoji.name == '🤍'){//🤍
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.add('779562591419760651');
				reaction.message.channel.send(member.displayName + ", Role added!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		if(reaction.emoji.name == '🖤'){//🖤
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.add('779769489884839966');
				reaction.message.channel.send(member.displayName + ", Role added!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		//This portion is for my own test server
	} else if(reaction.message.id == 779500561107910657){
		if(user.bot){return}
		console.log(reaction.emoji.name);
		if(reaction.emoji.name == 'softPride'){
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.add('779501138927026256');
				reaction.message.channel.send(member.displayName + ", Role added!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
	}


});

//reactionRemove is pretty much exactly the same as
//reactionAdd, except for removing roles.
client.on('messageReactionRemove', async (reaction, user) => {
	console.log("reactions remove fired");
	

	if (reaction.message.partial) await reaction.message.fetch()
	.then(fullmessage => {
		console.log(fullmessage.content);
	});
	
	if(reaction.partial) await reaction.fetch();

	if(reaction.message.id == 779581424147365888){
		if(user.bot){return}
		console.log(reaction.emoji.name);
		if(reaction.emoji.name == '💜'){//💜
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.remove('779562260632829972');
				reaction.message.channel.send(member.displayName + ", Role removed!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
			
		}
		if(reaction.emoji.name == '💙'){//💙
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.remove('779562454459088897');
				reaction.message.channel.send(member.displayName + ", Role removed!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		if(reaction.emoji.name == '🧡'){//🧡
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.remove('779563197778493450');
				reaction.message.channel.send(member.displayName + ", Role removed!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		if(reaction.emoji.name == '💛'){//💛
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.remove('779562836643938306');
				reaction.message.channel.send(member.displayName + ", Role removed!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		if(reaction.emoji.name == '🤍'){//🤍
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.remove('779562591419760651');
				reaction.message.channel.send(member.displayName + ", Role removed!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
		if(reaction.emoji.name == '🖤'){//🖤
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.remove('779769489884839966');
				reaction.message.channel.send(member.displayName + ", Role removed!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
	} else if(reaction.message.id == 779500561107910657){
		if(user.bot){return}
		console.log(reaction.emoji.name);
		if(reaction.emoji.name == 'softPride'){
			reaction.message.guild.members.fetch(user.id).then(member => {
				member.roles.remove('779501138927026256');
				reaction.message.channel.send(member.displayName + ", Role removed!").then(msg => {
					msg.delete({timeout: 5000});
				});
			});
		}
	}


});

client.login(config.BOT_TOKEN);
