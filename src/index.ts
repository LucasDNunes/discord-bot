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

client.once('ready', async () => {
  log.info(__dirname);
  new WOKCommands(client, {
    commandDir: path.join(__dirname, '/commands'),
    typeScript: true,
    testServers: '613118292386644099',
  });

  client.user.setStatus('online');
  log.info('🤖 discord bot is ready!');
});

client.on('messageCreate', (msg) => {
  if (msg.author.bot) return;
  if (isAuthorSelected(msg)) {
    return sendMessage(msg);
  }
});

client.login(config.BOT_TOKEN);

function sendMessage(msg: Message): void {
  msg.react('🖕');
  msg.react('💩');
  msg.channel.send(`${msg.member} se fude seu merda `);
}

function isAuthorSelected(msg: Message): boolean {
  const gavax = '273628941498056735';
  const me = '339796687398633472';
  const jones = '948371805192740874';
  const marioVerde = '210606331126743041';

  const authorsSelecteds: string[] = [jones];
  const finded = authorsSelecteds.filter((author) => author === msg.author.id);
  return finded ? finded.length > 0 : false;
}
