import { Client, Intents } from 'discord.js';

import * as commandModule from './commands';
import config from './config/config';

const commands = Object(commandModule);
const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.once('ready', () => {
  client.user.setStatus('online');
  console.log('🤖 discord bot is ready!');
  const Guilds = client.guilds.cache.map((guild) => guild.id);
  console.log(Guilds);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  commands[commandName].execute(interaction, client);
});

client.login(config.DISCORD_BOT_TOKEN);
