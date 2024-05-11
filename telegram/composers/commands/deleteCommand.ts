import { CommandContext } from "grammy";
import { MyContext } from "../../initBot";
import db from "../../../database/database";

export default async function alertCommand(ctx: CommandContext<MyContext>) {
  if (!ctx.from) return;

  await db.alert.deleteMany({ user: ctx.from.id.toString() }, {});

  await ctx.reply("Alert deleted!");
}
