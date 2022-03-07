import DiscordJS, { Client, Intents } from 'discord.js';
import { Logger } from 'tslog';
import WOKCommands from 'wokcommands';

import config from './config/config';

// import * as commandModule from './commands';
const log: Logger = new Logger();

// const commands = Object(commandModule);
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.once('ready', () => {
  new WOKCommands(client, {
    commandDir: __dirname + '/commands',
    typeScript: true,
  });

  client.user.setStatus('online');
  log.info('🤖 discord bot is ready!');
});

// client.on('interactionCreate', async (interaction) => {
//   if (!interaction.isCommand()) {
//     return;
//   }

//   const { commandName } = interaction;

//   commands[commandName].execute(interaction, client);
// });

client.login(config.DISCORD_BOT_TOKEN);
