import { CommandContext } from "grammy";
import { MyContext } from "../../initBot";
import db, { Alert } from "../../../database/database";

export default async function setCommand(ctx: CommandContext<MyContext>) {
  const text = ctx.message?.text;
  if (!text || !ctx.from) return;

  const number = text.split(" ")[1] === "all" ? "all" : parseInt(text.split(" ")[1]);
  if (number !== "all" && isNaN(number))
    return ctx.reply("Please provide a valid alert number. Example: /set 5. Or use all to alert on every change.");

  await db.alert.deleteMany({ user: ctx.from.id.toString() }, {});
  await db.alert.insertOne<Alert>({
    lastAlert: null,
    user: ctx.from.id.toString(),
    alertNumber: number === "all" ? null : number,
  });

  if (number === "all")
    await ctx.reply(
      `Alert set! Every 5 minutes the bot will check if the health factor has change ` +
        `and will alert you of every change when it does.`
    );
  else
    await ctx.reply(
      `Alert set! Every 5 minutes the bot will check if the health factor is ` +
        `bellow or equal to ${number}% and will alert you of every change when it does.`
    );
}
