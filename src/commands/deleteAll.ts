import { Logger } from 'tslog';
import { ICommand } from 'wokcommands';

const log: Logger = new Logger();

export default {
  category: 'Testing',
  description: 'deleta todas mensagem do chat atual',
  slash: true,

  callback: async ({ interaction, args, channel }) => {
    if (!args[0]) return interaction.reply('entre com um valor');

    const number = Number(args[0]);
    if (isNaN(number)) return interaction.reply('digite apenas número');
    if (number > 100 || number < 1)
      return interaction.reply('digite um valor entre 1-99');

    await interaction.channel.messages
      .fetch({ limit: number })
      .then((messages) => {
        channel.bulkDelete(messages);
      });
  },
} as ICommand;
