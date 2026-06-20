import { defineEvent } from "~/core/helpers/defineEvent";
import { Events } from "discord.js";

export const interactionCreateEvent = defineEvent({
  name: Events.InteractionCreate,

  execute(core, interaction) {
    core.logger.log(`interactionCreate: ${interaction.type}`);
  },
});
