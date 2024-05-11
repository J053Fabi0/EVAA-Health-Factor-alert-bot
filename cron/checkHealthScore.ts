import env from "../env";
import login from "../login";
import db from "../database/database";
import { CommandContext } from "grammy";
import getBrowser from "../utils/browser";
import bot, { MyContext } from "../telegram/initBot";
import getHealthScore from "../utils/getHealthScore";

/**
 * @param ctx If ctx is provided, it will send the health score to the user regardless of the alarm set
 */
export default async function checkHealthScore(ctx?: CommandContext<MyContext>) {
  const alert = await db.alert.findOne({});
  if (!alert && !ctx) return;

  const browser = await getBrowser();
  try {
    const page = await browser.newPage();

    const isLoggedin = await login(page);
    if (!isLoggedin) return;

    const healthScore = await getHealthScore(page);

    if (ctx) await ctx.reply(`The health factor is ${healthScore}%`);
    else if (
      alert &&
      (((alert.alertNumber === null || healthScore <= alert.alertNumber) && alert.lastAlert !== healthScore) ||
        (alert.alertNumber !== null && alert.lastAlert !== null && healthScore > alert.alertNumber))
    ) {
      const backToNormal =
        alert.alertNumber !== null && alert.lastAlert !== null && healthScore > alert.alertNumber;

      await bot.api.sendMessage(
        env.ADMIN_ID,
        `The health factor is${backToNormal ? " back to normal:" : ""} ${healthScore}%`
      );

      const lastAlert = backToNormal ? null : healthScore;
      await db.alert.updateMany({}, { $set: { lastAlert } });
    }
  } finally {
    await browser.close();
  }
}
