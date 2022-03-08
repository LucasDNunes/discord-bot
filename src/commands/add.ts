import DiscordJS from 'discord.js';
import { Logger } from 'tslog';
import { ICommand } from 'wokcommands';

const log: Logger = new Logger();

export default {
  category: 'Testing',
  description: 'soma dois números',
  slash: true,
  options: [
    {
      name: 'numero1',
      description: 'primeiro número para ser somado',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
    },
    {
      name: 'numero2',
      description: 'segundo número para ser somado',
      required: true,
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
    },
  ],
  expectedArgs: '<numero1> <numero2>',
  callback: ({ interaction, args }) => {
    const numberOne = Number(args[0]);
    const numberTwo = Number(args[1]);
    interaction.reply({
      content: `
      > A soma é de ${numberOne} + ${numberTwo} =  ${numberOne + numberTwo}.`,
      ephemeral: true,
    });
  },
} as ICommand;
