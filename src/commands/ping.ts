import { Logger } from 'tslog';
import { ICommand } from 'wokcommands';

const log: Logger = new Logger();

export default {
  category: 'Testing',
  description: 'replies with pong',
  slash: true,
  callback: ({ client, interaction }) => {
    interaction.reply({
      content: `
      > :ping_pong: Pong!
      > **${client.ws.ping}ms**`,
      ephemeral: true,
    });
  },
} as ICommand;
