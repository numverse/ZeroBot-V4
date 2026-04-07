import { type BotService } from "@/core/types/BotService";

export class ExampleService implements BotService {
  description = "An example service that does nothing.";
  name = "ExampleService";
  version = "1.0.0";

  start() {
    // throw new Error("Method not implemented.");
    return Promise.resolve();
  }

  stop?() {
    // throw new Error("Method not implemented.");
    return Promise.resolve();
  }
}
