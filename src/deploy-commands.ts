import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import * as commandModules from './commands';
import config from './config/config';

type Command = {
  data: unknown;
};

const commands = [];

for (let module of Object.values<Command>(commandModules)) {
  commands.push(module.data);
}
const rest = new REST({ version: '9' }).setToken(config.DISCORD_BOT_TOKEN);

rest
  .put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
    body: commands,
  })
  .then(() => {
    console.log('successfully registered application commands');
  })
  .catch(console.error);
