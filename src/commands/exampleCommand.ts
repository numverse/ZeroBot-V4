import { BotCommand } from "@/core/types/BotCommand";
import { type CommandOptions } from "@/types/CommandOptions";

export class ExampleCommand extends BotCommand<CommandOptions> {
  constructor() {
    super({
      data: {
        description: "An example command",
        name: "example",
      },
      options: {
        registrationRequired: false,
      },
    });
  }

  async execute() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Example command executed!");
      }, 1000);
    });
  }
}
