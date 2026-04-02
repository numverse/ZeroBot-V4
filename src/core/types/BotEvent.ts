import { type ClientEvents } from "discord.js";
import type Core from "@/core/Core";

export interface BotEvent<T extends keyof ClientEvents = keyof ClientEvents> {
  name: T;
  once?: boolean;

  execute(client: Core, ...args: ClientEvents[T]): Promise<void> | void;
}
