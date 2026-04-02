import { type BotEvent } from "@/core/types/BotEvent";
import { type ClientEvents } from "discord.js";

export function defineEvent<T extends keyof ClientEvents>(botEvent: BotEvent<T>): BotEvent<T> {
  return botEvent;
}
