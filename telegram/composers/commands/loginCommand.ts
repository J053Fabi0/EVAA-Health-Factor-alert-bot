import { CommandContext } from "grammy";
import { MyContext } from "../../initBot";

export default async function loginCommand(ctx: CommandContext<MyContext>) {
  await ctx.conversation.enter("login");
}
