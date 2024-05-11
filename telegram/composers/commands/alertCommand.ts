import { CommandContext } from "grammy";
import { MyContext } from "../../initBot";
import db from "../../../database/database";

export default async function alertCommand(ctx: CommandContext<MyContext>) {
  const alert = await db.alert.findOne({}, {});

  if (alert) {
    if (alert.alertNumber === null) await ctx.reply("Alert of every change!");
    else await ctx.reply(`Alert of every change when it's bellow or equal ${alert.alertNumber}%!`);
  } else await ctx.reply("You don't have any alerts set. Use /set to set an alert.");
}
