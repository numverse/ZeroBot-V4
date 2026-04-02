import {
  type Shard,
  ShardingManager,
} from "discord.js";

const manager = new ShardingManager(`${import.meta.dir}/bot.ts`, {
  mode: "process",
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
