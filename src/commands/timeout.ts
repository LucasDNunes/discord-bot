import { Logger } from 'tslog';
import { ICommand } from 'wokcommands';
import { Role } from 'discord.js';

const log: Logger = new Logger();

export default {
  category: 'Moderation',
  description: 'timeout em um membro, duration é o tempo em minutos',
  slash: true,
  permissions: ['ADMINISTRATOR'],
  minArgs: 2,
  expectedArgsTypes: ['USER', 'NUMBER'],
  expectedArgs: '<usuário> <duraçãoEmMinuto>',
  testOnly: true,
  callback: async ({ interaction, args, guild }) => {
    const userId = args[0];
    const durationInMinute = Number(args[1]);

    const roleMuted: Role = guild.roles.cache.find(
      (r) => r.name.toLocaleLowerCase() === 'muted'
    );
    const member = await guild.members.fetch(userId);

    member.roles.add(roleMuted);

    const durationInMilliSecond = durationInMinute * 60000;
    setTimeout(() => {
      member.roles.remove(roleMuted);
      interaction.channel.send(`${member} desmutado`);
    }, durationInMilliSecond);

    interaction.reply({
      content: `${member} foi mutado por ${durationInMinute} min`,
    });
  },
} as ICommand;
