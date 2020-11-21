//If you type !ping in a bot-commands channel, it'll reply with pong!
module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg, args) {
      msg.reply('pong!');
    },
  };