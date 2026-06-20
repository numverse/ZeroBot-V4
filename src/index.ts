import "dotenv/config";
import {
  type Shard,
  ShardingManager,
} from "discord.js";
import path from "node:path";

const isDev = import.meta.url.endsWith(".ts");
const botFileName = isDev ? "bot.ts" : "bot.js";

const botPath = path.join(import.meta.dirname, botFileName);

const manager = new ShardingManager(botPath, {
  execArgv: isDev ? ["--import", "tsx"] : [],
  mode: "process",
  token: process.env.DISCORD_TOKEN,
  totalShards: "auto",
});

manager.on("shardCreate", (shard: Shard) => {
  console.log(`Shard ${shard.id} launched`);
});

try {
  await manager.spawn();
} catch (error) {
  console.error("Error spawning shards:", error);
}
