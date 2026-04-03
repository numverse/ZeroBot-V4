import {
  type GuildResolvable,
  type PermissionResolvable,
  type UserResolvable,
} from "discord.js";

export interface CommandOptions {
  botPermissions?: PermissionResolvable[];
  cooldown?: number;
  guilds?: GuildResolvable[];
  registrationRequired?: boolean;
  userPermissions?: PermissionResolvable[];
  whitelist?: UserResolvable[];
}
