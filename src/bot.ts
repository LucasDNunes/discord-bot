import { Client, Intents } from 'discord.js';
import * as path from 'path';
import { Logger } from 'tslog';
import WOKCommands from 'wokcommands';

import config from './config/config';

// import * as commandModule from './commands';
const log: Logger = new Logger();

log.info(WOKCommands);
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
    commandDir: path.join(__dirname, '/commands'),
    typeScript: true,
  });

  // client.user.setStatus('online');
  log.info('🤖 discord bot is ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName } = interaction;

  // commands[commandName].execute(interaction, client);
});

client.login(config.BOT_TOKEN);

// import DiscordJS, { Intents } from 'discord.js';
// import WOKCommands from 'wokcommands';
// import path from 'path';
// import { config as dconfig } from 'dotenv';
// dconfig();

// const client = new DiscordJS.Client({
//   intents: [
//     Intents.FLAGS.GUILDS,
//     Intents.FLAGS.GUILD_MESSAGES,
//     Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
//   ],
// });

// client.on('ready', () => {
//   new WOKCommands(client, {
//     commandsDir: path.join(__dirname, 'commands'),
//     typeScript: true,
//   })
//     .setDisplayName('---')
//     .setColor('0xbf7c34');
// });

// client.login(config.DISCORD_BOT_TOKEN);
