import {
  ActivityType,
  GatewayIntentBits,
  Options,
} from "discord.js";

import Core from "@/core/Core";

import { errorEvent } from "@/events/error";
import { ExampleCommand } from "@/commands/exampleCommand";
import { ExampleService } from "@/services/exampleService";

new Core({
  options: {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    presence: {
      activities: [
        {
          name: "Loading...",
          type: ActivityType.Playing,
          url: "https://discord.gg/3w4aKhpUVy",
        },
      ],
      afk: true,
      status: "idle",
    },
    sweepers: {
      ...Options.DefaultSweeperSettings,
      messages: {
        interval: 3600, // Sweep messages every hour
        lifetime: 1800, // Remove messages older than 30 minutes
      },
    },
  },

  commands: [ExampleCommand],
  events: [errorEvent],
  services: [ExampleService],
  token: process.env.DISCORD_TOKEN!,
});
