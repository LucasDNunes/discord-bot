import DiscordJS from 'discord.js';
import { Logger } from 'tslog';
import { ICommand } from 'wokcommands';

const log: Logger = new Logger();

export default {
  category: 'Moderation',
  // testOnly: true,
  description: 'deleta umas mensagens do chat atual',
  slash: true,
  permissions: ['ADMINISTRATOR'],
  maxArgs: 1,
  expectedArgs: '[quantidade]',
  options: [
    {
      name: 'quantidade',
      description: 'quantidade de mensagens para deletar',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
    },
  ],
  callback: async ({ interaction, args, channel }) => {
    const number = Number(args[0]);

    if (number > 100 || number < 1)
      return interaction.reply('digite um valor entre 1-99');

    const messages = await interaction.channel.messages.fetch({
      limit: number,
    });

    const { size } = messages;

    // messages.forEach((m) => m.delete());

    channel.bulkDelete(messages);

    interaction.reply({
      content: `deletou ${size} menssagen(s) `,
      ephemeral: true,
    });
  },
} as ICommand;
