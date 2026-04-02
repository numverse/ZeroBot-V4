import {
  Client,
  type ClientEvents,
  type ClientOptions,
  Collection,
} from "discord.js";

import { type BotCommand } from "@/core/types/BotCommand";
import { type BotEvent } from "@/core/types/BotEvent";
import { type BotLogger } from "@/core/types/BotLogger";
import { type BotService } from "@/core/types/BotService";

import * as math from "@/core/utils/math";
import { defaultLogger } from "@/core/utils/defaultLogger";

type CommandConstructor<T extends BotCommand = BotCommand> = new () => T;
type ServiceConstructor<T extends BotService = BotService> = new () => T;

interface CoreOptions {
  commands?: CommandConstructor[];
  events?: BotEvent[];
  logger?: BotLogger;
  options: ClientOptions;
  services?: ServiceConstructor[];
  token: string;
}

type EventName = keyof ClientEvents;
type EventListener<T extends EventName> = (...args: ClientEvents[T]) => void;

export default class Core extends Client {
  readonly services: Collection<string, BotService> = new Collection();
  readonly events: Collection<EventName, Set<BotEvent>> = new Collection();
  private readonly listenerList: Collection<EventName, (...args: unknown[]) => void> = new Collection();
  readonly logger: BotLogger = defaultLogger;
  readonly utils = {
    math,
  };

  constructor(coreOptions: CoreOptions) {
    super(coreOptions.options);

    if (coreOptions.logger) {
      this.logger = coreOptions.logger;
    } else {
      this.logger.info("No logger provided, using default logger.");
    }

    for (const Service of coreOptions.services ?? []) {
      const service = new Service();

      service.start().then(() => {
        this.logger.info(`Service "${service.name}" started successfully.`);
      }).catch((error) => {
        this.logger.error(`Failed to start service "${service.name}":`, error);
      });
      this.services.set(service.name, service);
    }

    for (const botEvent of coreOptions.events ?? []) {
      this.addEvent(botEvent);
    }

    for (const Command of coreOptions.commands ?? []) {
      const command = new Command();
      this.logger.info(`Found command "${command.data.name}", but command registration is not implemented yet.`);
    }

    this.login(coreOptions.token).then(() => {
      this.logger.info("Successfully logged in.");
    }).catch((error) => {
      this.logger.error("Failed to log in:", error);
    });

    process.on("uncaughtException", (error) => {
      this.logger.error("uncaughtException: ", error.message);
      this.logger.error(error.stack ?? "No stack trace available");
    });
  }

  getService<T extends BotService = BotService>(serviceName: string): T | undefined {
    return this.services.get(serviceName) as T | undefined;
  }

  private addEvent<T extends EventName>(botEvent: BotEvent<T>): void {
    const eventsForName = this.events.get(botEvent.name);
    if (eventsForName) {
      eventsForName.add(botEvent);
      return;
    }

    this.events.set(botEvent.name, new Set<BotEvent>([botEvent]));

    const listener = this.createListener(botEvent.name);
    this.on(botEvent.name, listener);

    this.listenerList.set(botEvent.name, listener as unknown as (...args: unknown[]) => void);
  }

  private createListener<T extends EventName>(eventName: T): EventListener<T> {
    return (...args: ClientEvents[T]) => {
      const eventsForName = this.events.get(eventName) as Set<BotEvent<T>> | undefined;
      if (!eventsForName) {
        return;
      }

      void (async () => {
        for (const botEvent of eventsForName) {
          try {
            await botEvent.execute(this, ...args);
          } catch (error) {
            this.logger.error(`Error executing event "${eventName}":`, error);
          }
        }
      })();
    };
  }
}
