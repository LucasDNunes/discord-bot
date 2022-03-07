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
      > ${client.ws.ping}ms`,
      ephemeral: true,
    });
  },
} as ICommand;

// export const data: SlashCommandBuilder = new SlashCommandBuilder()
//   .setName('ping')
//   .setDescription('replies with pong');

// export async function execute(
//   interaction: CommandInteraction,
//   client?: Client
// ) {
//   log.info(`guild-id on ping - ${interaction.guildId}`);

//   return interaction.reply({
//     content: `
//     > :ping_pong: Pong!
//     > ${client.ws.ping}ms`,
//     ephemeral: true,
//   });
// }
