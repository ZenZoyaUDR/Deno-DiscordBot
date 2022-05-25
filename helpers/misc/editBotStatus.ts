import { Bot } from "../../bot.ts";
import { StatusUpdate } from "./editShardStatus.ts";

export async function editBotStatus(bot: Bot, data: StatusUpdate) {
  await Promise.all(bot.gateway.manager.shards.map((shard) => bot.helpers.editShardStatus(shard.id, data)));
}
