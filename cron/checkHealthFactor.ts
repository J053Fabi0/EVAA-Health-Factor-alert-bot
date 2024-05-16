import env from "../env";
import login from "../login";
import db from "../database/database";
import { CommandContext } from "grammy";
import getBrowser from "../utils/browser";
import bot, { MyContext } from "../telegram/initBot";
import getHealthFactor from "../utils/getHealthFactor";

/**
 * @param ctx If ctx is provided, it will send the health factor to the user regardless of the alarm set
 */
export default async function checkHealthFactor(ctx?: CommandContext<MyContext>): Promise<void> {
  const alert = await db.alert.findOne({});
  if (!alert && !ctx) return;

  const browser = await getBrowser();
  try {
    const page = await browser.newPage();

    const isLoggedin = await login(page);
    if (!isLoggedin) return;

    const healthFactor = await getHealthFactor(page);

    if (healthFactor === 100 && alert?.lastAlert && alert.lastAlert !== 99 && alert.lastAlert !== 101) {
      await bot.api.sendMessage(env.ADMIN_ID, "False 100% detected");
      return checkHealthFactor(ctx);
    }

    if (ctx) await ctx.reply(`The health factor is ${healthFactor}%`);
    else if (
      alert &&
      (((alert.alertNumber === null || healthFactor <= alert.alertNumber) && alert.lastAlert !== healthFactor) ||
        (alert.alertNumber !== null && alert.lastAlert !== null && healthFactor > alert.alertNumber))
    ) {
      const backToNormal =
        alert.alertNumber !== null && alert.lastAlert !== null && healthFactor > alert.alertNumber;

      await bot.api.sendMessage(
        env.ADMIN_ID,
        `The health factor is${backToNormal ? " back to normal:" : ""} ${healthFactor}%`
      );

      const lastAlert = backToNormal ? null : healthFactor;
      await db.alert.updateMany({}, { $set: { lastAlert } });
    }
  } finally {
    await browser.close();
  }
}
