import { CommandContext } from "grammy";
import { MyContext } from "../../initBot";
import db from "../../../database/database";

export default async function alertCommand(ctx: CommandContext<MyContext>) {
  await db.alert.deleteMany({}, {});

  await ctx.reply("Alert deleted!");
}
