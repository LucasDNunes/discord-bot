import { Client, Message } from 'discord.js';
import { Logger } from 'tslog';

export default (client: Client) => {
  const log: Logger = new Logger();

  client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (isAuthorSelected(message)) {
      return sendMessage(message);
    }
  });

  function sendMessage(msg: Message): void {
    msg.react('🖕');
    msg.react('💩');
    msg.channel.send(`${msg.member} se fude seu merda `);
  }

  function isAuthorSelected(msg: Message): boolean {
    const gavax = '273628941498056735';
    const me = '339796687398633472';
    const jones = '948371805192740874';
    const jones2 = '549721820853436416';
    const marioVerde = '210606331126743041';
    const coto = '392175418184171522';
    const antonio = '309000953929924619';

    const authorsSelecteds: string[] = [jones, jones2];
    const finded = authorsSelecteds.filter(
      (author) => author === msg.author.id
    );
    return finded ? finded.length > 0 : false;
  }
};

const config = {
  // The display name that server owners will see.
  // This can be changed at any time.
  displayName: 'Hue',

  // The name the database will use to set if it is enabled or not.
  // This should NEVER be changed once set, and users cannot see it.
  dbName: 'WELCOME MESSAGE',
};

export { config };
