import { rest } from "../../rest/rest.ts";
import { Template } from "../../types/templates/template.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/**
 * Syncs the template to the guild's current state.
 * Requires the `MANAGE_GUILD` permission.
 */
export async function syncGuildTemplate(guildId: string, templateCode: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  return await rest.runMethod<Template>(
    "put",
    `${endpoints.GUILD_TEMPLATES(guildId)}/${templateCode}`,
  );
}
