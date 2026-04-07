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

export default class Core {
  readonly client: Client;
  readonly services: Collection<string, BotService> = new Collection();
  readonly events: Collection<EventName, Set<BotEvent>> = new Collection();
  readonly commands: Collection<string, BotCommand> = new Collection();
  private readonly listenerList: Collection<EventName, (...args: unknown[]) => void> = new Collection();
  readonly logger: BotLogger = defaultLogger;
  readonly utils = {
    math,
  };

  constructor(coreOptions: CoreOptions) {
    this.client = new Client(coreOptions.options);

    if (coreOptions.logger) {
      this.logger = coreOptions.logger;
    } else {
      this.logger.info("No logger provided, using default logger.");
    }

    Promise.allSettled((coreOptions.services ?? []).map(async (Service) => {
      const service = new Service();
      await service.start();
      this.services.set(service.name, service);
    })).then((serviceResults) => {
      for (const result of serviceResults) {
        if (result.status === "rejected") {
          this.logger.error("Error starting service:", result.reason);
        }
      }
      for (const botEvent of coreOptions.events ?? []) {
        this.addEvent(botEvent);
      }

      for (const Command of coreOptions.commands ?? []) {
        const command = new Command();
        this.commands.set(command.data.name, command);
      }
      this.logger.info(`Loaded ${this.commands.size} commands, ${this.events.size} events, and ${this.services.size} services.`);

      this.client.login(coreOptions.token).then(() => {
        this.logger.info("Successfully logged in.");
      }).catch((error) => {
        this.logger.error("Failed to log in:", error);
      });
    }).catch((error) => {
      this.logger.error("Error initializing services:", error);
    });

    process.on("uncaughtException", (error) => {
      this.logger.error("uncaughtException: ", error.message);
      this.logger.error(error.stack ?? "No stack trace available");
    });

    process.on("unhandledRejection", (reason, promise) => {
      this.logger.error("unhandledRejection: ", reason);
      this.logger.error("Promise: ", promise);
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
    this.client.on(botEvent.name, listener);

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
