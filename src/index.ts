import { Client, Intents, Message } from 'discord.js';
import { Logger } from 'tslog';
import WOKCommands from 'wokcommands';

import config from './config/config';
import path from 'path';

const log: Logger = new Logger();

// CTRL + SHIFT + ALT + P = format code by prettier

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.once('ready', async () => {
  log.info(__dirname);
  new WOKCommands(client, {
    commandDir: path.join(__dirname, '/commands'),
    featureDir: path.join(__dirname, '/features'),
    typeScript: true,
    testServers: '613118292386644099',
  });

  client.user.setStatus('online');
  log.info('🤖 discord bot is ready!');
});

client.login(config.BOT_TOKEN);
