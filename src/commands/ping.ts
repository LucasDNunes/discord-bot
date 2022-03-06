import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data: SlashCommandBuilder = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('replies with pong');

export async function execute(interaction: CommandInteraction) {
  console.log(interaction.guildId);
  return interaction.reply('Pong!');
}
