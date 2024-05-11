import login from "../../../login";
import { CommandContext } from "grammy";
import { MyContext } from "../../initBot";
import getBrowser from "../../../utils/browser";
import getHealthScore from "../../../utils/getHealthScore";

export default async function checkCommand(ctx: CommandContext<MyContext>) {
  const browser = await getBrowser();
  try {
    const page = await browser.newPage();

    const isLoggedin = await login(page);
    if (!isLoggedin) return;

    const healthScore = await getHealthScore(page);

    await ctx.reply(`The health factor is ${healthScore}%`);
  } finally {
    await browser.close();
  }
}
