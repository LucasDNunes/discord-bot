import { Client, Intents, Message } from 'discord.js';
import * as path from 'path';
import { Logger } from 'tslog';
import WOKCommands from 'wokcommands';

import config from './config/config';

const log: Logger = new Logger();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.once('ready', () => {
  log.info(__dirname);
  new WOKCommands(client, {
    commandDir: path.join(__dirname, '/commands'),
    typeScript: true,
  });

  client.user.setStatus('online');
  log.info('🤖 discord bot is ready!');
});

// client.on('interactionCreate', async (interaction) => {
//   if (!interaction.isCommand()) {
//     return;
//   }
//   interaction.channel.send('salve');
// });

client.on('messageCreate', (msg) => {
  if (msg.author.bot) return;
  if (isAuthorSelected(msg)) {
    sendMessage(msg);
  }
});

// client.on();

client.login(config.BOT_TOKEN);

function sendMessage(msg: Message): void {
  msg.react('🖕');
  msg.react('💩');
  // msg.react('🤡');
  // msg.react('👺');
  msg.channel.send(`${msg.member} se fude seu merda `);
}

function isAuthorSelected(msg: Message): boolean {
  const authorsSelecteds: string[] = ['339796687398633472'];
  return authorsSelecteds.find((author) => author === msg.author.id).length > 0;
}
