import { Client, Message, Role } from 'discord.js';

export default (client: Client) => {
  const userMap = new Map();

  const LIMIT_MESSAGE = 5;
  const TIME = 10000;
  const DIFFERENCE = 2000;
  const TIME_MUTED = 30000;

  client.on('messageCreate', (message) => {
    if (!userMap.has(message.author.id)) {
      const fn: NodeJS.Timeout = setTimeout(() => {
        userMap.delete(message.author.id);
      }, TIME);
      userMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        time: fn,
      } as UserData);

      return;
    }
    const userData: UserData = userMap.get(message.author.id);
    const { lastMessage, time } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount: number = userData.msgCount;

    if (difference > DIFFERENCE) {
      clearTimeout(time);
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.time = setTimeout(() => {
        userMap.delete(message.author.id);
      }, TIME);
      userMap.set(message.author.id, userData);
      return;
    }
    ++msgCount;
    if (msgCount === LIMIT_MESSAGE) {
      const roleMuted: Role = message.guild.roles.cache.find(
        (r) => r.name.toLocaleLowerCase() === 'muted'
      );

      message.member.roles.add(roleMuted);

      const timeMutedInSeconds = TIME_MUTED / 1000;

      message.channel.send(
        `${message.member}, você foi mutador por spam, por ${timeMutedInSeconds}s`
      );
      setTimeout(() => {
        message.member.roles.remove(roleMuted);
        message.channel.send(`${message.member} desmutado`);
      }, TIME_MUTED);
    } else {
      userData.msgCount = msgCount;
      userMap.set(message.author.id, userData);
    }
  });
};

const config = {
  // The display name that server owners will see.
  // This can be changed at any time.
  displayName: 'Anti Spam',

  // The name the database will use to set if it is enabled or not.
  // This should NEVER be changed once set, and users cannot see it.
  dbName: 'Anti Spam',
};

export { config };

class UserData {
  private _msgCount: number;
  private _lastMessage: Message;
  private _time: NodeJS.Timeout;

  constructor(msgCount: number, lastMessage?: Message) {
    this.msgCount = msgCount;
    this.lastMessage = lastMessage;
  }

  get time(): NodeJS.Timeout {
    return this._time;
  }

  set time(value: NodeJS.Timeout) {
    this._time = value;
  }

  get msgCount(): number {
    return this._msgCount;
  }

  set msgCount(value: number) {
    this._msgCount = value;
  }

  get lastMessage(): Message {
    return this._lastMessage;
  }

  set lastMessage(value: Message) {
    this._lastMessage = value;
  }
}
