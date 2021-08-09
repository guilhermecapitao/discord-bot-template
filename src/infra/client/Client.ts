import { Client as DiscordClient, Intents, Collection } from 'discord.js';

import { generalCommands } from '@modules/general/commands';

import { botConfig } from '@config/botConfig';
import {
  messageListener,
  messageReactionAddListener,
  readyListener,
} from './listeners';

type ClientConfig = {
  token: string;
};

export class Client {
  public readonly discordClient: DiscordClient;

  private config: ClientConfig;

  constructor() {
    this.config = { token: botConfig.token };
    this.discordClient = new DiscordClient({
      partials: ['USER', 'GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION'],
      ws: { intents: Intents.ALL },
    });
  }

  private loadCommands(): void {
    this.discordClient.commands = new Collection();

    const commands = [...generalCommands];

    commands.forEach(command => {
      this.discordClient.commands.set(command.name, command);
    });
  }

  private async initDiscordClient(): Promise<void> {
    await this.discordClient.login(this.config.token);
  }

  private loadListeners(): void {
    this.discordClient.once('ready', readyListener);
    this.discordClient.on('message', messageListener);
    this.discordClient.on('messageReactionAdd', messageReactionAddListener);
  }

  public async start(): Promise<void> {
    this.loadListeners();
    this.loadCommands();

    this.initDiscordClient();
  }
}
