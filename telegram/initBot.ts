import env from "../env";
import commandsHandler from "./composers/commands/commandts";
import { Bot, Context, SessionFlavor, session } from "grammy";
import { type ConversationFlavor } from "@grammyjs/conversations";
import defineConversations from "./composers/conversations/defineConversations";

export interface SessionData {
  any?: number;
}
function initial(): SessionData {
  return {};
}

export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;

const bot = new Bot<MyContext>(env.BOT_TOKEN);

bot.use(session({ initial }));

bot.on("message", async (ctx, next) => {
  if (ctx.from.id.toString() === env.ADMIN_ID) next();
});

// Install the conversations plugin.
bot.use(defineConversations);

bot.use(commandsHandler);

bot.start({
  onStart: async (ctx) => {
    console.log("Bot started 🚀");
    await bot.api.setMyCommands([
      { command: "check", description: "Check Health Score" },
      { command: "login", description: "Login to Evaa Finance" },
    ]);
  },
});

export default bot;
