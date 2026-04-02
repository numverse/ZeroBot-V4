export interface BotService {
  readonly description: string;
  readonly name: string;
  readonly version: string;

  start(): Promise<void>;
  stop?(): Promise<void>;
}
