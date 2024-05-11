import login from "../../../login";
import { CommandContext } from "grammy";
import { MyContext } from "../../initBot";
import getBrowser from "../../../utils/browser";
import findInParents from "../../../utils/findInParents";

export default async function checkCommand(ctx: CommandContext<MyContext>) {
  const browser = await getBrowser();
  try {
    const page = await browser.newPage();

    const isLoggedin = await login(page);
    if (!isLoggedin) return;

    const healthFactorText = await page.$("::-p-xpath(//span[contains(., 'Health Factor')])");
    if (!healthFactorText) {
      await ctx.reply("Could not find the health factor");
      return;
    }

    const percentage = await findInParents("span:nth-child(2)", healthFactorText, 3);
    const percentageText = await page.evaluate((el) => el.textContent, percentage);

    await ctx.reply(`The health factor is ${percentageText}`);
  } finally {
    await browser.close();
  }
}
