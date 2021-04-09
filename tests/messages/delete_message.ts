import { cache, delay, deleteMessage, sendMessage } from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertExists } from "../deps.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw", reason?: string) {
  const message = await sendMessage(tempData.channelId, "Hello World!");

  // Assertions
  assertExists(message);
  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
  await delay(5000);
  // Make sure the message was created.
  if (!cache.messages.has(message.id)) {
    throw new Error(
      "The message seemed to be sent but it was not cached.",
    );
  }

  // Delete the message now
  if (type === "raw") {
    await deleteMessage(tempData.channelId, message.id, reason);
  } else {
    await message.delete(reason);
  }

  // Wait 5 seconds to give it time for MESSAGE_DELETE event
  await delay(5000);
  // Make sure it is gone from cache
  if (cache.messages.has(message.id)) {
    throw new Error(
      "The message should have been deleted but it is still in cache.",
    );
  }
}

Deno.test({
  name: "[message] delete a message without a reason.",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] delete a message with a reason.",
  async fn() {
    await ifItFailsBlameWolf("raw", "with a reason");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.delete() without a reason.",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.delete() with a reason.",
  async fn() {
    await ifItFailsBlameWolf("getter", "with a reason");
  },
  ...defaultTestOptions,
});
