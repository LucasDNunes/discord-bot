import { REST } from '@discordjs/rest';

import config from './config/config';

// import * as commandModules from './commands';
type Command = {
  data: unknown;
};

const commands = [];

// for (const module of Object.values<Command>(commandModules)) {
//   commands.push(module.data);
// }
const rest = new REST({ version: '9' }).setToken(config.BOT_TOKEN);

// rest
//   .put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
//     body: commands,
//   })
//   .then(() => {
//     console.log('successfully registered application commands');
//   })
//   .catch(console.error);
