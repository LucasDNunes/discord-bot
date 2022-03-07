import dotenv from 'dotenv';

dotenv.config();

type Config = {
  BOT_TOKEN: string;
  GUILD_ID: string;
  CLIENT_ID: string;
};

const config: Config = {
  BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  GUILD_ID: process.env.GUILD_ID,
  CLIENT_ID: process.env.CLIENT_ID,
};

if (!config.BOT_TOKEN || !config.GUILD_ID || !config.CLIENT_ID) {
  throw new Error('Missing enviroment variables');
}

export default config;
