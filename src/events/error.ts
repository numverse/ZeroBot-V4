import { defineEvent } from "@/core/helpers/defineEvent";
import { Events } from "discord.js";

export const errorEvent = defineEvent({
  name: Events.Error,

  execute(core, error) {
    core.logger.error(`${new Date().toUTCString()} Client error:`, error);
  },
});
