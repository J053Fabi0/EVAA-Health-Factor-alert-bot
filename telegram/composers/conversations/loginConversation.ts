import fs from "fs";
import qr from "qr-image";
import { Page } from "puppeteer";
import { MyContext } from "../../initBot";
import getBrowser from "../../../utils/browser";
import { InputFile, InlineKeyboard } from "grammy";
import clickElement from "../../../utils/clickElement";
import { MyConversation } from "./defineConversations";
import streamToBuffer from "../../../utils/streamToBuffer";

let page: null | Page = null;
let i = 0;

export default async function login(conversation: MyConversation, ctx: MyContext) {
  if (!ctx.from) return;

  i++;
  page = page || (await (await getBrowser()).newPage());

  if (i === 1) {
    await page.goto("https://app.evaa.finance");

    await clickElement(page, "::-p-xpath(//button[contains(., 'Skip to the App')])");
    await clickElement(page, "::-p-xpath(//button[contains(., 'Connect Wallet')])");
    await clickElement(page, "img[src='https://wallet.tg/images/logo-288.png'");

    await clickElement(
      page,
      "#tc-widget-root > tc-root > div > div > div:first-child > div > div > button > div:nth-child(2)"
    );

    const text = await page.evaluate(() => navigator.clipboard.readText());

    const qrData = qr.image(text, { type: "png" });

    await ctx.replyWithPhoto(new InputFile(await streamToBuffer(qrData)), {
      caption: "Scan the QR code to login.",
      reply_markup: new InlineKeyboard().url("Login", text).text("Done", "Done"),
    });
  }

  await conversation.waitForCallbackQuery("Done");

  const session = await page.session.dumpString();
  await fs.promises.writeFile("session.json", session);

  await page.browser().close();

  await ctx.reply("Done!", { reply_markup: { remove_keyboard: true } });

  i = 0;
  page = null;
}
