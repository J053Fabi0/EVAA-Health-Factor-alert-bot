import { CommandContext } from "grammy";
import { MyContext } from "../../initBot";
import checkHealthFactor from "../../../cron/checkHealthFactor";

export default async function checkCommand(ctx: CommandContext<MyContext>) {
  checkHealthFactor(ctx);
}
