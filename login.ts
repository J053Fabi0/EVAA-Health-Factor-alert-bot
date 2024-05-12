import fs from "fs";
import env from "./env";
import { Page } from "puppeteer";
import sleep from "./utils/sleep";
import bot from "./telegram/initBot";
import checkElement from "./utils/checkElement";

export default async function login(page: Page) {
  for (let i = 0; i < 3; i++) {
    await page.goto("https://app.evaa.finance");
    const session = await fs.promises.readFile("session.json", "utf8").catch(() => null);

    if (!session) continue;

    await page.session.restoreString(session);
    await page.reload();

    await sleep(1);

    const isLoggedIn = !(await checkElement(page, "::-p-xpath(//button[contains(., 'Skip to the App')])", {
      timeout: 1000,
    }));

    if (!isLoggedIn) continue;
    return isLoggedIn;
  }

  await bot.api.sendMessage(env.ADMIN_ID, "Login to Evaa Finance. /login");
  return false;
}
