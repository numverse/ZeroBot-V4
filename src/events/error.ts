import { defineEvent } from "@/core/helpers/defineEvent";
import { Events } from "discord.js";

export const errorEvent = defineEvent({
  name: Events.Error,

  execute(client, error) {
    client.logger.error(`${new Date().toUTCString()} Client error:`, error);
  },
});
