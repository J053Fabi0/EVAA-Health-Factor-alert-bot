import { Composer } from "grammy";
import setCommand from "./setCommand";
import { MyContext } from "../../initBot";
import loginCommand from "./loginCommand";
import checkCommand from "./checkCommand";
import alertCommand from "./alertCommand";
import deleteCommand from "./deleteCommand";

const commandsHandler = new Composer<MyContext>();

commandsHandler.command("login", loginCommand);
commandsHandler.command("check", checkCommand);
commandsHandler.command("set", setCommand);
commandsHandler.command("alert", alertCommand);
commandsHandler.command("delete", deleteCommand);

export default commandsHandler;
