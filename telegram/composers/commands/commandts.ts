import { Composer } from "grammy";
import { MyContext } from "../../initBot";
import loginCommand from "./loginCommand";
import checkCommand from "./checkCommand";

const commandsHandler = new Composer<MyContext>();

commandsHandler.command("login", loginCommand);
commandsHandler.command("check", checkCommand);

export default commandsHandler;
