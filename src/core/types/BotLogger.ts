export interface BotLogger {
  error(message: string, error?: unknown): void;
  info(message: string, data?: Record<string, unknown>): void;
  log(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
}
