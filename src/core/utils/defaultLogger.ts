import { type BotLogger } from "@/core/types/BotLogger";

export const defaultLogger: BotLogger = {
  error(message, error) {
    console.error(`[ERROR] ${message}`, error ?? "");
  },
  info(message, data) {
    console.info(`[INFO] ${message}`, data ?? "");
  },
  log(message, data) {
    console.log(`[LOG] ${message}`, data ?? "");
  },
  warn(message, data) {
    console.warn(`[WARN] ${message}`, data ?? "");
  },
};
