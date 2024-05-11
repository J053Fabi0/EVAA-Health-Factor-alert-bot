import { CommandContext } from "grammy";
import { MyContext } from "../../initBot";
import checkHealthScore from "../../../cron/checkHealthScore";

export default async function checkCommand(ctx: CommandContext<MyContext>) {
  checkHealthScore(ctx);
}
